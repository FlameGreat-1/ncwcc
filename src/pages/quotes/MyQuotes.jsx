import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import QuotesList from '../../components/quotes/QuotesList.jsx';
import SEO from '../../components/common/SEO.jsx';
import useQuotes from '../../hooks/useQuotes.js';

const MyQuotes = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [showStats, setShowStats] = useState(true);
  
  const { 
    quotes: allQuotes, 
    loading: allLoading, 
    error: allError,
    refetch: refetchAll 
  } = useQuotes('my', {}, true);

  const stats = useMemo(() => {
    if (!allQuotes || allQuotes.length === 0) return { 
      total: 0, 
      draft: 0, 
      submitted: 0, 
      approved: 0, 
      rejected: 0, 
      totalValue: 0 
    };
    
    const result = { total: 0, draft: 0, submitted: 0, approved: 0, rejected: 0, totalValue: 0 };
    
    allQuotes.forEach(quote => {
      result.total += 1;
      result[quote.status] = (result[quote.status] || 0) + 1;
      result.totalValue += parseFloat(quote.final_price || 0);
    });
    
    return result;
  }, [allQuotes]);

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

  const getCurrentQuotes = () => {
    if (activeTab === 'all') {
      return { quotes: allQuotes, loading: allLoading };
    }
    const filteredQuotes = allQuotes.filter(quote => quote.status === activeTab);
    return { quotes: filteredQuotes, loading: allLoading };
  };

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    if (tabKey === 'all') {
      navigate('/quotes', { replace: true });
    } else {
      navigate(`/quotes?tab=${tabKey}`, { replace: true });
    }
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
      className: 'theme-button',
      primary: true
    },
    {
      label: 'Calculator',
      href: '/calculator',
      className: 'px-6 py-3 bg-transparent border-2 app-border-blue app-text-primary rounded-full font-bold transition-all hover:app-bg-blue hover:text-white'
    }
  ];

  const handlePDFDownload = (quoteId) => {
    window.open(`/api/quotes/${quoteId}/pdf/`, '_blank');
  };

  return (
    <>
      <SEO 
        title="My Quotes" 
        description="View and manage all your cleaning service quotes"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-black app-text-primary mb-2">My Quotes</h1>
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
              <div className="theme-card text-center">
                <div className="text-2xl font-black app-text-primary mb-1">
                  {stats.total}
                </div>
                <div className="text-sm app-text-muted">Total Quotes</div>
              </div>
              
              <div className="theme-card text-center">
                <div className="text-2xl font-black app-blue mb-1">
                  {stats.submitted}
                </div>
                <div className="text-sm app-text-muted">Submitted</div>
              </div>
              
              <div className="theme-card text-center">
                <div className="text-2xl font-black text-green-600 mb-1">
                  {stats.approved}
                </div>
                <div className="text-sm app-text-muted">Approved</div>
              </div>
              
              <div className="theme-card text-center">
                <div className="text-2xl font-black app-text-primary mb-1">
                  {formatCurrency(stats.totalValue)}
                </div>
                <div className="text-sm app-text-muted">Total Value</div>
              </div>
            </div>
          )}

          <div className="theme-card mb-6">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${activeTab === tab.key
                      ? 'app-bg-blue text-white'
                      : 'app-bg-secondary app-text-primary hover:app-bg-blue hover:text-white'
                    }
                  `}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className={`
                      ml-2 px-2 py-0.5 rounded-full text-xs
                      ${activeTab === tab.key
                        ? 'bg-white/20 text-white'
                        : 'app-bg-primary app-text-muted'
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
          <div className="theme-card text-center py-12">
            <div className="text-red-600 mb-4">
              <h3 className="text-lg font-semibold mb-2">Error Loading Quotes</h3>
              <p className="app-text-muted">{allError}</p>
            </div>
            <button
              onClick={refetchAll}
              className="theme-button"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div>
            {activeTab === 'all' ? (
              <QuotesList
                type="my"
                title=""
                showFilters={true}
                showSearch={true}
                cardVariant="default"
              />
            ) : (
              <div>
                {getCurrentQuotes().loading ? (
                  <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-4 app-border rounded-full border-t-transparent animate-spin"></div>
                  </div>
                ) : getCurrentQuotes().quotes.length === 0 ? (
                  <div className="theme-card text-center py-12">
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
                      className="theme-button"
                    >
                      Create New Quote
                    </Link>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {getCurrentQuotes().quotes.map((quote) => (
                      <div key={quote.id} className="theme-card">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-bold app-text-primary mb-1">
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
                              'app-bg-secondary app-text-primary'}
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
                            className="flex-1 text-center px-4 py-2 bg-transparent border-2 app-border-blue app-text-primary rounded-full font-medium transition-all hover:app-bg-blue hover:text-white"
                          >
                            View Details
                          </Link>
                          {quote.status === 'approved' && (
                            <button
                              onClick={() => handlePDFDownload(quote.id)}
                              className="px-4 py-2 theme-button"
                            >
                              PDF
                            </button>
                          )}
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

