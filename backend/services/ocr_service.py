"""
MataOCR Real OCR Service Implementation
Advanced OCR processing with PaddleOCR for Malaysian documents
"""

import os
import cv2
import numpy as np
from typing import List, Dict, Any, Optional, Tuple
import logging
from pathlib import Path
import asyncio
from concurrent.futures import ThreadPoolExecutor
import time
from PIL import Image, ImageEnhance, ImageFilter

# OCR engines
from paddleocr import PaddleOCR
import pytesseract

# Image processing
from albumentations import Compose, RandomBrightnessContrast, RandomGamma, Normalize
from albumentations.pytorch import ToTensorV2

logger = logging.getLogger(__name__)

class MalaysianDocumentProcessor:
    """Specialized processing for Malaysian document types"""
    
    DOCUMENT_PATTERNS = {
        'mykad': {
            'keywords': ['mykad', 'kad pengenalan', 'malaysia', 'kerajaan malaysia'],
            'fields': ['nama', 'no. kad pengenalan', 'alamat', 'tarikh lahir'],
            'language_priority': ['ms', 'en']
        },
        'passport': {
            'keywords': ['passport', 'pasport malaysia', 'malaysia'],
            'fields': ['nama', 'no. pasport', 'tarikh lahir', 'tempat lahir'],
            'language_priority': ['en', 'ms']
        },
        'driving_license': {
            'keywords': ['lesen memandu', 'driving licence', 'jpj'],
            'fields': ['nama', 'no. lesen', 'kelas', 'tarikh tamat'],
            'language_priority': ['ms', 'en']
        },
        'business_registration': {
            'keywords': ['sijil pendaftaran', 'registration certificate', 'ssm'],
            'fields': ['nama syarikat', 'no. pendaftaran', 'tarikh'],
            'language_priority': ['ms', 'en']
        }
    }

    @staticmethod
    def detect_document_type(text: str) -> str:
        """Detect Malaysian document type from extracted text"""
        text_lower = text.lower()
        
        for doc_type, config in MalaysianDocumentProcessor.DOCUMENT_PATTERNS.items():
            keyword_matches = sum(1 for keyword in config['keywords'] if keyword in text_lower)
            if keyword_matches >= 1:
                return doc_type
        
        return 'general'

    @staticmethod
    def enhance_malaysian_text(text: str, doc_type: str) -> str:
        """Apply Malaysian-specific text corrections"""
        # Common OCR errors in Malaysian documents
        corrections = {
            'KERAJAAH': 'KERAJAAN',
            'MALAYSLA': 'MALAYSIA',
            'MYKAO': 'MYKAD',
            'ALAMAI': 'ALAMAT',
            'IARIEH': 'TARIKH',
            'PENGENALAN': 'PENGENALAN',
            '8ALAMAT': 'ALAMAT',
            'NANA': 'NAMA',
            'L4HIR': 'LAHIR',
        }
        
        enhanced_text = text
        for error, correction in corrections.items():
            enhanced_text = enhanced_text.replace(error, correction)
        
        return enhanced_text

