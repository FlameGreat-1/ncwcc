import { useState, useEffect } from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  variant = 'branded',
  color = 'primary', 
  className = ''
}) => {
  const logoSizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
    '2xl': 'w-24 h-24'
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

  const BrandedSpinner = () => (
    <div className="relative flex items-center justify-center">
      <div className={`absolute animate-spin rounded-full border-2 border-transparent border-t-[#006da6] border-r-[#0080c7] ${logoSizeClasses[size]} opacity-60`} style={{ width: `calc(${logoSizeClasses[size].split(' ')[0].replace('w-', '')} * 0.25rem + 1rem)`, height: `calc(${logoSizeClasses[size].split(' ')[1].replace('h-', '')} * 0.25rem + 1rem)` }}></div>
      <img
        src="/logo.svg"
        alt="NSWCC Logo"
        className={`${logoSizeClasses[size]} object-contain animate-pulse`}
      />
    </div>
  );

  const ClassicSpinner = () => (
    <div className={`animate-spin rounded-full border-2 border-transparent ${sizeClasses[size]} ${
      color === 'gradient' 
        ? 'border-t-[#006da6] border-r-[#0080c7] border-b-[#180c2e]' 
        : `border-t-current ${colorClasses[color]}`
    }`}></div>
  );

  const renderSpinner = () => {
    switch (variant) {
      case 'branded':
        return <BrandedSpinner />;
      default:
        return <ClassicSpinner />;
    }
  };

  return <div className={className}>{renderSpinner()}</div>;
};

export default LoadingSpinner;
