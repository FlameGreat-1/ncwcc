import { useState, useEffect } from 'react';

const LoadingSpinner = ({ 
  size = 'nano', 
  variant = 'branded',
  color = 'primary', 
  text = '',
  className = ''
}) => {
  const logoSizeStyles = {
    nano: { 
      container: { width: '10px', height: '10px' }, 
      logo: { width: '6px', height: '6px' }, 
      ring: { width: '10px', height: '10px' } 
    },
    micro: { 
      container: { width: '12px', height: '12px' }, 
      logo: { width: '8px', height: '8px' }, 
      ring: { width: '12px', height: '12px' } 
    },
    tiny: { 
      container: { width: '16px', height: '16px' }, 
      logo: { width: '10px', height: '10px' }, 
      ring: { width: '16px', height: '16px' } 
    }
  };

  const sizeStyles = {
    nano: { width: '4px', height: '4px' },
    micro: { width: '6px', height: '6px' },
    tiny: { width: '8px', height: '8px' }
  };
  
  const colorClasses = {
    primary: '#006da6',
    white: '#ffffff',
    gray: '#9ca3af',
    black: '#000000'
  };

  const BrandedSpinner = () => {
    const sizes = logoSizeStyles[size];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ 
          position: 'relative', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          ...sizes.container
        }}>
          <img
            src="/logo.svg"
            alt="NSWCC Logo"
            style={{
              ...sizes.logo,
              objectFit: 'contain',
              zIndex: 10
            }}
          />
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              ...sizes.ring,
              border: '0.5px solid transparent',
              borderTopColor: '#006da6',
              borderRightColor: '#0080c7',
              borderRadius: '50%',
              animation: 'spin 2s linear infinite'
            }}
          ></div>
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              ...sizes.ring,
              border: '0.5px solid transparent',
              borderBottomColor: '#180c2e',
              borderLeftColor: '#2d1b4e',
              borderRadius: '50%',
              animation: 'spin 3s linear infinite reverse'
            }}
          ></div>
        </div>
        {text && (
          <p style={{ 
            fontSize: '8px', 
            fontWeight: '500', 
            color: '#6b7280', 
            marginTop: '2px',
            animation: 'pulse 2s ease-in-out infinite'
          }}>
            {text}
          </p>
        )}
      </div>
    );
  };

  const ClassicSpinner = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        ...sizeStyles[size],
        border: '0.5px solid transparent',
        borderTopColor: colorClasses[color] || '#006da6',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      {text && (
        <p style={{ 
          fontSize: '8px', 
          fontWeight: '500', 
          color: '#6b7280', 
          marginTop: '2px'
        }}>
          {text}
        </p>
      )}
    </div>
  );

  const PulseSpinner = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        ...sizeStyles[size],
        borderRadius: '50%',
        background: 'linear-gradient(to right, #006da6, #180c2e)',
        animation: 'pulse 2s ease-in-out infinite'
      }}></div>
      {text && (
        <p style={{ 
          fontSize: '8px', 
          fontWeight: '500', 
          color: '#6b7280', 
          marginTop: '2px'
        }}>
          {text}
        </p>
      )}
    </div>
  );

  const DotsSpinner = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', gap: '1px' }}>
        <div style={{
          width: '2px',
          height: '2px',
          backgroundColor: '#006da6',
          borderRadius: '50%',
          animation: 'bounce 1.4s ease-in-out infinite',
          animationDelay: '0ms'
        }}></div>
        <div style={{
          width: '2px',
          height: '2px',
          backgroundColor: '#0080c7',
          borderRadius: '50%',
          animation: 'bounce 1.4s ease-in-out infinite',
          animationDelay: '150ms'
        }}></div>
        <div style={{
          width: '2px',
          height: '2px',
          backgroundColor: '#180c2e',
          borderRadius: '50%',
          animation: 'bounce 1.4s ease-in-out infinite',
          animationDelay: '300ms'
        }}></div>
      </div>
      {text && (
        <p style={{ 
          fontSize: '8px', 
          fontWeight: '500', 
          color: '#6b7280', 
          marginTop: '2px'
        }}>
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
