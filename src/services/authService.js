import apiService from './api';
import { API_ENDPOINTS } from './apiConfig';

class AuthService {
  async register(userData) {
    const response = await apiService.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    
    if (response.success && response.data.token) {
      this.setAuthData(response.data.token, response.data);
    }
    
    return response;
  }

  async login(credentials) {
    const response = await apiService.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    
    if (response.success && response.data.token) {
      this.setAuthData(response.data.token, response.data);
    }
    
    return response;
  }

  async logout() {
    const response = await apiService.post(API_ENDPOINTS.AUTH.LOGOUT);
    this.clearAuthData();
    return response;
  }

  async googleAuth(accessToken, userType = 'client', clientType = 'general') {
    const response = await apiService.post(API_ENDPOINTS.AUTH.GOOGLE_AUTH, {
      access_token: accessToken,
      user_type: userType,
      client_type: clientType,
    });
    
    if (response.success && response.data.token) {
      this.setAuthData(response.data.token, response.data);
    }
    
    return response;
  }

  async googleRegister(accessToken, userType = 'client', clientType = 'general', phoneNumber = '') {
    const response = await apiService.post(API_ENDPOINTS.AUTH.GOOGLE_REGISTER, {
      access_token: accessToken,
      user_type: userType,
      client_type: clientType,
      phone_number: phoneNumber,
    });
    
    if (response.success && response.data.token) {
      this.setAuthData(response.data.token, response.data);
    }
    
    return response;
  }

  async socialLogin(provider, accessToken) {
    const response = await apiService.post(API_ENDPOINTS.AUTH.SOCIAL_LOGIN, {
      provider,
      access_token: accessToken,
    });
    
    if (response.success && response.data.token) {
      this.setAuthData(response.data.token, response.data);
    }
    
    return response;
  }

  async changePassword(currentPassword, newPassword) {
    return await apiService.post(API_ENDPOINTS.AUTH.PASSWORD_CHANGE, {
      current_password: currentPassword,
      new_password: newPassword,
    });
  }

  async requestPasswordReset(email) {
    return await apiService.post(API_ENDPOINTS.AUTH.PASSWORD_RESET, {
      email,
    });
  }

  async confirmPasswordReset(token, newPassword) {
    return await apiService.post(API_ENDPOINTS.AUTH.PASSWORD_RESET_CONFIRM, {
      token,
      new_password: newPassword,
    });
  }

  async verifyEmail(token) {
    return await apiService.post(API_ENDPOINTS.AUTH.EMAIL_VERIFY, {
      token,
    });
  }

  async resendVerification(email) {
    return await apiService.post(API_ENDPOINTS.AUTH.EMAIL_RESEND, {
      email,
    });
  }

  async linkSocialAccount(provider, accessToken) {
    return await apiService.post(API_ENDPOINTS.PROFILE.LINK, {
      provider,
      access_token: accessToken,
    });
  }

  async unlinkSocialAccount(provider) {
    return await apiService.post(API_ENDPOINTS.PROFILE.UNLINK, {
      provider,
    });
  }

  async checkHealth() {
    return await apiService.get(API_ENDPOINTS.HEALTH);
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
