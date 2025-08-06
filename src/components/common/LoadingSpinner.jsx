import { useState, useEffect } from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  variant = 'branded',
  color = 'primary', 
  text = '',
  className = ''
}) => {
  const logoSizeClasses = {
    xs: { container: 'w-12 h-12', logo: 'w-8 h-8', ring: 'w-12 h-12' },
    sm: { container: 'w-16 h-16', logo: 'w-10 h-10', ring: 'w-16 h-16' },
    md: { container: 'w-20 h-20', logo: 'w-12 h-12', ring: 'w-20 h-20' },
    lg: { container: 'w-28 h-28', logo: 'w-16 h-16', ring: 'w-28 h-28' },
    xl: { container: 'w-32 h-32', logo: 'w-20 h-20', ring: 'w-32 h-32' },
    '2xl': { container: 'w-40 h-40', logo: 'w-24 h-24', ring: 'w-40 h-40' }
  };

  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
    '2xl': 'w-16 h-16'
  };
  
  const colorClasses = {
    primary: 'border-[#006da6]',
    white: 'border-white',
    gray: 'border-gray-400',
    black: 'border-black',
    gradient: 'border-transparent'
  };

  const BrandedSpinner = () => {
    const sizes = logoSizeClasses[size];
    
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className={`relative flex items-center justify-center ${sizes.container}`}>
          <img
            src="/logo.svg"
            alt="NSWCC Logo"
            className={`${sizes.logo} object-contain z-10 filter drop-shadow-lg`}
          />
          <div 
            className={`absolute top-0 left-0 ${sizes.ring} border-2 border-transparent border-t-[#006da6] border-r-[#0080c7] rounded-full animate-spin`}
            style={{ animationDuration: '2s' }}
          ></div>
          <div 
            className={`absolute top-0 left-0 ${sizes.ring} border-2 border-transparent border-b-[#180c2e] border-l-[#2d1b4e] rounded-full animate-spin`}
            style={{ animationDuration: '3s', animationDirection: 'reverse' }}
          ></div>
        </div>
        {text && (
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 animate-pulse">
            {text}
          </p>
        )}
      </div>
    );
  };

  const ClassicSpinner = () => (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className={`animate-spin rounded-full border-2 border-transparent ${sizeClasses[size]} ${
        color === 'gradient' 
          ? 'border-t-[#006da6] border-r-[#0080c7] border-b-[#180c2e]' 
          : `border-t-current ${colorClasses[color]}`
      }`}></div>
      {text && (
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {text}
        </p>
      )}
    </div>
  );

  const PulseSpinner = () => (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-r from-[#006da6] to-[#180c2e] animate-pulse`}></div>
      {text && (
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {text}
        </p>
      )}
    </div>
  );

  const DotsSpinner = () => (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-[#006da6] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-[#0080c7] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-[#180c2e] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      {text && (
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {text}
        </p>
      )}
    </div>
  );

  const renderSpinner = () => {
    switch (variant) {
      case 'branded':
        return <BrandedSpinner />;
      case 'classic':
        return <ClassicSpinner />;
      case 'pulse':
        return <PulseSpinner />;
      case 'dots':
        return <DotsSpinner />;
      default:
        return <BrandedSpinner />;
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {renderSpinner()}
    </div>
  );
};

export default LoadingSpinner;
