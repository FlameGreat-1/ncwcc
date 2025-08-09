import apiService from './api';
import { API_ENDPOINTS } from './apiConfig';

class AuthService {
  async register(userData) {
    const response = await apiService.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    const data = response.data;
    
    if (data.success && data.data.token) {
      this.setAuthData(data.data.token, data.data);
    }
    
    return data;
  }

  async login(credentials) {
    const response = await apiService.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    const data = response.data;
    
    if (data.success && data.data.token) {
      this.setAuthData(data.data.token, data.data);
    }
    
    return data;
  }

  async logout() {
    const response = await apiService.post(API_ENDPOINTS.AUTH.LOGOUT);
    this.clearAuthData();
    return response.data;
  }

  async googleAuth(accessToken, userType = 'client', clientType = 'general') {
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
  }

  async googleRegister(accessToken, userType = 'client', clientType = 'general', phoneNumber = '') {
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
  }

  async socialLogin(provider, accessToken) {
    const response = await apiService.post(API_ENDPOINTS.AUTH.SOCIAL_LOGIN, {
      provider,
      access_token: accessToken,
    });
    
    const data = response.data;
    
    if (data.success && data.data.token) {
      this.setAuthData(data.data.token, data.data);
    }
    
    return data;
  }

  async changePassword(currentPassword, newPassword) {
    const response = await apiService.post(API_ENDPOINTS.AUTH.PASSWORD_CHANGE, {
      current_password: currentPassword,
      new_password: newPassword,
    });
    return response.data;
  }

  async requestPasswordReset(email) {
    const response = await apiService.post(API_ENDPOINTS.AUTH.PASSWORD_RESET, {
      email,
    });
    return response.data;
  }

  async confirmPasswordReset(token, newPassword) {
    const response = await apiService.post(API_ENDPOINTS.AUTH.PASSWORD_RESET_CONFIRM, {
      token,
      new_password: newPassword,
    });
    return response.data;
  }

  async verifyEmail(token) {
    const response = await apiService.post(API_ENDPOINTS.AUTH.EMAIL_VERIFY, {
      token,
    });
    return response.data;
  }

  async resendVerification(email) {
    const response = await apiService.post(API_ENDPOINTS.AUTH.EMAIL_RESEND, {
      email,
    });
    return response.data;
  }

  async linkSocialAccount(provider, accessToken) {
    const response = await apiService.post(API_ENDPOINTS.PROFILE.LINK, {
      provider,
      access_token: accessToken,
    });
    return response.data;
  }

  async unlinkSocialAccount(provider) {
    const response = await apiService.post(API_ENDPOINTS.PROFILE.UNLINK, {
      provider,
    });
    return response.data;
  }

  async checkHealth() {
    const response = await apiService.get(API_ENDPOINTS.HEALTH);
    return response.data;
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

