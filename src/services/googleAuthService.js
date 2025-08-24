import authService from './authService';

class GoogleAuthService {
  constructor() {
    this.isInitialized = false;
    this.clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    this.googleAuthCallback = null;
  }

  async initializeGoogleAuth(callbackFn = null) {
    if (this.isInitialized || !this.clientId) {
      return this.isInitialized;
    }
  
    try {
      await this.loadGoogleScript();
      
      this.googleAuthCallback = callbackFn;
      
      await window.google.accounts.id.initialize({
        client_id: this.clientId,
        callback: (response) => {
          console.log("Credential received directly in initialize callback");
          if (this.googleAuthCallback) {
            this.googleAuthCallback(response);
          } else {
            this.handleCredentialResponse(response);
          }
        },
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
      console.log("handleCredentialResponse called with response:", response ? "yes" : "no");
      
      if (!response || !response.credential) {
        console.error("No credential in response");
        return {
          success: false,
          error: 'No credential received from Google',
        };
      }
      
      const credential = response.credential;
      console.log("Credential received, length:", credential.length);
      
      try {
        const payload = this.parseJWT(credential);
        console.log("JWT payload parsed successfully:", payload.email);
        
        return {
          success: true,
          user: payload,
          credential: credential,
        };
      } catch (parseError) {
        console.error("Error parsing JWT:", parseError);
        return {
          success: false,
          error: 'Failed to parse Google credential: ' + parseError.message,
        };
      }
    } catch (error) {
      console.error("General error in handleCredentialResponse:", error);
      return {
        success: false,
        error: 'Failed to process Google credential: ' + error.message,
      };
    }
  }

  parseJWT(token) {
    try {
      console.log("Parsing JWT token...");
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const payload = JSON.parse(jsonPayload);
      console.log("JWT parsed successfully, email:", payload.email);
      return payload;
    } catch (error) {
      console.error("Error parsing JWT:", error);
      throw new Error('Invalid JWT token: ' + error.message);
    }
  }

  async signInWithGoogle(userType = 'client', clientType = 'general') {
    console.log("Starting Google Sign-In process...");
    
    return new Promise(async (resolve) => {
      const handleGoogleResponse = async (response) => {
        try {
          console.log("Google credential received:", response ? "yes" : "no");
          if (response && response.credential) {
            console.log("Credential length:", response.credential.length);
            console.log("Credential preview:", response.credential.substring(0, 20) + "...");
          }
          
          const credentialResponse = await this.handleCredentialResponse(response);
          console.log("Credential processed:", credentialResponse);
          
          if (!credentialResponse.success) {
            console.log("Credential processing failed:", credentialResponse.error);
            resolve(credentialResponse);
            return;
          }
  
          console.log("About to call authService.googleAuth with credential");
          try {
            const authResponse = await authService.googleAuth(
              response.credential,
              userType,
              clientType
            );
            console.log("Auth response received:", authResponse);
            resolve(authResponse);
          } catch (authError) {
            console.error("Error in authService.googleAuth:", authError);
            resolve({
              success: false,
              error: 'Error calling backend: ' + (authError.message || 'Unknown error'),
            });
          }
        } catch (error) {
          console.error("Error in Google auth flow:", error);
          resolve({
            success: false,
            error: 'Google authentication failed: ' + (error.message || 'Unknown error'),
          });
        }
      };
      
      if (!this.isInitialized) {
        await this.initializeGoogleAuth(handleGoogleResponse);
        console.log("Google Auth initialized:", this.isInitialized);
      } else {
        this.googleAuthCallback = handleGoogleResponse;
      }

      window.google.accounts.id.prompt((notification) => {
        console.log("Google prompt notification:", notification);
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          console.log("Google Sign-In was cancelled or not displayed");
          resolve({
            success: false,
            error: 'Google Sign-In was cancelled or not displayed',
          });
        }
      });
    });
  }
  
  async registerWithGoogle(userType = 'client', clientType = 'general', phoneNumber = '') {
    console.log("Starting Google Registration process...");
    
    return new Promise(async (resolve) => {
      const handleGoogleResponse = async (response) => {
        try {
          console.log("Google credential received for registration:", response ? "yes" : "no");
          if (response && response.credential) {
            console.log("Registration credential length:", response.credential.length);
            console.log("Registration credential preview:", response.credential.substring(0, 20) + "...");
          }
          
          const credentialResponse = await this.handleCredentialResponse(response);
          console.log("Registration credential processed:", credentialResponse);
          
          if (!credentialResponse.success) {
            console.log("Registration credential processing failed:", credentialResponse.error);
            resolve(credentialResponse);
            return;
          }

          console.log("About to call authService.googleRegister with credential");
          try {
            const authResponse = await authService.googleRegister(
              response.credential,
              userType,
              clientType,
              phoneNumber
            );
            console.log("Registration response received:", authResponse);
            resolve(authResponse);
          } catch (authError) {
            console.error("Error in authService.googleRegister:", authError);
            resolve({
              success: false,
              error: 'Error calling backend for registration: ' + (authError.message || 'Unknown error'),
            });
          }
        } catch (error) {
          console.error("Error in Google registration flow:", error);
          resolve({
            success: false,
            error: 'Google registration failed: ' + (error.message || 'Unknown error'),
          });
        }
      };
      
      if (!this.isInitialized) {
        await this.initializeGoogleAuth(handleGoogleResponse);
        console.log("Google Auth initialized for registration:", this.isInitialized);
      } else {
        this.googleAuthCallback = handleGoogleResponse;
      }

      window.google.accounts.id.prompt((notification) => {
        console.log("Google prompt notification for registration:", notification);
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          console.log("Google Sign-In for registration was cancelled or not displayed");
          resolve({
            success: false,
            error: 'Google Sign-In was cancelled or not displayed',
          });
        }
      });
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
    console.log("Starting Google Account Linking process...");
    
    return new Promise(async (resolve) => {
      const handleGoogleResponse = async (response) => {
        try {
          console.log("Google credential received for account linking:", response ? "yes" : "no");
          if (response && response.credential) {
            console.log("Account linking credential length:", response.credential.length);
          }
          
          console.log("About to call authService.linkSocialAccount with credential");
          try {
            const linkResponse = await authService.linkSocialAccount('google', response.credential);
            console.log("Account linking response received:", linkResponse);
            resolve(linkResponse);
          } catch (authError) {
            console.error("Error in authService.linkSocialAccount:", authError);
            resolve({
              success: false,
              error: 'Error linking account: ' + (authError.message || 'Unknown error'),
            });
          }
        } catch (error) {
          console.error("Error in Google account linking flow:", error);
          resolve({
            success: false,
            error: 'Failed to link Google account: ' + (error.message || 'Unknown error'),
          });
        }
      };
      
      if (!this.isInitialized) {
        await this.initializeGoogleAuth(handleGoogleResponse);
        console.log("Google Auth initialized for account linking:", this.isInitialized);
      } else {
        this.googleAuthCallback = handleGoogleResponse;
      }

      window.google.accounts.id.prompt((notification) => {
        console.log("Google prompt notification for account linking:", notification);
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          console.log("Google Sign-In for account linking was cancelled or not displayed");
          resolve({
            success: false,
            error: 'Google Sign-In was cancelled or not displayed',
          });
        }
      });
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
