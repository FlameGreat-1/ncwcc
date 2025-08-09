import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import ProfileAvatar from '../../components/common/ProfileAvatar';

const Portal = () => {
  const { user, isVerified } = useAuth();
  const { isDark } = useTheme();

  const getWelcomeMessage = () => {
    if (user?.client_type === 'ndis') {
      return `Welcome back, ${user?.first_name}!`;
    }
    return `Welcome back, ${user?.first_name}!`;
  };

  const getPortalDescription = () => {
    if (user?.client_type === 'ndis') {
      return 'Your NDIS Client Portal - Manage your services and appointments';
    }
    return 'Your Client Portal - Manage your services and appointments';
  };

  const getDashboardStats = () => {
    return [
      {
        title: 'Active Services',
        value: '3',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        ),
        bgColor: isDark ? 'bg-blue-900/10 border-blue-800/20' : 'bg-blue-50 border-blue-200',
        iconBg: isDark ? 'bg-blue-900/30' : 'bg-blue-100',
        iconColor: isDark ? 'text-blue-400' : 'text-blue-600'
      },
      {
        title: 'Appointments',
        value: '2',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        ),
        bgColor: isDark ? 'bg-green-900/10 border-green-800/20' : 'bg-green-50 border-green-200',
        iconBg: isDark ? 'bg-green-900/30' : 'bg-green-100',
        iconColor: isDark ? 'text-green-400' : 'text-green-600'
      },
      {
        title: 'Documents',
        value: '8',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
        bgColor: isDark ? 'bg-purple-900/10 border-purple-800/20' : 'bg-purple-50 border-purple-200',
        iconBg: isDark ? 'bg-purple-900/30' : 'bg-purple-100',
        iconColor: isDark ? 'text-purple-400' : 'text-purple-600'
      },
      {
        title: 'Messages',
        value: '1',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        ),
        bgColor: isDark ? 'bg-orange-900/10 border-orange-800/20' : 'bg-orange-50 border-orange-200',
        iconBg: isDark ? 'bg-orange-900/30' : 'bg-orange-100',
        iconColor: isDark ? 'text-orange-400' : 'text-orange-600'
      }
    ];
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#180c2e]' : 'bg-gray-50'}`}>
      <header className={`${isDark ? 'bg-[#1a0f33] border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3">
                <img src="/logo.svg" alt="NSWCC Logo" className="h-8 w-auto" />
                <div>
                  <span className={`text-xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Client Portal
                  </span>
                  <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {user?.client_type === 'ndis' ? 'NDIS Services' : 'General Services'}
                  </div>
                </div>
              </Link>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-6">
                <Link 
                  to="/clients/dashboard" 
                  className={`text-sm font-medium transition-colors ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/clients/appointments" 
                  className={`text-sm font-medium transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Appointments
                </Link>
                <Link 
                  to="/clients/documents" 
                  className={`text-sm font-medium transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Documents
                </Link>
                <Link 
                  to="/clients/messages" 
                  className={`text-sm font-medium transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Messages
                </Link>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block text-right">
                  <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {user?.first_name} {user?.last_name}
                  </div>
                  <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {user?.email}
                  </div>
                </div>
                <ProfileAvatar />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {getWelcomeMessage()}
              </h1>
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                {getPortalDescription()}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${isVerified ? (isDark ? 'bg-green-900/20 text-green-400' : 'bg-green-100 text-green-800') : (isDark ? 'bg-yellow-900/20 text-yellow-400' : 'bg-yellow-100 text-yellow-800')}`}>
                <div className={`w-2 h-2 rounded-full ${isVerified ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                {isVerified ? 'Verified Account' : 'Pending Verification'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {getDashboardStats().map((stat, index) => (
              <div key={index} className={`p-6 rounded-xl border ${stat.bgColor}`}>
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
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="card-modern">
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Recent Activity
                  </h2>
                  <Link to="/clients/activity" className={`text-sm font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                    View All
                  </Link>
                </div>
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${isDark ? 'bg-green-900/30' : 'bg-green-100'}`}>
                        <svg className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Welcome to your portal!
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          Your account has been successfully set up
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                          Just now
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                        <svg className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Profile created
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          Your client profile has been created successfully
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                          Today
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${isDark ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
                        <svg className={`w-4 h-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Account verification
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {isVerified ? 'Your email has been verified' : 'Please verify your email address'}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                          Today
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="card-modern">
                <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Link
                    to="/clients/appointments/book"
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-800/50 text-gray-300 hover:text-white' : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'}`}
                  >
                    <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                      <svg className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Book Appointment</p>
                      <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                        Schedule a new service
                      </p>
                    </div>
                  </Link>

                  <Link
                    to="/clients/documents"
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-800/50 text-gray-300 hover:text-white' : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'}`}
                  >
                    <div className={`p-2 rounded-lg ${isDark ? 'bg-green-900/30' : 'bg-green-100'}`}>
                      <svg className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">View Documents</p>
                      <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                        Access your files
                      </p>
                    </div>
                  </Link>

                  <Link
                    to="/contact"
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-800/50 text-gray-300 hover:text-white' : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'}`}
                  >
                    <div className={`p-2 rounded-lg ${isDark ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
                      <svg className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Contact Support</p>
                      <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                        Get help and support
                      </p>
                    </div>
                  </Link>
                </div>
              </div>

              <div className={`p-6 rounded-xl ${isDark ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-800/20' : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'}`}>
                <div className="text-center space-y-3">
                  <div className={`p-3 rounded-full inline-flex ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                    <svg className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Account Status
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {isVerified 
                      ? 'Your account is fully verified and active. You can access all portal features.'
                      : 'Please verify your email address to unlock all portal features.'
                    }
                  </p>
                  {!isVerified && (
                    <Link to="/accounts/email-verification" className="btn-modern-primary btn-sm inline-flex">
                      Verify Email
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Portal;


