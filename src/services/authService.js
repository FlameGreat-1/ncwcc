import apiService from './api';
import { API_ENDPOINTS } from './apiConfig';

class AuthService {
  async register(userData) {
    try {
      const response = await apiService.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      const data = response.data;
      
      if (data.success && data.data.token) {
        this.setAuthData(data.data.token, data.data);
      }
      
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return {
          success: false,
          error: error.response.data.message || 'Registration failed',
          errors: error.response.data
        };
      }
      
      return {
        success: false,
        error: 'Registration failed. Please try again.',
        errors: {}
      };
    }
  }
  
  async login(credentials) {
    try {
      const response = await apiService.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      const data = response.data;
      
      if (data.success && data.data.token) {
        this.setAuthData(data.data.token, data.data);
      }
      
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return {
          success: false,
          error: error.response.data.message || 'Login failed',
          errors: error.response.data
        };
      }
      
      return {
        success: false,
        error: 'Login failed. Please try again.',
        errors: {}
      };
    }
  }

  async logout() {
    try {
      const response = await apiService.post(API_ENDPOINTS.AUTH.LOGOUT);
      this.clearAuthData();
      return response.data;
    } catch (error) {
      this.clearAuthData();
      return {
        success: true,
        message: 'Logged out successfully'
      };
    }
  }

  async googleAuth(accessToken, userType = 'client', clientType = 'general') {
    try {
      const response = await apiService.post(API_ENDPOINTS.AUTH.GOOGLE_AUTH, {
        access_token: accessToken,
        user_type: userType,
        client_type: clientType,
      });
      
      const data = response.data;
      
      if (data.success && data.data.token) {
        this.setAuthData(data.data.token, data.data);
      }
      
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return {
          success: false,
          error: error.response.data.message || 'Google authentication failed',
          errors: error.response.data
        };
      }
      
      return {
        success: false,
        error: 'Google authentication failed. Please try again.',
        errors: {}
      };
    }
  }

  async googleRegister(accessToken, userType = 'client', clientType = 'general', phoneNumber = '') {
    try {
      const response = await apiService.post(API_ENDPOINTS.AUTH.GOOGLE_REGISTER, {
        access_token: accessToken,
        user_type: userType,
        client_type: clientType,
        phone_number: phoneNumber,
      });
      
      const data = response.data;
      
      if (data.success && data.data.token) {
        this.setAuthData(data.data.token, data.data);
      }
      
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return {
          success: false,
          error: error.response.data.message || 'Google registration failed',
          errors: error.response.data
        };
      }
      
      return {
        success: false,
        error: 'Google registration failed. Please try again.',
        errors: {}
      };
    }
  }

  async socialLogin(provider, accessToken) {
    try {
      const response = await apiService.post(API_ENDPOINTS.AUTH.SOCIAL_LOGIN, {
        provider,
        access_token: accessToken,
      });
      
      const data = response.data;
      
      if (data.success && data.data.token) {
        this.setAuthData(data.data.token, data.data);
      }
      
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return {
          success: false,
          error: error.response.data.message || 'Social login failed',
          errors: error.response.data
        };
      }
      
      return {
        success: false,
        error: 'Social login failed. Please try again.',
        errors: {}
      };
    }
  }

  async changePassword(currentPassword, newPassword) {
    try {
      const response = await apiService.post(API_ENDPOINTS.AUTH.PASSWORD_CHANGE, {
        current_password: currentPassword,
        new_password: newPassword,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return {
          success: false,
          error: error.response.data.message || 'Password change failed',
          errors: error.response.data
        };
      }
      
      return {
        success: false,
        error: 'Password change failed. Please try again.',
        errors: {}
      };
    }
  }

  async requestPasswordReset(email) {
    try {
      const response = await apiService.post(API_ENDPOINTS.AUTH.PASSWORD_RESET, {
        email,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return {
          success: false,
          error: error.response.data.message || 'Password reset request failed',
          errors: error.response.data
        };
      }
      
      return {
        success: false,
        error: 'Password reset request failed. Please try again.',
        errors: {}
      };
    }
  }

  async confirmPasswordReset(token, newPassword) {
    try {
      const response = await apiService.post(API_ENDPOINTS.AUTH.PASSWORD_RESET_CONFIRM, {
        token,
        new_password: newPassword,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return {
          success: false,
          error: error.response.data.message || 'Password reset confirmation failed',
          errors: error.response.data
        };
      }
      
      return {
        success: false,
        error: 'Password reset confirmation failed. Please try again.',
        errors: {}
      };
    }
  }

  async verifyEmail(token) {
    try {
      const response = await apiService.post(API_ENDPOINTS.AUTH.EMAIL_VERIFY, {
        token,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return {
          success: false,
          error: error.response.data.message || 'Email verification failed',
          errors: error.response.data
        };
      }
      
      return {
        success: false,
        error: 'Email verification failed. Please try again.',
        errors: {}
      };
    }
  }

  async resendVerification(email) {
    try {
      const response = await apiService.post(API_ENDPOINTS.AUTH.EMAIL_RESEND, {
        email,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return {
          success: false,
          error: error.response.data.message || 'Resend verification failed',
          errors: error.response.data
        };
      }
      
      return {
        success: false,
        error: 'Resend verification failed. Please try again.',
        errors: {}
      };
    }
  }

  async linkSocialAccount(provider, accessToken) {
    try {
      const response = await apiService.post(API_ENDPOINTS.PROFILE.LINK, {
        provider,
        access_token: accessToken,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return {
          success: false,
          error: error.response.data.message || 'Account linking failed',
          errors: error.response.data
        };
      }
      
      return {
        success: false,
        error: 'Account linking failed. Please try again.',
        errors: {}
      };
    }
  }

  async unlinkSocialAccount(provider) {
    try {
      const response = await apiService.post(API_ENDPOINTS.PROFILE.UNLINK, {
        provider,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return {
          success: false,
          error: error.response.data.message || 'Account unlinking failed',
          errors: error.response.data
        };
      }
      
      return {
        success: false,
        error: 'Account unlinking failed. Please try again.',
        errors: {}
      };
    }
  }

  async checkHealth() {
    try {
      const response = await apiService.get(API_ENDPOINTS.HEALTH);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: 'Health check failed',
        errors: {}
      };
    }
  }

  setAuthData(token, userData) {
    apiService.setAuthToken(token);
    localStorage.setItem('user', JSON.stringify(userData.user || userData));
  }

  clearAuthData() {
    apiService.removeAuthToken();
    localStorage.removeItem('user');
  }

  getStoredToken() {
    return localStorage.getItem('authToken');
  }

  getStoredUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated() {
    return !!this.getStoredToken();
  }

  getCurrentUser() {
    return this.getStoredUser();
  }

  isGoogleUser() {
    const user = this.getCurrentUser();
    return user?.is_google_user || user?.auth_provider === 'google';
  }

  isVerified() {
    const user = this.getCurrentUser();
    return user?.is_verified || false;
  }

  getUserType() {
    const user = this.getCurrentUser();
    return user?.user_type || 'client';
  }

  getClientType() {
    const user = this.getCurrentUser();
    return user?.client_type || 'general';
  }

  isNDISClient() {
    const user = this.getCurrentUser();
    return user?.is_ndis_client || user?.client_type === 'ndis';
  }
}

export default new AuthService();
