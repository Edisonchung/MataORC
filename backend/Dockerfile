# backend/Dockerfile - Fixed for Railway
FROM python:3.11-slim

# Install system dependencies for OpenCV, PaddleOCR, and compilation
RUN apt-get update && apt-get install -y \
    # OpenCV dependencies
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libgomp1 \
    libgcc-s1 \
    libgl1-mesa-glx \
    libglib2.0-0 \
    # Build tools for Python packages
    build-essential \
    gcc \
    g++ \
    # Additional dependencies for PaddleOCR
    libgfortran5 \
    libopenblas-dev \
    # Network tools
    wget \
    curl \
    # Clean up
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip first
RUN pip install --no-cache-dir --upgrade pip setuptools wheel

# Set working directory
WORKDIR /app

# Copy requirements first for better Docker layer caching
COPY requirements.txt .

# Install Python dependencies with verbose output for debugging
RUN pip install --no-cache-dir --verbose -r requirements.txt

# Copy application code
COPY . .

# Create uploads directory
RUN mkdir -p uploads

# Expose port (Railway will provide this via $PORT)
EXPOSE $PORT

# Health check (comment out for Railway since it might not have curl)
# HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
#     CMD curl -f http://localhost:$PORT/health || exit 1

# Start command
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "$PORT"]
