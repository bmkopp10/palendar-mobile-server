// Define a common type for API responses
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
  }
  
  // Define a type for error responses
  export interface ErrorResponse {
    success: false;
    message: string;
  }
  