import { useState } from 'react';
import { usePasswordReset } from '../../../hooks/useAuth';
import { useTheme } from '../../../contexts/ThemeContext';
import { validatePassword } from '../../../utils/auth';
import LoadingSpinner from '../../common/LoadingSpinner';

const PasswordResetConfirmForm = ({ 
  token,
  onSuccess, 
  onError,
  onBackToLogin,
  className = '' 
}) => {
  const [formData, setFormData] = useState({
    password: '',
    confirm_password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { confirmReset, loading, error, setError } = usePasswordReset();
  const { isDark } = useTheme();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (error) {
      setError(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        const errorMessages = [];
        if (passwordValidation.errors.minLength) errorMessages.push('at least 8 characters');
        if (passwordValidation.errors.hasUpperCase) errorMessages.push('one uppercase letter');
        if (passwordValidation.errors.hasLowerCase) errorMessages.push('one lowercase letter');
        if (passwordValidation.errors.hasNumbers) errorMessages.push('one number');
        newErrors.password = `Password must contain ${errorMessages.join(', ')}`;
      }
    }

    if (!formData.confirm_password) {
      newErrors.confirm_password = 'Please confirm your password';
    } else if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const response = await confirmReset(token, formData.password);

    if (response.success) {
      setIsSuccess(true);
      onSuccess?.(response);
    } else {
      onError?.(response.error || 'Password reset failed');
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

  if (isSuccess) {
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
            Password Reset Successful
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Your password has been successfully reset. You can now sign in with your new password.
          </p>
        </div>

        {onBackToLogin && (
          <button
            type="button"
            onClick={onBackToLogin}
            className="w-full btn-modern-primary btn-lg"
          >
            Sign In Now
          </button>
        )}
      </div>
    );
  }

  if (!token) {
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
            Invalid Reset Link
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            This password reset link is invalid or has expired. Please request a new one.
          </p>
        </div>

        {onBackToLogin && (
          <button
            type="button"
            onClick={onBackToLogin}
            className="w-full btn-modern-primary btn-lg"
          >
            Back to Sign In
          </button>
        )}
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
            Set New Password
          </h2>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Enter your new password below to complete the reset process.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label 
            htmlFor="password" 
            className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
          >
            New Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your new password"
              className={`${inputClasses} pr-12 ${errors.password ? errorInputClasses : ''}`}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg transition-colors ${
                isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
              }`}
              disabled={loading}
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-2 text-sm text-red-500 font-medium">{errors.password}</p>
          )}
        </div>

        <div>
          <label 
            htmlFor="confirm_password" 
            className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
          >
            Confirm New Password
          </label>
          <div className="relative">
            <input
              id="confirm_password"
              name="confirm_password"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              value={formData.confirm_password}
              onChange={handleInputChange}
              placeholder="Confirm your new password"
              className={`${inputClasses} pr-12 ${errors.confirm_password ? errorInputClasses : ''}`}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg transition-colors ${
                isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
              }`}
              disabled={loading}
            >
              {showConfirmPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {errors.confirm_password && (
            <p className="mt-2 text-sm text-red-500 font-medium">{errors.confirm_password}</p>
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
              <span>Resetting Password...</span>
            </div>
          ) : (
            'Reset Password'
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

export default PasswordResetConfirmForm;
