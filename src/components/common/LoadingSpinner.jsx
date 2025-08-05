import { useState, useEffect } from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  variant = 'branded',
  color = 'primary', 
  className = '',
  text = null,
  showBackground = false
}) => {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    if (variant === 'branded') {
      const interval = setInterval(() => {
        setAnimationPhase(prev => (prev + 1) % 3);
      }, 800);
      return () => clearInterval(interval);
    }
  }, [variant]);

  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
    '2xl': 'w-16 h-16'
  };

  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
  };

  const brandedSizeClasses = {
    xs: 'text-lg',
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
    '2xl': 'text-5xl'
  };
  
  const colorClasses = {
    primary: 'border-[#00FF66]',
    white: 'border-white',
    gray: 'border-gray-400',
    black: 'border-black',
    gradient: 'border-transparent'
  };

  const BrandedSpinner = () => (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-[#00FF66]/20 via-[#00e65a]/30 to-[#00cc52]/20 rounded-full blur-xl animate-pulse"></div>
        <div className="relative">
          <div 
            className={`font-black bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] bg-clip-text text-transparent ${brandedSizeClasses[size]} transition-all duration-800 transform-gpu`}
            style={{
              transform: `scale(${animationPhase === 0 ? 1 : animationPhase === 1 ? 1.2 : 0.8})`,
              filter: `brightness(${animationPhase === 1 ? 1.3 : 1})`,
            }}
          >
            NSCSS
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] bg-clip-text text-transparent opacity-50 blur-sm animate-pulse">
            <div className={`font-black ${brandedSizeClasses[size]}`}>NSCSS</div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-full transition-all duration-500 ${
              animationPhase === i ? 'scale-125 opacity-100' : 'scale-75 opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );

  const GradientSpinner = () => (
    <div className="relative">
      <div className="absolute -inset-2 bg-gradient-to-r from-[#00FF66]/30 via-[#00e65a]/40 to-[#00cc52]/30 rounded-full blur-lg animate-pulse"></div>
      <div className={`relative animate-spin rounded-full ${sizeClasses[size]}`}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] opacity-20"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00FF66] via-transparent to-transparent animate-spin" style={{ animationDuration: '1s' }}></div>
        <div className="absolute inset-1 rounded-full bg-white/90 backdrop-blur-sm"></div>
      </div>
    </div>
  );

  const PulseSpinner = () => (
    <div className="relative">
      <div className="absolute -inset-2 bg-gradient-to-r from-[#00FF66]/20 to-[#00cc52]/20 rounded-full blur-md animate-ping"></div>
      <div className={`${sizeClasses[size]} bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-full animate-pulse shadow-lg`}>
        <div className="w-full h-full bg-gradient-to-r from-white/30 to-transparent rounded-full animate-ping"></div>
      </div>
    </div>
  );

  const ClassicSpinner = () => (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF66]/30 to-[#00cc52]/30 rounded-full blur animate-pulse"></div>
      <div className={`animate-spin rounded-full border-2 border-transparent ${sizeClasses[size]} ${
        color === 'gradient' 
          ? 'border-t-[#00FF66] border-r-[#00e65a] border-b-[#00cc52]' 
          : `border-t-current ${colorClasses[color]}`
      }`}></div>
    </div>
  );

  const renderSpinner = () => {
    switch (variant) {
      case 'branded':
        return <BrandedSpinner />;
      case 'gradient':
        return <GradientSpinner />;
      case 'pulse':
        return <PulseSpinner />;
      default:
        return <ClassicSpinner />;
    }
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      {renderSpinner()}
      {text && (
        <div className="text-center">
          <span className={`font-black text-gray-900 ${textSizeClasses[size]} animate-pulse`}>
            {text}
          </span>
          <div className="flex justify-center mt-2">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1 h-1 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (showBackground) {
    return (
      <div className={`relative ${className}`}>
        <div className="absolute -inset-4 bg-gradient-to-r from-[#00FF66]/10 via-white/80 to-[#00cc52]/10 backdrop-blur-xl rounded-3xl border-2 border-white/40 shadow-2xl"></div>
        <div className="relative z-10 p-8">
          {content}
        </div>
      </div>
    );
  }

  return <div className={className}>{content}</div>;
};

export default LoadingSpinner;
