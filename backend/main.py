# backend/main.py - MetaOCR FastAPI Backend
from fastapi import FastAPI, File, UploadFile, HTTPException, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import JSONResponse
from typing import List, Optional, Dict, Any
import uvicorn
import os
from datetime import datetime
import uuid
import json
import logging
from pathlib import Path

# Import our custom modules (to be created)
from models.database import get_db, create_tables
from models.schemas import (
    ProjectCreate, Project, ImageUpload, OCRResult, 
    SyntheticGenerationConfig, ValidationResult, ActiveLearningQuery
)
from services.ocr_service import OCRService
from services.synthetic_service import SyntheticDataService
from services.meta_learning_service import MetaLearningService
from services.validation_service import ValidationService
from utils.auth import verify_token
from utils.storage import FileStorage

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="MetaOCR API",
    description="Beyond Traditional OCR - Meta-learning AI for document processing",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_tags=[
        {
            "name": "health",
            "description": "Health check and system status"
        },
        {
            "name": "projects",
            "description": "Project management operations"
        },
        {
            "name": "upload",
            "description": "File upload and processing"
        },
        {
            "name": "ocr",
            "description": "OCR processing and results"
        },
        {
            "name": "synthetic",
            "description": "Synthetic data generation"
        },
        {
            "name": "validation",
            "description": "Model validation and quality scoring"
        },
        {
            "name": "meta-learning",
            "description": "Meta-learning and active learning operations"
        }
    ]
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://metaocr.com", "https://www.metaocr.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Initialize services
ocr_service = OCRService()
synthetic_service = SyntheticDataService()
meta_learning_service = MetaLearningService()
validation_service = ValidationService()
file_storage = FileStorage()

# Startup event
@app.on_event("startup")
async def startup_event():
    """Initialize database and services on startup"""
    logger.info("Starting MetaOCR API...")
    await create_tables()
    await ocr_service.initialize()
    await synthetic_service.initialize()
    logger.info("MetaOCR API started successfully")

# Health Check
@app.get("/health", tags=["health"])
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "MetaOCR API",
        "version": "1.0.0",
        "timestamp": datetime.utcnow().isoformat(),
        "meta_learning": "active"
    }

@app.get("/health/detailed", tags=["health"])
async def detailed_health_check():
    """Detailed health check with service status"""
    return {
        "status": "healthy",
        "services": {
            "ocr_engine": await ocr_service.health_check(),
            "synthetic_generator": await synthetic_service.health_check(),
            "meta_learning": await meta_learning_service.health_check(),
            "database": "connected",
            "storage": "available"
        },
        "timestamp": datetime.utcnow().isoformat()
    }

# Project Management
@app.post("/projects", response_model=Project, tags=["projects"])
async def create_project(
    project: ProjectCreate,
    db=Depends(get_db),
    token: HTTPAuthorizationCredentials = Depends(security)
):
    """Create a new MetaOCR project"""
    user_id = verify_token(token.credentials)
    
    project_id = str(uuid.uuid4())
    new_project = {
        "id": project_id,
        "name": project.name,
        "description": project.description,
        "language": project.language,
        "domain": project.domain,
        "user_id": user_id,
        "created_at": datetime.utcnow(),
        "meta_learning_enabled": True,
        "accuracy_target": project.accuracy_target or 0.95
    }
    
    # Initialize meta-learning for this project
    await meta_learning_service.initialize_project(project_id, project.domain, project.language)
    
    logger.info(f"Created project {project_id} with meta-learning enabled")
    return new_project

@app.get("/projects", response_model=List[Project], tags=["projects"])
async def get_projects(
    db=Depends(get_db),
    token: HTTPAuthorizationCredentials = Depends(security)
):
    """Get all projects for authenticated user"""
    user_id = verify_token(token.credentials)
    # Database query logic here
    return []

