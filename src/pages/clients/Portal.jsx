import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import ProfileAvatar from '../../components/common/ProfileAvatar';

const Portal = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();

  const getWelcomeMessage = () => {
    if (user?.client_type === 'ndis') {
      return `Welcome to your NDIS Client Portal, ${user?.first_name}!`;
    }
    return `Welcome to your Client Portal, ${user?.first_name}!`;
  };

  const getPortalDescription = () => {
    if (user?.client_type === 'ndis') {
      return 'Manage your NDIS services, track appointments, and access important documents all in one place.';
    }
    return 'Manage your services, track appointments, and access important documents all in one place.';
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
        color: 'blue',
        bgColor: isDark ? 'bg-blue-900/10 border-blue-800/20' : 'bg-blue-50 border-blue-200',
        iconBg: isDark ? 'bg-blue-900/30' : 'bg-blue-100',
        iconColor: isDark ? 'text-blue-400' : 'text-blue-600'
      },
      {
        title: 'Upcoming Appointments',
        value: '2',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        ),
        color: 'green',
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
        color: 'purple',
        bgColor: isDark ? 'bg-purple-900/10 border-purple-800/20' : 'bg-purple-50 border-purple-200',
        iconBg: isDark ? 'bg-purple-900/30' : 'bg-purple-100',
        iconColor: isDark ? 'text-purple-400' : 'text-purple-600'
      },
      {
        title: 'Messages',
        value: '5',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        ),
        color: 'orange',
        bgColor: isDark ? 'bg-orange-900/10 border-orange-800/20' : 'bg-orange-50 border-orange-200',
        iconBg: isDark ? 'bg-orange-900/30' : 'bg-orange-100',
        iconColor: isDark ? 'text-orange-400' : 'text-orange-600'
      }
    ];
  };

  const getQuickActions = () => {
    return [
      {
        title: 'Book Appointment',
        description: 'Schedule a new service appointment',
        href: '/appointments/book',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        ),
        color: 'blue'
      },
      {
        title: 'View Documents',
        description: 'Access your service documents',
        href: '/documents',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        ),
        color: 'green'
      },
      {
        title: 'Contact Support',
        description: 'Get help with your services',
        href: '/contact',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        color: 'purple'
      }
    ];
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
                <ProfileAvatar />
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className={`text-3xl md:text-4xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {getWelcomeMessage()}
              </h1>
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
                {getPortalDescription()}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getDashboardStats().map((stat, index) => (
                <div key={index} className={`p-6 rounded-xl border ${stat.bgColor}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {stat.title}
                      </p>
                      <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
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
                    <Link to="/activity" className={`text-sm font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
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
                            Service completed
                          </p>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Home cleaning service was completed successfully
                          </p>
                          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                            2 hours ago
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                          <svg className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Appointment scheduled
                          </p>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Your next appointment is scheduled for tomorrow at 2:00 PM
                          </p>
                          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                            1 day ago
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${isDark ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
                          <svg className={`w-4 h-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            New document available
                          </p>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Service agreement document has been uploaded
                          </p>
                          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                            3 days ago
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
                    {getQuickActions().map((action, index) => (
                      <Link
                        key={index}
                        to={action.href}
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-800/50 text-gray-300 hover:text-white' : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'}`}
                      >
                        <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                          <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                            {action.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{action.title}</p>
                          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                            {action.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className={`p-6 rounded-xl ${isDark ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-800/20' : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'}`}>
                  <div className="text-center space-y-3">
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Need Help?
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Our support team is here to assist you with any questions or concerns.
                    </p>
                    <Link to="/contact" className="btn-modern-primary btn-sm inline-flex">
                      Contact Support
                    </Link>
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

