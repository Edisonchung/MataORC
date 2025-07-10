"""
MataOCR FastAPI Backend - Working Version
Combines your advanced architecture with immediate functionality
See Better, Read Smarter - AI-powered OCR for Southeast Asia
"""

from fastapi import FastAPI, File, UploadFile, HTTPException, BackgroundTasks, status
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

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# === PYDANTIC MODELS ===
class HealthResponse(BaseModel):
    status: str
    service: str = "MataOCR API"
    version: str = "1.0.0"
    timestamp: str
    services: Dict[str, str]
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

# === FASTAPI APP SETUP ===
app = FastAPI(
    title="MataOCR API",
    description="See Better, Read Smarter - AI-powered OCR for Southeast Asia",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_tags=[
        {"name": "health", "description": "Health check and system status"},
        {"name": "projects", "description": "Project management operations"},
        {"name": "upload", "description": "File upload and processing"},
        {"name": "ocr", "description": "OCR processing and results"},
        {"name": "meta-learning", "description": "Future: AI learning operations"},
        {"name": "synthetic", "description": "Future: Synthetic data generation"},
    ]
)

# CORS middleware (using your existing CORS origins)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "https://mata-orc.vercel.app",  # Your current deployment
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
    "zh": "Chinese",
    "ta": "Tamil",
    "ar": "Arabic/Jawi"
}

MALAYSIAN_DOMAINS = {
    "government": "Government Documents",
    "business": "Business Documents", 
    "education": "Educational Content",
    "medical": "Medical Records",
    "general": "General Documents"
}

# File upload constraints
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg", "application/pdf"]

# === MOCK SERVICES (Replace with real implementations) ===
class MockOCRService:
    """Mock OCR service that returns Malaysian document samples"""
    
    def __init__(self):
        self.is_initialized = False
    
    async def initialize(self):
        """Initialize OCR engines"""
        await asyncio.sleep(0.5)  # Simulate initialization
        self.is_initialized = True
        logger.info("OCR Service initialized (mock)")
    
    async def health_check(self):
        return "ready" if self.is_initialized else "initializing"
    
    async def process_image(self, file_path: Path, language: str = "ms"):
        """Process image and return OCR results"""
        await asyncio.sleep(1)  # Simulate processing time
        
        # Return different mock data based on language
        if language == "ms":
            mock_text = """KERAJAAN MALAYSIA
MyKad No: 123456-78-9012
Nama: Ahmad bin Abdullah
Alamat: No. 123, Jalan Bunga Raya
        Taman Sri Malaysia
        50000 Kuala Lumpur"""
        elif language == "zh":
            mock_text = "马来西亚政府\n身份证号码: 123456-78-9012\n姓名: 陈小明"
        else:
            mock_text = "GOVERNMENT OF MALAYSIA\nID Card No: 123456-78-9012\nName: Ahmad bin Abdullah"
        
        return {
            "text": mock_text,
            "confidence": 0.92,
            "language_detected": language,
            "bounding_boxes": [
                {"text": "KERAJAAN MALAYSIA", "bbox": [10, 10, 200, 30], "confidence": 0.95},
                {"text": "MyKad No: 123456-78-9012", "bbox": [10, 40, 250, 60], "confidence": 0.91}
            ],
            "document_type": "malaysian_id"
        }

class MockMetaLearningService:
    """Mock meta-learning service for future AI features"""
    
    async def initialize_project(self, project_id: str, domain: str, language: str):
        logger.info(f"Meta-learning initialized for project {project_id} (mock)")
        return True
    
    async def health_check(self):
        return "ready"

# Initialize mock services
ocr_service = MockOCRService()
meta_learning_service = MockMetaLearningService()

# === STARTUP EVENT ===
@app.on_event("startup")
async def startup_event():
    """Initialize services on startup"""
    logger.info("Starting MataOCR API...")
    await ocr_service.initialize()
    logger.info("MataOCR API started successfully")

