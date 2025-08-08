import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import QuoteCard from './QuoteCard.jsx';
import LoadingSpinner from '../common/LoadingSpinner.jsx';
import useQuotes from '../../hooks/useQuotes.js';

const QuotesList = ({ 
  type = 'my', 
  title = 'My Quotes',
  showFilters = true,
  showSearch = true,
  cardVariant = 'default',
  className = ''
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    status: searchParams.get('status') || '',
    cleaning_type: searchParams.get('cleaning_type') || '',
    urgency_level: searchParams.get('urgency_level') || '',
    search: searchParams.get('search') || ''
  });

  const {
    quotes,
    loading,
    error,
    pagination,
    refetch,
    loadMore,
    goToPage,
    hasMore,
    isEmpty
  } = useQuotes(type, filters, true);

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'draft', label: 'Draft' },
    { value: 'submitted', label: 'Submitted' },
    { value: 'under_review', label: 'Under Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'expired', label: 'Expired' },
    { value: 'converted', label: 'Converted' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const cleaningTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'general', label: 'General Cleaning' },
    { value: 'deep', label: 'Deep Cleaning' },
    { value: 'end_of_lease', label: 'End of Lease' },
    { value: 'ndis', label: 'NDIS Cleaning' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'carpet', label: 'Carpet Cleaning' },
    { value: 'window', label: 'Window Cleaning' },
    { value: 'pressure_washing', label: 'Pressure Washing' }
  ];

  const urgencyOptions = [
    { value: '', label: 'All Urgency' },
    { value: '1', label: 'Flexible (7+ days)' },
    { value: '2', label: 'Standard (3-7 days)' },
    { value: '3', label: 'Priority (1-3 days)' },
    { value: '4', label: 'Urgent (Same day)' },
    { value: '5', label: 'Emergency (ASAP)' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    const newSearchParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) newSearchParams.set(k, v);
    });
    setSearchParams(newSearchParams);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    refetch(filters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      status: '',
      cleaning_type: '',
      urgency_level: '',
      search: ''
    };
    setFilters(clearedFilters);
    setSearchParams(new URLSearchParams());
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      loadMore();
    }
  };

  const handlePageChange = (page) => {
    goToPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== '').length;
  };

  useEffect(() => {
    refetch(filters);
  }, [filters, refetch]);

  if (error) {
    return (
      <div className="card-modern text-center">
        <div className="text-red-600 dark:text-red-400 mb-4">
          <h3 className="text-lg font-semibold mb-2">Error Loading Quotes</h3>
          <p className="app-text-muted">{error}</p>
        </div>
        <button
          onClick={() => refetch()}
          className="btn-modern-primary btn-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gradient">{title}</h2>
          {pagination.count > 0 && (
            <p className="app-text-muted text-sm">
              {pagination.count} quote{pagination.count !== 1 ? 's' : ''} found
            </p>
          )}
        </div>

        {showSearch && (
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Search quotes..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="theme-input w-64"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-modern-primary btn-sm"
            >
              Search
            </button>
          </form>
        )}
      </div>

      {showFilters && (
        <div className="card-modern">
          <div className="flex flex-wrap gap-4 mb-4">
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="theme-input"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={filters.cleaning_type}
              onChange={(e) => handleFilterChange('cleaning_type', e.target.value)}
              className="theme-input"
            >
              {cleaningTypeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={filters.urgency_level}
              onChange={(e) => handleFilterChange('urgency_level', e.target.value)}
              className="theme-input"
            >
              {urgencyOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {getActiveFiltersCount() > 0 && (
              <button
                onClick={clearFilters}
                className="btn-sm bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full px-4 py-2 text-sm font-medium transition-all"
              >
                Clear Filters ({getActiveFiltersCount()})
              </button>
            )}
          </div>
        </div>
      )}

      {loading && quotes.length === 0 ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : isEmpty ? (
        <div className="card-modern text-center py-12">
          <h3 className="text-lg font-semibold app-text-primary mb-2">
            No quotes found
          </h3>
          <p className="app-text-muted mb-6">
            {getActiveFiltersCount() > 0 
              ? 'Try adjusting your filters to see more results.'
              : 'You haven\'t created any quotes yet.'
            }
          </p>
          {getActiveFiltersCount() > 0 ? (
            <button
              onClick={clearFilters}
              className="btn-modern-secondary btn-sm"
            >
              Clear Filters
            </button>
          ) : (
            <a
              href="/quotes/create"
              className="btn-modern-primary btn-sm"
            >
              Create Your First Quote
            </a>
          )}
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {quotes.map((quote, index) => (
              <QuoteCard
                key={quote.id}
                quote={quote}
                onUpdate={refetch}
                variant={cardVariant}
                className={`delay-${Math.min(index * 100, 500)}`}
              />
            ))}
          </div>

          {loading && quotes.length > 0 && (
            <div className="flex justify-center py-6">
              <LoadingSpinner />
            </div>
          )}

          {pagination.totalPages > 1 && (
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1 || loading}
                className="btn-modern-secondary btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  const page = i + 1;
                  const isActive = page === pagination.page;
                  
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      disabled={loading}
                      className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages || loading}
                className="btn-modern-secondary btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}

          {hasMore && pagination.totalPages <= 1 && (
            <div className="flex justify-center">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="btn-modern-secondary btn-md"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuotesList;

      

