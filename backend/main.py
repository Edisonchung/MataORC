"""
MataOCR FastAPI Backend
See Better, Read Smarter - AI-powered OCR for Southeast Asia
"""

from fastapi import FastAPI, File, UploadFile, HTTPException, BackgroundTasks, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
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

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Pydantic models for API
class HealthResponse(BaseModel):
    status: str
    timestamp: str
    version: str
    services: Dict[str, str]

class OCRRequest(BaseModel):
    languages: List[str] = ["en", "ms"]  # Default: English and Bahasa Malaysia
    confidence_threshold: float = 0.8
    detect_tables: bool = False
    detect_stamps: bool = False

class OCRResult(BaseModel):
    success: bool
    text: str
    confidence: float
    language_detected: str
    processing_time: float
    bounding_boxes: List[Dict[str, Any]]
    metadata: Dict[str, Any]

class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None
    languages: List[str] = ["en", "ms"]
    project_type: str = "general"

class Project(BaseModel):
    id: str
    name: str
    description: Optional[str]
    languages: List[str]
    project_type: str
    created_at: str
    image_count: int = 0

# Initialize FastAPI app
app = FastAPI(
    title="MataOCR API",
    description="See Better, Read Smarter - AI-powered OCR for Southeast Asia",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_tags=[
        {"name": "health", "description": "Health check and system status"},
        {"name": "projects", "description": "Project management operations"},
        {"name": "ocr", "description": "OCR processing and results"},
        {"name": "upload", "description": "File upload and processing"},
    ]
)

# CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Local development
        "https://mata-orc.vercel.app",  # Current deployment
        "https://mataocr.com",  # Production domain
        "https://www.mataocr.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage (will be replaced with PostgreSQL)
projects_db = {}
upload_dir = Path("uploads")
upload_dir.mkdir(exist_ok=True)

# Supported languages for Malaysian market
SUPPORTED_LANGUAGES = {
    "en": "English",
    "ms": "Bahasa Malaysia", 
    "zh": "Chinese",
    "ta": "Tamil",
    "ar": "Arabic/Jawi"
}

# Maximum file size (10MB)
MAX_FILE_SIZE = 10 * 1024 * 1024

@app.get("/", tags=["health"])
async def root():
    """Root endpoint with API information"""
    return {
        "message": "MataOCR API - See Better, Read Smarter",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health"
    }

@app.get("/health", response_model=HealthResponse, tags=["health"])
async def health_check():
    """Comprehensive health check for all services"""
    
    # Check OCR service availability (placeholder)
    ocr_status = "ready"  # Will be "operational" when PaddleOCR is integrated
    
    # Check database connectivity (placeholder)
    db_status = "mock"  # Will be "connected" when PostgreSQL is integrated
    
    # Check file storage (placeholder)
    storage_status = "local"  # Will be "cloud" when MinIO/S3 is integrated
    
    return HealthResponse(
        status="healthy",
        timestamp=datetime.now().isoformat(),
        version="1.0.0",
        services={
            "ocr_engine": ocr_status,
            "database": db_status,
            "file_storage": storage_status,
            "api": "operational"
        }
    )

@app.get("/languages", tags=["ocr"])
async def get_supported_languages():
    """Get list of supported languages for Malaysian market"""
    return {
        "supported_languages": SUPPORTED_LANGUAGES,
        "default": ["en", "ms"],
        "recommended_for_malaysia": ["ms", "en", "zh", "ta"]
    }

@app.post("/projects", response_model=Project, tags=["projects"])
async def create_project(project: ProjectCreate):
    """Create a new OCR project"""
    project_id = str(uuid.uuid4())
    
    # Validate languages
    invalid_langs = [lang for lang in project.languages if lang not in SUPPORTED_LANGUAGES]
    if invalid_langs:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported languages: {invalid_langs}. Supported: {list(SUPPORTED_LANGUAGES.keys())}"
        )
    
    new_project = Project(
        id=project_id,
        name=project.name,
        description=project.description,
        languages=project.languages,
        project_type=project.project_type,
        created_at=datetime.now().isoformat(),
        image_count=0
    )
    
    projects_db[project_id] = new_project
    logger.info(f"Created project: {project.name} ({project_id})")
    
    return new_project

@app.get("/projects", response_model=List[Project], tags=["projects"])
async def list_projects():
    """List all OCR projects"""
    return list(projects_db.values())

@app.get("/projects/{project_id}", response_model=Project, tags=["projects"])
async def get_project(project_id: str):
    """Get specific project details"""
    if project_id not in projects_db:
        raise HTTPException(status_code=404, detail="Project not found")
    
    return projects_db[project_id]

