const LoadingSpinner = ({ 
    size = 'md', 
    color = 'primary', 
    className = '',
    text = null 
  }) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-12 h-12'
    };
    
    const colorClasses = {
      primary: 'border-[#00FF66]',
      white: 'border-white',
      gray: 'border-gray-400',
      black: 'border-black'
    };
    
    const spinnerClasses = `animate-spin rounded-full border-2 border-transparent border-t-current ${sizeClasses[size]} ${colorClasses[color]} ${className}`;
    
    if (text) {
      return (
        <div className="flex flex-col items-center justify-center gap-3">
          <div className={spinnerClasses}></div>
          <span className="text-sm font-medium text-gray-600">{text}</span>
        </div>
      );
    }
    
    return <div className={spinnerClasses}></div>;
  };
  
  export default LoadingSpinner;
  