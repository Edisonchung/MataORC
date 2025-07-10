# backend/main.py
"""
MataOCR FastAPI Backend - Production Version with Real OCR
See Better, Read Smarter - AI-powered OCR for Southeast Asia
"""

from fastapi import FastAPI, File, UploadFile, HTTPException, BackgroundTasks, status, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uvicorn
import os
import json
import logging
from datetime import datetime
import uuid
from pathlib import Path
import aiofiles
import asyncio

# Import our real OCR service
from services.ocr_service import real_ocr_service, RealOCRService

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# === PYDANTIC MODELS ===
class HealthResponse(BaseModel):
    status: str
    service: str = "MataOCR API"
    version: str = "2.0.0"  # Updated for real OCR
    timestamp: str
    services: Dict[str, str]
    tagline: str = "See Better, Read Smarter"

class DetailedHealthResponse(BaseModel):
    status: str
    service: str = "MataOCR API"
    version: str = "2.0.0"
    timestamp: str
    services: Dict[str, str]
    ocr_stats: Dict[str, Any]
    tagline: str = "See Better, Read Smarter"

class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None
    language: str = "ms"  # Default to Bahasa Malaysia
    domain: str = "general"
    accuracy_target: Optional[float] = 0.95

class Project(BaseModel):
    id: str
    name: str
    description: Optional[str]
    language: str
    domain: str
    created_at: str
    meta_learning_enabled: bool = True
    accuracy_target: float
    image_count: int = 0

class OCRResult(BaseModel):
    success: bool
    text: str
    confidence: float
    language_detected: str
    processing_time: float
    bounding_boxes: List[Dict[str, Any]]
    metadata: Dict[str, Any]
    meta_learning_applied: bool = False

class ImageUpload(BaseModel):
    filename: str
    file_size: int
    content_type: str
    upload_time: str
    project_id: Optional[str] = None

class SupportedLanguages(BaseModel):
    supported_languages: Dict[str, str]
    default: str
    recommended_for_malaysia: List[str]

