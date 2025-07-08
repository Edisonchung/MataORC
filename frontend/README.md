# MataOCR - AI-Powered OCR for Southeast Asia

<p align="center">
  <img src="frontend/public/logo.png" alt="MataOCR Logo" width="200">
</p>

<p align="center">
  <strong>See Better, Read Smarter</strong><br>
  AI-powered OCR solution for Malaysian and Southeast Asian documents
</p>

<p align="center">
  <a href="https://mataocr.com">Live Demo</a> •
  <a href="#features">Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="/docs">Documentation</a>
</p>

## 🌟 Features

- 🌏 Multi-language support (Bahasa Malaysia, English, Chinese, Tamil, Jawi)
- 🎯 96% accuracy with ensemble AI models
- 🚀 90% faster than manual data entry
- 🔒 On-premise deployment available
- 🇲🇾 Optimized for Malaysian documents

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python, PyTorch
- **OCR Engines**: PaddleOCR, Tesseract, EasyOCR
- **Infrastructure**: Docker, Kubernetes-ready

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- Docker

### Quick Start

```bash
# Clone repository
git clone https://github.com/[your-username]/mataocr.git

# Start with Docker
docker-compose up

# Or run separately:
# Frontend (http://localhost:3000)
cd frontend && npm install && npm run dev

# Backend (http://localhost:8000)
cd backend && pip install -r requirements.txt && uvicorn main:app --reload
