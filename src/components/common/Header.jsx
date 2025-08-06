import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../common/Button.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import { NAVIGATION_LINKS, COMPANY_INFO } from '../../utils/constants.js';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const servicesDropdown = [
    { name: 'General Home Cleaning', path: '/services#general', icon: '🏠' },
    { name: 'Deep Cleaning', path: '/services#deep', icon: '✨' },
    { name: 'End-of-Lease Cleaning', path: '/services#end-of-lease', icon: '🔑' },
    { name: 'NDIS Cleaning Support', path: '/services#ndis', icon: '🛡️' },
    { name: 'Pet Hair Removal', path: '/services#pet-treatment', icon: '🐕' },
    { name: 'Window & Carpet Cleaning', path: '/services#window-carpet', icon: '🪟' }
  ];

  const resourcesDropdown = [
    { name: 'FAQ', path: '/faq', icon: '❓' },
    { name: 'Gallery', path: '/gallery', icon: '📸' },
    { name: 'NDIS Information', path: '/ndis', icon: '📋' },
    { name: 'Cleaning Tips', path: '/blog', icon: '💡' }
  ];

  const isActivePath = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header ref={headerRef} className="fixed top-2 left-4 right-4 z-[100] transition-all duration-700 ease-out">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#006da6]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-24 h-24 bg-[#180c2e]/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-20 bg-[#006da6]/10 rounded-full blur-3xl"></div>
      </div>

      <div className={`relative transition-all duration-700 ease-out app-bg-card app-border border ${
        isScrolled 
          ? 'backdrop-blur-2xl shadow-2xl' 
          : 'backdrop-blur-xl shadow-xl'
      } rounded-3xl overflow-visible`}>
        
        <div className="absolute inset-0 bg-gradient-to-r from-[#006da6]/5 via-transparent to-[#180c2e]/5 rounded-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-20 lg:h-24">
            
            <div className="flex-shrink-0">
              <Link 
                to="/" 
                className="flex items-center space-x-5 hover:opacity-90 transition-all duration-500 group"
              >
                <div className="relative">
                  <img 
                    src="/logo.svg" 
                    alt="NSWCC Logo" 
                    className="w-20 h-20 object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-lg"
                  />
                  {/* <img
                    src="/ndis.png" 
                    alt="NDIS Badge" 
                    className="absolute -top-2 -right-2 w-6 h-6 object-contain animate-pulse drop-shadow-md"
                  /> */}
                </div>
                <div className="hidden sm:block">
                  <h1 className="app-text-primary font-black text-2xl leading-tight tracking-tight group-hover:text-[#006da6] transition-colors duration-300">
                    NSWCC
                  </h1>
                  <p className="app-text-secondary text-sm font-semibold">Professional • Reliable • Insured</p>
                </div>
              </Link>
            </div>

            <nav className="hidden lg:flex items-center space-x-2 app-bg-glass backdrop-blur-lg rounded-2xl px-4 py-2 app-border-glass border shadow-lg overflow-visible">
              <Link
                to="/"
                className={`px-5 py-3 rounded-xl text-sm font-bold transition-all duration-400 hover:scale-105 ${
                  isActivePath('/') 
                    ? 'text-white bg-gradient-to-r from-[#006da6] to-[#180c2e] shadow-lg shadow-[#006da6]/30' 
                    : 'app-text-primary hover:text-[#006da6] hover:bg-white/60 dark:hover:bg-white/10'
                }`}
              >
                Home
              </Link>

              <Link
                to="/about"
                className={`px-5 py-3 rounded-xl text-sm font-bold transition-all duration-400 hover:scale-105 ${
                  isActivePath('/about') 
                    ? 'text-white bg-gradient-to-r from-[#006da6] to-[#180c2e] shadow-lg shadow-[#006da6]/30' 
                    : 'app-text-primary hover:text-[#006da6] hover:bg-white/60 dark:hover:bg-white/10'
                }`}
              >
                About
              </Link>

              <div className="relative">
                <button
                  onClick={() => toggleDropdown('services')}
                  onMouseEnter={() => setActiveDropdown('services')}
                  className={`flex items-center px-5 py-3 rounded-xl text-sm font-bold transition-all duration-400 hover:scale-105 ${
                    isActivePath('/services') 
                      ? 'text-white bg-gradient-to-r from-[#006da6] to-[#180c2e] shadow-lg shadow-[#006da6]/30' 
                      : 'app-text-primary hover:text-[#006da6] hover:bg-white/60 dark:hover:bg-white/10'
                  }`}
                >
                  Services
                  <svg className={`ml-2 w-4 h-4 transition-transform duration-400 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {activeDropdown === 'services' && (
                  <div 
                    className="absolute top-full left-0 mt-3 w-80 app-bg-card backdrop-blur-2xl rounded-3xl shadow-2xl app-border-glass border py-4 z-[9999] animate-in slide-in-from-top-3 duration-500"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="grid grid-cols-1 gap-1 px-3">
                      {servicesDropdown.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="flex items-center px-5 py-4 text-sm font-semibold app-text-secondary hover:bg-gradient-to-r hover:from-[#006da6]/10 hover:to-[#006da6]/5 hover:text-[#006da6] rounded-2xl transition-all duration-400 group hover:scale-105"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <span className="text-xl mr-4 group-hover:scale-125 transition-transform duration-400">{item.icon}</span>
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('resources')}
                  onMouseEnter={() => setActiveDropdown('resources')}
                  className="flex items-center px-5 py-3 rounded-xl text-sm font-bold app-text-primary hover:text-[#006da6] transition-all duration-400 hover:bg-white/60 dark:hover:bg-white/10 hover:scale-105"
                >
                  Resources
                  <svg className={`ml-2 w-4 h-4 transition-transform duration-400 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {activeDropdown === 'resources' && (
                  <div 
                    className="absolute top-full left-0 mt-3 w-64 app-bg-card backdrop-blur-2xl rounded-3xl shadow-2xl app-border-glass border py-4 z-[9999] animate-in slide-in-from-top-3 duration-500"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="px-3">
                      {resourcesDropdown.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="flex items-center px-5 py-4 text-sm font-semibold app-text-secondary hover:bg-gradient-to-r hover:from-[#006da6]/10 hover:to-[#006da6]/5 hover:text-[#006da6] rounded-2xl transition-all duration-400 group hover:scale-105"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <span className="text-xl mr-4 group-hover:scale-125 transition-transform duration-400">{item.icon}</span>
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/contact"
                className={`px-5 py-3 rounded-xl text-sm font-bold transition-all duration-400 hover:scale-105 ${
                  isActivePath('/contact') 
                    ? 'text-white bg-gradient-to-r from-[#006da6] to-[#180c2e] shadow-lg shadow-[#006da6]/30' 
                    : 'app-text-primary hover:text-[#006da6] hover:bg-white/60 dark:hover:bg-white/10'
                }`}
              >
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              {/*<ThemeToggle className="hidden lg:block" />*/}
              
              <div className="hidden lg:flex items-center">
                <button
                  onClick={() => window.location.href = '/quote'}
                  className="relative px-8 py-4 bg-gradient-to-r from-[#006da6] to-[#180c2e] hover:from-[#0080c7] hover:to-[#2d1b4e] text-white font-black rounded-2xl hover:shadow-2xl hover:shadow-[#006da6]/40 transition-all duration-500 hover:scale-110 hover:-translate-y-1 text-sm overflow-hidden group"
                >
                  <span className="relative z-10">Get Quote</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0080c7] to-[#2d1b4e] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
              </div>

              <button
                onClick={toggleMenu}
                className="lg:hidden p-4 rounded-2xl app-text-secondary hover:app-text-primary hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-400 hover:scale-110"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden app-bg-card backdrop-blur-2xl app-border-glass border-t rounded-b-3xl shadow-2xl mt-2">
              <div className="px-6 pt-6 pb-8 space-y-3">
                {NAVIGATION_LINKS.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-6 py-4 rounded-2xl text-base font-bold transition-all duration-400 hover:scale-105 ${
                      isActivePath(link.path)
                        ? 'text-white bg-gradient-to-r from-[#006da6] to-[#180c2e] shadow-lg shadow-[#006da6]/30'
                        : 'app-text-primary hover:text-[#006da6] hover:bg-white/60 dark:hover:bg-white/10'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                
                <div className="pt-6 border-t app-border-glass mt-6 space-y-4">
                  {/*<div className="flex justify-center">
                    <ThemeToggle />
                  </div>*/}
                  
                  <button
                    onClick={() => window.location.href = '/quote'}
                    className="w-full px-8 py-4 bg-gradient-to-r from-[#006da6] to-[#180c2e] hover:from-[#0080c7] hover:to-[#2d1b4e] text-white font-black rounded-2xl hover:shadow-2xl hover:shadow-[#006da6]/40 transition-all duration-500 hover:scale-105"
                  >
                    Get Free Quote
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

