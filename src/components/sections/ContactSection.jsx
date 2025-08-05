import { useState } from 'react';
import { COMPANY_INFO, BUSINESS_HOURS, SERVICE_AREAS } from '../../utils/constants.js';
import { formatPhone } from '../../utils/helpers.js';
import ContactForm from '../forms/ContactForm.jsx';
import Button from '../common/Button.jsx';

const ContactSection = () => {
  const [showMap, setShowMap] = useState(false);

  const handleCallNow = () => {
    window.location.href = `tel:${COMPANY_INFO.phone}`;
  };

  const handleEmailSupport = () => {
    window.location.href = `mailto:${COMPANY_INFO.email.support}`;
  };

  const handleEmailBookings = () => {
    window.location.href = `mailto:${COMPANY_INFO.email.bookings}`;
  };

  const handleFormSuccess = (result) => {
    console.log('Contact form submitted successfully:', result);
  };

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  const businessHoursArray = Object.entries(BUSINESS_HOURS).map(([day, hours]) => ({
    day: day.charAt(0).toUpperCase() + day.slice(1),
    hours
  }));

  return (
    <section className="section-padding bg-white" id="contact-section">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to book your cleaning service? Contact us today for a free quote 
            or to discuss your specific cleaning needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#00FF66]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-[#00FF66] text-xl">📞</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                    <p className="text-gray-600 mb-2">{formatPhone(COMPANY_INFO.phone)}</p>
                    <Button
                      onClick={handleCallNow}
                      variant="secondary"
                      size="sm"
                    >
                      Call Now
                    </Button>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#00FF66]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-[#00FF66] text-xl">✉️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-gray-600 text-sm">General Support:</p>
                        <button
                          onClick={handleEmailSupport}
                          className="text-[#00FF66] hover:text-[#00cc52] transition-colors"
                        >
                          {COMPANY_INFO.email.support}
                        </button>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Bookings:</p>
                        <button
                          onClick={handleEmailBookings}
                          className="text-[#00FF66] hover:text-[#00cc52] transition-colors"
                        >
                          {COMPANY_INFO.email.bookings}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#00FF66]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-[#00FF66] text-xl">🏢</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Business Details</h4>
                    <p className="text-gray-600">ABN: {COMPANY_INFO.abn}</p>
                    <p className="text-gray-600">{COMPANY_INFO.address.state}, {COMPANY_INFO.address.country}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Business Hours</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="space-y-3">
                  {businessHoursArray.map(({ day, hours }) => (
                    <div key={day} className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{day}</span>
                      <span className={`text-sm ${hours === 'Closed' ? 'text-red-600' : 'text-gray-600'}`}>
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Service Areas</h3>
              <div className="grid grid-cols-2 gap-3">
                {SERVICE_AREAS.map((area, index) => (
                  <div 
                    key={index}
                    className="bg-gray-50 rounded-lg p-3 text-center hover:bg-[#00FF66]/5 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-800">{area}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Don't see your area? Contact us to check service availability in your location.
              </p>
            </div>
          </div>

          <div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
              <ContactForm 
                onSuccess={handleFormSuccess}
                className="space-y-6"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#00FF66]/10 to-[#00cc52]/10 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need Immediate Assistance?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              For urgent cleaning services or same-day bookings, call us directly. 
              We're here to help with all your cleaning needs across NSW.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleCallNow}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Call {formatPhone(COMPANY_INFO.phone)}
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Response time: Within 2 hours during business hours
              </p>
            </div>
          </div>
        </div>

        {showMap && (
          <div className="mt-12">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">Our Service Coverage</h3>
                  <button
                    onClick={toggleMap}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="h-96 bg-gray-100 flex items-center justify-center">
                <p className="text-gray-500">Interactive map would be embedded here</p>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <Button
            onClick={toggleMap}
            variant="outline"
            size="md"
          >
            {showMap ? 'Hide Service Map' : 'View Service Coverage Map'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
