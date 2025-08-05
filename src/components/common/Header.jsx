import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../common/Button.jsx';
import { NAVIGATION_LINKS, COMPANY_INFO } from '../../utils/constants.js';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const servicesDropdown = [
    { name: 'General Home Cleaning', path: '/services#general' },
    { name: 'Deep Cleaning', path: '/services#deep' },
    { name: 'End-of-Lease Cleaning', path: '/services#end-of-lease' },
    { name: 'NDIS Cleaning Support', path: '/services#ndis' },
    { name: 'Pet Hair Removal', path: '/services#pet-treatment' },
    { name: 'Window & Carpet Cleaning', path: '/services#window-carpet' }
  ];

  const resourcesDropdown = [
    { name: 'FAQ', path: '/faq' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'NDIS Information', path: '/ndis' },
    { name: 'Cleaning Tips', path: '/blog' }
  ];

  const isActivePath = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/95 backdrop-blur-md shadow-lg' 
        : 'bg-black/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Left Section - Logo/Brand */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-[#00FF66] rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-xl">N</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-white font-bold text-lg leading-tight">
                  {COMPANY_INFO.name}
                </h1>
                <p className="text-gray-400 text-xs">Professional Cleaning Services</p>
              </div>
            </Link>
          </div>

          {/* Center Section - Multi-Level Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-[#00FF66] ${
                isActivePath('/') ? 'text-[#00FF66]' : 'text-white'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-[#00FF66] ${
                isActivePath('/about') ? 'text-[#00FF66]' : 'text-white'
              }`}
            >
              About
            </Link>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('services')}
                className={`flex items-center text-sm font-medium transition-colors hover:text-[#00FF66] ${
                  isActivePath('/services') ? 'text-[#00FF66]' : 'text-white'
                }`}
              >
                Services
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  {servicesDropdown.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#00FF66]/10 hover:text-[#00FF66] transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/quote"
              className={`text-sm font-medium transition-colors hover:text-[#00FF66] ${
                isActivePath('/quote') ? 'text-[#00FF66]' : 'text-white'
              }`}
            >
              Get Quote
            </Link>

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('resources')}
                className="flex items-center text-sm font-medium text-white transition-colors hover:text-[#00FF66]"
              >
                Resources
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {activeDropdown === 'resources' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  {resourcesDropdown.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#00FF66]/10 hover:text-[#00FF66] transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-[#00FF66] ${
                isActivePath('/contact') ? 'text-[#00FF66]' : 'text-white'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Section - User/Action Tools */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-3">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                📞 {COMPANY_INFO.phone}
              </a>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`tel:${COMPANY_INFO.phone}`, '_self')}
              >
                Call Now
              </Button>
              
              <Button
                variant="primary"
                size="sm"
                onClick={() => window.location.href = '/quote'}
              >
                Get Quote
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-md text-white hover:text-[#00FF66] hover:bg-white/10 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {NAVIGATION_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActivePath(link.path)
                      ? 'text-[#00FF66] bg-[#00FF66]/10'
                      : 'text-white hover:text-[#00FF66] hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-800 mt-4">
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => window.open(`tel:${COMPANY_INFO.phone}`, '_self')}
                  >
                    📞 Call Now
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={() => window.location.href = '/quote'}
                  >
                    Get Free Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

