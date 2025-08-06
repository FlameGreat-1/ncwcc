import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { redirectAfterLogin } from '../../utils/auth';
import RegisterForm from '../../components/accounts/forms/RegisterForm';

const Register = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { isAuthenticated, user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const userType = new URLSearchParams(location.search).get('type') || 'client';
  const clientType = new URLSearchParams(location.search).get('client_type') || 'general';

  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectPath = redirectAfterLogin(user.user_type);
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleRegisterSuccess = (response) => {
    if (response.requiresVerification) {
      navigate('/accounts/email-verification', { 
        state: { 
          email: response.user?.email,
          message: 'Please check your email and click the verification link to activate your account.'
        }
      });
    } else {
      const redirectPath = response.redirectTo || redirectAfterLogin(response.user.user_type);
      navigate(redirectPath, { replace: true });
    }
  };

  const handleRegisterError = (errorMessage) => {
    setError(errorMessage);
    setSuccess('');
  };

  const getPageTitle = () => {
    if (userType === 'staff') return 'Create Staff Account';
    if (userType === 'admin') return 'Create Admin Account';
    if (clientType === 'ndis') return 'Create NDIS Client Account';
    return 'Create Your Account';
  };

  const getPageDescription = () => {
    if (userType === 'staff') return 'Join our team with a staff account';
    if (userType === 'admin') return 'Create an administrator account';
    if (clientType === 'ndis') return 'Register as an NDIS participant';
    return 'Join thousands of satisfied clients';
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
      isDark ? 'bg-[#180c2e]' : 'bg-gray-50'
    }`}>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <img
              src="/logo.svg"
              alt="NSWCC Logo"
              className="h-12 w-auto mx-auto"
            />
          </Link>
          <h2 className={`mt-6 text-3xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {getPageTitle()}
          </h2>
          <p className={`mt-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {getPageDescription()}
          </p>
        </div>

        <div className="card-modern">
          {success && (
            <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200">
              <p className="text-sm text-green-600 font-medium">{success}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          )}

          <RegisterForm
            onSuccess={handleRegisterSuccess}
            onError={handleRegisterError}
            userType={userType}
            clientType={clientType}
          />
        </div>

        <div className="text-center">
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Already have an account?{' '}
            <Link
              to={`/accounts/login${userType !== 'client' ? `?type=${userType}` : ''}${
                clientType !== 'general' ? `${userType !== 'client' ? '&' : '?'}client_type=${clientType}` : ''
              }`}
              className={`font-semibold transition-colors hover:underline ${
                isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
              }`}
            >
              Sign in here
            </Link>
          </p>
        </div>

        <div className="text-center">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:underline ${
              isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-400'
            }`}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
