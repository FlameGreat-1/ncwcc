import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import LoadingSpinner from './components/common/LoadingSpinner.jsx';
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
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="lg" text="Loading..." />
  </div>
);

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
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
    </Router>
  );
};

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="text-6xl mb-6">🧹</div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="space-y-4">
        <a
          href="/"
          className="inline-block bg-[#00FF66] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#00e65a] transition-colors"
        >
          Go Home
        </a>
        <div className="text-sm text-gray-500">
          <a href="/contact" className="text-[#00FF66] hover:text-[#00cc52]">
            Contact us
          </a>
          {' '}if you need help finding what you're looking for.
        </div>
      </div>
    </div>
  </div>
);

export default App;
