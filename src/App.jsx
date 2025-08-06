import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext.jsx';
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import LoadingSpinner from './components/common/LoadingSpinner.jsx';
import './styles/theme.css';
import './styles/globals.css';

const Home = lazy(() => import('./pages/Home.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Services = lazy(() => import('./pages/Services.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const QuoteCalculator = lazy(() => import('./pages/QuoteCalculator.jsx'));
const Gallery = lazy(() => import('./pages/Gallery.jsx'));
const NDISInfo = lazy(() => import('./pages/NDISInfo.jsx'));
const FAQ = lazy(() => import('./pages/FAQ.jsx'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center app-bg-primary">
    <div className="relative group">
      <div className="absolute -inset-4 bg-gradient-to-r from-[#006da6] via-[#0080c7] to-[#180c2e] rounded-3xl blur opacity-30 animate-pulse"></div>
      <div className="relative app-bg-card app-border border-2 rounded-3xl p-8 app-shadow-xl">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    </div>
  </div>
);

const ThemeOrchestrator = ({ children }) => {
  const { isDark } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    
    if (isDark) {
      root.classList.add('app-dark');
      root.classList.remove('app-light');
    } else {
      root.classList.add('app-light');
      root.classList.remove('app-dark');
    }

    const themeVars = {
      '--app-bg-primary': isDark ? '#180c2e' : '#FFFFFF',
      '--app-bg-secondary': isDark ? '#2d1b4e' : '#F8F9FA',
      '--app-bg-card': isDark ? '#1a0f33' : '#FFFFFF',
      '--app-bg-glass': isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)',
      
      '--app-text-primary': isDark ? '#FFFFFF' : '#180c2e',
      '--app-text-secondary': isDark ? '#f5f5f5' : '#333333',
      '--app-text-muted': isDark ? '#CCCCCC' : '#6B7280',
      
      '--app-border': isDark ? '#4a3b6b' : '#E5E7EB',
      '--app-border-glass': isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.4)',
      '--app-shadow': isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)',
      '--app-shadow-lg': isDark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.15)',
      '--app-shadow-xl': isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.2)',
      
      '--app-blue': '#006da6',
      '--app-blue-hover': '#0080c7',
      '--app-blue-dark': '#005a8a',
      '--app-indigo': '#180c2e',
      
      '--app-backdrop-blur': 'blur(12px)',
      '--app-glass-bg': isDark ? 'rgba(26, 15, 51, 0.8)' : 'rgba(255, 255, 255, 0.8)',
    };

    Object.entries(themeVars).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

  }, [isDark]);

  return children;
};

const AppContent = () => {
  return (
    <div className="min-h-screen app-bg-primary app-text-primary flex flex-col app-transition">
      <Header />
      
      <main className="flex-1">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/quote" element={<QuoteCalculator />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/ndis" element={<NDISInfo />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <ThemeOrchestrator>
          <AppContent />
        </ThemeOrchestrator>
      </Router>
    </ThemeProvider>
  );
};

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center app-bg-secondary relative overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#006da6]/3 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#180c2e]/2 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>
    
    <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
      <div className="app-glass-card p-12 rounded-3xl">
        <div className="text-8xl mb-8 animate-bounce">🧹</div>
        <h1 className="text-4xl md:text-5xl font-black app-text-primary mb-6">Page Not Found</h1>
        <p className="text-lg app-text-secondary mb-10 font-medium leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a href="/" className="app-button-primary">
          <span className="text-xl">🏠</span>
          Go Home
        </a>
      </div>
    </div>
  </div>
);

export default App;
