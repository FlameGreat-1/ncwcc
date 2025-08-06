import { useState } from 'react';
import { useLogin } from '../../../hooks/useAuth';
import { useTheme } from '../../../contexts/ThemeContext';
import { validateEmail } from '../../../utils/auth';
import LoadingSpinner from '../../common/LoadingSpinner';
import GoogleAuthButton from './GoogleAuthButton';

const LoginForm = ({ 
  onSuccess, 
  onError, 
  onForgotPassword,
  userType = 'client',
  clientType = 'general',
  className = '' 
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const { loginUser, loading, error, setError } = useLogin();
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

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const response = await loginUser({
      email: formData.email.trim(),
      password: formData.password,
      user_type: userType,
      client_type: clientType
    });

    if (response.success) {
      onSuccess?.(response);
    } else {
      if (response.errors) {
        setErrors(response.errors);
      }
      onError?.(response.error || 'Login failed');
    }
  };

  const handleGoogleSuccess = (response) => {
    onSuccess?.(response);
  };

  const handleGoogleError = (error) => {
    onError?.(error);
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

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
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
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            className={`${inputClasses} ${errors.email ? errorInputClasses : ''}`}
            disabled={loading}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-500 font-medium">{errors.email}</p>
          )}
        </div>

        <div>
          <label 
            htmlFor="password" 
            className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
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
      </div>

      {(error || errors.non_field_errors) && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200">
          <p className="text-sm text-red-600 font-medium">
            {error || errors.non_field_errors}
          </p>
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
              <span>Signing In...</span>
            </div>
          ) : (
            'Sign In'
          )}
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className={`w-full border-t ${isDark ? 'border-gray-600' : 'border-gray-300'}`} />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className={`px-4 font-medium ${isDark ? 'bg-[#1a0f33] text-gray-400' : 'bg-white text-gray-500'}`}>
              Or continue with
            </span>
          </div>
        </div>

        <GoogleAuthButton
          mode="login"
          userType={userType}
          clientType={clientType}
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          disabled={loading}
          size="lg"
        />
      </div>

      {onForgotPassword && (
        <div className="text-center">
          <button
            type="button"
            onClick={onForgotPassword}
            className={`text-sm font-semibold transition-colors hover:underline ${
              isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
            }`}
            disabled={loading}
          >
            Forgot your password?
          </button>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
