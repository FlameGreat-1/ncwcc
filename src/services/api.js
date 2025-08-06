import apiClient from './apiConfig';

class ApiService {
  async get(url, config = {}) {
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

  async post(url, data = {}, config = {}) {
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

  async put(url, data = {}, config = {}) {
    try {
      const response = await apiClient.put(url, data, config);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async patch(url, data = {}, config = {}) {
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

  async delete(url, config = {}) {
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

  handleError(error) {
    const errorResponse = {
      success: false,
      status: error.response?.status || 500,
      message: 'An error occurred',
      errors: {},
    };

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
      }

      if (data.errors || (typeof data === 'object' && !data.error && !data.message && !data.detail)) {
        errorResponse.errors = data.errors || data;
      }
    } else if (error.message) {
      errorResponse.message = error.message;
    }

    return errorResponse;
  }

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
  }

  isNetworkError(error) {
    return !error.response && error.request;
  }

  isServerError(error) {
    return error.response?.status >= 500;
  }

  isClientError(error) {
    return error.response?.status >= 400 && error.response?.status < 500;
  }

  getErrorMessage(error) {
    if (this.isNetworkError(error)) {
      return 'Network error. Please check your connection.';
    }
    
    if (this.isServerError(error)) {
      return 'Server error. Please try again later.';
    }

    return error.response?.data?.message || error.response?.data?.error || 'An error occurred';
  }
}

export default new ApiService();
