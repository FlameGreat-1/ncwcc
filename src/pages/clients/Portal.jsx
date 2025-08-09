import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Link, useLocation } from 'react-router-dom';
import ProfileAvatar from '../../components/common/ProfileAvatar';
import useQuotes from '../../hooks/useQuotes';
import QuotesList from '../../components/quotes/QuotesList';
import QuoteForm from '../../components/quotes/QuoteForm';
import QuoteDetail from '../../pages/quotes/QuoteDetail';
import CreateQuote from '../../pages/quotes/CreateQuote';
import EditQuote from '../../pages/quotes/EditQuote';
import MyQuotes from '../../pages/quotes/MyQuotes';

const Portal = () => {
  const { user, isVerified } = useAuth();
  const { isDark } = useTheme();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [quoteStats, setQuoteStats] = useState({
    total: 0,
    draft: 0,
    submitted: 0,
    approved: 0,
    totalValue: 0
  });

  const { quotes: allQuotes, loading: quotesLoading } = useQuotes('my', {}, true);

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
    } else if (path.includes('/clients/quotes/')) {
      setCurrentView('quote-detail');
    } else if (path.startsWith('/clients/appointments')) {
      setCurrentView('appointments');
    } else if (path.startsWith('/clients/documents')) {
      setCurrentView('documents');
    } else if (path.startsWith('/clients/messages')) {
      setCurrentView('messages');
    }
  }, [location.pathname]);

  useEffect(() => {
    if (allQuotes.length > 0) {
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

  const navigation = [
    {
      name: 'Dashboard',
      href: '/clients/portal',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2V5z" />
        </svg>
      ),
      current: location.pathname === '/clients/portal'
    },
    {
      name: 'Quotes',
      href: '/clients/quotes',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      current: location.pathname.startsWith('/clients/quotes'),
      badge: quoteStats.total > 0 ? quoteStats.total : null
    },
    {
      name: 'Appointments',
      href: '/clients/appointments',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      current: location.pathname.startsWith('/clients/appointments')
    },
    {
      name: 'Documents',
      href: '/clients/documents',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      current: location.pathname.startsWith('/clients/documents')
    },
    {
      name: 'Messages',
      href: '/clients/messages',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      current: location.pathname.startsWith('/clients/messages')
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
        bgColor: isDark ? 'bg-blue-900/10 border-blue-800/20' : 'bg-blue-50 border-blue-200',
        iconBg: isDark ? 'bg-blue-900/30' : 'bg-blue-100',
        iconColor: isDark ? 'text-blue-400' : 'text-blue-600',
        link: '/clients/quotes'
      },
      {
        title: 'Approved Quotes',
        value: quoteStats.approved.toString(),
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        bgColor: isDark ? 'bg-green-900/10 border-green-800/20' : 'bg-green-50 border-green-200',
        iconBg: isDark ? 'bg-green-900/30' : 'bg-green-100',
        iconColor: isDark ? 'text-green-400' : 'text-green-600',
        link: '/clients/quotes?status=approved'
      },
      {
        title: 'Pending Quotes',
        value: (quoteStats.draft + quoteStats.submitted).toString(),
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        bgColor: isDark ? 'bg-yellow-900/10 border-yellow-800/20' : 'bg-yellow-50 border-yellow-200',
        iconBg: isDark ? 'bg-yellow-900/30' : 'bg-yellow-100',
        iconColor: isDark ? 'text-yellow-400' : 'text-yellow-600',
        link: '/clients/quotes?status=submitted'
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
        bgColor: isDark ? 'bg-purple-900/10 border-purple-800/20' : 'bg-purple-50 border-purple-200',
        iconBg: isDark ? 'bg-purple-900/30' : 'bg-purple-100',
        iconColor: isDark ? 'text-purple-400' : 'text-purple-600',
        link: '/clients/quotes'
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
      default: return `Welcome back, ${user?.first_name}`;
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#180c2e]' : 'bg-gray-50'} flex`}>
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:flex lg:flex-col`}>
        <div className={`flex flex-col w-full h-full ${isDark ? 'bg-[#1a0f33] border-gray-700' : 'bg-white border-gray-200'} border-r`}>
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3">
              <img src="/logo.svg" alt="NSWCC Logo" className="h-8 w-auto" />
              <div>
                <span className={`text-lg font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Client Portal
                </span>
                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {user?.client_type === 'ndis' ? 'NDIS Services' : 'General Services'}
                </div>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className={`lg:hidden p-2 rounded-md ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  item.current
                    ? isDark
                      ? 'bg-blue-900/20 text-blue-400 border border-blue-800/30'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                    : isDark
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </div>
                {item.badge && (
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.current
                      ? isDark
                        ? 'bg-blue-800/50 text-blue-200'
                        : 'bg-blue-200 text-blue-800'
                      : isDark
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
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
        <header className={`${isDark ? 'bg-[#1a0f33] border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-30 flex-shrink-0`}>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className={`lg:hidden p-2 rounded-md ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div className="ml-4 lg:ml-0">
                  <h1 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {getPageTitle()}
                  </h1>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {getPageSubtitle()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {currentView === 'quotes' && (
                  <Link
                    to="/clients/quotes/create"
                    className="btn-modern-primary btn-sm hidden sm:inline-flex"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    New Quote
                  </Link>
                )}
                <div className="hidden sm:flex items-center space-x-2">
                  <button className={`p-2 rounded-lg transition-colors ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                  <button className={`relative p-2 rounded-lg transition-colors ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 00-15 0v5h5l-5 5-5-5h5V7a9.5 9.5 0 0119 0v10z" />
                    </svg>
                    <span className="absolute -top-1 -right-1 block h-3 w-3 rounded-full bg-red-400 ring-2 ring-white"></span>
                  </button>
                </div>
                <ProfileAvatar />
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
                    <Link
                      key={index}
                      to={stat.link}
                      className={`block p-6 rounded-xl border ${stat.bgColor} transition-all duration-200 hover:scale-105 hover:shadow-lg`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {stat.title}
                          </p>
                          <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mt-1`}>
                            {stat.value}
                          </p>
                        </div>
                        <div className={`p-3 rounded-lg ${stat.iconBg}`}>
                          <div className={stat.iconColor}>
                            {stat.icon}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  <div className="xl:col-span-2">
                    <div className={`rounded-xl border p-6 ${isDark ? 'bg-[#1a0f33] border-gray-700' : 'bg-white border-gray-200'}`}>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Recent Quote Activity
                        </h2>
                        <Link to="/clients/quotes" className={`text-sm font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors`}>
                          View All Quotes
                        </Link>
                      </div>
                      <div className="space-y-4">
                        {allQuotes.slice(0, 3).map((quote, index) => (
                          <Link
                            key={quote.id}
                            to={`/clients/quotes/${quote.id}`}
                            className={`block p-4 rounded-lg ${isDark ? 'bg-gray-800/50 hover:bg-gray-800/70' : 'bg-gray-50 hover:bg-gray-100'} transition-colors`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    Quote {quote.quote_number}
                                  </p>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    quote.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                    quote.status === 'submitted' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                                    quote.status === 'draft' ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' :
                                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                  }`}>
                                    {quote.status.replace('_', ' ').toUpperCase()}
                                  </span>
                                </div>
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {quote.cleaning_type.replace('_', ' ')} • {quote.property_address.substring(0, 30)}...
                                </p>
                                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                                  {new Date(quote.created_at).toLocaleDateString('en-AU')}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                  {formatCurrency(quote.final_price)}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                        
                        {allQuotes.length === 0 && (
                          <div className="text-center py-8">
                            <div className={`mx-auto w-16 h-16 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-center mb-4`}>
                              <svg className={`w-8 h-8 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                              No quotes yet
                            </h3>
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                              Get started by creating your first cleaning service quote
                            </p>
                            <Link
                              to="/clients/quotes/create"
                              className="btn-modern-primary btn-sm"
                            >
                              Create Your First Quote
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className={`rounded-xl border p-6 ${isDark ? 'bg-[#1a0f33] border-gray-700' : 'bg-white border-gray-200'}`}>
                      <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Quick Actions
                      </h3>
                      <div className="space-y-3">
                        <Link
                          to="/clients/quotes/create"
                          className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${isDark ? 'hover:bg-gray-800/50 text-gray-300 hover:text-white' : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'} hover:scale-105`}
                        >
                          <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                            <svg className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">Request Quote</p>
                            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                              Get pricing for cleaning services
                            </p>
                          </div>
                        </Link>

                        <Link
                          to="/clients/quotes"
                          className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${isDark ? 'hover:bg-gray-800/50 text-gray-300 hover:text-white' : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'} hover:scale-105`}
                        >
                          <div className={`p-2 rounded-lg ${isDark ? 'bg-green-900/30' : 'bg-green-100'}`}>
                            <svg className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">View All Quotes</p>
                            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                              Manage existing quotes
                            </p>
                          </div>
                        </Link>

                        <Link
                          to="/clients/appointments/book"
                          className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${isDark ? 'hover:bg-gray-800/50 text-gray-300 hover:text-white' : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'} hover:scale-105`}
                        >
                          <div className={`p-2 rounded-lg ${isDark ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
                            <svg className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">Book Service</p>
                            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                              Schedule an appointment
                            </p>
                          </div>
                        </Link>

                        <Link
                          to="/clients/messages"
                          className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${isDark ? 'hover:bg-gray-800/50 text-gray-300 hover:text-white' : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'} hover:scale-105`}
                        >
                          <div className={`p-2 rounded-lg ${isDark ? 'bg-orange-900/30' : 'bg-orange-100'}`}>
                            <svg className={`w-5 h-5 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">Contact Support</p>
                            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                              Get help and assistance
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>

                    <div className={`rounded-xl border p-6 ${isDark ? 'bg-[#1a0f33] border-gray-700' : 'bg-white border-gray-200'}`}>
                      <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Account Status
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Email Verification
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            isVerified 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          }`}>
                            {isVerified ? 'Verified' : 'Pending'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Account Type
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user?.client_type === 'ndis'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                          }`}>
                            {user?.client_type === 'ndis' ? 'NDIS Client' : 'General Client'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Member Since
                          </span>
                          <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {user?.date_joined ? new Date(user.date_joined).toLocaleDateString('en-AU', { 
                              year: 'numeric', 
                              month: 'short' 
                            }) : 'Recently'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
                        {currentView === 'quotes' && (
              <div className="animate-fade-in-up">
                <MyQuotes />
              </div>
            )}

            {currentView === 'create-quote' && (
              <div className="animate-fade-in-up">
                <CreateQuote />
              </div>
            )}

            {currentView === 'edit-quote' && (
              <div className="animate-fade-in-up">
                <EditQuote />
              </div>
            )}

            {currentView === 'quote-detail' && (
              <div className="animate-fade-in-up">
                <QuoteDetail />
              </div>
            )}

            {currentView === 'appointments' && (
              <div className="animate-fade-in-up">
                <div className={`rounded-xl border p-8 text-center ${isDark ? 'bg-[#1a0f33] border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className={`mx-auto w-16 h-16 rounded-full ${isDark ? 'bg-green-900/30' : 'bg-green-100'} flex items-center justify-center mb-4`}>
                    <svg className={`w-8 h-8 ${isDark ? 'text-green-400' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                    Appointments
                  </h2>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                    Schedule and manage your cleaning service appointments
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto">
                    <Link
                      to="/clients/quotes/create"
                      className="btn-modern-primary btn-md"
                    >
                      Request Quote First
                    </Link>
                    <button className="btn-modern-secondary btn-md">
                      View Calendar
                    </button>
                  </div>
                  <div className={`mt-8 p-4 rounded-lg ${isDark ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                    <p className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                      <strong>Note:</strong> Appointments are scheduled after quote approval. 
                      Start by creating a quote for your cleaning service needs.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentView === 'documents' && (
              <div className="animate-fade-in-up">
                <div className={`rounded-xl border p-8 text-center ${isDark ? 'bg-[#1a0f33] border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className={`mx-auto w-16 h-16 rounded-full ${isDark ? 'bg-purple-900/30' : 'bg-purple-100'} flex items-center justify-center mb-4`}>
                    <svg className={`w-8 h-8 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                    Documents
                  </h2>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                    Access your service agreements, invoices, and reports
                  </p>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded ${isDark ? 'bg-green-900/30' : 'bg-green-100'}`}>
                            <svg className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="text-left">
                            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              Quote Documents
                            </p>
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              Approved quotes available as PDFs
                            </p>
                          </div>
                        </div>
                        <Link
                          to="/clients/quotes?status=approved"
                          className="btn-modern-secondary btn-sm"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                            <svg className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="text-left">
                            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              Service Agreements
                            </p>
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              Terms and conditions
                            </p>
                          </div>
                        </div>
                        <button className="btn-modern-secondary btn-sm" disabled>
                          Coming Soon
                        </button>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded ${isDark ? 'bg-orange-900/30' : 'bg-orange-100'}`}>
                            <svg className={`w-4 h-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="text-left">
                            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              Invoices & Receipts
                            </p>
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              Payment history and receipts
                            </p>
                          </div>
                        </div>
                        <button className="btn-modern-secondary btn-sm" disabled>
                          Coming Soon
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentView === 'messages' && (
              <div className="animate-fade-in-up">
                <div className={`rounded-xl border p-8 text-center ${isDark ? 'bg-[#1a0f33] border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className={`mx-auto w-16 h-16 rounded-full ${isDark ? 'bg-orange-900/30' : 'bg-orange-100'} flex items-center justify-center mb-4`}>
                    <svg className={`w-8 h-8 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                    Messages
                  </h2>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                    Communicate with our support team and service providers
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto mb-6">
                    <button className="btn-modern-primary btn-md">
                      Start New Conversation
                    </button>
                    <button className="btn-modern-secondary btn-md">
                      View Message History
                    </button>
                  </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                    <p className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                      <strong>Quick Contact:</strong> For urgent matters, call us at{' '}
                      <a href="tel:1300123456" className="font-medium underline">
                        1300 123 456
                      </a>{' '}
                      or email{' '}
                      <a href="mailto:support@nswcc.com.au" className="font-medium underline">
                        support@nswcc.com.au
                      </a>
                    </p>
                  </div>
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