# === HEALTH CHECK ENDPOINTS ===
@app.get("/", tags=["health"])
async def root():
    """Root endpoint with API information"""
    return {
        "message": "MataOCR API - See Better, Read Smarter",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health",
        "status": "operational"
    }

@app.get("/health", response_model=HealthResponse, tags=["health"])
async def health_check():
    """Basic health check endpoint"""
    return HealthResponse(
        status="healthy",
        timestamp=datetime.now().isoformat(),
        services={
            "ocr_engine": await ocr_service.health_check(),
            "meta_learning": await meta_learning_service.health_check(),
            "database": "mock",  # Will be "connected" when PostgreSQL added
            "storage": "local",  # Will be "cloud" when MinIO/S3 added
            "api": "operational"
        }
    )

@app.get("/health/detailed", tags=["health"])
async def detailed_health_check():
    """Detailed health check with comprehensive service status"""
    return {
        "status": "healthy",
        "service": "MataOCR API",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat(),
        "services": {
            "ocr_engine": await ocr_service.health_check(),
            "meta_learning": await meta_learning_service.health_check(),
            "database": "mock_ready",
            "file_storage": "local_ready",
            "background_tasks": "ready",
            "ai_vision": "active"
        },
        "features": {
            "languages_supported": len(SUPPORTED_LANGUAGES),
            "domains_supported": len(MALAYSIAN_DOMAINS),
            "meta_learning_enabled": True,
            "synthetic_data_generation": "planned"
        },
        "tagline": "See Better, Read Smarter"
    }

# === LANGUAGE & DOMAIN ENDPOINTS ===
@app.get("/languages", tags=["ocr"])
async def get_supported_languages():
    """Get list of supported languages for Malaysian market"""
    return {
        "supported_languages": SUPPORTED_LANGUAGES,
        "default": "ms",
        "recommended_for_malaysia": ["ms", "en", "zh", "ta"]
    }

@app.get("/domains", tags=["projects"])
async def get_supported_domains():
    """Get list of supported document domains"""
    return {
        "supported_domains": MALAYSIAN_DOMAINS,
        "default": "general",
        "recommended_for_business": ["business", "government", "medical"]
    }

# === PROJECT MANAGEMENT ===
@app.post("/projects", response_model=Project, tags=["projects"])
async def create_project(project: ProjectCreate):
    """Create a new MataOCR project with meta-learning capabilities"""
    
    # Validate language
    if project.language not in SUPPORTED_LANGUAGES:
        raise HTTPException(
            status_code=400,
            detail=f"Language '{project.language}' not supported. Available: {list(SUPPORTED_LANGUAGES.keys())}"
        )
    
    # Validate domain
    if project.domain not in MALAYSIAN_DOMAINS:
        raise HTTPException(
            status_code=400,
            detail=f"Domain '{project.domain}' not supported. Available: {list(MALAYSIAN_DOMAINS.keys())}"
        )
    
    project_id = str(uuid.uuid4())
    
    new_project = Project(
        id=project_id,
        name=project.name,
        description=project.description,
        language=project.language,
        domain=project.domain,
        created_at=datetime.now().isoformat(),
        meta_learning_enabled=True,
        accuracy_target=project.accuracy_target,
        image_count=0
    )
    
    projects_db[project_id] = new_project
    
    # Initialize meta-learning for this project
    await meta_learning_service.initialize_project(project_id, project.domain, project.language)
    
    logger.info(f"Created project: {project.name} ({project_id}) for {project.domain} in {project.language}")
    return new_project

@app.get("/projects", response_model=List[Project], tags=["projects"])
async def list_projects():
    """List all MataOCR projects"""
    return list(projects_db.values())

@app.get("/projects/{project_id}", response_model=Project, tags=["projects"])
async def get_project(project_id: str):
    """Get specific project details"""
    if project_id not in projects_db:
        raise HTTPException(status_code=404, detail="Project not found")
    
    return projects_db[project_id]