@app.get("/projects/{project_id}", response_model=Project, tags=["projects"])
async def get_project(
    project_id: str,
    db=Depends(get_db),
    token: HTTPAuthorizationCredentials = Depends(security)
):
    """Get specific project details"""
    user_id = verify_token(token.credentials)
    # Database query logic here
    return {}

# File Upload and Processing
@app.post("/upload/seed/{project_id}", tags=["upload"])
async def upload_seed_images(
    project_id: str,
    files: List[UploadFile] = File(...),
    language: str = "en",
    background_tasks: BackgroundTasks = BackgroundTasks(),
    token: HTTPAuthorizationCredentials = Depends(security)
):
    """Upload seed images for meta-learning training"""
    user_id = verify_token(token.credentials)
    
    if len(files) > 50:
        raise HTTPException(status_code=400, detail="Maximum 50 files per upload")
    
    uploaded_files = []
    
    for file in files:
        # Validate file type
        if not file.content_type.startswith('image/'):
            continue
            
        # Save file
        file_id = str(uuid.uuid4())
        file_path = await file_storage.save_upload(file, project_id, file_id)
        
        # Queue for OCR processing
        background_tasks.add_task(
            process_seed_image, 
            project_id, 
            file_id, 
            file_path, 
            language
        )
        
        uploaded_files.append({
            "file_id": file_id,
            "filename": file.filename,
            "size": file.size,
            "status": "processing"
        })
    
    logger.info(f"Uploaded {len(uploaded_files)} seed images for project {project_id}")
    return {
        "project_id": project_id,
        "uploaded_files": uploaded_files,
        "meta_learning_status": "initializing"
    }

async def process_seed_image(project_id: str, file_id: str, file_path: str, language: str):
    """Background task to process seed images"""
    try:
        # Run OCR
        ocr_result = await ocr_service.process_image(file_path, language)
        
        # Update meta-learning model with this seed data
        await meta_learning_service.add_seed_data(project_id, file_id, ocr_result)
        
        logger.info(f"Processed seed image {file_id} for project {project_id}")
        
    except Exception as e:
        logger.error(f"Error processing seed image {file_id}: {str(e)}")

# OCR Processing
@app.post("/ocr/process", response_model=OCRResult, tags=["ocr"])
async def process_ocr(
    file: UploadFile = File(...),
    language: str = "en",
    project_id: Optional[str] = None,
    token: HTTPAuthorizationCredentials = Depends(security)
):
    """Process single image with MetaOCR"""
    user_id = verify_token(token.credentials)
    
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    # Save file temporarily
    file_id = str(uuid.uuid4())
    file_path = await file_storage.save_temp(file, file_id)
    
    try:
        # Use meta-learning enhanced OCR if project specified
        if project_id:
            ocr_result = await meta_learning_service.process_with_meta_learning(
                project_id, file_path, language
            )
        else:
            ocr_result = await ocr_service.process_image(file_path, language)
        
        # If project specified, use this result to improve meta-learning
        if project_id:
            await meta_learning_service.update_from_inference(project_id, file_id, ocr_result)
        
        return ocr_result
        
    finally:
        # Clean up temp file
        await file_storage.cleanup_temp(file_path)

# Synthetic Data Generation
@app.post("/generate/synthetic/{project_id}", tags=["synthetic"])
async def generate_synthetic_data(
    project_id: str,
    config: SyntheticGenerationConfig,
    background_tasks: BackgroundTasks,
    token: HTTPAuthorizationCredentials = Depends(security)
):
    """Generate synthetic training data with meta-learning insights"""
    user_id = verify_token(token.credentials)
    
    # Get meta-learning insights for this project
    meta_insights = await meta_learning_service.get_generation_insights(project_id)
    
    # Queue synthetic generation
    generation_id = str(uuid.uuid4())
    background_tasks.add_task(
        generate_synthetic_batch,
        project_id,
        generation_id,
        config,
        meta_insights
    )
    
    return {
        "generation_id": generation_id,
        "project_id": project_id,
        "status": "queued",
        "estimated_count": config.num_samples,
        "meta_learning_enhanced": True
    }

