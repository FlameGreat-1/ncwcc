import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';

const BRAND_COLORS = {
  primary: '#1e40af',
  secondary: '#3b82f6', 
  accent: '#06b6d4',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444'
};

const Avatar = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg ring-2 ring-white dark:ring-gray-800 ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

const AvatarImage = React.forwardRef(({ className, src, alt, onError, onLoad, ...props }, ref) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const generateProfessionalAvatar = (name) => {
    const colors = ['4F46E5', '7C3AED', '2563EB', '0891B2', '059669', 'DC2626'];
    const backgrounds = ['F3F4F6', 'EEF2FF', 'F0F9FF', 'ECFDF5', 'FEF2F2'];
    const colorIndex = (name?.charCodeAt(0) || 0) % colors.length;
    const bgIndex = (name?.charCodeAt(1) || 0) % backgrounds.length;
    
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&size=128&background=${backgrounds[bgIndex]}&color=${colors[colorIndex]}&bold=true&format=svg`;
  };

  const finalSrc = src && !imgError ? src : generateProfessionalAvatar(alt);

  const handleError = (e) => {
    setImgError(true);
    if (onError) onError(e);
  };

  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  return (
    <img
      ref={ref}
      src={finalSrc}
      alt={alt || "Avatar"}
      className={`aspect-square h-full w-full object-cover transition-all duration-300 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className || ''}`}
      onError={handleError}
      onLoad={handleLoad}
      {...props}
    />
  );
});

const AvatarFallback = React.forwardRef(({ className, children, status, userName, ...props }, ref) => {
  const getStatusColor = () => {
    switch (status) {
      case 'online': return 'bg-emerald-500 shadow-emerald-500/50';
      case 'away': return 'bg-amber-500 shadow-amber-500/50';
      case 'busy': return 'bg-red-500 shadow-red-500/50';
      case 'offline': return 'bg-slate-400 shadow-slate-400/50';
      default: return 'bg-slate-400 shadow-slate-400/50';
    }
  };

  const getGradientForUser = (name) => {
    const gradients = [
      'from-blue-500 via-blue-600 to-blue-700',
      'from-purple-500 via-purple-600 to-purple-700',
      'from-emerald-500 via-emerald-600 to-emerald-700',
      'from-orange-500 via-orange-600 to-orange-700',
      'from-pink-500 via-pink-600 to-pink-700',
      'from-indigo-500 via-indigo-600 to-indigo-700',
      'from-teal-500 via-teal-600 to-teal-700',
      'from-rose-500 via-rose-600 to-rose-700'
    ];
    const index = (name?.charCodeAt(0) || 0) % gradients.length;
    return gradients[index];
  };

  return (
    <div
      ref={ref}
      className={`flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br ${getGradientForUser(userName)} text-white font-bold text-sm shadow-lg animate-in fade-in-0 zoom-in-0 duration-300 ${className || ''}`}
      {...props}
    >
      {children}
      {status && (
        <div className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-800 shadow-lg ${getStatusColor()}`}>
          <div className="absolute inset-0 rounded-full animate-ping opacity-75"></div>
        </div>
      )}
    </div>
  );
});

