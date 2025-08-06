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
  const [currentStep, setCurrentStep] = useState(1);
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
  const [focusedFields, setFocusedFields] = useState({});

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

  const handleFocus = (fieldName) => {
    setFocusedFields(prev => ({ ...prev, [fieldName]: true }));
  };

  const handleBlur = (fieldName) => {
    if (!formData[fieldName]) {
      setFocusedFields(prev => ({ ...prev, [fieldName]: false }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
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

    if (formData.phone_number && !validatePhoneNumber(formData.phone_number)) {
      newErrors.phone_number = 'Please enter a valid phone number';
    }

    // if (!acceptTerms) {
    //   newErrors.terms = 'You must accept the terms and conditions';
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1Continue = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) return;

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
    onError?.(error || 'Google registration failed. Please try again.');
  };

  const getInputClasses = (fieldName, hasError = false) => {
    const baseClasses = `
      w-full px-4 pt-6 pb-2 rounded-xl border-2 transition-all duration-300
      font-medium text-base
      focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500
      ${isDark 
        ? 'bg-gray-800 border-gray-600 text-white focus:border-blue-400' 
        : 'bg-white border-gray-300 text-black focus:border-blue-500'
      }
    `;
    
    const errorClasses = hasError ? `
      border-red-500 focus:border-red-500 focus:ring-red-500/20
    ` : '';

    return `${baseClasses} ${errorClasses}`.trim();
  };

  const getLabelClasses = (fieldName, hasError = false) => {
    const isActive = focusedFields[fieldName] || formData[fieldName];
    const baseClasses = `
      absolute left-4 transition-all duration-300 pointer-events-none font-medium
      ${isActive 
        ? 'top-2 text-xs' 
        : 'top-1/2 transform -translate-y-1/2 text-base'
      }
      ${hasError 
        ? 'text-red-500' 
        : isActive 
          ? (isDark ? 'text-blue-400' : 'text-blue-600')
          : (isDark ? 'text-gray-400' : 'text-gray-500')
      }
    `;
    
    return baseClasses.trim();
  };

  const renderStep1 = () => (
    <form onSubmit={handleStep1Continue} className="space-y-6">
      <div className="space-y-5">
        <div className="relative">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            onFocus={() => handleFocus('email')}
            onBlur={() => handleBlur('email')}
            className={getInputClasses('email', errors.email)}
            disabled={loading}
          />
          <label 
            htmlFor="email" 
            className={getLabelClasses('email', errors.email)}
          >
            Email Address
          </label>
          {errors.email && (
            <p className="mt-2 text-sm text-red-500 font-medium">{errors.email}</p>
          )}
        </div>

        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            required
            value={formData.password}
            onChange={handleInputChange}
            onFocus={() => handleFocus('password')}
            onBlur={() => handleBlur('password')}
            className={`${getInputClasses('password', errors.password)} pr-12`}
            disabled={loading}
          />
          <label 
            htmlFor="password" 
            className={getLabelClasses('password', errors.password)}
          >
            Password
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg transition-colors z-10 ${
              isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'
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
          {errors.password && (
            <p className="mt-2 text-sm text-red-500 font-medium">{errors.password}</p>
          )}
        </div>

        <div className="relative">
          <input
            id="confirm_password"
            name="confirm_password"
            type={showConfirmPassword ? 'text' : 'password'}
            autoComplete="new-password"
            required
            value={formData.confirm_password}
            onChange={handleInputChange}
            onFocus={() => handleFocus('confirm_password')}
            onBlur={() => handleBlur('confirm_password')}
            className={`${getInputClasses('confirm_password', errors.confirm_password)} pr-12`}
            disabled={loading}
          />
          <label 
            htmlFor="confirm_password" 
            className={getLabelClasses('confirm_password', errors.confirm_password)}
          >
            Confirm Password
          </label>
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg transition-colors z-10 ${
              isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'
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
          {errors.confirm_password && (
            <p className="mt-2 text-sm text-red-500 font-medium">{errors.confirm_password}</p>
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
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <LoadingSpinner size="sm" color="white" />
              <span>Processing...</span>
            </div>
          ) : (
            'Continue'
          )}
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className={`w-full border-t ${isDark ? 'border-gray-600' : 'border-gray-300'}`} />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className={`px-4 font-medium ${isDark ? 'bg-gray-900 text-gray-300' : 'bg-white text-gray-600'}`}>
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

  const renderStep2 = () => (
    <form onSubmit={handleStep2Submit} className="space-y-6">
      <div className="mb-6">
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className={`flex items-center gap-2 text-base font-bold transition-all cursor-pointer hover:scale-105 p-2 rounded-lg ${
            isDark ? 'text-white hover:text-blue-400 hover:bg-gray-800' : 'text-black hover:text-blue-600 hover:bg-gray-100'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to previous step
        </button>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <input
              id="first_name"
              name="first_name"
              type="text"
              autoComplete="given-name"
              required
              value={formData.first_name}
              onChange={handleInputChange}
              onFocus={() => handleFocus('first_name')}
              onBlur={() => handleBlur('first_name')}
              className={getInputClasses('first_name', errors.first_name)}
              disabled={loading}
            />
            <label 
              htmlFor="first_name" 
              className={getLabelClasses('first_name', errors.first_name)}
            >
              First Name
            </label>
            {errors.first_name && (
              <p className="mt-2 text-sm text-red-500 font-medium">{errors.first_name}</p>
            )}
          </div>

          <div className="relative">
            <input
              id="last_name"
              name="last_name"
              type="text"
              autoComplete="family-name"
              required
              value={formData.last_name}
              onChange={handleInputChange}
              onFocus={() => handleFocus('last_name')}
              onBlur={() => handleBlur('last_name')}
              className={getInputClasses('last_name', errors.last_name)}
              disabled={loading}
            />
            <label 
              htmlFor="last_name" 
              className={getLabelClasses('last_name', errors.last_name)}
            >
              Last Name
            </label>
            {errors.last_name && (
              <p className="mt-2 text-sm text-red-500 font-medium">{errors.last_name}</p>
            )}
          </div>
        </div>

        <div className="relative">
          <input
            id="phone_number"
            name="phone_number"
            type="tel"
            autoComplete="tel"
            value={formData.phone_number}
            onChange={handleInputChange}
            onFocus={() => handleFocus('phone_number')}
            onBlur={() => handleBlur('phone_number')}
            className={getInputClasses('phone_number', errors.phone_number)}
            disabled={loading}
          />
          <label 
            htmlFor="phone_number" 
            className={getLabelClasses('phone_number', errors.phone_number)}
          >
            Phone Number (Optional)
          </label>
          {errors.phone_number && (
            <p className="mt-2 text-sm text-red-500 font-medium">{errors.phone_number}</p>
          )}
        </div>

        <div className="flex items-start gap-3 pt-2">
          <input
            id="accept_terms"
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className={`w-5 h-5 mt-1 text-blue-600 border-2 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer flex-shrink-0 ${
              isDark 
                ? 'bg-gray-800 border-gray-600' 
                : 'bg-white border-gray-300'
            }`}
            disabled={loading}
          />
          <label 
            htmlFor="accept_terms" 
            className={`text-base font-semibold cursor-pointer leading-relaxed select-none ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            I agree to the{' '}
            <a 
              href="/terms" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`font-bold hover:underline transition-colors ${
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
              className={`font-bold hover:underline transition-colors ${
                isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
              }`}
            >
              Privacy Policy
            </a>
          </label>
        </div>
      </div>

      {(error || errors.non_field_errors) && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200">
          <p className="text-sm text-red-600 font-medium">
            {error || errors.non_field_errors}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
    </form>
  );

  return (
    <div className={className}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              currentStep >= 1 
                ? 'bg-blue-600 text-white' 
                : isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <span className={`text-sm font-bold ${
              currentStep >= 1 
                ? isDark ? 'text-white' : 'text-black'
                : isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Account Details
            </span>
          </div>
          <div className={`flex-1 h-0.5 mx-4 ${
            currentStep >= 2 ? 'bg-blue-600' : isDark ? 'bg-gray-700' : 'bg-gray-200'
          }`} />
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              currentStep >= 2 
                ? 'bg-blue-600 text-white' 
                : isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
            <span className={`text-sm font-bold ${
              currentStep >= 2 
                ? isDark ? 'text-white' : 'text-black'
                : isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Personal Info
            </span>
          </div>
        </div>
      </div>

      {currentStep === 1 ? renderStep1() : renderStep2()}
    </div>
  );
};

export default RegisterForm;


        

