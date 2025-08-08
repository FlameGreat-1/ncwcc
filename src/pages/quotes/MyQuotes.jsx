import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import QuotesList from '../../components/quotes/QuotesList.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import SEO from '../../components/common/SEO.jsx';
import useQuotes from '../../hooks/useQuotes.js';
import useQuoteActions from '../../hooks/useQuoteActions.js';

const MyQuotes = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('all');
  const [showStats, setShowStats] = useState(true);
  
  const { 
    quotes: allQuotes, 
    loading: allLoading, 
    error: allError,
    refetch: refetchAll 
  } = useQuotes('my', {}, true);

  const { 
    quotes: draftQuotes, 
    loading: draftLoading 
  } = useQuotes('my', { status: 'draft' }, activeTab === 'draft');

  const { 
    quotes: submittedQuotes, 
    loading: submittedLoading 
  } = useQuotes('my', { status: 'submitted' }, activeTab === 'submitted');

  const { 
    quotes: approvedQuotes, 
    loading: approvedLoading 
  } = useQuotes('my', { status: 'approved' }, activeTab === 'approved');

  const [stats, setStats] = useState({
    total: 0,
    draft: 0,
    submitted: 0,
    approved: 0,
    rejected: 0,
    totalValue: 0
  });

  const tabs = [
    { key: 'all', label: 'All Quotes', count: stats.total },
    { key: 'draft', label: 'Drafts', count: stats.draft },
    { key: 'submitted', label: 'Submitted', count: stats.submitted },
    { key: 'approved', label: 'Approved', count: stats.approved }
  ];

  useEffect(() => {
    const initialTab = searchParams.get('tab') || 'all';
    setActiveTab(initialTab);
  }, [searchParams]);

  useEffect(() => {
    if (allQuotes.length > 0) {
      const newStats = allQuotes.reduce((acc, quote) => {
        acc.total += 1;
        acc[quote.status] = (acc[quote.status] || 0) + 1;
        acc.totalValue += parseFloat(quote.final_price || 0);
        return acc;
      }, {
        total: 0,
        draft: 0,
        submitted: 0,
        approved: 0,
        rejected: 0,
        totalValue: 0
      });
      setStats(newStats);
    }
  }, [allQuotes]);

  const getCurrentQuotes = () => {
    switch (activeTab) {
      case 'draft':
        return { quotes: draftQuotes, loading: draftLoading };
      case 'submitted':
        return { quotes: submittedQuotes, loading: submittedLoading };
      case 'approved':
        return { quotes: approvedQuotes, loading: approvedLoading };
      default:
        return { quotes: allQuotes, loading: allLoading };
    }
  };

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    const newSearchParams = new URLSearchParams(searchParams);
    if (tabKey === 'all') {
      newSearchParams.delete('tab');
    } else {
      newSearchParams.set('tab', tabKey);
    }
    window.history.replaceState({}, '', `${window.location.pathname}?${newSearchParams}`);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(amount);
  };

  const getQuickActions = () => [
    {
      label: 'Create Quote',
      href: '/quotes/create',
      className: 'btn-modern-primary btn-md',
      primary: true
    },
    {
      label: 'Calculator',
      href: '/calculator',
      className: 'btn-modern-secondary btn-md'
    }
  ];

  return (
    <>
      <SEO 
        title="My Quotes" 
        description="View and manage all your cleaning service quotes"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-black text-gradient mb-2">My Quotes</h1>
              <p className="app-text-muted">
                Manage your cleaning service quotes and track their progress
              </p>
            </div>
            
            <div className="flex gap-3">
              {getQuickActions().map((action, index) => (
                <Link
                  key={index}
                  to={action.href}
                  className={action.className}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </div>

          {showStats && stats.total > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="card-modern text-center">
                <div className="text-2xl font-black text-gradient mb-1">
                  {stats.total}
                </div>
                <div className="text-sm app-text-muted">Total Quotes</div>
              </div>
              
              <div className="card-modern text-center">
                <div className="text-2xl font-black text-blue-600 mb-1">
                  {stats.submitted}
                </div>
                <div className="text-sm app-text-muted">Submitted</div>
              </div>
              
              <div className="card-modern text-center">
                <div className="text-2xl font-black text-green-600 mb-1">
                  {stats.approved}
                </div>
                <div className="text-sm app-text-muted">Approved</div>
              </div>
              
              <div className="card-modern text-center">
                <div className="text-2xl font-black text-gradient mb-1">
                  {formatCurrency(stats.totalValue)}
                </div>
                <div className="text-sm app-text-muted">Total Value</div>
              </div>
            </div>
          )}

          <div className="card-modern mb-6">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${activeTab === tab.key
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className={`
                      ml-2 px-2 py-0.5 rounded-full text-xs
                      ${activeTab === tab.key
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                      }
                    `}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {allError ? (
          <div className="card-modern text-center py-12">
            <div className="text-red-600 dark:text-red-400 mb-4">
              <h3 className="text-lg font-semibold mb-2">Error Loading Quotes</h3>
              <p className="app-text-muted">{allError}</p>
            </div>
            <button
              onClick={refetchAll}
              className="btn-modern-primary btn-md"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="animate-fade-in-up">
            {activeTab === 'all' ? (
              <QuotesList
                type="my"
                title=""
                showFilters={true}
                showSearch={true}
                cardVariant="default"
                className="animate-fade-in-up"
              />
            ) : (
              <div>
                {getCurrentQuotes().loading ? (
                  <div className="flex justify-center py-12">
                    <LoadingSpinner />
                  </div>
                ) : getCurrentQuotes().quotes.length === 0 ? (
                  <div className="card-modern text-center py-12">
                    <h3 className="text-lg font-semibold app-text-primary mb-2">
                      No {activeTab} quotes found
                    </h3>
                    <p className="app-text-muted mb-6">
                      {activeTab === 'draft' 
                        ? "You don't have any draft quotes yet."
                        : activeTab === 'submitted'
                        ? "You don't have any submitted quotes yet."
                        : "You don't have any approved quotes yet."
                      }
                    </p>
                    <Link
                      to="/quotes/create"
                      className="btn-modern-primary btn-md"
                    >
                      Create New Quote
                    </Link>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {getCurrentQuotes().quotes.map((quote, index) => (
                      <div
                        key={quote.id}
                        className={`animate-fade-in-up delay-${Math.min(index * 100, 500)}`}
                      >
                        <div className="card-modern hover:shadow-lg transition-all duration-300">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-bold text-gradient mb-1">
                                {quote.quote_number}
                              </h3>
                              <p className="app-text-secondary text-sm">
                                {quote.cleaning_type.replace('_', ' ').toUpperCase()}
                              </p>
                            </div>
                            <span className={`
                              px-3 py-1 rounded-full text-xs font-medium
                              ${quote.status === 'approved' ? 'bg-green-100 text-green-800' :
                                quote.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'}
                            `}>
                              {quote.status.toUpperCase()}
                            </span>
                          </div>

                          <div className="space-y-2 mb-4">
                            <p className="app-text-primary text-sm">
                              <span className="font-medium">Address:</span> {quote.property_address}
                            </p>
                            <p className="app-text-secondary text-sm">
                              <span className="font-medium">Rooms:</span> {quote.number_of_rooms} | 
                              <span className="font-medium"> Total:</span> {formatCurrency(quote.final_price)}
                            </p>
                            <p className="app-text-muted text-xs">
                              Created: {new Date(quote.created_at).toLocaleDateString('en-AU')}
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <Link
                              to={`/quotes/${quote.id}`}
                              className="btn-modern-secondary btn-sm flex-1 text-center"
                            >
                              View Details
                            </Link>
                            {quote.status === 'approved' && (
                              <button
                                onClick={() => {
                                  // Handle PDF download
                                }}
                                className="btn-modern-primary btn-sm"
                              >
                                PDF
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default MyQuotes;


