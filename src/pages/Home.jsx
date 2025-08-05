import SEO from '../components/common/SEO.jsx';
import HeroSection from '../components/sections/HeroSection.jsx';
import AboutSection from '../components/sections/AboutSection.jsx';
import ServicesSection from '../components/sections/ServicesSection.jsx';
import GallerySection from '../components/sections/GallerySection.jsx';
import NDISSection from '../components/sections/NDISSection.jsx';
import TestimonialsSection from '../components/sections/TestimonialsSection.jsx';
import QuoteCalculatorSection from '../components/sections/QuoteCalculatorSection.jsx';
import ContactSection from '../components/sections/ContactSection.jsx';

const Home = () => {
  return (
    <>
      <SEO
        title="Professional Cleaning Services NSW"
        description="Reliable & professional cleaning services supporting homes, rentals & NDIS participants. NDIS-compliant services, before & after photos, GST-included invoicing across NSW."
        keywords="cleaning services NSW, NDIS cleaning, end of lease cleaning, deep cleaning, home cleaning, bond cleaning, professional cleaners Sydney, NSW cleaning company"
      />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <QuoteCalculatorSection />
        <GallerySection />
        <NDISSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
    </>
  );
};

export default Home;

