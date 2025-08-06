import { useState, useEffect } from 'react';
import { useEmailVerification } from '../../../hooks/useAuth';
import { useTheme } from '../../../contexts/ThemeContext';
import { validateEmail } from '../../../utils/auth';
import LoadingSpinner from '../../common/LoadingSpinner';

const EmailVerificationForm = ({ 
  token,
  userEmail,
  onSuccess, 
  onError,
  onBackToLogin,
  className = '' 
}) => {
  const [email, setEmail] = useState(userEmail || '');
  const [errors, setErrors] = useState({});
  const [isVerified, setIsVerified] = useState(false);
  const [autoVerifying, setAutoVerifying] = useState(!!token);

  const { verifyEmail, resendVerification, loading, error, setError } = useEmailVerification();
  const { isDark } = useTheme();

  useEffect(() => {
    if (token) {
      handleTokenVerification();
    }
  }, [token]);

  const handleTokenVerification = async () => {
    setAutoVerifying(true);
    
    const response = await verifyEmail(token);
    
    if (response.success) {
      setIsVerified(true);
      onSuccess?.(response);
    } else {
      onError?.(response.error || 'Email verification failed');
    }
    
    setAutoVerifying(false);
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
    if (error) {
      setError(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResendVerification = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const response = await resendVerification(email.trim());

    if (response.success) {
      onSuccess?.(response);
    } else {
      onError?.(response.error || 'Failed to resend verification email');
    }
  };

  const inputClasses = `
    w-full px-4 py-3 rounded-xl border-2 transition-all duration-300
    bg-transparent font-medium placeholder-gray-400
    focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:scale-[1.02]
    ${isDark 
      ? 'border-gray-600 text-white focus:border-blue-400' 
      : 'border-gray-300 text-gray-900 focus:border-blue-500'
    }
  `;

  const errorInputClasses = `
    border-red-500 focus:border-red-500 focus:ring-red-500/20
  `;

  if (autoVerifying) {
    return (
      <div className={`text-center space-y-6 ${className}`}>
        <div className="flex justify-center">
          <LoadingSpinner size="lg" variant="branded" />
        </div>

        <div className="space-y-3">
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Verifying Your Email
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Please wait while we verify your email address...
          </p>
        </div>
      </div>
    );
  }

  if (isVerified) {
    return (
      <div className={`text-center space-y-6 ${className}`}>
        <div className="flex justify-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            isDark ? 'bg-green-900/30' : 'bg-green-100'
          }`}>
            <svg 
              className={`w-8 h-8 ${isDark ? 'text-green-400' : 'text-green-600'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Email Verified Successfully
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Your email address has been verified. You can now access all features of your account.
          </p>
        </div>

        {onBackToLogin && (
          <button
            type="button"
            onClick={onBackToLogin}
            className="w-full btn-modern-primary btn-lg"
          >
            Continue to Dashboard
          </button>
        )}
      </div>
    );
  }

  if (token && !isVerified) {
    return (
      <div className={`text-center space-y-6 ${className}`}>
        <div className="flex justify-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            isDark ? 'bg-red-900/30' : 'bg-red-100'
          }`}>
            <svg 
              className={`w-8 h-8 ${isDark ? 'text-red-400' : 'text-red-600'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Verification Failed
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            This verification link is invalid or has expired. Please request a new verification email.
          </p>
        </div>

        <form onSubmit={handleResendVerification} className="space-y-4">
          <div>
            <label 
              htmlFor="email" 
              className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              className={`${inputClasses} ${errors.email ? errorInputClasses : ''}`}
              disabled={loading}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500 font-medium">{errors.email}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-modern-primary btn-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <LoadingSpinner size="sm" color="white" />
                <span>Sending Verification Email...</span>
              </div>
            ) : (
              'Send New Verification Email'
            )}
          </button>
        </form>

        {onBackToLogin && (
          <button
            type="button"
            onClick={onBackToLogin}
            className={`w-full text-sm font-semibold transition-colors hover:underline ${
              isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
            }`}
            disabled={loading}
          >
            Back to Sign In
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            isDark ? 'bg-blue-900/30' : 'bg-blue-100'
          }`}>
            <svg 
              className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
              />
            </svg>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Verify Your Email
          </h2>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            We've sent a verification email to your address. Please check your inbox and click the verification link.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200">
          <p className="text-sm text-red-600 font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleResendVerification} className="space-y-4">
        <div>
          <label 
            htmlFor="email" 
            className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            className={`${inputClasses} ${errors.email ? errorInputClasses : ''}`}
            disabled={loading}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-500 font-medium">{errors.email}</p>
          )}
        </div>

        <div className="space-y-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-modern-secondary btn-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <LoadingSpinner size="sm" color="primary" />
                <span>Sending Verification Email...</span>
              </div>
            ) : (
              'Resend Verification Email'
            )}
          </button>

          {onBackToLogin && (
            <button
              type="button"
              onClick={onBackToLogin}
              className={`w-full text-sm font-semibold transition-colors hover:underline ${
                isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
              }`}
              disabled={loading}
            >
              Back to Sign In
            </button>
          )}
        </div>
      </form>

      <div className={`text-center text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        <p>
          Didn't receive the email? Check your spam folder or try resending.
        </p>
      </div>
    </div>
  );
};

export default EmailVerificationForm;
 
