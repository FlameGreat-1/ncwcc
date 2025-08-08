const QuoteStatusBadge = ({ 
  status, 
  size = 'md', 
  className = '' 
}) => {
  const getStatusConfig = (status) => {
    const configs = {
      draft: {
        bg: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
        label: 'Draft',
        pulse: false
      },
      submitted: {
        bg: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        label: 'Submitted',
        pulse: true
      },
      under_review: {
        bg: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        label: 'Under Review',
        pulse: true
      },
      approved: {
        bg: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        label: 'Approved',
        pulse: false
      },
      rejected: {
        bg: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        label: 'Rejected',
        pulse: false
      },
      expired: {
        bg: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
        label: 'Expired',
        pulse: false
      },
      converted: {
        bg: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        label: 'Converted',
        pulse: false
      },
      cancelled: {
        bg: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
        label: 'Cancelled',
        pulse: false
      }
    };
    return configs[status] || configs.draft;
  };

  const getSizeClasses = (size) => {
    const sizes = {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-2.5 py-1 text-xs',
      md: 'px-3 py-1.5 text-sm',
      lg: 'px-4 py-2 text-base',
      xl: 'px-5 py-2.5 text-lg'
    };
    return sizes[size] || sizes.md;
  };

  const config = getStatusConfig(status);
  const sizeClasses = getSizeClasses(size);

  return (
    <span 
      className={`
        inline-flex items-center rounded-full font-semibold transition-all duration-300
        ${config.bg} 
        ${sizeClasses}
        ${config.pulse ? 'animate-pulse' : ''}
        ${className}
      `}
    >
      {config.label}
    </span>
  );
};

export default QuoteStatusBadge;