class RealOCRService:
    """Production OCR service with PaddleOCR and Malaysian optimization"""
    
    def __init__(self):
        self.is_initialized = False
        self.paddle_ocr_engines = {}
        self.tesseract_config = '--oem 3 --psm 6'
        self.executor = ThreadPoolExecutor(max_workers=2)
        self.malaysian_processor = MalaysianDocumentProcessor()
        
        # Performance tracking
        self.processing_stats = {
            'total_processed': 0,
            'avg_processing_time': 0.0,
            'accuracy_scores': []
        }

    async def initialize(self):
        """Initialize OCR engines asynchronously"""
        if self.is_initialized:
            return
            
        try:
            logger.info("Initializing PaddleOCR engines...")
            
            # Initialize PaddleOCR for different languages
            # Run in thread pool to avoid blocking
            loop = asyncio.get_event_loop()
            
            # Malaysian languages
            engines_to_init = {
                'ms': {'lang': 'en', 'use_angle_cls': True, 'use_gpu': False},  # English model works for Malay
                'en': {'lang': 'en', 'use_angle_cls': True, 'use_gpu': False},
                'zh': {'lang': 'ch', 'use_angle_cls': True, 'use_gpu': False},
                'ta': {'lang': 'ta', 'use_angle_cls': True, 'use_gpu': False},
                'ar': {'lang': 'ar', 'use_angle_cls': True, 'use_gpu': False},
            }
            
            for lang_code, config in engines_to_init.items():
                try:
                    self.paddle_ocr_engines[lang_code] = await loop.run_in_executor(
                        self.executor, 
                        lambda cfg=config: PaddleOCR(**cfg)
                    )
                    logger.info(f"Initialized PaddleOCR for {lang_code}")
                except Exception as e:
                    logger.warning(f"Failed to initialize PaddleOCR for {lang_code}: {e}")
                    # Fallback to English model
                    if lang_code != 'en':
                        self.paddle_ocr_engines[lang_code] = self.paddle_ocr_engines.get('en')
            
            self.is_initialized = True
            logger.info("OCR Service initialization complete")
            
        except Exception as e:
            logger.error(f"OCR Service initialization failed: {e}")
            raise

    async def health_check(self) -> str:
        """Health check for OCR service"""
        if not self.is_initialized:
            return "initializing"
        
        return f"operational - {len(self.paddle_ocr_engines)} engines ready"

    def preprocess_image(self, image_path: Path) -> np.ndarray:
        """Advanced image preprocessing for better OCR accuracy"""
        try:
            # Load image
            image = cv2.imread(str(image_path))
            if image is None:
                # Try with PIL for different formats
                pil_image = Image.open(image_path)
                image = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)
            
            # Convert to grayscale
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            
            # Noise reduction
            denoised = cv2.fastNlMeansDenoising(gray)
            
            # Adaptive threshold for better text extraction
            adaptive_thresh = cv2.adaptiveThreshold(
                denoised, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2
            )
            
            # Morphological operations to clean up
            kernel = np.ones((1, 1), np.uint8)
            processed = cv2.morphologyEx(adaptive_thresh, cv2.MORPH_CLOSE, kernel)
            
            return processed
            
        except Exception as e:
            logger.warning(f"Image preprocessing failed: {e}, using original")
            # Fallback to original image
            image = cv2.imread(str(image_path))
            return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY) if image is not None else None

    async def extract_text_paddleocr(self, image_path: Path, language: str) -> Dict[str, Any]:
        """Extract text using PaddleOCR"""
        try:
            # Get appropriate OCR engine
            ocr_engine = self.paddle_ocr_engines.get(language, self.paddle_ocr_engines.get('en'))
            if not ocr_engine:
                raise Exception(f"OCR engine not available for language: {language}")
            
            # Preprocess image
            processed_image = self.preprocess_image(image_path)
            if processed_image is None:
                raise Exception("Failed to load image")
            
            # Run OCR in thread pool
            loop = asyncio.get_event_loop()
            results = await loop.run_in_executor(
                self.executor,
                lambda: ocr_engine.ocr(processed_image, cls=True)
            )
            
            if not results or not results[0]:
                return {
                    'text': '',
                    'confidence': 0.0,
                    'bounding_boxes': [],
                    'word_count': 0
                }
            
            # Process results
            extracted_text = []
            bounding_boxes = []
            confidences = []
            
            for line in results[0]:
                if line:
                    bbox, (text, confidence) = line
                    extracted_text.append(text)
                    bounding_boxes.append({
                        'text': text,
                        'bbox': [int(coord) for coord in np.array(bbox).flatten()[:4]],
                        'confidence': float(confidence)
                    })
                    confidences.append(confidence)
            
            # Combine text
            full_text = '\n'.join(extracted_text)
            avg_confidence = np.mean(confidences) if confidences else 0.0
            
            return {
                'text': full_text,
                'confidence': float(avg_confidence),
                'bounding_boxes': bounding_boxes,
                'word_count': len(extracted_text)
            }
            
        except Exception as e:
            logger.error(f"PaddleOCR extraction failed: {e}")
            raise

    async def extract_text_tesseract(self, image_path: Path, language: str) -> Dict[str, Any]:
        """Fallback OCR using Tesseract"""
        try:
            # Language mapping for Tesseract
            tesseract_langs = {
                'ms': 'msa',  # Malay
                'en': 'eng',  # English
                'zh': 'chi_sim',  # Simplified Chinese
                'ta': 'tam',  # Tamil
                'ar': 'ara'   # Arabic
            }
            
            tesseract_lang = tesseract_langs.get(language, 'eng')
            
            # Load and preprocess image
            processed_image = self.preprocess_image(image_path)
            
            # Run Tesseract
            loop = asyncio.get_event_loop()
            text = await loop.run_in_executor(
                self.executor,
                lambda: pytesseract.image_to_string(
                    processed_image, 
                    lang=tesseract_lang, 
                    config=self.tesseract_config
                )
            )
            
            # Get confidence data
            data = await loop.run_in_executor(
                self.executor,
                lambda: pytesseract.image_to_data(
                    processed_image, 
                    lang=tesseract_lang, 
                    output_type=pytesseract.Output.DICT
                )
            )
            
            # Process confidence scores
            confidences = [int(conf) for conf in data['conf'] if int(conf) > 0]
            avg_confidence = np.mean(confidences) / 100.0 if confidences else 0.0
            
            return {
                'text': text.strip(),
                'confidence': float(avg_confidence),
                'bounding_boxes': [],  # Tesseract bounding boxes would require more processing
                'word_count': len(text.split())
            }
            
        except Exception as e:
            logger.error(f"Tesseract extraction failed: {e}")
            raise

    async def process_image(self, file_path: Path, language: str = "ms") -> Dict[str, Any]:
        """Main OCR processing method with Malaysian optimization"""
        if not self.is_initialized:
            await self.initialize()
        
        start_time = time.time()
        
        try:
            logger.info(f"Processing image: {file_path} with language: {language}")
            
            # Primary OCR with PaddleOCR
            try:
                primary_result = await self.extract_text_paddleocr(file_path, language)
                ocr_engine = "paddleocr"
            except Exception as e:
                logger.warning(f"PaddleOCR failed, falling back to Tesseract: {e}")
                primary_result = await self.extract_text_tesseract(file_path, language)
                ocr_engine = "tesseract_fallback"
            
            # Malaysian document processing
            raw_text = primary_result['text']
            document_type = self.malaysian_processor.detect_document_type(raw_text)
            enhanced_text = self.malaysian_processor.enhance_malaysian_text(raw_text, document_type)
            
            # Calculate processing time
            processing_time = time.time() - start_time
            
            # Update statistics
            self.processing_stats['total_processed'] += 1
            self.processing_stats['avg_processing_time'] = (
                (self.processing_stats['avg_processing_time'] * (self.processing_stats['total_processed'] - 1) + processing_time) 
                / self.processing_stats['total_processed']
            )
            self.processing_stats['accuracy_scores'].append(primary_result['confidence'])
            
            # Prepare final result
            result = {
                'text': enhanced_text,
                'confidence': primary_result['confidence'],
                'language_detected': language,
                'bounding_boxes': primary_result['bounding_boxes'],
                'document_type': document_type,
                'processing_engine': ocr_engine,
                'word_count': primary_result['word_count'],
                'processing_time': processing_time,
                'malaysian_optimized': True
            }
            
            logger.info(f"OCR completed in {processing_time:.2f}s with {primary_result['confidence']:.2f} confidence")
            return result
            
        except Exception as e:
            logger.error(f"OCR processing failed completely: {e}")
            # Return error result
            return {
                'text': '',
                'confidence': 0.0,
                'language_detected': language,
                'bounding_boxes': [],
                'document_type': 'error',
                'processing_engine': 'failed',
                'word_count': 0,
                'processing_time': time.time() - start_time,
                'malaysian_optimized': False,
                'error': str(e)
            }

    async def get_processing_stats(self) -> Dict[str, Any]:
        """Get OCR processing statistics"""
        avg_accuracy = np.mean(self.processing_stats['accuracy_scores']) if self.processing_stats['accuracy_scores'] else 0.0
        
        return {
            'total_processed': self.processing_stats['total_processed'],
            'average_processing_time': round(self.processing_stats['avg_processing_time'], 2),
            'average_accuracy': round(avg_accuracy, 3),
            'engines_available': list(self.paddle_ocr_engines.keys()),
            'service_status': await self.health_check()
        }

    def __del__(self):
        """Cleanup resources"""
        if hasattr(self, 'executor'):
            self.executor.shutdown(wait=False)
