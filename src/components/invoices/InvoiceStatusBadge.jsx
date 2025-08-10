import { memo } from 'react';
import { 
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

const InvoiceStatusBadge = memo(({ status, size = 'sm', showIcon = true }) => {
  const getStatusConfig = (status) => {
    const configs = {
      draft: {
        label: 'Draft',
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-800',
        borderColor: 'border-gray-200',
        icon: DocumentTextIcon
      },
      sent: {
        label: 'Sent',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-800',
        borderColor: 'border-blue-200',
        icon: ClockIcon
      },
      paid: {
        label: 'Paid',
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        borderColor: 'border-green-200',
        icon: CheckCircleIcon
      },
      overdue: {
        label: 'Overdue',
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
        borderColor: 'border-red-200',
        icon: ExclamationTriangleIcon
      },
      cancelled: {
        label: 'Cancelled',
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-600',
        borderColor: 'border-gray-200',
        icon: XCircleIcon
      }
    };
    return configs[status] || configs.draft;
  };

  const getSizeClasses = (size) => {
    const sizes = {
      xs: 'px-1.5 py-0.5 text-xs',
      sm: 'px-2 py-1 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-sm'
    };
    return sizes[size] || sizes.sm;
  };

  const getIconSize = (size) => {
    const iconSizes = {
      xs: 'w-3 h-3',
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-4 h-4'
    };
    return iconSizes[size] || iconSizes.sm;
  };

  const config = getStatusConfig(status);
  const IconComponent = config.icon;

  return (
    <span 
      className={`
        inline-flex items-center gap-1 rounded-full font-medium border
        ${config.bgColor} ${config.textColor} ${config.borderColor}
        ${getSizeClasses(size)}
      `}
      title={`Invoice Status: ${config.label}`}
    >
      {showIcon && <IconComponent className={getIconSize(size)} />}
      <span>{config.label}</span>
    </span>
  );
});

InvoiceStatusBadge.displayName = 'InvoiceStatusBadge';

export default InvoiceStatusBadge;
