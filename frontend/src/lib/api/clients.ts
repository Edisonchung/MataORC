import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { toast } from 'react-hot-toast'

// Types
export interface Project {
  id: string
  name: string
  description?: string
  languages: string[]
  status: 'created' | 'processing' | 'training' | 'completed' | 'failed'
  created_at: string
  seed_images_count: number
  synthetic_images_count: number
  validated_images_count: number
  accuracy_improvement?: number
}

export interface ImageAnnotation {
  image_id: string
  filename: string
  width: number
  height: number
  boxes: BoundingBox[]
  language: string
  validated: boolean
  confidence_score?: number
}

export interface BoundingBox {
  x: number
  y: number
  width: number
  height: number
  text: string
  confidence: number
}

export interface SyntheticGenerationConfig {
  font_types?: string[]
  text_content?: string
  languages?: string[]
  rotation_range?: [number, number]
  scale_range?: [number, number]
  noise_level?: number
  background_types?: string[]
  count?: number
}

export interface ValidationResult {
  image_id: string
  ocr_confidence: number
  passed: boolean
  detected_text: string
  expected_text: string
  match_score: number
  timestamp: string
}

// API Client Class
class MataOCRClient {
  private client: AxiosInstance
  private baseURL: string

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 seconds
    })

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = this.getAuthToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          // Server responded with error
          const message = error.response.data?.detail || error.response.data?.message || 'An error occurred'
          toast.error(message)
        } else if (error.request) {
          // Request made but no response
          toast.error('Network error. Please check your connection.')
        } else {
          // Something else happened
          toast.error('An unexpected error occurred')
        }
        return Promise.reject(error)
      }
    )
  }

  private getAuthToken(): string | null {
    // Get token from localStorage or session
    if (typeof window !== 'undefined') {
      return localStorage.getItem('mataocr_token')
    }
    return null
  }

  // Health check
  async health() {
    const response = await this.client.get('/health')
    return response.data
  }

  // Projects
  async createProject(data: Partial<Project>) {
    const response = await this.client.post<Project>('/projects', data)
    return response.data
  }

  async getProjects() {
    const response = await this.client.get<Project[]>('/projects')
    return response.data
  }

  async getProject(projectId: string) {
    const response = await this.client.get<Project>(`/projects/${projectId}`)
    return response.data
  }

  // Image Upload
  async uploadSeedImages(projectId: string, files: File[], language: string = 'en') {
    const formData = new FormData()
    files.forEach(file => formData.append('files', file))
    
    const response = await this.client.post(
      `/upload/seed/${projectId}?language=${language}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data
  }

  // Synthetic Generation
  async generateSynthetic(projectId: string, config: SyntheticGenerationConfig) {
    const response = await this.client.post(
      `/generate/synthetic/${projectId}`,
      config
    )
    return response.data
  }

  // Validation
  async validateImage(imageId: string) {
    const response = await this.client.post<ValidationResult>(
      `/validate/${imageId}`
    )
    return response.data
  }

  async validateBatch(imageIds: string[]) {
    const response = await this.client.post('/validate/batch', {
      image_ids: imageIds
    })
    return response.data
  }

  // Active Learning
  async selectForActiveLearning(projectId: string, confidenceThreshold: number = 0.85, maxSamples: number = 50) {
    const response = await this.client.post('/active-learning/select', {
      project_id: projectId,
      confidence_threshold: confidenceThreshold,
      max_samples: maxSamples
    })
    return response.data
  }

  async annotateImage(imageId: string, boxes: BoundingBox[]) {
    const response = await this.client.post(
      `/active-learning/annotate/${imageId}`,
      { boxes }
    )
    return response.data
  }

  // Training
  async trainModel(projectId: string, config?: any) {
    const response = await this.client.post('/train', {
      project_id: projectId,
      ...config
    })
    return response.data
  }

  async getTrainingStatus(jobId: string) {
    const response = await this.client.get(`/train/status/${jobId}`)
    return response.data
  }

  // Export
  async exportDataset(projectId: string, format: 'coco' | 'yolo' | 'voc' = 'coco', options?: any) {
    const response = await this.client.post(`/export/${projectId}`, {
      format,
      ...options
    })
    return response.data
  }

  // Statistics
  async getProjectStats(projectId: string) {
    const response = await this.client.get(`/stats/${projectId}`)
    return response.data
  }

  // Malaysian Languages
  async getMalaysianLanguageSupport() {
    const response = await this.client.get('/languages/malaysian')
    return response.data
  }
}

// Export singleton instance
export const mataOCRApi = new MataOCRClient()

// Export types
export type { MataOCRClient }
