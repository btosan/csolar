export interface WorkHighlightType {
    id: string
    title: string
    description: string
    year: number
    aboutMeId: string
    createdAt: Date
    updatedAt: Date
  }
  
  export interface CreateWorkHighlightInput {
    title: string
    description: string
    year: number
    aboutMeId: string
  }
  
  export interface UpdateWorkHighlightInput {
    id: string
    title?: string
    description?: string
    year?: number
  }

  // Define the ApiResponse type
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
  }