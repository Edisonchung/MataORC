# backend/Dockerfile - Corrected for Railway (No Bash Issues)
FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    g++ \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libgomp1 \
    libgcc-s1 \
    libgl1-mesa-glx \
    libgfortran5 \
    libopenblas-dev \
    tesseract-ocr \
    libtesseract-dev \
    wget \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip
RUN pip install --no-cache-dir --upgrade pip setuptools wheel

# Set working directory
WORKDIR /app

# Install Python dependencies directly (no requirements.txt conflicts)
RUN pip install --no-cache-dir \
    fastapi==0.104.1 \
    uvicorn[standard]==0.24.0 \
    python-multipart==0.0.6 \
    python-dotenv==1.0.0 \
    pydantic==2.5.0 \
    httpx==0.25.2 \
    aiofiles==23.2.1 \
    pillow==10.1.0 \
    numpy==1.24.3

# Install OCR packages (may fail gracefully)
RUN pip install --no-cache-dir opencv-python-headless==4.8.1.78 || echo "OpenCV install failed, continuing..."
RUN pip install --no-cache-dir paddlepaddle==2.5.2 || echo "PaddlePaddle install failed, continuing..."
RUN pip install --no-cache-dir paddleocr==2.7.3 || echo "PaddleOCR install failed, continuing..."
RUN pip install --no-cache-dir pytesseract==0.3.10 || echo "PyTesseract install failed, continuing..."

# Copy application code
COPY . .

# Create uploads directory
RUN mkdir -p uploads

# Use Python directly - NO BASH SCRIPT
CMD ["python", "main.py"]
