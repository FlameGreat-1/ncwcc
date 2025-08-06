import authService from './authService';

class GoogleAuthService {
  constructor() {
    this.isInitialized = false;
    this.clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  }

  async initializeGoogleAuth() {
    if (this.isInitialized || !this.clientId) {
      return this.isInitialized;
    }

    try {
      await this.loadGoogleScript();
      await window.google.accounts.id.initialize({
        client_id: this.clientId,
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize Google Auth:', error);
      return false;
    }
  }

  loadGoogleScript() {
    return new Promise((resolve, reject) => {
      if (window.google) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async handleCredentialResponse(response) {
    try {
      const credential = response.credential;
      const payload = this.parseJWT(credential);
      
      return {
        success: true,
        user: payload,
        credential: credential,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to process Google credential',
      };
    }
  }

  parseJWT(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      throw new Error('Invalid JWT token');
    }
  }

  async signInWithGoogle(userType = 'client', clientType = 'general') {
    if (!this.isInitialized) {
      await this.initializeGoogleAuth();
    }

    return new Promise((resolve) => {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          resolve({
            success: false,
            error: 'Google Sign-In was cancelled or not displayed',
          });
        }
      });

      const originalCallback = window.google.accounts.id.callback;
      window.google.accounts.id.callback = async (response) => {
        try {
          const credentialResponse = await this.handleCredentialResponse(response);
          
          if (!credentialResponse.success) {
            resolve(credentialResponse);
            return;
          }

          const authResponse = await authService.googleAuth(
            response.credential,
            userType,
            clientType
          );

          resolve(authResponse);
        } catch (error) {
          resolve({
            success: false,
            error: 'Google authentication failed',
          });
        } finally {
          window.google.accounts.id.callback = originalCallback;
        }
      };
    });
  }

  async registerWithGoogle(userType = 'client', clientType = 'general', phoneNumber = '') {
    if (!this.isInitialized) {
      await this.initializeGoogleAuth();
    }

    return new Promise((resolve) => {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          resolve({
            success: false,
            error: 'Google Sign-In was cancelled or not displayed',
          });
        }
      });

      const originalCallback = window.google.accounts.id.callback;
      window.google.accounts.id.callback = async (response) => {
        try {
          const credentialResponse = await this.handleCredentialResponse(response);
          
          if (!credentialResponse.success) {
            resolve(credentialResponse);
            return;
          }

          const authResponse = await authService.googleRegister(
            response.credential,
            userType,
            clientType,
            phoneNumber
          );

          resolve(authResponse);
        } catch (error) {
          resolve({
            success: false,
            error: 'Google registration failed',
          });
        } finally {
          window.google.accounts.id.callback = originalCallback;
        }
      };
    });
  }

  renderGoogleButton(elementId, options = {}) {
    if (!this.isInitialized) {
      return false;
    }

    const defaultOptions = {
      theme: 'outline',
      size: 'large',
      text: 'signin_with',
      shape: 'rectangular',
      logo_alignment: 'left',
    };

    window.google.accounts.id.renderButton(
      document.getElementById(elementId),
      { ...defaultOptions, ...options }
    );

    return true;
  }

  async linkGoogleAccount() {
    if (!this.isInitialized) {
      await this.initializeGoogleAuth();
    }

    return new Promise((resolve) => {
      window.google.accounts.id.prompt();

      const originalCallback = window.google.accounts.id.callback;
      window.google.accounts.id.callback = async (response) => {
        try {
          const linkResponse = await authService.linkSocialAccount('google', response.credential);
          resolve(linkResponse);
        } catch (error) {
          resolve({
            success: false,
            error: 'Failed to link Google account',
          });
        } finally {
          window.google.accounts.id.callback = originalCallback;
        }
      };
    });
  }

  async unlinkGoogleAccount() {
    return await authService.unlinkSocialAccount('google');
  }

  signOut() {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.disableAutoSelect();
    }
  }

  isConfigured() {
    return !!this.clientId;
  }

  getClientId() {
    return this.clientId;
  }
}

export default new GoogleAuthService();
