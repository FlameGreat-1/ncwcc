import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { redirectAfterLogin } from '../../utils/auth';
import EmailVerificationForm from '../../components/accounts/forms/EmailVerificationForm';

const EmailVerification = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { isAuthenticated, user, isVerified } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');
  const userEmail = location.state?.email || user?.email || '';
  const message = location.state?.message || '';

  useEffect(() => {
    if (isAuthenticated && user && isVerified) {
      const redirectPath = redirectAfterLogin(user.user_type);
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, isVerified, navigate]);

  useEffect(() => {
    if (message) {
      setSuccess(message);
    }
  }, [message]);

  const handleVerificationSuccess = (response) => {
    if (token) {
      setSuccess('Email verified successfully!');
      setError('');
      setTimeout(() => {
        if (isAuthenticated && user) {
          const redirectPath = redirectAfterLogin(user.user_type);
          navigate(redirectPath, { replace: true });
        } else {
          navigate('/accounts/login?message=email_verified', { replace: true });
        }
      }, 2000);
    } else {
      setSuccess('Verification email sent successfully! Please check your inbox.');
      setError('');
    }
  };

  const handleVerificationError = (errorMessage) => {
    setError(errorMessage);
    setSuccess('');
  };

  const handleBackToLogin = () => {
    if (isAuthenticated && user) {
      const redirectPath = redirectAfterLogin(user.user_type);
      navigate(redirectPath, { replace: true });
    } else {
      navigate('/accounts/login');
    }
  };

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

          <EmailVerificationForm
            token={token}
            userEmail={userEmail}
            onSuccess={handleVerificationSuccess}
            onError={handleVerificationError}
            onBackToLogin={handleBackToLogin}
          />
        </div>

        {!token && (
          <div className="text-center">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Need help?{' '}
              <Link
                to="/accounts/login"
                className={`font-semibold transition-colors hover:underline ${
                  isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
                }`}
              >
                Back to Sign In
              </Link>
            </p>
          </div>
        )}

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

export default EmailVerification;
