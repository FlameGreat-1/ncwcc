import { useState } from 'react';
import { useRegister } from '../../../hooks/useAuth';
import { useTheme } from '../../../contexts/ThemeContext';
import { validateEmail, validatePassword, validatePhoneNumber } from '../../../utils/auth';
import LoadingSpinner from '../../common/LoadingSpinner';
import GoogleAuthButton from './GoogleAuthButton';

const RegisterForm = ({ 
  onSuccess, 
  onError,
  userType = 'client',
  clientType = 'general',
  className = '' 
}) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const { registerUser, loading, error, setError } = useRegister();
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

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    } else if (formData.first_name.trim().length < 2) {
      newErrors.first_name = 'First name must be at least 2 characters';
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    } else if (formData.last_name.trim().length < 2) {
      newErrors.last_name = 'Last name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone_number && !validatePhoneNumber(formData.phone_number)) {
      newErrors.phone_number = 'Please enter a valid phone number';
    }

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

    if (!acceptTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const response = await registerUser({
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      email: formData.email.trim(),
      phone_number: formData.phone_number.trim(),
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
      onError?.(response.error || 'Registration failed');
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label 
              htmlFor="first_name" 
              className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
            >
              First Name
            </label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              autoComplete="given-name"
              required
              value={formData.first_name}
              onChange={handleInputChange}
              placeholder="Enter your first name"
              className={`${inputClasses} ${errors.first_name ? errorInputClasses : ''}`}
              disabled={loading}
            />
            {errors.first_name && (
              <p className="mt-2 text-sm text-red-500 font-medium">{errors.first_name}</p>
            )}
          </div>

          <div>
            <label 
              htmlFor="last_name" 
              className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
            >
              Last Name
            </label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              autoComplete="family-name"
              required
              value={formData.last_name}
              onChange={handleInputChange}
              placeholder="Enter your last name"
              className={`${inputClasses} ${errors.last_name ? errorInputClasses : ''}`}
              disabled={loading}
            />
            {errors.last_name && (
              <p className="mt-2 text-sm text-red-500 font-medium">{errors.last_name}</p>
            )}
          </div>
        </div>

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
            htmlFor="phone_number" 
            className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
          >
            Phone Number <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            id="phone_number"
            name="phone_number"
            type="tel"
            autoComplete="tel"
            value={formData.phone_number}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            className={`${inputClasses} ${errors.phone_number ? errorInputClasses : ''}`}
            disabled={loading}
          />
          {errors.phone_number && (
            <p className="mt-2 text-sm text-red-500 font-medium">{errors.phone_number}</p>
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
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a strong password"
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
            Confirm Password
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
              placeholder="Confirm your password"
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

        <div className="flex items-start space-x-3">
          <input
            id="accept_terms"
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            disabled={loading}
          />
          <label 
            htmlFor="accept_terms" 
            className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
          >
            I agree to the{' '}
            <a 
              href="/terms" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`font-semibold hover:underline ${
                isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
              }`}
            >
              Terms of Service
            </a>
            {' '}and{' '}
            <a 
              href="/privacy" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`font-semibold hover:underline ${
                isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
              }`}
            >
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.terms && (
          <p className="text-sm text-red-500 font-medium">{errors.terms}</p>
        )}
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
              <span>Creating Account...</span>
            </div>
          ) : (
            'Create Account'
          )}
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className={`w-full border-t ${isDark ? 'border-gray-600' : 'border-gray-300'}`} />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className={`px-4 font-medium ${isDark ? 'bg-[#1a0f33] text-gray-400' : 'bg-white text-gray-500'}`}>
              Or sign up with
            </span>
          </div>
        </div>

        <GoogleAuthButton
          mode="register"
          userType={userType}
          clientType={clientType}
          phoneNumber={formData.phone_number}
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          disabled={loading}
          size="lg"
        />
      </div>
    </form>
  );
};

export default RegisterForm;
