import { memo, useState, useMemo } from 'react';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon,
  XMarkIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import InvoiceCard from './InvoiceCard';
import LoadingSpinner from '../common/LoadingSpinner';

const InvoicesList = memo(({ 
  invoices = [], 
  loading = false, 
  error = null,
  filters = {},
  onFiltersChange,
  onDownloadInvoice,
  onResendEmail,
  className = ''
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [localSearch, setLocalSearch] = useState(filters.search || '');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'draft', label: 'Draft' },
    { value: 'sent', label: 'Sent' },
    { value: 'paid', label: 'Paid' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const sortOptions = [
    { value: '-created_at', label: 'Newest First' },
    { value: 'created_at', label: 'Oldest First' },
    { value: '-due_date', label: 'Due Date (Latest)' },
    { value: 'due_date', label: 'Due Date (Earliest)' },
    { value: '-total_amount', label: 'Amount (High to Low)' },
    { value: 'total_amount', label: 'Amount (Low to High)' },
    { value: 'invoice_number', label: 'Invoice Number' }
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    
    const timeoutId = setTimeout(() => {
      onFiltersChange?.({ ...filters, search: value });
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const handleFilterChange = (key, value) => {
    onFiltersChange?.({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setLocalSearch('');
    onFiltersChange?.({
      status: 'all',
      is_ndis_invoice: null,
      email_sent: null,
      search: '',
      ordering: '-created_at'
    });
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.status && filters.status !== 'all') count++;
    if (filters.is_ndis_invoice !== null) count++;
    if (filters.email_sent !== null) count++;
    if (filters.search) count++;
    return count;
  }, [filters]);

  const overdueInvoices = useMemo(() => {
    return invoices.filter(invoice => 
      new Date(invoice.due_date) < new Date() && 
      invoice.status !== 'paid' && 
      invoice.status !== 'cancelled'
    );
  }, [invoices]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold app-text-primary mb-2">
          Error Loading Invoices
        </h3>
        <p className="app-text-muted">{error}</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 app-text-muted" />
            <input
              type="text"
              placeholder="Search invoices..."
              value={localSearch}
              onChange={handleSearchChange}
              className="theme-input pl-10 w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`
              btn-sm btn-modern-secondary relative
              ${activeFiltersCount > 0 ? 'ring-2 ring-blue-500' : ''}
            `}
          >
            <FunnelIcon className="w-4 h-4" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="btn-sm btn-modern-secondary text-red-600 border-red-300 hover:bg-red-50"
            >
              <XMarkIcon className="w-4 h-4" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="glass-card p-4 animate-fade-in-up">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium app-text-secondary mb-2">
                Status
              </label>
              <select
                value={filters.status || 'all'}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="theme-input w-full"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium app-text-secondary mb-2">
                Invoice Type
              </label>
              <select
                value={filters.is_ndis_invoice === null ? 'all' : filters.is_ndis_invoice.toString()}
                onChange={(e) => {
                  const value = e.target.value === 'all' ? null : e.target.value === 'true';
                  handleFilterChange('is_ndis_invoice', value);
                }}
                className="theme-input w-full"
              >
                <option value="all">All Types</option>
                <option value="true">NDIS Only</option>
                <option value="false">Regular Only</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium app-text-secondary mb-2">
                Email Status
              </label>
              <select
                value={filters.email_sent === null ? 'all' : filters.email_sent.toString()}
                onChange={(e) => {
                  const value = e.target.value === 'all' ? null : e.target.value === 'true';
                  handleFilterChange('email_sent', value);
                }}
                className="theme-input w-full"
              >
                <option value="all">All</option>
                <option value="true">Email Sent</option>
                <option value="false">Email Not Sent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium app-text-secondary mb-2">
                Sort By
              </label>
              <select
                value={filters.ordering || '-created_at'}
                onChange={(e) => handleFilterChange('ordering', e.target.value)}
                className="theme-input w-full"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {overdueInvoices.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-800">
              {overdueInvoices.length} Overdue Invoice{overdueInvoices.length !== 1 ? 's' : ''}
            </h3>
          </div>
          <p className="text-red-700 text-sm">
            You have invoices that are past their due date. Please follow up with clients.
          </p>
        </div>
      )}

      {invoices.length === 0 ? (
        <div className="text-center py-12">
          <DocumentTextIcon className="w-12 h-12 app-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold app-text-primary mb-2">
            No Invoices Found
          </h3>
          <p className="app-text-muted">
            {filters.search || activeFiltersCount > 0 
              ? 'Try adjusting your search or filters'
              : 'Your invoices will appear here once created'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {invoices.map((invoice, index) => (
            <InvoiceCard
              key={invoice.id}
              invoice={invoice}
              onDownload={onDownloadInvoice}
              onResendEmail={onResendEmail}
              className={`animate-fade-in-up delay-${Math.min(index * 100, 500)}`}
            />
          ))}
        </div>
      )}
    </div>
  );
});

InvoicesList.displayName = 'InvoicesList';

export default InvoicesList;
