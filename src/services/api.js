import apiClient from './apiConfig';

class ApiService {
  // STANDARD HTTP METHODS
  async get(url, config = {}) {
    const response = await apiClient.get(url, config);
    return response;
  }

  async post(url, data = {}, config = {}) {
    const response = await apiClient.post(url, data, config);
    return response;
  }

  async put(url, data = {}, config = {}) {
    const response = await apiClient.put(url, data, config);
    return response;
  }

  async patch(url, data = {}, config = {}) {
    const response = await apiClient.patch(url, data, config);
    return response;
  }

  async delete(url, config = {}) {
    const response = await apiClient.delete(url, config);
    return response;
  }

  // SAFE METHODS WITH ERROR HANDLING (Perfect for React components)
  async getSafe(url, config = {}) {
    try {
      const response = await apiClient.get(url, config);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async postSafe(url, data = {}, config = {}) {
    try {
      const response = await apiClient.post(url, data, config);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async patchSafe(url, data = {}, config = {}) {
    try {
      const response = await apiClient.patch(url, data, config);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteSafe(url, config = {}) {
    try {
      const response = await apiClient.delete(url, config);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // CLIENT-SPECIFIC FILE UPLOAD METHOD
  async uploadFile(url, file, additionalData = {}, onProgress = null) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key]);
      });

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      if (onProgress) {
        config.onUploadProgress = (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        };
      }

      const response = await apiClient.post(url, formData, config);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // CLIENT-SPECIFIC FILE DOWNLOAD METHOD
  async downloadFile(url, filename = null) {
    try {
      const response = await apiClient.get(url, {
        responseType: 'blob'
      });

      // Create download link
      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      return {
        success: true,
        message: 'File downloaded successfully',
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  handleError(error) {
    const errorResponse = {
      success: false,
      status: error.response?.status || 500,
      message: 'An error occurred',
      errors: {},
      isNetworkError: false,
      isServerError: false,
      isValidationError: false,
      isAuthError: false,
    };

    // Network error (no response from server)
    if (!error.response && error.request) {
      errorResponse.isNetworkError = true;
      errorResponse.message = 'Network error. Please check your internet connection.';
      return errorResponse;
    }

    // Server error (5xx)
    if (error.response?.status >= 500) {
      errorResponse.isServerError = true;
      errorResponse.message = 'Server error. Please try again later.';
      return errorResponse;
    }

    // Authentication error (401)
    if (error.response?.status === 401) {
      errorResponse.isAuthError = true;
      errorResponse.message = 'Authentication required. Please log in.';
      return errorResponse;
    }

    // Validation error (400)
    if (error.response?.status === 400) {
      errorResponse.isValidationError = true;
    }

    // Extract error message and details
    if (error.response?.data) {
      const data = error.response.data;
      
      if (typeof data === 'string') {
        errorResponse.message = data;
      } else if (data.error) {
        errorResponse.message = data.error;
      } else if (data.message) {
        errorResponse.message = data.message;
      } else if (data.detail) {
        errorResponse.message = data.detail;
      } else if (data.non_field_errors) {
        errorResponse.message = Array.isArray(data.non_field_errors) 
          ? data.non_field_errors[0] 
          : data.non_field_errors;
      }

      // Extract field-specific errors for form validation
      if (data.errors || (typeof data === 'object' && !data.error && !data.message && !data.detail)) {
        errorResponse.errors = data.errors || data;
      }
    } else if (error.message) {
      errorResponse.message = error.message;
    }

    return errorResponse;
  }

  // CLIENT-SPECIFIC AUTH METHODS
  setAuthToken(token) {
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Token ${token}`;
      localStorage.setItem('authToken', token);
    } else {
      delete apiClient.defaults.headers.common['Authorization'];
      localStorage.removeItem('authToken');
    }
  }

  removeAuthToken() {
    this.setAuthToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userProfile');
  }

  getAuthToken() {
    return localStorage.getItem('authToken');
  }

  isAuthenticated() {
    return !!this.getAuthToken();
  }

  // CLIENT-SPECIFIC USER METHODS
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  setCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // CLIENT-FRIENDLY ERROR CHECKING
  isNetworkError(error) {
    return !error.response && error.request;
  }

  isServerError(error) {
    return error.response?.status >= 500;
  }

  isClientError(error) {
    return error.response?.status >= 400 && error.response?.status < 500;
  }

  isValidationError(error) {
    return error.response?.status === 400;
  }

  isAuthError(error) {
    return error.response?.status === 401;
  }

  isForbiddenError(error) {
    return error.response?.status === 403;
  }

  isNotFoundError(error) {
    return error.response?.status === 404;
  }

  // CLIENT-FRIENDLY ERROR MESSAGES
  getErrorMessage(error) {
    if (this.isNetworkError(error)) {
      return 'Network error. Please check your internet connection.';
    }
    
    if (this.isAuthError(error)) {
      return 'Please log in to continue.';
    }

    if (this.isForbiddenError(error)) {
      return 'You do not have permission to perform this action.';
    }

    if (this.isNotFoundError(error)) {
      return 'The requested resource was not found.';
    }
    
    if (this.isServerError(error)) {
      return 'Server error. Please try again later.';
    }

    return error.response?.data?.message || 
           error.response?.data?.error || 
           error.response?.data?.detail ||
           'An error occurred. Please try again.';
  }

  // UTILITY METHOD FOR FORM VALIDATION ERRORS
  getFieldErrors(error) {
    if (error.response?.data && typeof error.response.data === 'object') {
      const data = error.response.data;
      const fieldErrors = {};
      
      Object.keys(data).forEach(key => {
        if (Array.isArray(data[key])) {
          fieldErrors[key] = data[key][0]; // Take first error message
        } else if (typeof data[key] === 'string') {
          fieldErrors[key] = data[key];
        }
      });
      
      return fieldErrors;
    }
    return {};
  }
}

export default new ApiService();
