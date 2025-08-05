import SEO from '../components/common/SEO.jsx';
import ContactSection from '../components/sections/ContactSection.jsx';
import { COMPANY_INFO, BUSINESS_HOURS, SERVICE_AREAS } from '../utils/constants.js';
import { formatPhone } from '../utils/helpers.js';
import Button from '../components/common/Button.jsx';

const Contact = () => {
  const handleCallNow = () => {
    window.location.href = `tel:${COMPANY_INFO.phone}`;
  };

  const handleEmailSupport = () => {
    window.location.href = `mailto:${COMPANY_INFO.email.support}`;
  };

  const handleEmailBookings = () => {
    window.location.href = `mailto:${COMPANY_INFO.email.bookings}`;
  };

  const handleGetQuote = () => {
    window.location.href = '/quote';
  };

  const contactMethods = [
    {
      title: 'Phone',
      value: formatPhone(COMPANY_INFO.phone),
      description: 'Call us for immediate assistance',
      action: handleCallNow,
      buttonText: 'Call Now',
      icon: '📞'
    },
    {
      title: 'Email Support',
      value: COMPANY_INFO.email.support,
      description: 'General inquiries and support',
      action: handleEmailSupport,
      buttonText: 'Send Email',
      icon: '📧'
    },
    {
      title: 'Email Bookings',
      value: COMPANY_INFO.email.bookings,
      description: 'Service bookings and scheduling',
      action: handleEmailBookings,
      buttonText: 'Send Email',
      icon: '📅'
    }
  ];

  const responseTimeInfo = [
    {
      method: 'Phone Calls',
      time: 'Immediate',
      availability: 'Business Hours'
    },
    {
      method: 'Email Inquiries',
      time: 'Within 2 hours',
      availability: 'Business Days'
    },
    {
      method: 'Quote Requests',
      time: 'Within 1 hour',
      availability: '7 Days a Week'
    },
    {
      method: 'Emergency Services',
      time: 'Within 30 minutes',
      availability: '24/7 Available'
    }
  ];

  return (
    <>
      <SEO
        title="Contact Us - Get Your Free Cleaning Quote"
        description="Contact NSW Cleaning Company for professional cleaning services. Call us, email us, or request a free quote online. Fast response times and excellent customer service."
        keywords="contact NSW cleaning company, cleaning quote, professional cleaners contact, cleaning services inquiry, book cleaning service"
      />

      <main className="pt-20">
        <section className="section-padding bg-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Get in Touch
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Ready to book your cleaning service? We're here to help with any questions or special requests.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {contactMethods.map((method, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{method.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-[#00FF66] font-semibold mb-2">{method.value}</p>
                  <p className="text-sm text-gray-600 mb-6">{method.description}</p>
                  <Button
                    onClick={method.action}
                    variant="primary"
                    size="sm"
                    fullWidth
                  >
                    {method.buttonText}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContactSection />

        <section className="section-padding bg-gray-50">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                  Business Information
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Everything you need to know about our availability and service areas
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                <div className="bg-white rounded-xl p-8 shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Business Hours</h3>
                  <div className="space-y-4">
                    {Object.entries(BUSINESS_HOURS).map(([day, hours]) => (
                      <div key={day} className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <span className="text-gray-700 capitalize font-medium">{day}</span>
                        <span className="text-gray-900 font-semibold">{hours}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-[#00FF66]/10 rounded-lg">
                    <p className="text-sm text-[#00cc52] font-medium">
                      Emergency and urgent cleaning services available outside regular hours
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Service Areas</h3>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {SERVICE_AREAS.map((area, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-[#00FF66] rounded-full mr-3"></div>
                        <span className="text-gray-700">{area}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700 font-medium mb-2">
                      Don't see your area listed?
                    </p>
                    <p className="text-sm text-blue-600">
                      Contact us to check availability in your location. We're always expanding our service areas.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  Response Times
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {responseTimeInfo.map((info, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">{info.method}</h4>
                      <div className="text-2xl font-bold text-[#00FF66] mb-1">{info.time}</div>
                      <p className="text-xs text-gray-600">{info.availability}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-[#00FF66]/10 to-blue-50 rounded-2xl p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                  Ready to Get Started?
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Get your free, no-obligation quote today. Our team is standing by to help 
                  with all your cleaning needs.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={handleGetQuote}
                    variant="primary"
                    size="lg"
                  >
                    Get Free Quote
                  </Button>
                  
                  <Button
                    onClick={handleCallNow}
                    variant="secondary"
                    size="lg"
                  >
                    Call {COMPANY_INFO.phone}
                  </Button>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Business Name</h4>
                      <p className="text-gray-600">{COMPANY_INFO.name}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">ABN</h4>
                      <p className="text-gray-600">{COMPANY_INFO.abn}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Location</h4>
                      <p className="text-gray-600">{COMPANY_INFO.address.state}, {COMPANY_INFO.address.country}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;

      

 
