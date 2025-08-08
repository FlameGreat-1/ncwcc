import { useState } from 'react';
import useQuoteActions from '../../hooks/useQuoteActions.js';

const QuoteCard = ({ 
  quote, 
  onUpdate, 
  showActions = true, 
  variant = 'default',
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { 
    loading, 
    submitQuote, 
    cancelQuote, 
    downloadPDF, 
    duplicateQuote 
  } = useQuoteActions();

  const getStatusConfig = (status) => {
    const configs = {
      draft: {
        bg: 'bg-gray-100 text-gray-800',
        darkBg: 'dark:bg-gray-800 dark:text-gray-200',
        icon: '📝'
      },
      submitted: {
        bg: 'bg-blue-100 text-blue-800',
        darkBg: 'dark:bg-blue-900 dark:text-blue-200',
        icon: '📤'
      },
      under_review: {
        bg: 'bg-yellow-100 text-yellow-800',
        darkBg: 'dark:bg-yellow-900 dark:text-yellow-200',
        icon: '👀'
      },
      approved: {
        bg: 'bg-green-100 text-green-800',
        darkBg: 'dark:bg-green-900 dark:text-green-200',
        icon: '✅'
      },
      rejected: {
        bg: 'bg-red-100 text-red-800',
        darkBg: 'dark:bg-red-900 dark:text-red-200',
        icon: '❌'
      },
      expired: {
        bg: 'bg-orange-100 text-orange-800',
        darkBg: 'dark:bg-orange-900 dark:text-orange-200',
        icon: '⏰'
      },
      converted: {
        bg: 'bg-purple-100 text-purple-800',
        darkBg: 'dark:bg-purple-900 dark:text-purple-200',
        icon: '🔄'
      },
      cancelled: {
        bg: 'bg-gray-100 text-gray-800',
        darkBg: 'dark:bg-gray-800 dark:text-gray-200',
        icon: '🚫'
      }
    };
    return configs[status] || configs.draft;
  };

  const getUrgencyConfig = (level) => {
    const configs = {
      1: { color: 'text-green-600', label: 'Flexible', icon: '🟢' },
      2: { color: 'text-blue-600', label: 'Standard', icon: '🔵' },
      3: { color: 'text-yellow-600', label: 'Priority', icon: '🟡' },
      4: { color: 'text-orange-600', label: 'Urgent', icon: '🟠' },
      5: { color: 'text-red-600', label: 'Emergency', icon: '🔴' }
    };
    return configs[level] || configs[2];
  };

  const handleAction = async (actionFn, successMessage) => {
    try {
      await actionFn(quote.id);
      onUpdate?.();
      if (successMessage) {
        console.log(successMessage);
      }
    } catch (error) {
      console.error('Action failed:', error.message);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      await downloadPDF(quote.id, `quote-${quote.quote_number}.pdf`);
    } catch (error) {
      console.error('PDF download failed:', error.message);
    }
  };

  const handleDuplicate = async () => {
    try {
      const newQuote = await duplicateQuote(quote.id, {
        status: 'draft'
      });
      onUpdate?.();
      console.log('Quote duplicated successfully');
    } catch (error) {
      console.error('Duplicate failed:', error.message);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isExpired = quote.expires_at && new Date(quote.expires_at) < new Date();
  const statusConfig = getStatusConfig(quote.status);
  const urgencyConfig = getUrgencyConfig(quote.urgency_level);

  const cardVariants = {
    default: 'card-modern',
    compact: 'glass-card p-4',
    minimal: 'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6'
  };

  return (
    <div className={`${cardVariants[variant]} ${className} ${isExpired ? 'opacity-75' : ''} animate-fade-in-up`}>
      {isExpired && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          Expired
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-bold text-gradient">
              {quote.quote_number}
            </h3>
            {quote.is_ndis_client && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                NDIS
              </span>
            )}
          </div>
          <p className="app-text-secondary text-sm font-medium">
            {quote.cleaning_type.replace('_', ' ').toUpperCase()}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.darkBg}`}>
            {statusConfig.icon} {quote.status.replace('_', ' ').toUpperCase()}
          </span>
          <span className={`text-xs ${urgencyConfig.color} flex items-center gap-1`}>
            {urgencyConfig.icon} {urgencyConfig.label}
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-start gap-2">
          <span className="text-gray-500 text-sm">📍</span>
          <div className="flex-1">
            <p className="app-text-primary text-sm font-medium">
              {quote.property_address}
            </p>
            <p className="app-text-muted text-xs">
              {quote.suburb}, {quote.state} {quote.postcode}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">🏠</span>
            <span className="app-text-secondary">
              {quote.number_of_rooms} rooms
            </span>
          </div>
          {quote.square_meters && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500">📐</span>
              <span className="app-text-secondary">
                {quote.square_meters}m²
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-2 border-t app-border">
          <div className="text-sm app-text-muted">
            Created: {formatDate(quote.created_at)}
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-gradient">
              {formatCurrency(quote.final_price)}
            </div>
            {quote.estimated_total !== quote.final_price && (
              <div className="text-xs app-text-muted line-through">
                {formatCurrency(quote.estimated_total)}
              </div>
            )}
          </div>
        </div>
      </div>

      {quote.special_requirements && (
        <div className="mb-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs app-text-muted hover:app-text-primary transition-colors"
          >
            {isExpanded ? '▼' : '▶'} Special Requirements
          </button>
          {isExpanded && (
            <p className="text-xs app-text-secondary mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
              {quote.special_requirements}
            </p>
          )}
        </div>
      )}

      {showActions && (
        <div className="flex flex-wrap gap-2">
          {quote.status === 'draft' && (
            <button
              onClick={() => handleAction(submitQuote, 'Quote submitted successfully')}
              disabled={loading}
              className="btn-sm btn-modern-primary"
            >
              {loading ? '⏳' : '📤'} Submit
            </button>
          )}

          {quote.status === 'approved' && !isExpired && (
            <button
              onClick={handleDownloadPDF}
              disabled={loading}
              className="btn-sm btn-modern-secondary"
            >
              {loading ? '⏳' : '📄'} PDF
            </button>
          )}

          {['draft', 'submitted'].includes(quote.status) && (
            <button
              onClick={() => handleAction(cancelQuote, 'Quote cancelled successfully')}
              disabled={loading}
              className="btn-sm bg-red-100 text-red-800 hover:bg-red-200 rounded-full px-3 py-1 text-xs font-medium transition-all"
            >
              {loading ? '⏳' : '🚫'} Cancel
            </button>
          )}

          <button
            onClick={handleDuplicate}
            disabled={loading}
            className="btn-sm bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full px-3 py-1 text-xs font-medium transition-all"
          >
            {loading ? '⏳' : '📋'} Duplicate
          </button>

          {quote.preferred_date && (
            <div className="text-xs app-text-muted flex items-center gap-1">
              📅 {formatDate(quote.preferred_date)}
              {quote.preferred_time && (
                <span>at {quote.preferred_time}</span>
              )}
            </div>
          )}
        </div>
      )}

      {quote.expires_at && quote.status === 'approved' && (
        <div className="mt-3 text-xs app-text-muted flex items-center gap-1">
          ⏰ Expires: {formatDate(quote.expires_at)}
        </div>
      )}
    </div>
  );
};

export default QuoteCard;
