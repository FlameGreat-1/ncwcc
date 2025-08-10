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
        darkBg: 'dark:bg-gray-800 dark:text-gray-200'
      },
      submitted: {
        bg: 'bg-blue-100 text-blue-800',
        darkBg: 'dark:bg-blue-900 dark:text-blue-200'
      },
      under_review: {
        bg: 'bg-yellow-100 text-yellow-800',
        darkBg: 'dark:bg-yellow-900 dark:text-yellow-200'
      },
      approved: {
        bg: 'bg-green-100 text-green-800',
        darkBg: 'dark:bg-green-900 dark:text-green-200'
      },
      rejected: {
        bg: 'bg-red-100 text-red-800',
        darkBg: 'dark:bg-red-900 dark:text-red-200'
      },
      expired: {
        bg: 'bg-orange-100 text-orange-800',
        darkBg: 'dark:bg-orange-900 dark:text-orange-200'
      },
      converted: {
        bg: 'bg-purple-100 text-purple-800',
        darkBg: 'dark:bg-purple-900 dark:text-purple-200'
      },
      cancelled: {
        bg: 'bg-gray-100 text-gray-800',
        darkBg: 'dark:bg-gray-800 dark:text-gray-200'
      }
    };
    return configs[status] || configs.draft;
  };

  const getUrgencyConfig = (level) => {
    const configs = {
      1: { color: 'text-green-600 dark:text-green-400', label: 'Flexible' },
      2: { color: 'text-blue-600 dark:text-blue-400', label: 'Standard' },
      3: { color: 'text-yellow-600 dark:text-yellow-400', label: 'Priority' },
      4: { color: 'text-orange-600 dark:text-orange-400', label: 'Urgent' },
      5: { color: 'text-red-600 dark:text-red-400', label: 'Emergency' }
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
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6',
    compact: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4',
    minimal: 'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6'
  };

  return (
    <div className={`${cardVariants[variant]} ${className} ${isExpired ? 'opacity-75' : ''}`}>
      {isExpired && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          Expired
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {quote.quote_number}
            </h3>
            {quote.is_ndis_client && (
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full">
                NDIS
              </span>
            )}
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">
            {quote.cleaning_type.replace('_', ' ').toUpperCase()}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.darkBg}`}>
            {quote.status.replace('_', ' ').toUpperCase()}
          </span>
          <span className={`text-xs ${urgencyConfig.color} font-medium`}>
            {urgencyConfig.label}
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-start gap-2">
          <div className="flex-1">
            <p className="text-gray-900 dark:text-white text-sm font-medium">
              {quote.property_address}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-xs">
              {quote.suburb}, {quote.state} {quote.postcode}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Rooms: {quote.number_of_rooms}
            </span>
          </div>
          {quote.square_meters && (
            <div className="flex items-center gap-2">
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Area: {quote.square_meters}m²
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Created: {formatDate(quote.created_at)}
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(quote.final_price)}
            </div>
            {quote.estimated_total !== quote.final_price && (
              <div className="text-xs text-gray-500 dark:text-gray-400 line-through">
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
            className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium"
          >
            {isExpanded ? '▼' : '▶'} Special Requirements
          </button>
          {isExpanded && (
            <p className="text-xs text-gray-700 dark:text-gray-300 mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
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
              className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          )}

          {quote.status === 'approved' && !isExpired && (
            <button
              onClick={handleDownloadPDF}
              disabled={loading}
              className="px-3 py-1 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-full text-xs font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Downloading...' : 'Download PDF'}
            </button>
          )}

          {['draft', 'submitted'].includes(quote.status) && (
            <button
              onClick={() => handleAction(cancelQuote, 'Quote cancelled successfully')}
              disabled={loading}
              className="px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/40 rounded-full text-xs font-medium focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Cancelling...' : 'Cancel'}
            </button>
          )}

          <button
            onClick={handleDuplicate}
            disabled={loading}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-xs font-medium focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Duplicating...' : 'Duplicate'}
          </button>

          {quote.preferred_date && (
            <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1 px-2 py-1">
              Preferred: {formatDate(quote.preferred_date)}
              {quote.preferred_time && (
                <span>at {quote.preferred_time}</span>
              )}
            </div>
          )}
        </div>
      )}

      {quote.expires_at && quote.status === 'approved' && (
        <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
          Expires: {formatDate(quote.expires_at)}
        </div>
      )}
    </div>
  );
};

export default QuoteCard;

