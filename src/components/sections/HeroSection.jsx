import { useState } from 'react';
import Button from '../common/Button.jsx';
import { COMPANY_INFO, NAVIGATION_LINKS } from '../../utils/constants.js';
import { scrollToElement } from '../../utils/helpers.js';

const HeroSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleGetQuote = () => {
    scrollToElement('quote-calculator', 80);
  };

  const handleSendPhotos = () => {
    scrollToElement('contact-section', 80);
  };

  const handleCallNow = () => {
    window.location.href = `tel:${COMPANY_INFO.phone}`;
  };

  return (
    <section className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
      
      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center bg-[#00FF66]/10 border border-[#00FF66]/20 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-[#00FF66] rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">NDIS Approved Provider</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-black mb-6 leading-tight">
            Reliable & Professional
            <span className="block text-gradient bg-gradient-to-r from-[#00FF66] to-[#00cc52] bg-clip-text text-transparent">
              Cleaning Services
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
            Supporting Homes, Rentals & NDIS Participants
          </p>

          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            Affordable, flexible cleaning tailored to your needs — including NDIS-compliant services, 
            before & after photos, and GST-included invoicing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              onClick={handleGetQuote}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto text-lg px-8 py-4"
            >
              🟣 Get a Free Quote
            </Button>
            
            <Button
              onClick={handleSendPhotos}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto text-lg px-8 py-4"
            >
              🟢 Send Photos for Estimate
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#00FF66]/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">NDIS Registered</h3>
              <p className="text-sm text-gray-600 text-center">Compliant services with proper invoicing</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#00FF66]/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📸</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Before & After Photos</h3>
              <p className="text-sm text-gray-600 text-center">Complete job documentation included</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#00FF66]/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fully Insured</h3>
              <p className="text-sm text-gray-600 text-center">Police-checked & insured team</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#00FF66]/5 to-[#00cc52]/5 rounded-2xl p-8 border border-[#00FF66]/20">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-left mb-6 md:mb-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Need immediate assistance?</h3>
                <p className="text-gray-600">Call us now for urgent cleaning services</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleCallNow}
                  variant="primary"
                  size="lg"
                  className="whitespace-nowrap"
                >
                  📞 Call {COMPANY_INFO.phone}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-300 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
