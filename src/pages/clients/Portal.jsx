import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';

const Portal = () => {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();

  const handleLogout = async () => {
    await logout();
  };

  const getWelcomeMessage = () => {
    if (user?.client_type === 'ndis') {
      return `Welcome to your NDIS Client Portal, ${user?.first_name}!`;
    }
    return `Welcome to your Client Portal, ${user?.first_name}!`;
  };

  const getPortalDescription = () => {
    if (user?.client_type === 'ndis') {
      return 'Your comprehensive NDIS service management hub is being crafted with care.';
    }
    return 'Your comprehensive service management hub is being crafted with care.';
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#180c2e]' : 'bg-gray-50'} relative overflow-hidden`}>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#006da6]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#180c2e]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-[#0080c7]/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        <header className={`${isDark ? 'bg-[#1a0f33]/80' : 'bg-white/80'} backdrop-blur-xl border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Link to="/" className="flex items-center space-x-3">
                  <img src="/logo.svg" alt="NSWCC Logo" className="h-8 w-auto" />
                  <span className={`text-xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Client Portal
                  </span>
                </Link>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {user?.email}
                </div>
                <button
                  onClick={handleLogout}
                  className="btn-modern-secondary btn-sm"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-12">
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className={`relative p-6 rounded-full ${isDark ? 'bg-blue-900/20' : 'bg-blue-100'}`}>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#006da6] to-[#0080c7] opacity-20 animate-pulse"></div>
                  <svg 
                    className={`relative w-16 h-16 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                    />
                  </svg>
                </div>
              </div>

              <div className="space-y-4">
                <h1 className={`text-4xl md:text-5xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {getWelcomeMessage()}
                </h1>
                <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto leading-relaxed`}>
                  {getPortalDescription()}
                </p>
              </div>
            </div>

            <div className="card-modern max-w-2xl mx-auto">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Coming Soon
                  </h2>
                  <p className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                    We're building something amazing for you! Your personalized portal will include:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`p-4 rounded-xl ${isDark ? 'bg-blue-900/10 border border-blue-800/20' : 'bg-blue-50 border border-blue-200'}`}>
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                        <svg className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div>
                        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Service Management</h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Track and manage your services</p>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl ${isDark ? 'bg-green-900/10 border border-green-800/20' : 'bg-green-50 border border-green-200'}`}>
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${isDark ? 'bg-green-900/30' : 'bg-green-100'}`}>
                        <svg className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Appointment Booking</h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Schedule and manage appointments</p>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl ${isDark ? 'bg-purple-900/10 border border-purple-800/20' : 'bg-purple-50 border border-purple-200'}`}>
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${isDark ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
                        <svg className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Document Center</h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Access important documents</p>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl ${isDark ? 'bg-orange-900/10 border border-orange-800/20' : 'bg-orange-50 border border-orange-200'}`}>
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${isDark ? 'bg-orange-900/30' : 'bg-orange-100'}`}>
                        <svg className={`w-5 h-5 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Support Chat</h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Get help when you need it</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`p-6 rounded-xl ${isDark ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-800/20' : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'}`}>
                  <div className="text-center space-y-3">
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Stay Updated
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      We'll notify you via email when your portal is ready. In the meantime, feel free to explore our services or contact us for any assistance.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                      <Link to="/services" className="btn-modern-primary btn-sm">
                        Explore Services
                      </Link>
                      <Link to="/contact" className="btn-modern-secondary btn-sm">
                        Contact Support
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Portal;
