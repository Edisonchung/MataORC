from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import uvicorn
from datetime import datetime

# Initialize FastAPI app
app = FastAPI(
    title="MataOCR API",
    description="Train Smarter OCR. With Less Effort",
    version="1.0.0"
)

# CORS configuration - Update with your Codespace URLs
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://localhost:3000",
        "https://mata-orc.vercel.app",
        "https://mataocr.com",
        # Add your specific Codespace URLs
        "https://ubiquitous-enigma-r4qprr5qpgfjg9-3000.app.github.dev",
        "https://ubiquitous-enigma-r4qprr5qpgfjg9-8000.app.github.dev",
        # Allow all GitHub Codespace URLs (for development)
        "https://*.app.github.dev"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_origin_regex="https://.*\.app\.github\.dev"  # This allows all Codespace URLs
)

@app.get("/")
async def root():
    return {
        "name": "MataOCR API",
        "tagline": "Train Smarter OCR. With Less Effort",
        "version": "1.0.0",
        "status": "operational",
        "endpoints": {
            "health": "/health",
            "docs": "/docs",
            "projects": "/projects",
            "upload": "/upload"
        }
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "MataOCR Backend"
    }

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """Upload a file for OCR processing"""
    if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg', '.pdf')):
        raise HTTPException(status_code=400, detail="Invalid file type")
    
    return {
        "filename": file.filename,
        "size": file.size,
        "content_type": file.content_type,
        "message": "File uploaded successfully"
    }

@app.get("/projects")
async def list_projects():
    """List all OCR projects"""
    # Mock data for now
    return {
        "projects": [
            {
                "id": "1",
                "name": "MyKad OCR",
                "status": "active",
                "accuracy": 0.96,
                "created_at": "2024-01-15"
            },
            {
                "id": "2",
                "name": "Invoice Processing",
                "status": "training",
                "accuracy": 0.89,
                "created_at": "2024-01-10"
            }
        ]
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