@app.post("/upload", tags=["upload"])
async def upload_file(
    file: UploadFile = File(...),
    project_id: Optional[str] = None
):
    """Upload image file for OCR processing"""
    
    # Validate file type
    allowed_types = ["image/jpeg", "image/png", "image/jpg", "application/pdf"]
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail=f"File type {file.content_type} not supported. Allowed: {allowed_types}"
        )
    
    # Check file size
    file_size = 0
    file_content = await file.read()
    file_size = len(file_content)
    
    if file_size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail=f"File too large. Maximum size: {MAX_FILE_SIZE/1024/1024:.1f}MB"
        )
    
    # Generate unique filename
    file_extension = Path(file.filename).suffix
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = upload_dir / unique_filename
    
    # Save file
    async with aiofiles.open(file_path, 'wb') as f:
        await f.write(file_content)
    
    # Update project image count if project specified
    if project_id and project_id in projects_db:
        projects_db[project_id].image_count += 1
    
    logger.info(f"Uploaded file: {file.filename} -> {unique_filename}")
    
    return {
        "success": True,
        "filename": unique_filename,
        "original_filename": file.filename,
        "file_size": file_size,
        "content_type": file.content_type,
        "upload_time": datetime.now().isoformat()
    }

@app.post("/ocr/process", response_model=OCRResult, tags=["ocr"])
async def process_ocr(
    file: UploadFile = File(...),
    languages: str = "en,ms",  # Comma-separated language codes
    confidence_threshold: float = 0.8,
    detect_tables: bool = False
):
    """
    Process uploaded image with OCR
    
    Currently returns mock data - will be replaced with PaddleOCR integration
    """
    
    start_time = datetime.now()
    
    # Parse languages
    lang_list = [lang.strip() for lang in languages.split(",")]
    
    # Validate languages
    invalid_langs = [lang for lang in lang_list if lang not in SUPPORTED_LANGUAGES]
    if invalid_langs:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported languages: {invalid_langs}"
        )
    
    # Save uploaded file temporarily
    file_content = await file.read()
    temp_filename = f"temp_{uuid.uuid4()}{Path(file.filename).suffix}"
    temp_path = upload_dir / temp_filename
    
    async with aiofiles.open(temp_path, 'wb') as f:
        await f.write(file_content)
    
    try:
        # TODO: Replace with actual PaddleOCR processing
        # For now, return mock data to enable frontend integration
        
        # Simulate processing time
        await asyncio.sleep(1)
        
        # Mock OCR result for Malaysian document
        mock_text = """
KERAJAAN MALAYSIA
MyKad No: 123456-78-9012
Nama: Ahmad bin Abdullah
Alamat: No. 123, Jalan Bunga Raya
        Taman Sri Malaysia
        50000 Kuala Lumpur
Telefon: 03-12345678
"""
        
        processing_time = (datetime.now() - start_time).total_seconds()
        
        result = OCRResult(
            success=True,
            text=mock_text.strip(),
            confidence=0.92,
            language_detected="ms",  # Bahasa Malaysia detected
            processing_time=processing_time,
            bounding_boxes=[
                {
                    "text": "KERAJAAN MALAYSIA",
                    "bbox": [10, 10, 200, 30],
                    "confidence": 0.95
                },
                {
                    "text": "MyKad No: 123456-78-9012",
                    "bbox": [10, 40, 250, 60],
                    "confidence": 0.91
                },
                {
                    "text": "Nama: Ahmad bin Abdullah",
                    "bbox": [10, 70, 300, 90],
                    "confidence": 0.89
                }
            ],
            metadata={
                "file_size": len(file_content),
                "file_type": file.content_type,
                "languages_requested": lang_list,
                "processing_engine": "mock_paddleocr",
                "document_type": "malaysian_id",
                "tables_detected": 0 if not detect_tables else 1
            }
        )
        
        logger.info(f"OCR processed: {file.filename} in {processing_time:.2f}s")
        return result
        
    except Exception as e:
        logger.error(f"OCR processing failed: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"OCR processing failed: {str(e)}"
        )
    
    finally:
        # Cleanup temporary file
        if temp_path.exists():
            temp_path.unlink()

@app.get("/stats", tags=["health"])
async def get_stats():
    """Get API usage statistics"""
    return {
        "total_projects": len(projects_db),
        "total_uploads": len(list(upload_dir.glob("*"))),
        "supported_languages": len(SUPPORTED_LANGUAGES),
        "api_version": "1.0.0",
        "uptime": "operational"
    }

# Error handlers
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={"error": "Endpoint not found", "detail": str(exc)}
    )

@app.exception_handler(500)
async def internal_error_handler(request, exc):
    logger.error(f"Internal server error: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error", "detail": "Please try again later"}
    )

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