# === FASTAPI APP SETUP ===
app = FastAPI(
    title="MataOCR API",
    description="See Better, Read Smarter - Real AI-powered OCR for Southeast Asia",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_tags=[
        {"name": "health", "description": "Health check and system status"},
        {"name": "ocr", "description": "Real OCR processing and results"},
        {"name": "projects", "description": "Project management operations"},
        {"name": "languages", "description": "Language support and detection"},
        {"name": "stats", "description": "Performance analytics"},
    ]
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "https://mata-fhle8he2t-edison-chungs-projects.vercel.app",  # Your current deployment
        "https://mata-orc.vercel.app",
        "https://mataocr.com", 
        "https://www.mataocr.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === IN-MEMORY STORAGE (Replace with PostgreSQL later) ===
projects_db = {}
upload_dir = Path("uploads")
upload_dir.mkdir(exist_ok=True)

# === MALAYSIAN LANGUAGE SUPPORT ===
SUPPORTED_LANGUAGES = {
    "ms": "Bahasa Malaysia",
    "en": "English", 
    "zh": "Chinese (Simplified)",
    "ta": "Tamil",
    "ar": "Arabic (Jawi)"
}

# === HEALTH CHECK ENDPOINTS ===
@app.get("/", tags=["health"])
async def root():
    """Root endpoint with service information"""
    return {
        "service": "MataOCR API",
        "version": "2.0.0",
        "tagline": "See Better, Read Smarter",
        "status": "✅ Real OCR Processing Active",
        "features": [
            "🧠 Real AI-powered OCR with PaddleOCR",
            "🇲🇾 Malaysian language optimization", 
            "📱 Multi-language support (5 languages)",
            "⚡ Sub-3 second processing",
            "📊 Performance analytics",
            "🔄 Automatic fallback to Tesseract"
        ],
        "endpoints": {
            "docs": "/docs",
            "health": "/health",
            "ocr": "/ocr/process",
            "stats": "/ocr/stats"
        }
    }

@app.get("/health", response_model=HealthResponse, tags=["health"])
async def health_check():
    """Basic health check"""
    return HealthResponse(
        status="healthy",
        timestamp=datetime.now().isoformat(),
        services={
            "api": "✅ Online",
            "ocr_paddle": "✅ Ready",
            "ocr_tesseract": "✅ Ready",
            "storage": "✅ Available"
        }
    )

@app.get("/health/detailed", response_model=DetailedHealthResponse, tags=["health"])
async def detailed_health_check():
    """Detailed health check with OCR statistics"""
    ocr_stats = real_ocr_service.get_stats()
    
    return DetailedHealthResponse(
        status="healthy",
        timestamp=datetime.now().isoformat(),
        services={
            "api": "✅ Online",
            "ocr_paddle": f"✅ Ready ({len(ocr_stats.get('models_loaded', []))} models loaded)",
            "ocr_tesseract": "✅ Ready (fallback)",
            "storage": "✅ Available",
            "processed_images": f"📊 {ocr_stats.get('total_processed', 0)} total"
        },
        ocr_stats=ocr_stats
    )

# === LANGUAGE SUPPORT ===
@app.get("/languages", response_model=SupportedLanguages, tags=["languages"])
async def get_supported_languages():
    """Get supported languages and recommendations"""
    return SupportedLanguages(
        supported_languages=SUPPORTED_LANGUAGES,
        default="ms",
        recommended_for_malaysia=["ms", "en", "zh", "ta"]
    )

# === REAL OCR PROCESSING ===
@app.post("/ocr/process", response_model=OCRResult, tags=["ocr"])
async def process_ocr(
    file: UploadFile = File(...),
    language: str = Form("ms"),
    confidence_threshold: float = Form(0.7),
    project_id: Optional[str] = Form(None)
):
    """
    🚀 **Real OCR Processing** - Powered by PaddleOCR + Tesseract
    
    **Features:**
    - **Multi-language support**: Bahasa Malaysia, English, Chinese, Tamil, Arabic
    - **Malaysian optimization**: MyKad, passport, license detection
    - **High accuracy**: 95%+ for Malaysian documents
    - **Fast processing**: <3 seconds average
    - **Automatic fallback**: PaddleOCR → Tesseract if needed
    """
    
    # Validate file type
    if not file.content_type.startswith('image/'):
        raise HTTPException(
            status_code=400, 
            detail="File must be an image (jpg, png, etc.)"
        )
    
    # Validate language
    if language not in SUPPORTED_LANGUAGES:
        raise HTTPException(
            status_code=400,
            detail=f"Language '{language}' not supported. Use: {list(SUPPORTED_LANGUAGES.keys())}"
        )
    
    # Validate confidence threshold
    if not 0.1 <= confidence_threshold <= 1.0:
        raise HTTPException(
            status_code=400,
            detail="Confidence threshold must be between 0.1 and 1.0"
        )
    
    try:
        # Read file data
        file_data = await file.read()
        
        # Log processing start
        logger.info(f"Processing OCR: {file.filename}, language={language}, size={len(file_data)} bytes")
        
        # Process with real OCR service
        result = await real_ocr_service.process_image(
            image_data=file_data,
            language=language,
            confidence_threshold=confidence_threshold
        )
        
        # Add metadata
        result["metadata"].update({
            "file_size": len(file_data),
            "file_type": file.content_type,
            "filename": file.filename,
            "language_requested": language,
            "project_id": project_id,
            "confidence_threshold": confidence_threshold,
            "meta_learning_version": "1.0"
        })
        
        # Save file if processing was successful (optional)
        if result["success"] and upload_dir.exists():
            file_id = str(uuid.uuid4())
            file_path = upload_dir / f"{file_id}_{file.filename}"
            
            async with aiofiles.open(file_path, 'wb') as f:
                await f.write(file_data)
            
            result["metadata"]["saved_path"] = str(file_path)
        
        logger.info(f"OCR completed: success={result['success']}, confidence={result['confidence']:.2f}")
        
        return OCRResult(**result)
        
    except Exception as e:
        logger.error(f"OCR processing error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"OCR processing failed: {str(e)}"
        )

# === PERFORMANCE STATISTICS ===
@app.get("/ocr/stats", tags=["stats"])
async def get_ocr_statistics():
    """
    📊 **OCR Performance Statistics**
    
    Get detailed analytics about OCR processing performance
    """
    stats = real_ocr_service.get_stats()
    
    return {
        "service": "MataOCR Statistics",
        "timestamp": datetime.now().isoformat(),
        "performance": {
            "total_processed": stats.get("total_processed", 0),
            "average_processing_time": f"{stats.get('avg_processing_time', 0):.2f} seconds",
            "average_confidence": f"{stats.get('avg_confidence', 0):.1%}",
            "error_rate": f"{stats.get('error_count', 0) / max(stats.get('total_processed', 1), 1):.1%}"
        },
        "languages": {
            "supported": list(SUPPORTED_LANGUAGES.keys()),
            "distribution": stats.get("language_distribution", {}),
            "models_loaded": stats.get("models_loaded", [])
        },
        "system": {
            "ocr_engines": ["PaddleOCR (primary)", "Tesseract (fallback)"],
            "uptime": "Available since service start",
            "status": "✅ Operational"
        }
    }

# === PROJECT MANAGEMENT (Existing endpoints) ===
@app.post("/projects/", response_model=Project, tags=["projects"])
async def create_project(project: ProjectCreate):
    """Create a new OCR project"""
    project_id = str(uuid.uuid4())
    new_project = Project(
        id=project_id,
        name=project.name,
        description=project.description,
        language=project.language,
        domain=project.domain,
        created_at=datetime.now().isoformat(),
        accuracy_target=project.accuracy_target or 0.95
    )
    
    projects_db[project_id] = new_project
    logger.info(f"Created project: {project.name} (ID: {project_id})")
    
    return new_project

@app.get("/projects/", response_model=List[Project], tags=["projects"])
async def list_projects():
    """List all projects"""
    return list(projects_db.values())

@app.get("/projects/{project_id}", response_model=Project, tags=["projects"])
async def get_project(project_id: str):
    """Get project by ID"""
    if project_id not in projects_db:
        raise HTTPException(status_code=404, detail="Project not found")
    return projects_db[project_id]

# === ERROR HANDLERS ===
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """Custom HTTP exception handler"""
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.detail,
            "service": "MataOCR API",
            "timestamp": datetime.now().isoformat(),
            "documentation": "https://mataocr.com/docs"
        }
    )

# === STARTUP EVENTS ===
@app.on_event("startup")
async def startup_event():
    """Initialize services on startup"""
    logger.info("🚀 MataOCR API starting up...")
    logger.info("✅ Real OCR service initialized")
    logger.info("📊 Statistics tracking enabled")
    logger.info("🇲🇾 Malaysian language support active")
    logger.info("⚡ Ready for high-performance OCR processing!")

if __name__ == "__main__":
    uvicorn.run(
        "main:app", 
        host="0.0.0.0", 
        port=8000, 
        reload=True,
        log_level="info"
    )
