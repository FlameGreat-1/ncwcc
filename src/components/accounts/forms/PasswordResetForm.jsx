import { useState } from 'react';
import { usePasswordReset } from '../../../hooks/useAuth';
import { useTheme } from '../../../contexts/ThemeContext';
import { validateEmail } from '../../../utils/auth';
import LoadingSpinner from '../../common/LoadingSpinner';

const PasswordResetForm = ({ 
  onSuccess, 
  onError,
  onBackToLogin,
  className = '' 
}) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const { requestReset, loading, error, success, setError } = usePasswordReset();
  const { isDark } = useTheme();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const response = await requestReset(email.trim());

    if (response.success) {
      onSuccess?.(response);
    } else {
      onError?.(response.error || 'Password reset request failed');
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

  if (success) {
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
            Check Your Email
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            If you don't see the email, check your spam folder or try again.
          </p>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => {
              setEmail('');
              setErrors({});
              setError(null);
            }}
            className="w-full btn-modern-secondary btn-md"
          >
            Send Another Email
          </button>

          {onBackToLogin && (
            <button
              type="button"
              onClick={onBackToLogin}
              className={`w-full text-sm font-semibold transition-colors hover:underline ${
                isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
              }`}
            >
              Back to Sign In
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
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
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-3.586l4.293-4.293a1 1 0 011.414 0L10 14l4-4a6 6 0 016-6z" 
              />
            </svg>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Reset Your Password
          </h2>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
      </div>

      <div className="space-y-4">
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
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200">
          <p className="text-sm text-red-600 font-medium">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-modern-primary btn-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <LoadingSpinner size="sm" color="white" />
              <span>Sending Reset Link...</span>
            </div>
          ) : (
            'Send Reset Link'
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
  );
};

export default PasswordResetForm;