# === FILE UPLOAD ===
@app.post("/upload", response_model=ImageUpload, tags=["upload"])
async def upload_file(
    file: UploadFile = File(...),
    project_id: Optional[str] = None
):
    """Upload image file for OCR processing"""
    
    # Validate file type
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"File type {file.content_type} not supported. Allowed: {ALLOWED_TYPES}"
        )
    
    # Read and validate file size
    file_content = await file.read()
    if len(file_content) > MAX_FILE_SIZE:
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
    
    # Update project image count
    if project_id and project_id in projects_db:
        projects_db[project_id].image_count += 1
    
    upload_result = ImageUpload(
        filename=unique_filename,
        file_size=len(file_content),
        content_type=file.content_type,
        upload_time=datetime.now().isoformat(),
        project_id=project_id
    )
    
    logger.info(f"Uploaded: {file.filename} -> {unique_filename} ({len(file_content)} bytes)")
    return upload_result

# === OCR PROCESSING ===
@app.post("/ocr/process", response_model=OCRResult, tags=["ocr"])
async def process_ocr(
    file: UploadFile = File(...),
    language: str = "ms",
    project_id: Optional[str] = None,
    confidence_threshold: float = 0.8
):
    """
    Process uploaded image with OCR using meta-learning enhanced recognition
    """
    
    start_time = datetime.now()
    
    # Validate language
    if language not in SUPPORTED_LANGUAGES:
        raise HTTPException(
            status_code=400,
            detail=f"Language '{language}' not supported"
        )
    
    # Save uploaded file temporarily
    file_content = await file.read()
    temp_filename = f"temp_{uuid.uuid4()}{Path(file.filename).suffix}"
    temp_path = upload_dir / temp_filename
    
    async with aiofiles.open(temp_path, 'wb') as f:
        await f.write(file_content)
    
    try:
        # Process with OCR service
        ocr_result = await ocr_service.process_image(temp_path, language)
        
        processing_time = (datetime.now() - start_time).total_seconds()
        
        result = OCRResult(
            success=True,
            text=ocr_result["text"],
            confidence=ocr_result["confidence"],
            language_detected=ocr_result["language_detected"],
            processing_time=processing_time,
            bounding_boxes=ocr_result["bounding_boxes"],
            metadata={
                "file_size": len(file_content),
                "file_type": file.content_type,
                "processing_engine": "mock_paddleocr",
                "document_type": ocr_result.get("document_type", "unknown"),
                "language_requested": language,
                "project_id": project_id,
                "confidence_threshold": confidence_threshold,
                "meta_learning_version": "1.0"
            },
            meta_learning_applied=True  # Will be actual meta-learning result later
        )
        
        logger.info(f"OCR processed: {file.filename} ({language}) in {processing_time:.2f}s")
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

# === FUTURE ENDPOINTS (Stubs) ===
@app.post("/meta-learning/train/{project_id}", tags=["meta-learning"])
async def trigger_meta_learning(project_id: str):
    """Future: Trigger meta-learning model training"""
    return {
        "message": "Meta-learning training initiated",
        "project_id": project_id,
        "status": "planned_feature"
    }

@app.post("/synthetic/generate", tags=["synthetic"]) 
async def generate_synthetic_data():
    """Future: Generate synthetic training data"""
    return {
        "message": "Synthetic data generation",
        "status": "planned_feature"
    }

# === STATISTICS ===
@app.get("/stats", tags=["health"])
async def get_api_stats():
    """Get comprehensive API usage statistics"""
    total_images = len(list(upload_dir.glob("*")))
    
    return {
        "api_version": "1.0.0",
        "total_projects": len(projects_db),
        "total_uploads": total_images,
        "supported_languages": len(SUPPORTED_LANGUAGES),
        "supported_domains": len(MALAYSIAN_DOMAINS),
        "features": {
            "meta_learning": "enabled",
            "synthetic_data": "planned",
            "multi_language": "active",
            "malaysian_optimized": True
        },
        "uptime": "operational",
        "tagline": "See Better, Read Smarter"
    }

# === ERROR HANDLERS ===
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
        "main_working:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
