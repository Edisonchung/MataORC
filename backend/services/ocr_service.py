# backend/services/ocr_service.py
"""
MataOCR Working OCR Service - NumPy 1.x Compatible
See Better, Read Smarter - AI-powered OCR for Southeast Asia
"""

import cv2
import numpy as np
from PIL import Image
import pytesseract
import asyncio
import logging
import time
from typing import List, Dict, Any, Optional, Tuple
from concurrent.futures import ThreadPoolExecutor
import re
from pathlib import Path

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class WorkingOCRService:
    """
    Production OCR service with NumPy 1.x compatibility
    Primary: PaddleOCR (if available)
    Fallback: Tesseract (always available)
    """
    
    def __init__(self):
        self.executor = ThreadPoolExecutor(max_workers=4)
        self.paddle_available = False
        self.paddle_models = {}
        self.stats = {
            "total_processed": 0,
            "avg_processing_time": 0,
            "avg_confidence": 0,
            "language_distribution": {},
            "error_count": 0,
            "engine_usage": {"tesseract": 0, "paddleocr": 0}
        }
        
        # Malaysian language mappings
        self.language_codes = {
            'ms': 'eng',    # Bahasa Malaysia (use English model + post-processing)
            'en': 'eng',    # English
            'zh': 'chi_sim',# Chinese Simplified
            'ta': 'tam',    # Tamil
            'ar': 'ara'     # Arabic (for Jawi script)
        }
        
        # PaddleOCR language mappings
        self.paddle_language_codes = {
            'ms': 'en',     # Bahasa Malaysia
            'en': 'en',     # English
            'zh': 'ch',     # Chinese
            'ta': 'ta',     # Tamil
            'ar': 'ar'      # Arabic
        }
        
        # Malaysian document patterns
        self.malaysian_patterns = {
            'mykad': r'\d{6}-\d{2}-\d{4}',  # MyKad IC number
            'passport': r'[A-Z]\d{8}',       # Malaysian passport
            'phone': r'0\d{1,2}-\d{7,8}',   # Malaysian phone
            'postcode': r'\d{5}',           # Malaysian postcode
        }
        
        # Common Malaysian text corrections
        self.malaysian_corrections = {
            'ldentiti': 'Identiti',
            'Warganegera': 'Warganegara',
            'Wargenegara': 'Warganegara',
            'Lelald': 'Lelaki',
            'Perempuen': 'Perempuan',
            'Alemat': 'Alamat',
            'Terlkh': 'Tarikh',
            'Lahie': 'Lahir',
            'Mykad': 'MyKad',
            'ldentity': 'Identity',
            'Cerd': 'Card',
            'Kad': 'Kad'
        }
        
        # Initialize services
        self._check_paddle_availability()
        self._check_tesseract()

    def _check_paddle_availability(self):
        """Check if PaddleOCR is available"""
        try:
            import paddleocr
            self.paddle_available = True
            logger.info("✅ PaddleOCR available - will be used as primary engine")
        except ImportError as e:
            self.paddle_available = False
            logger.warning(f"⚠️ PaddleOCR not available: {e}")
            logger.info("🔄 Using Tesseract as primary engine")

    def _check_tesseract(self):
        """Check if Tesseract is available"""
        try:
            version = pytesseract.get_tesseract_version()
            available_langs = pytesseract.get_languages(config='')
            logger.info(f"✅ Tesseract {version} available")
            logger.info(f"📝 Available Tesseract languages: {', '.join(available_langs)}")
        except Exception as e:
            logger.error(f"❌ Tesseract not available: {e}")
            if not self.paddle_available:
                raise RuntimeError("Neither PaddleOCR nor Tesseract is available")

    async def initialize_paddle_model(self, language: str):
        """Initialize PaddleOCR model for specific language (if available)"""
        if not self.paddle_available:
            return None
            
        if language not in self.paddle_models:
            try:
                from paddleocr import PaddleOCR
                
                paddle_lang = self.paddle_language_codes.get(language, 'en')
                
                # Run in thread pool to avoid blocking
                loop = asyncio.get_event_loop()
                paddle_ocr = await loop.run_in_executor(
                    self.executor,
                    lambda: PaddleOCR(
                        use_angle_cls=True,
                        lang=paddle_lang,
                        use_gpu=False,  # Always use CPU for compatibility
                        show_log=False
                    )
                )
                
                self.paddle_models[language] = paddle_ocr
                logger.info(f"✅ PaddleOCR model loaded for: {language}")
                return paddle_ocr
                
            except Exception as e:
                logger.error(f"❌ Failed to load PaddleOCR for {language}: {e}")
                return None
                
        return self.paddle_models.get(language)

    def preprocess_image(self, image: np.ndarray) -> np.ndarray:
        """Enhanced image preprocessing for Malaysian documents"""
        try:
            # Convert to grayscale if needed
            if len(image.shape) == 3:
                gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            else:
                gray = image.copy()
            
            # Noise reduction
            denoised = cv2.medianBlur(gray, 3)
            
            # Contrast enhancement using CLAHE
            clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
            enhanced = clahe.apply(denoised)
            
            # Adaptive thresholding for better text extraction
            binary = cv2.adaptiveThreshold(
                enhanced, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
                cv2.THRESH_BINARY, 11, 2
            )
            
            return binary
            
        except Exception as e:
            logger.error(f"Image preprocessing failed: {e}")
            return image

    def detect_document_type(self, text: str) -> str:
        """Detect Malaysian document type from extracted text"""
        text_lower = text.lower()
        
        if any(keyword in text_lower for keyword in ['mykad', 'kad pengenalan', 'identity', 'identiti']):
            return 'mykad'
        elif any(keyword in text_lower for keyword in ['passport', 'pasport']):
            return 'passport'
        elif any(keyword in text_lower for keyword in ['license', 'lesen', 'driving']):
            return 'license'
        elif any(keyword in text_lower for keyword in ['surat', 'letter', 'memorandum']):
            return 'official_document'
        else:
            return 'general'

    def apply_malaysian_corrections(self, text: str, document_type: str) -> str:
        """Apply Malaysian-specific text corrections"""
        corrected_text = text
        
        # Apply general corrections
        for wrong, correct in self.malaysian_corrections.items():
            corrected_text = re.sub(wrong, correct, corrected_text, flags=re.IGNORECASE)
        
        # Format Malaysian IC numbers
        ic_pattern = r'(\d{6})\s*-?\s*(\d{2})\s*-?\s*(\d{4})'
        corrected_text = re.sub(ic_pattern, r'\1-\2-\3', corrected_text)
        
        # Format Malaysian phone numbers
        phone_pattern = r'0(\d{1,2})\s*-?\s*(\d{7,8})'
        corrected_text = re.sub(phone_pattern, r'0\1-\2', corrected_text)
        
        # Clean up common OCR artifacts
        corrected_text = re.sub(r'\s+', ' ', corrected_text)  # Multiple spaces
        corrected_text = re.sub(r'[|]', 'I', corrected_text)  # Pipe to I
        corrected_text = corrected_text.strip()
        
        return corrected_text

    async def process_with_paddle(self, image: np.ndarray, language: str) -> Optional[List]:
        """Process image with PaddleOCR (if available)"""
        if not self.paddle_available:
            return None
            
        try:
            paddle_ocr = await self.initialize_paddle_model(language)
            if not paddle_ocr:
                return None
            
            # Run OCR in thread pool
            loop = asyncio.get_event_loop()
            results = await loop.run_in_executor(
                self.executor,
                lambda: paddle_ocr.ocr(image, cls=True)
            )
            
            self.stats["engine_usage"]["paddleocr"] += 1
            return results[0] if results and results[0] else []
            
        except Exception as e:
            logger.error(f"PaddleOCR processing failed: {e}")
            return None

    def process_with_tesseract(self, image: np.ndarray, language: str) -> List:
        """Process image with Tesseract OCR"""
        try:
            # Convert to PIL Image
            pil_image = Image.fromarray(image)
            
            # Get Tesseract language code
            tesseract_lang = self.language_codes.get(language, 'eng')
            
            # Check if language is available
            try:
                available_langs = pytesseract.get_languages(config='')
                if tesseract_lang not in available_langs:
                    logger.warning(f"Language {tesseract_lang} not available, using 'eng'")
                    tesseract_lang = 'eng'
            except:
                tesseract_lang = 'eng'  # Fallback to English
            
            # Custom Tesseract config for better accuracy
            custom_config = f'--psm 6 -l {tesseract_lang}'
            
            # Extract text with bounding boxes and confidence
            data = pytesseract.image_to_data(
                pil_image, 
                output_type=pytesseract.Output.DICT,
                config=custom_config
            )
            
            results = []
            for i in range(len(data['text'])):
                confidence = int(data['conf'][i])
                text = data['text'][i].strip()
                
                if confidence > 30 and text:  # Confidence threshold and non-empty text
                    x = data['left'][i]
                    y = data['top'][i]
                    w = data['width'][i]
                    h = data['height'][i]
                    
                    # Format as PaddleOCR-style output for consistency
                    results.append([
                        [[x, y], [x + w, y], [x + w, y + h], [x, y + h]],
                        (text, confidence / 100.0)
                    ])
            
            self.stats["engine_usage"]["tesseract"] += 1
            return results
            
        except Exception as e:
            logger.error(f"Tesseract processing failed: {e}")
            return []

    async def process_image(
        self, 
        image_data: bytes, 
        language: str = 'ms',
        confidence_threshold: float = 0.7
    ) -> Dict[str, Any]:
        """
        Main OCR processing function
        """
        start_time = time.time()
        
        try:
            # Convert bytes to numpy array
            nparr = np.frombuffer(image_data, np.uint8)
            image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            
            if image is None:
                raise ValueError("Could not decode image")
            
            # Preprocess image
            processed_image = self.preprocess_image(image)
            
            # Try PaddleOCR first (if available), then Tesseract
            results = None
            processing_engine = "none"
            
            if self.paddle_available:
                logger.info("🚀 Attempting PaddleOCR processing...")
                results = await self.process_with_paddle(processed_image, language)
                if results:
                    processing_engine = "paddleocr"
                    logger.info("✅ PaddleOCR processing successful")
            
            if not results:
                logger.info("🔄 Using Tesseract processing...")
                results = self.process_with_tesseract(processed_image, language)
                processing_engine = "tesseract"
                if results:
                    logger.info("✅ Tesseract processing successful")
            
            if not results:
                raise ValueError("No OCR engine produced results")
            
            # Extract text and bounding boxes
            extracted_text = ""
            bounding_boxes = []
            total_confidence = 0
            valid_detections = 0
            
            for detection in results:
                if len(detection) >= 2:
                    bbox = detection[0]
                    text_info = detection[1]
                    
                    if isinstance(text_info, (list, tuple)) and len(text_info) >= 2:
                        text = text_info[0]
                        confidence = float(text_info[1])
                    else:
                        text = str(text_info)
                        confidence = 0.8  # Default confidence
                    
                    if confidence >= confidence_threshold and text.strip():
                        extracted_text += text + " "
                        bounding_boxes.append({
                            "text": text,
                            "bbox": bbox,
                            "confidence": confidence
                        })
                        total_confidence += confidence
                        valid_detections += 1
            
            # Clean up extracted text
            extracted_text = extracted_text.strip()
            
            # Detect document type
            document_type = self.detect_document_type(extracted_text)
            
            # Apply Malaysian corrections
            corrected_text = self.apply_malaysian_corrections(extracted_text, document_type)
            
            # Calculate average confidence
            avg_confidence = total_confidence / valid_detections if valid_detections > 0 else 0
            
            # Processing time
            processing_time = time.time() - start_time
            
            # Update statistics
            self.update_stats(processing_time, avg_confidence, language)
            
            # Prepare result
            result = {
                "success": True,
                "text": corrected_text,
                "confidence": avg_confidence,
                "language_detected": language,
                "processing_time": processing_time,
                "bounding_boxes": bounding_boxes,
                "metadata": {
                    "processing_engine": processing_engine,
                    "document_type": document_type,
                    "total_detections": len(results),
                    "valid_detections": valid_detections,
                    "confidence_threshold": confidence_threshold,
                    "image_size": image.shape if image is not None else None,
                    "paddle_available": self.paddle_available
                },
                "meta_learning_applied": False  # Future feature
            }
            
            logger.info(f"🎉 OCR completed in {processing_time:.2f}s with {avg_confidence:.2f} confidence using {processing_engine}")
            return result
            
        except Exception as e:
            self.stats["error_count"] += 1
            logger.error(f"❌ OCR processing failed: {e}")
            
            return {
                "success": False,
                "text": "",
                "confidence": 0.0,
                "language_detected": language,
                "processing_time": time.time() - start_time,
                "bounding_boxes": [],
                "metadata": {
                    "error": str(e),
                    "processing_engine": "none",
                    "document_type": "unknown",
                    "paddle_available": self.paddle_available
                },
                "meta_learning_applied": False
            }

    def update_stats(self, processing_time: float, confidence: float, language: str):
        """Update processing statistics"""
        self.stats["total_processed"] += 1
        
        # Update average processing time
        total = self.stats["total_processed"]
        current_avg = self.stats["avg_processing_time"]
        self.stats["avg_processing_time"] = ((current_avg * (total - 1)) + processing_time) / total
        
        # Update average confidence
        current_confidence_avg = self.stats["avg_confidence"]
        self.stats["avg_confidence"] = ((current_confidence_avg * (total - 1)) + confidence) / total
        
        # Update language distribution
        if language not in self.stats["language_distribution"]:
            self.stats["language_distribution"][language] = 0
        self.stats["language_distribution"][language] += 1

    def get_stats(self) -> Dict[str, Any]:
        """Get processing statistics"""
        return {
            **self.stats,
            "paddle_available": self.paddle_available,
            "supported_languages": list(self.language_codes.keys()),
            "available_engines": (["paddleocr"] if self.paddle_available else []) + ["tesseract"]
        }

# Global OCR service instance
working_ocr_service = WorkingOCRService()
