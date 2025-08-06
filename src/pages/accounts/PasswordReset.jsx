import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import PasswordResetForm from '../../components/accounts/forms/PasswordResetForm';
import PasswordResetConfirmForm from '../../components/accounts/forms/PasswordResetConfirmForm';

const PasswordReset = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [mode, setMode] = useState('request');
  
  const { isAuthenticated, user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    if (token) {
      setMode('confirm');
    } else {
      setMode('request');
    }
  }, [token]);

  const handleResetSuccess = (response) => {
    if (mode === 'request') {
      setSuccess('Password reset email sent successfully! Please check your inbox.');
      setError('');
    } else {
      setSuccess('Password reset successful!');
      setError('');
      setTimeout(() => {
        navigate('/accounts/login?message=password_reset_success', { replace: true });
      }, 2000);
    }
  };

  const handleResetError = (errorMessage) => {
    setError(errorMessage);
    setSuccess('');
  };

  const handleBackToLogin = () => {
    navigate('/accounts/login');
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

          {mode === 'request' ? (
            <PasswordResetForm
              onSuccess={handleResetSuccess}
              onError={handleResetError}
              onBackToLogin={handleBackToLogin}
            />
          ) : (
            <PasswordResetConfirmForm
              token={token}
              onSuccess={handleResetSuccess}
              onError={handleResetError}
              onBackToLogin={handleBackToLogin}
            />
          )}
        </div>

        <div className="text-center">
          <Link
            to="/accounts/login"
            className={`text-sm font-medium transition-colors hover:underline ${
              isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-400'
            }`}
          >
            ← Back to Sign In
          </Link>
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

export default PasswordReset;