async def generate_synthetic_batch(
    project_id: str,
    generation_id: str, 
    config: SyntheticGenerationConfig,
    meta_insights: Dict[str, Any]
):
    """Background task for synthetic data generation"""
    try:
        # Generate synthetic data using meta-learning insights
        synthetic_data = await synthetic_service.generate_with_meta_learning(
            config, meta_insights
        )
        
        # Validate generated data
        validated_data = await validation_service.validate_synthetic_batch(synthetic_data)
        
        # Update meta-learning model with synthetic results
        await meta_learning_service.update_from_synthetic(project_id, validated_data)
        
        logger.info(f"Generated {len(validated_data)} synthetic samples for project {project_id}")
        
    except Exception as e:
        logger.error(f"Error generating synthetic data: {str(e)}")

# Validation
@app.post("/validate/{image_id}", response_model=ValidationResult, tags=["validation"])
async def validate_image(
    image_id: str,
    ground_truth: Optional[str] = None,
    token: HTTPAuthorizationCredentials = Depends(security)
):
    """Validate OCR results and update meta-learning"""
    user_id = verify_token(token.credentials)
    
    validation_result = await validation_service.validate_image(image_id, ground_truth)
    
    # Update meta-learning with validation feedback
    if validation_result.project_id:
        await meta_learning_service.update_from_validation(
            validation_result.project_id, 
            image_id, 
            validation_result
        )
    
    return validation_result

# Meta-Learning and Active Learning
@app.post("/meta-learning/active-query/{project_id}", tags=["meta-learning"])
async def query_active_learning(
    project_id: str,
    query_params: ActiveLearningQuery,
    token: HTTPAuthorizationCredentials = Depends(security)
):
    """Get next samples for active learning based on meta-learning insights"""
    user_id = verify_token(token.credentials)
    
    # Use meta-learning to identify most informative samples
    candidates = await meta_learning_service.select_active_learning_samples(
        project_id, 
        query_params.max_samples,
        query_params.uncertainty_threshold
    )
    
    return {
        "project_id": project_id,
        "candidates": candidates,
        "meta_learning_confidence": await meta_learning_service.get_model_confidence(project_id),
        "next_learning_iteration": await meta_learning_service.get_next_iteration_info(project_id)
    }

@app.post("/meta-learning/feedback/{project_id}", tags=["meta-learning"])
async def submit_learning_feedback(
    project_id: str,
    feedback_data: Dict[str, Any],
    token: HTTPAuthorizationCredentials = Depends(security)
):
    """Submit human feedback for meta-learning improvement"""
    user_id = verify_token(token.credentials)
    
    # Process feedback and update meta-learning model
    await meta_learning_service.process_human_feedback(project_id, feedback_data)
    
    # Trigger model adaptation if enough feedback received
    adaptation_triggered = await meta_learning_service.check_adaptation_trigger(project_id)
    
    return {
        "project_id": project_id,
        "feedback_processed": True,
        "adaptation_triggered": adaptation_triggered,
        "model_improvement": await meta_learning_service.get_recent_improvements(project_id)
    }

# Analytics and Insights
@app.get("/analytics/{project_id}/meta-learning", tags=["meta-learning"])
async def get_meta_learning_analytics(
    project_id: str,
    token: HTTPAuthorizationCredentials = Depends(security)
):
    """Get meta-learning analytics and performance insights"""
    user_id = verify_token(token.credentials)
    
    analytics = await meta_learning_service.get_project_analytics(project_id)
    
    return {
        "project_id": project_id,
        "meta_learning_progress": analytics["progress"],
        "accuracy_trends": analytics["accuracy_trends"],
        "domain_adaptation_score": analytics["adaptation_score"],
        "learning_efficiency": analytics["efficiency_metrics"],
        "next_recommendations": analytics["recommendations"]
    }

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