const ProfileAvatar = () => {
  const { user, logout, isVerified } = useAuth();
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const getInitials = () => {
    if (!user) return 'U';
    const firstName = user.first_name || '';
    const lastName = user.last_name || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U';
  };

  const getUserDisplayName = () => {
    if (!user) return 'User';
    return `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email || 'User';
  };

  const getStatusIndicator = () => {
    if (!user) return 'offline';
    if (isVerified) return 'online';
    return 'away';
  };

  const getStatusText = () => {
    if (!user) return 'Offline';
    if (isVerified) return 'Active';
    return 'Pending Verification';
  };

  const getStatusColor = () => {
    if (!user) return 'text-slate-500 dark:text-slate-400';
    if (isVerified) return 'text-emerald-600 dark:text-emerald-400';
    return 'text-amber-600 dark:text-amber-400';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <Avatar className="cursor-pointer hover:ring-blue-500/50 dark:hover:ring-blue-400/50" onClick={toggleDropdown}>
        <AvatarImage src={user.profile_image} alt={getUserDisplayName()} />
        <AvatarFallback status={getStatusIndicator()} userName={getUserDisplayName()}>
          {getInitials()}
        </AvatarFallback>
      </Avatar>

      {isOpen && (
        <div className={`absolute right-0 mt-3 w-80 rounded-2xl shadow-2xl border backdrop-blur-sm z-50 transform transition-all duration-200 ease-out ${isDark ? 'bg-gray-900/95 border-gray-700/50' : 'bg-white/95 border-gray-200/50'}`}>
          <div className="p-5">
            <div className="flex items-center space-x-4 mb-5">
              <Avatar className="h-14 w-14 ring-4 ring-blue-500/20">
                <AvatarImage src={user.profile_image} alt={getUserDisplayName()} />
                <AvatarFallback status={getStatusIndicator()} userName={getUserDisplayName()}>
                  <span className="text-lg font-bold">{getInitials()}</span>
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className={`font-bold text-lg truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {user.first_name} {user.last_name}
                </p>
                <p className={`text-sm truncate ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {user.email}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className={`h-2.5 w-2.5 rounded-full shadow-sm ${getStatusIndicator() === 'online' ? 'bg-emerald-500 shadow-emerald-500/50' : getStatusIndicator() === 'away' ? 'bg-amber-500 shadow-amber-500/50' : 'bg-slate-400 shadow-slate-400/50'}`}>
                    <div className="absolute inset-0 rounded-full animate-pulse opacity-75"></div>
                  </div>
                  <span className={`text-sm font-semibold ${getStatusColor()}`}>
                    {getStatusText()}
                  </span>
                </div>
              </div>
            </div>

            <div className={`border-t pt-4 ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
              <div className="space-y-2">
                <div className={`px-4 py-3 rounded-xl ${isDark ? 'bg-blue-900/30 border border-blue-800/30' : 'bg-blue-50/80 border border-blue-200/50'}`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                      Account Type
                    </span>
                    <span className={`text-xs px-3 py-1.5 rounded-full font-bold ${isDark ? 'bg-blue-800/50 text-blue-200 border border-blue-700/50' : 'bg-blue-100 text-blue-800 border border-blue-200'}`}>
                      {user.client_type === 'ndis' ? 'NDIS Client' : 'General Client'}
                    </span>
                  </div>
                </div>

                {!isVerified && (
                  <div className={`px-4 py-3 rounded-xl ${isDark ? 'bg-amber-900/30 border border-amber-800/30' : 'bg-amber-50/80 border border-amber-200/50'}`}>
                    <div className="flex items-center space-x-3">
                      <svg className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <span className={`text-sm font-medium ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
                        Email verification pending
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={`border-t pt-4 mt-4 ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
              <div className="space-y-1">
                <Link
                  to="/accounts/profile"
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isDark ? 'hover:bg-gray-800/50 text-gray-300 hover:text-white border border-transparent hover:border-gray-700/50' : 'hover:bg-gray-100/80 text-gray-700 hover:text-gray-900 border border-transparent hover:border-gray-200/50'}`}
                  onClick={() => setIsOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-sm font-semibold">Profile Settings</span>
                </Link>

                <Link
                  to="/accounts/password-change"
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isDark ? 'hover:bg-gray-800/50 text-gray-300 hover:text-white border border-transparent hover:border-gray-700/50' : 'hover:bg-gray-100/80 text-gray-700 hover:text-gray-900 border border-transparent hover:border-gray-200/50'}`}
                  onClick={() => setIsOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2m0 0V7a2 2 0 012-2m0 0V5a2 2 0 012-2h4a2 2 0 012 2v2M9 7h6" />
                  </svg>
                  <span className="text-sm font-semibold">Change Password</span>
                </Link>

                <Link
                  to="/accounts/settings"
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isDark ? 'hover:bg-gray-800/50 text-gray-300 hover:text-white border border-transparent hover:border-gray-700/50' : 'hover:bg-gray-100/80 text-gray-700 hover:text-gray-900 border border-transparent hover:border-gray-200/50'}`}
                  onClick={() => setIsOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-semibold">Account Settings</span>
                </Link>
              </div>
            </div>

            <div className={`border-t pt-4 mt-4 ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
              <button
                onClick={handleLogout}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 w-full text-left ${isDark ? 'hover:bg-red-900/30 text-red-400 hover:text-red-300 border border-transparent hover:border-red-800/50' : 'hover:bg-red-50/80 text-red-600 hover:text-red-700 border border-transparent hover:border-red-200/50'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="text-sm font-semibold">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;

