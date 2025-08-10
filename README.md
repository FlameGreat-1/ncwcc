 
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useLocation } from 'react-router-dom';
import ProfileAvatar from '../../components/common/ProfileAvatar';
import useQuotes from '../../hooks/useQuotes';
import QuoteDetail from '../../pages/quotes/QuoteDetail';
import CreateQuote from '../../pages/quotes/CreateQuote';
import EditQuote from '../../pages/quotes/EditQuote';
import MyQuotes from '../../pages/quotes/MyQuotes';

const Portal = () => {
  const { user, isVerified, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedQuoteId, setSelectedQuoteId] = useState(null);
  const [quoteStats, setQuoteStats] = useState({
    total: 0,
    draft: 0,
    submitted: 0,
    approved: 0,
    totalValue: 0
  });

  const { quotes: allQuotes, loading: quotesLoading, error: quotesError } = useQuotes('my', {}, true);

  useEffect(() => {
    const path = location.pathname;
    if (path === '/clients/portal') {
      setCurrentView('dashboard');
    } else if (path === '/clients/quotes') {
      setCurrentView('quotes');
    } else if (path === '/clients/quotes/create') {
      setCurrentView('create-quote');
    } else if (path.includes('/clients/quotes/') && path.includes('/edit')) {
      setCurrentView('edit-quote');
      const quoteId = path.split('/')[3];
      setSelectedQuoteId(quoteId);
    } else if (path.includes('/clients/quotes/')) {
      setCurrentView('quote-detail');
      const quoteId = path.split('/')[3];
      setSelectedQuoteId(quoteId);
    } else if (path.startsWith('/clients/appointments')) {
      setCurrentView('appointments');
    } else if (path.startsWith('/clients/documents')) {
      setCurrentView('documents');
    } else if (path.startsWith('/clients/messages')) {
      setCurrentView('messages');
    } else if (path.startsWith('/clients/calculator')) {
      setCurrentView('calculator');
    }
  }, [location.pathname]);

  useEffect(() => {
    if (allQuotes && allQuotes.length > 0) {
      const stats = allQuotes.reduce((acc, quote) => {
        acc.total += 1;
        acc[quote.status] = (acc[quote.status] || 0) + 1;
        acc.totalValue += parseFloat(quote.final_price || 0);
        return acc;
      }, {
        total: 0,
        draft: 0,
        submitted: 0,
        approved: 0,
        totalValue: 0
      });
      setQuoteStats(stats);
    }
  }, [allQuotes]);

  const handleNavigation = (view, quoteId = null) => {
    setCurrentView(view);
    if (quoteId) {
      setSelectedQuoteId(quoteId);
    }
    setSidebarOpen(false);
    window.history.pushState({}, '', getUrlForView(view, quoteId));
  };

  const getUrlForView = (view, quoteId = null) => {
    switch (view) {
      case 'dashboard': return '/clients/portal';
      case 'quotes': return '/clients/quotes';
      case 'create-quote': return '/clients/quotes/create';
      case 'edit-quote': return quoteId ? `/clients/quotes/${quoteId}/edit` : '/clients/quotes';
      case 'quote-detail': return quoteId ? `/clients/quotes/${quoteId}` : '/clients/quotes';
      case 'appointments': return '/clients/appointments';
      case 'documents': return '/clients/documents';
      case 'messages': return '/clients/messages';
      case 'calculator': return '/clients/calculator';
      default: return '/clients/portal';
    }
  };

  const navigation = [
    {
      name: 'Dashboard',
      view: 'dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2V5z" />
        </svg>
      ),
      current: currentView === 'dashboard'
    },
    {
      name: 'My Quotes',
      view: 'quotes',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      current: currentView.includes('quote'),
      badge: quoteStats.total > 0 ? quoteStats.total : null
    },
    {
      name: 'Calculator',
      view: 'calculator',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      current: currentView === 'calculator'
    },
    {
      name: 'Appointments',
      view: 'appointments',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      current: currentView === 'appointments'
    },
    {
      name: 'Documents',
      view: 'documents',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      current: currentView === 'documents'
    },
    {
      name: 'Messages',
      view: 'messages',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      current: currentView === 'messages'
    }
  ];

  const getDashboardStats = () => {
    return [
      {
        title: 'Total Quotes',
        value: quoteStats.total.toString(),
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
        bgColor: 'app-bg-secondary',
        iconBg: 'app-bg-primary',
        iconColor: 'app-blue',
        onClick: () => handleNavigation('quotes')
      },
      {
        title: 'Approved Quotes',
        value: quoteStats.approved.toString(),
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        bgColor: 'app-bg-secondary',
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600',
        onClick: () => handleNavigation('quotes')
      },
      {
        title: 'Pending Quotes',
        value: (quoteStats.draft + quoteStats.submitted).toString(),
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        bgColor: 'app-bg-secondary',
        iconBg: 'bg-yellow-100',
        iconColor: 'text-yellow-600',
        onClick: () => handleNavigation('quotes')
      },
      {
        title: 'Quote Value',
        value: new Intl.NumberFormat('en-AU', {
          style: 'currency',
          currency: 'AUD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(quoteStats.totalValue),
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        ),
        bgColor: 'app-bg-secondary',
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-600',
        onClick: () => handleNavigation('quotes')
      }
    ];
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(amount);
  };

  const getPageTitle = () => {
    switch (currentView) {
      case 'dashboard': return 'Dashboard';
      case 'quotes': return 'My Quotes';
      case 'create-quote': return 'Create Quote';
      case 'edit-quote': return 'Edit Quote';
      case 'quote-detail': return 'Quote Details';
      case 'appointments': return 'Appointments';
      case 'documents': return 'Documents';
      case 'messages': return 'Messages';
      case 'calculator': return 'Quote Calculator';
      default: return 'Dashboard';
    }
  };

  const getPageSubtitle = () => {
    switch (currentView) {
      case 'dashboard': return `Welcome back, ${user?.first_name}`;
      case 'quotes': return 'Manage your cleaning service quotes';
      case 'create-quote': return 'Request a new cleaning service quote';
      case 'edit-quote': return 'Update your quote details';
      case 'quote-detail': return 'View quote information and status';
      case 'appointments': return 'Schedule and manage appointments';
      case 'documents': return 'Access your service documents';
      case 'messages': return 'Communication center';
      case 'calculator': return 'Calculate cleaning service costs';
      default: return `Welcome back, ${user?.first_name}`;
    }
  };

  const ProfessionalThemeToggle = () => {
    return (
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg app-text-muted hover:app-text-primary hover:app-bg-secondary transition-colors"
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        {isDark ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>
    );
  };

  return (
    <div className="min-h-screen app-bg-primary flex">
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:flex lg:flex-col`}>
        <div className="flex flex-col w-full h-full theme-card border-r app-border">
          <div className="flex items-center justify-between h-16 px-6 border-b app-border flex-shrink-0">
            <button
              onClick={() => handleNavigation('dashboard')}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <img src="/logo.svg" alt="NSWCC Logo" className="h-8 w-auto" />
              <div>
                <span className="text-lg font-black app-text-primary">
                  Client Portal
                </span>
                <div className="text-xs app-text-muted">
                  {user?.client_type === 'ndis' ? 'NDIS Services' : 'General Services'}
                </div>
              </div>
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md app-text-muted hover:app-text-primary hover:app-bg-secondary transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.view)}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  item.current
                    ? 'app-bg-blue text-white'
                    : 'app-text-secondary hover:app-text-primary hover:app-bg-secondary'
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </div>
                {item.badge && (
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.current
                      ? 'bg-white/20 text-white'
                      : 'app-bg-primary app-text-muted'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        <header className="theme-card border-b app-border sticky top-0 z-30 flex-shrink-0">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md app-text-muted hover:app-text-primary hover:app-bg-secondary transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div className="ml-4 lg:ml-0">
                  <h1 className="text-lg font-semibold app-text-primary">
                    {getPageTitle()}
                  </h1>
                  <p className="text-xs app-text-muted">
                    {getPageSubtitle()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2">
                  <button className="p-2 rounded-lg app-text-muted hover:app-text-primary hover:app-bg-secondary transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                  <button className="relative p-2 rounded-lg app-text-muted hover:app-text-primary hover:app-bg-secondary transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 00-15 0v5h5l-5 5-5-5h5V7a9.5 9.5 0 0119 0v10z" />
                    </svg>
                    <span className="absolute -top-1 -right-1 block h-2 w-2 rounded-full bg-red-400 ring-1 ring-white"></span>
                  </button>
                  <ProfessionalThemeToggle />
                </div>
                
                <ProfileAvatar 
                  user={user}
                  isVerified={isVerified}
                  onLogout={logout}
                  showAccountStatus={true}
                  showThemeToggle={false}
                  isActive={true}
                  className="ml-2"
                />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            {currentView === 'dashboard' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {getDashboardStats().map((stat, index) => (
                    <button
                      key={index}
                      onClick={stat.onClick}
                      className={`block p-6 rounded-xl border ${stat.bgColor} transition-all hover:scale-105 hover:shadow-lg`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium app-text-muted">
                            {stat.title}
                          </p>
                          <p className="text-3xl font-bold app-text-primary mt-1">
                            {stat.value}
                          </p>
                        </div>
                        <div className={`p-3 rounded-lg ${stat.iconBg}`}>
                          <div className={stat.iconColor}>
                            {stat.icon}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  <div className="xl:col-span-2">
                    <div className="theme-card">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold app-text-primary">
                          Recent Quote Activity
                        </h2>
                        <button 
                          onClick={() => handleNavigation('quotes')}
                          className="text-sm font-medium app-blue hover:opacity-80 transition-opacity"
                        >
                          View All Quotes
                        </button>
                      </div>
                      <div className="space-y-4">
                        {quotesError ? (
                          <div className="text-center py-8">
                            <div className="w-16 h-16 mx-auto mb-4 app-bg-secondary rounded-full flex items-center justify-center">
                              <svg className="w-8 h-8 app-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <h3 className="text-lg font-semibold app-text-primary mb-2">
                              Unable to load quotes
                            </h3>
                            <p className="app-text-muted text-sm mb-4">
                              There was an issue loading your quotes. Please try again.
                            </p>
                            <button
                              onClick={() => window.location.reload()}
                              className="theme-button"
                            >
                              Retry
                            </button>
                          </div>
                        ) : quotesLoading ? (
                          <div className="flex justify-center py-8">
                            <div className="w-8 h-8 border-4 app-border rounded-full border-t-transparent animate-spin"></div>
                          </div>
                        ) : allQuotes && allQuotes.length > 0 ? (
                          allQuotes.slice(0, 3).map((quote) => (
                            <button
                              key={quote.id}
                              onClick={() => handleNavigation('quote-detail', quote.id)}
                              className="w-full block p-4 rounded-lg app-bg-secondary hover:opacity-80 transition-opacity text-left"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <p className="font-medium app-text-primary">
                                      Quote {quote.quote_number}
                                    </p>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      quote.status === 'approved' ? 'bg-green-100 text-green-800' :
                                      quote.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                                      quote.status === 'draft' ? 'app-bg-primary app-text-muted' :
                                      'bg-yellow-100 text-yellow-800'
                                    }`}>
                                      {quote.status.replace('_', ' ').toUpperCase()}
                                    </span>
                                  </div>
                                  <p className="text-sm app-text-muted">
                                    {quote.cleaning_type.replace('_', ' ')} • {quote.property_address.substring(0, 30)}...
                                  </p>
                                  <p className="text-xs app-text-muted mt-1">
                                    {new Date(quote.created_at).toLocaleDateString('en-AU')}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold app-text-primary">
                                    {formatCurrency(quote.final_price)}
                                  </p>
                                </div>
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="text-center py-8">
                            <div className="w-16 h-16 mx-auto mb-4 app-bg-secondary rounded-full flex items-center justify-center">
                              <svg className="w-8 h-8 app-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <h3 className="text-lg font-semibold app-text-primary mb-2">
                              No quotes yet
                            </h3>
                            <p className="text-sm app-text-muted mb-4">
                              Get started by creating your first cleaning service quote
                            </p>
                            <button
                              onClick={() => handleNavigation('create-quote')}
                              className="theme-button"
                            >
                              Create Your First Quote
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="theme-card">
                      <h3 className="text-lg font-bold mb-4 app-text-primary">
                        Quick Actions
                      </h3>
                      <div className="space-y-3">
                        <button
                          onClick={() => handleNavigation('create-quote')}
                          className="w-full flex items-center space-x-3 p-3 rounded-lg transition-all hover:app-bg-secondary app-text-primary hover:scale-105"
                        >
                          <div className="p-2 rounded-lg bg-blue-100">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-medium">Request Quote</p>
                            <p className="text-sm app-text-muted">
                              Get pricing for cleaning services
                            </p>
                          </div>
                        </button>

                        <button
                          onClick={() => handleNavigation('quotes')}
                          className="w-full flex items-center space-x-3 p-3 rounded-lg transition-all hover:app-bg-secondary app-text-primary hover:scale-105"
                        >
                          <div className="p-2 rounded-lg bg-green-100">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-medium">View All Quotes</p>
                            <p className="text-sm app-text-muted">
                              Manage existing quotes
                            </p>
                          </div>
                        </button>

                        <button
                          onClick={() => handleNavigation('calculator')}
                          className="w-full flex items-center space-x-3 p-3 rounded-lg transition-all hover:app-bg-secondary app-text-primary hover:scale-105"
                        >
                          <div className="p-2 rounded-lg bg-purple-100">
                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-medium">Price Calculator</p>
                            <p className="text-sm app-text-muted">
                              Estimate cleaning costs
                            </p>
                          </div>
                        </button>

                        <button
                          onClick={() => handleNavigation('appointments')}
                          className="w-full flex items-center space-x-3 p-3 rounded-lg transition-all hover:app-bg-secondary app-text-primary hover:scale-105"
                        >
                          <div className="p-2 rounded-lg bg-orange-100">
                            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-medium">Book Service</p>
                            <p className="text-sm app-text-muted">
                              Schedule an appointment
                            </p>
                          </div>
                        </button>

                        <button
                          onClick={() => handleNavigation('messages')}
                          className="w-full flex items-center space-x-3 p-3 rounded-lg transition-all hover:app-bg-secondary app-text-primary hover:scale-105"
                        >
                          <div className="p-2 rounded-lg bg-red-100">
                            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-medium">Contact Support</p>
                            <p className="text-sm app-text-muted">
                              Get help and assistance
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentView === 'quotes' && (
              <div>
                <MyQuotes />
              </div>
            )}

            {currentView === 'create-quote' && (
              <div>
                <CreateQuote />
              </div>
            )}

            {currentView === 'edit-quote' && selectedQuoteId && (
              <div>
                <EditQuote quoteId={selectedQuoteId} />
              </div>
            )}

            {currentView === 'quote-detail' && selectedQuoteId && (
              <div>
                <QuoteDetail quoteId={selectedQuoteId} />
              </div>
            )}

            {currentView === 'calculator' && (
              <div className="theme-card text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold app-text-primary mb-2">
                  Quote Calculator
                </h2>
                <p className="app-text-muted mb-6">
                  Calculate estimated costs for your cleaning service needs
                </p>
                <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto">
                  <button
                    onClick={() => handleNavigation('create-quote')}
                    className="theme-button"
                  >
                    Create Quote
                  </button>
                  <button className="px-6 py-3 bg-transparent border-2 app-border-blue app-text-primary rounded-full font-medium transition-all hover:app-bg-blue hover:text-white">
                    Quick Estimate
                  </button>
                </div>
                <div className="mt-8 p-4 rounded-lg app-bg-secondary">
                  <p className="text-sm app-text-secondary">
                    <strong>Note:</strong> Use our calculator to get instant estimates for various cleaning services. 
                    For accurate quotes, please create a detailed quote request.
                  </p>
                </div>
              </div>
            )}

            {currentView === 'appointments' && (
              <div className="theme-card text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold app-text-primary mb-2">
                  Appointments
                </h2>
                <p className="app-text-muted mb-6">
                  Schedule and manage your cleaning service appointments
                </p>
                <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto">
                  <button
                    onClick={() => handleNavigation('create-quote')}
                    className="theme-button"
                  >
                    Request Quote First
                  </button>
                  <button className="px-6 py-3 bg-transparent border-2 app-border-blue app-text-primary rounded-full font-medium transition-all hover:app-bg-blue hover:text-white">
                    View Calendar
                  </button>
                </div>
                <div className="mt-8 p-4 rounded-lg app-bg-secondary">
                  <p className="text-sm app-text-secondary">
                    <strong>Note:</strong> Appointments are scheduled after quote approval. 
                    Start by creating a quote for your cleaning service needs.
                  </p>
                </div>
              </div>
            )}

{currentView === 'documents' && (
              <div className="theme-card text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold app-text-primary mb-2">
                  Documents
                </h2>
                <p className="app-text-muted mb-6">
                  Access your service agreements, invoices, and reports
                </p>
                <div className="space-y-4 max-w-2xl mx-auto">
                  <div className="p-4 rounded-lg border app-border app-bg-secondary">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded bg-green-100">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="text-left">
                          <p className="font-medium app-text-primary">
                            Quote Documents
                          </p>
                          <p className="text-sm app-text-muted">
                            Approved quotes available as PDFs
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleNavigation('quotes')}
                        className="px-4 py-2 bg-transparent border-2 app-border-blue app-text-primary rounded-full font-medium transition-all hover:app-bg-blue hover:text-white"
                      >
                        View
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border app-border app-bg-secondary">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded bg-blue-100">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="text-left">
                          <p className="font-medium app-text-primary">
                            Service Agreements
                          </p>
                          <p className="text-sm app-text-muted">
                            Terms and conditions
                          </p>
                        </div>
                      </div>
                      <button className="px-4 py-2 app-bg-primary app-text-muted rounded-full font-medium cursor-not-allowed" disabled>
                        Coming Soon
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border app-border app-bg-secondary">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded bg-orange-100">
                          <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="text-left">
                          <p className="font-medium app-text-primary">
                            Invoices & Receipts
                          </p>
                          <p className="text-sm app-text-muted">
                            Payment history and receipts
                          </p>
                        </div>
                      </div>
                      <button className="px-4 py-2 app-bg-primary app-text-muted rounded-full font-medium cursor-not-allowed" disabled>
                        Coming Soon
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentView === 'messages' && (
              <div className="theme-card text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold app-text-primary mb-2">
                  Messages
                </h2>
                <p className="app-text-muted mb-6">
                  Communicate with our support team and service providers
                </p>
                <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto mb-6">
                  <button className="theme-button">
                    Start New Conversation
                  </button>
                  <button className="px-6 py-3 bg-transparent border-2 app-border-blue app-text-primary rounded-full font-medium transition-all hover:app-bg-blue hover:text-white">
                    View Message History
                  </button>
                </div>
                <div className="p-4 rounded-lg app-bg-secondary">
                  <p className="text-sm app-text-secondary">
                    <strong>Quick Contact:</strong> For urgent matters, call us at{' '}
                    <a href="tel:1300123456" className="font-medium underline app-blue">
                      1300 123 456
                    </a>{' '}
                    or email{' '}
                    <a href="mailto:support@nswcc.com.au" className="font-medium underline app-blue">
                      support@nswcc.com.au
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Portal;



