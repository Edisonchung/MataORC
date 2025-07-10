// frontend/src/lib/api.ts
// MataOCR API Client for Frontend Integration

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// API Response Types (matching backend Pydantic models)
export interface OCRResult {
  success: boolean;
  text: string;
  confidence: number;
  language_detected: string;
  processing_time: number;
  bounding_boxes: Array<{
    text: string;
    bbox: [number, number, number, number];
    confidence: number;
  }>;
  metadata: {
    file_size: number;
    file_type: string;
    processing_engine: string;
    document_type: string;
    language_requested: string;
    project_id?: string;
    confidence_threshold: number;
    meta_learning_version: string;
  };
  meta_learning_applied: boolean;
}

export interface HealthResponse {
  status: string;
  service: string;
  version: string;
  timestamp: string;
  services: Record<string, string>;
  tagline: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  language: string;
  domain: string;
  created_at: string;
  meta_learning_enabled: boolean;
  accuracy_target: number;
  image_count: number;
}

export interface ApiError {
  error: string;
  detail: string;
}

// API Client Class
class MataOCRAPI {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  // Helper method for making requests
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `API Error: ${response.status}`);
    }

    return response.json();
  }

  // Health Check
  async health(): Promise<HealthResponse> {
    return this.request<HealthResponse>('/health');
  }

  // Get supported languages
  async getSupportedLanguages(): Promise<{
    supported_languages: Record<string, string>;
    default: string;
    recommended_for_malaysia: string[];
  }> {
    return this.request('/languages');
  }

  // Process OCR
  async processOCR(
    file: File,
    options: {
      language?: string;
      project_id?: string;
      confidence_threshold?: number;
    } = {}
  ): Promise<OCRResult> {
    const formData = new FormData();
    formData.append('file', file);
    
    // Add query parameters
    const params = new URLSearchParams();
    if (options.language) params.append('language', options.language);
    if (options.project_id) params.append('project_id', options.project_id);
    if (options.confidence_threshold) {
      params.append('confidence_threshold', options.confidence_threshold.toString());
    }

    const response = await fetch(
      `${this.baseURL}/ocr/process?${params.toString()}`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `OCR Processing failed: ${response.status}`);
    }

    return response.json();
  }

  // Upload file
  async uploadFile(
    file: File,
    project_id?: string
  ): Promise<{
    filename: string;
    file_size: number;
    content_type: string;
    upload_time: string;
    project_id?: string;
  }> {
    const formData = new FormData();
    formData.append('file', file);
    if (project_id) formData.append('project_id', project_id);

    const response = await fetch(`${this.baseURL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Upload failed: ${response.status}`);
    }

    return response.json();
  }

  // Project Management
  async createProject(project: {
    name: string;
    description?: string;
    language?: string;
    domain?: string;
    accuracy_target?: number;
  }): Promise<Project> {
    return this.request<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  }

  async getProjects(): Promise<Project[]> {
    return this.request<Project[]>('/projects');
  }

  async getProject(id: string): Promise<Project> {
    return this.request<Project>(`/projects/${id}`);
  }

  // Get API Statistics
  async getStats(): Promise<{
    api_version: string;
    total_projects: number;
    total_uploads: number;
    supported_languages: number;
    supported_domains: number;
    features: Record<string, string | boolean>;
    uptime: string;
    tagline: string;
  }> {
    return this.request('/stats');
  }
}

// Export singleton instance
export const api = new MataOCRAPI();

// Helper functions for common operations
export const validateFile = (file: File): { valid: boolean; error?: string } => {
  const maxSize = parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '10485760');
  const allowedTypes = (process.env.NEXT_PUBLIC_ALLOWED_TYPES || 'image/jpeg,image/png,image/jpg,application/pdf').split(',');

  if (file.size > maxSize) {
    return { 
      valid: false, 
      error: `File too large. Maximum size: ${(maxSize / 1024 / 1024).toFixed(1)}MB` 
    };
  }

  if (!allowedTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: `File type not supported. Allowed: ${allowedTypes.join(', ')}` 
    };
  }

  return { valid: true };
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatProcessingTime = (seconds: number): string => {
  if (seconds < 1) return `${Math.round(seconds * 1000)}ms`;
  return `${seconds.toFixed(1)}s`;
};
