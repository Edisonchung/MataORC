# backend/Dockerfile - Fixed PORT issue
FROM python:3.11-slim

# Install system dependencies for OpenCV, PaddleOCR, and compilation
RUN apt-get update && apt-get install -y \
    # Essential build tools
    build-essential \
    gcc \
    g++ \
    # OpenCV and graphics dependencies
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libgomp1 \
    libgcc-s1 \
    libgl1-mesa-glx \
    # Math libraries for PaddleOCR
    libgfortran5 \
    libopenblas-dev \
    # Tesseract OCR
    tesseract-ocr \
    libtesseract-dev \
    # Network tools
    wget \
    curl \
    # Clean up
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip, setuptools, and wheel
RUN pip install --no-cache-dir --upgrade pip setuptools wheel

# Set working directory
WORKDIR /app

# Copy requirements first for better Docker layer caching
COPY requirements.txt .

# Install Python dependencies step by step to avoid conflicts
RUN pip install --no-cache-dir \
    fastapi==0.104.1 \
    uvicorn[standard]==0.24.0 \
    python-multipart==0.0.6 \
    python-dotenv==1.0.0 \
    pydantic==2.5.0 \
    httpx==0.25.2 \
    aiofiles==23.2.1

# Install image processing libraries
RUN pip install --no-cache-dir \
    pillow==10.1.0 \
    numpy==1.24.3 \
    opencv-python-headless==4.8.1.78

# Install OCR engines (critical step)
RUN pip install --no-cache-dir paddlepaddle==2.5.2
RUN pip install --no-cache-dir paddleocr==2.7.3
RUN pip install --no-cache-dir pytesseract==0.3.10

# Install remaining dependencies
RUN pip install --no-cache-dir \
    python-jose[cryptography]==3.3.0 \
    passlib[bcrypt]==1.7.4

# Copy application code
COPY . .

# Create uploads directory
RUN mkdir -p uploads

# Create a startup script that properly handles the PORT environment variable
RUN echo '#!/bin/bash\n\
echo "Starting MataOCR API..."\n\
echo "Environment: $ENVIRONMENT"\n\
echo "Port: $PORT"\n\
exec python -m uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}\n\
' > start.sh && chmod +x start.sh

# Expose port (Railway will provide this via $PORT)
EXPOSE $PORT

# Use the startup script instead of direct uvicorn command
CMD ["./start.sh"]
