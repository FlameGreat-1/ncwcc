import { useState, useRef, useEffect } from 'react';
import { COMPANY_INFO, BUSINESS_HOURS, SERVICE_AREAS } from '../../utils/constants.js';
import { formatPhone } from '../../utils/helpers.js';
import ContactForm from '../forms/ContactForm.jsx';
import Button from '../common/Button.jsx';

const ContactSection = () => {
  const [showMap, setShowMap] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [contactInfoVisible, setContactInfoVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const sectionRef = useRef(null);
  const contactInfoRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const contactInfoObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setContactInfoVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const formObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFormVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    if (contactInfoRef.current) {
      contactInfoObserver.observe(contactInfoRef.current);
    }
    if (formRef.current) {
      formObserver.observe(formRef.current);
    }

    return () => {
      observer.disconnect();
      contactInfoObserver.disconnect();
      formObserver.disconnect();
    };
  }, []);

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
    <section ref={sectionRef} className="relative section-padding bg-gradient-to-br from-gray-50/80 via-white/60 to-gray-50/80 backdrop-blur-xl overflow-hidden" id="contact-section">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00FF66]/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00cc52]/2 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-[#00FF66]/2 to-[#00cc52]/2 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <div className="relative z-10 container mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-8 animate-fade-in-up leading-tight">
            Get in <span className="bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed animate-fade-in-up delay-300">
            Ready to book your cleaning service? Contact us today for a free quote 
            or to discuss your specific cleaning needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div ref={contactInfoRef} className="space-y-10">
            <div className="relative group animate-fade-in-up" style={{ animationDelay: `${contactInfoVisible ? 400 : 0}ms` }}>
              <div className="absolute -inset-2 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] rounded-3xl blur opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
              <div className="relative bg-white/90 backdrop-blur-xl border-2 border-white/40 rounded-3xl p-8 shadow-2xl hover:shadow-[0_0_60px_rgba(0,255,102,0.15)] transition-all duration-700 hover:-translate-y-2 hover:scale-105 transform-gpu overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FF66]/5 via-transparent to-[#00cc52]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 rounded-t-3xl"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-gray-900 mb-8 group-hover:text-[#00FF66] transition-colors duration-500">Contact Information</h3>
                  
                  <div className="space-y-8">
                    <div className="relative group/contact-item">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-2xl blur opacity-0 group-hover/contact-item:opacity-20 transition-all duration-500"></div>
                      <div className="relative flex items-start space-x-6 bg-white/80 backdrop-blur-lg border border-white/40 rounded-2xl p-6 hover:bg-white/90 transition-all duration-500 hover:scale-105 transform-gpu shadow-lg hover:shadow-xl">
                        <div className="relative group/icon">
                          <div className="absolute -inset-2 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-2xl blur opacity-0 group-hover/icon:opacity-40 transition-all duration-500"></div>
                          <div className="relative w-16 h-16 bg-gradient-to-br from-[#00FF66]/20 via-white/80 to-[#00cc52]/20 backdrop-blur-xl border-2 border-[#00FF66]/30 rounded-2xl flex items-center justify-center flex-shrink-0 hover:border-[#00FF66]/50 transition-all duration-500 hover:scale-110 hover:rotate-12 transform-gpu shadow-lg hover:shadow-2xl overflow-hidden"
                               style={{ transformStyle: 'preserve-3d' }}>
                            <div className="absolute inset-0 bg-gradient-to-br from-[#00FF66]/10 via-transparent to-[#00cc52]/10 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                            <span className="relative z-10 text-[#00FF66] text-2xl group-hover/icon:animate-bounce">📞</span>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#00FF66] rounded-full opacity-0 group-hover/icon:opacity-100 animate-ping transition-opacity duration-700"></div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-black text-gray-900 mb-2 group-hover/contact-item:text-[#00FF66] transition-colors duration-500">Phone</h4>
                          <p className="text-gray-600 mb-4 font-medium group-hover/contact-item:text-gray-800 transition-colors duration-500">{formatPhone(COMPANY_INFO.phone)}</p>
                          <Button
                            onClick={handleCallNow}
                            className="relative bg-transparent border-2 border-[#00FF66] text-[#00FF66] hover:bg-gradient-to-r hover:from-[#00FF66] hover:to-[#00cc52] hover:text-black font-black px-6 py-3 rounded-full text-sm transition-all duration-700 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-2xl transform-gpu group/btn overflow-hidden"
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              <span className="text-lg group-hover/btn:animate-pulse">📞</span>
                              Call Now
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#00FF66]/10 to-[#00cc52]/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 rounded-full"></div>
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="relative group/contact-item">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-2xl blur opacity-0 group-hover/contact-item:opacity-20 transition-all duration-500"></div>
                      <div className="relative flex items-start space-x-6 bg-white/80 backdrop-blur-lg border border-white/40 rounded-2xl p-6 hover:bg-white/90 transition-all duration-500 hover:scale-105 transform-gpu shadow-lg hover:shadow-xl">
                        <div className="relative group/icon">
                          <div className="absolute -inset-2 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-2xl blur opacity-0 group-hover/icon:opacity-40 transition-all duration-500"></div>
                          <div className="relative w-16 h-16 bg-gradient-to-br from-[#00FF66]/20 via-white/80 to-[#00cc52]/20 backdrop-blur-xl border-2 border-[#00FF66]/30 rounded-2xl flex items-center justify-center flex-shrink-0 hover:border-[#00FF66]/50 transition-all duration-500 hover:scale-110 hover:rotate-12 transform-gpu shadow-lg hover:shadow-2xl overflow-hidden"
                               style={{ transformStyle: 'preserve-3d' }}>
                            <div className="absolute inset-0 bg-gradient-to-br from-[#00FF66]/10 via-transparent to-[#00cc52]/10 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                            <span className="relative z-10 text-[#00FF66] text-2xl group-hover/icon:animate-bounce">✉️</span>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#00FF66] rounded-full opacity-0 group-hover/icon:opacity-100 animate-ping transition-opacity duration-700"></div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-black text-gray-900 mb-2 group-hover/contact-item:text-[#00FF66] transition-colors duration-500">Email</h4>
                          <div className="space-y-3">
                            <div className="relative group/email">
                              <p className="text-gray-600 text-sm font-medium mb-1">General Support:</p>
                              <button
                                onClick={handleEmailSupport}
                                className="relative text-[#00FF66] hover:text-white font-black transition-all duration-500 hover:scale-105 inline-block transform-gpu"
                              >
                                <span className="relative z-10">{COMPANY_INFO.email.support}</span>
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-lg opacity-0 group-hover/email:opacity-100 transition-opacity duration-500 -z-10"></div>
                              </button>
                            </div>
                            <div className="relative group/email">
                              <p className="text-gray-600 text-sm font-medium mb-1">Bookings:</p>
                              <button
                                onClick={handleEmailBookings}
                                className="relative text-[#00FF66] hover:text-white font-black transition-all duration-500 hover:scale-105 inline-block transform-gpu"
                              >
                                <span className="relative z-10">{COMPANY_INFO.email.bookings}</span>
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-lg opacity-0 group-hover/email:opacity-100 transition-opacity duration-500 -z-10"></div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative group/contact-item">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-2xl blur opacity-0 group-hover/contact-item:opacity-20 transition-all duration-500"></div>
                      <div className="relative flex items-start space-x-6 bg-white/80 backdrop-blur-lg border border-white/40 rounded-2xl p-6 hover:bg-white/90 transition-all duration-500 hover:scale-105 transform-gpu shadow-lg hover:shadow-xl">
                        <div className="relative group/icon">
                          <div className="absolute -inset-2 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-2xl blur opacity-0 group-hover/icon:opacity-40 transition-all duration-500"></div>
                          <div className="relative w-16 h-16 bg-gradient-to-br from-[#00FF66]/20 via-white/80 to-[#00cc52]/20 backdrop-blur-xl border-2 border-[#00FF66]/30 rounded-2xl flex items-center justify-center flex-shrink-0 hover:border-[#00FF66]/50 transition-all duration-500 hover:scale-110 hover:rotate-12 transform-gpu shadow-lg hover:shadow-2xl overflow-hidden"
                               style={{ transformStyle: 'preserve-3d' }}>
                            <div className="absolute inset-0 bg-gradient-to-br from-[#00FF66]/10 via-transparent to-[#00cc52]/10 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                            <span className="relative z-10 text-[#00FF66] text-2xl group-hover/icon:animate-bounce">🏢</span>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#00FF66] rounded-full opacity-0 group-hover/icon:opacity-100 animate-ping transition-opacity duration-700"></div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-black text-gray-900 mb-2 group-hover/contact-item:text-[#00FF66] transition-colors duration-500">Business Details</h4>
                          <p className="text-gray-600 font-medium group-hover/contact-item:text-gray-800 transition-colors duration-500">ABN: {COMPANY_INFO.abn}</p>
                          <p className="text-gray-600 font-medium group-hover/contact-item:text-gray-800 transition-colors duration-500">{COMPANY_INFO.address.state}, {COMPANY_INFO.address.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#00FF66] to-[#00cc52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-3xl"></div>
              </div>
            </div>

            <div className="relative group animate-fade-in-up" style={{ animationDelay: `${contactInfoVisible ? 600 : 0}ms` }}>
              <div className="absolute -inset-2 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] rounded-3xl blur opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
              <div className="relative bg-white/90 backdrop-blur-xl border-2 border-white/40 rounded-3xl p-8 shadow-2xl hover:shadow-[0_0_60px_rgba(0,255,102,0.15)] transition-all duration-700 hover:-translate-y-2 hover:scale-105 transform-gpu overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FF66]/5 via-transparent to-[#00cc52]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 rounded-t-3xl"></div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-black text-gray-900 mb-6 group-hover:text-[#00FF66] transition-colors duration-500">Business Hours</h3>
                  <div className="relative group/hours">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-2xl blur opacity-0 group-hover/hours:opacity-20 transition-all duration-500"></div>
                    <div className="relative bg-gradient-to-r from-gray-50/90 via-white/90 to-gray-50/90 backdrop-blur-lg border border-white/40 rounded-2xl p-6 hover:bg-white/90 transition-all duration-500 hover:scale-105 transform-gpu shadow-lg hover:shadow-xl">
                      <div className="space-y-4">
                        {businessHoursArray.map(({ day, hours }) => (
                          <div key={day} className="relative group/day flex justify-between items-center">
                            <div className="absolute -inset-2 bg-gradient-to-r from-[#00FF66]/10 to-transparent opacity-0 group-hover/day:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                            <span className="relative font-black text-gray-900 group-hover/day:text-[#00FF66] transition-colors duration-500">{day}</span>
                            <span className={`relative text-sm font-medium transition-colors duration-500 ${hours === 'Closed' ? 'text-red-600 group-hover/day:text-red-500' : 'text-gray-600 group-hover/day:text-gray-800'}`}>
                              {hours}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#00FF66] to-[#00cc52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-3xl"></div>
              </div>
            </div>

            <div className="relative group animate-fade-in-up" style={{ animationDelay: `${contactInfoVisible ? 800 : 0}ms` }}>
              <div className="absolute -inset-2 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] rounded-3xl blur opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
              <div className="relative bg-white/90 backdrop-blur-xl border-2 border-white/40 rounded-3xl p-8 shadow-2xl hover:shadow-[0_0_60px_rgba(0,255,102,0.15)] transition-all duration-700 hover:-translate-y-2 hover:scale-105 transform-gpu overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FF66]/5 via-transparent to-[#00cc52]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 rounded-t-3xl"></div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-black text-gray-900 mb-6 group-hover:text-[#00FF66] transition-colors duration-500">Service Areas</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {SERVICE_AREAS.map((area, index) => (
                      <div key={index} className="relative group/area">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-2xl blur opacity-0 group-hover/area:opacity-30 transition-all duration-500"></div>
                        <div className="relative bg-gradient-to-r from-gray-50/90 via-white/90 to-gray-50/90 backdrop-blur-lg border border-white/40 rounded-2xl p-4 text-center hover:bg-gradient-to-r hover:from-[#00FF66]/10 hover:via-white/90 hover:to-[#00cc52]/10 transition-all duration-500 hover:scale-105 hover:-translate-y-1 transform-gpu shadow-lg hover:shadow-xl overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#00FF66]/5 via-transparent to-[#00cc52]/5 opacity-0 group-hover/area:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FF66] to-transparent transform scale-x-0 group-hover/area:scale-x-100 transition-transform duration-700"></div>
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00FF66] rounded-full opacity-0 group-hover/area:opacity-100 animate-ping transition-opacity duration-700"></div>
                          
                          <span className="relative text-sm font-black text-gray-800 group-hover/area:text-[#00FF66] transition-colors duration-500">{area}</span>
                          
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00FF66] to-[#00cc52] transform scale-x-0 group-hover/area:scale-x-100 transition-transform duration-700 rounded-b-2xl"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 font-medium">
                    Don't see your area? Contact us to check service availability in your location.
                  </p>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#00FF66] to-[#00cc52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-3xl"></div>
              </div>
            </div>
          </div>

          <div ref={formRef} className="relative group animate-fade-in-up" style={{ animationDelay: `${formVisible ? 400 : 0}ms` }}>
            <div className="absolute -inset-2 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] rounded-3xl blur opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
            <div className="relative bg-gradient-to-r from-gray-50/90 via-white/90 to-gray-50/90 backdrop-blur-xl border-2 border-white/40 rounded-3xl p-8 shadow-2xl hover:shadow-[0_0_60px_rgba(0,255,102,0.15)] transition-all duration-700 hover:-translate-y-2 hover:scale-105 transform-gpu overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00FF66]/5 via-transparent to-[#00cc52]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 rounded-t-3xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-gray-900 mb-8 group-hover:text-[#00FF66] transition-colors duration-500">Send Us a Message</h3>
                <ContactForm 
                  onSubmitSuccess={handleFormSuccess}
                  className="space-y-6"
                />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#00FF66] to-[#00cc52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-3xl"></div>
            </div>
          </div>
        </div>

        <div className="relative group mb-16 animate-fade-in-up delay-1000">
          <div className="absolute -inset-2 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] rounded-3xl blur opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
          <div className="relative bg-gradient-to-r from-[#00FF66]/10 via-white/80 to-[#00cc52]/10 backdrop-blur-xl border-2 border-[#00FF66]/30 rounded-3xl p-8 md:p-16 shadow-2xl hover:shadow-[0_0_60px_rgba(0,255,102,0.2)] transition-all duration-700 hover:-translate-y-2 hover:scale-105 transform-gpu overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00FF66]/5 via-transparent to-[#00cc52]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 rounded-t-3xl"></div>
            
            <div className="relative z-10 text-center">
              <h3 className="text-3xl font-black text-gray-900 mb-6 group-hover:text-[#00FF66] transition-colors duration-500">
                Need Immediate Assistance?
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto mb-10 font-medium leading-relaxed group-hover:text-gray-800 transition-colors duration-500">
                For urgent cleaning services or same-day bookings, call us directly. 
                We're here to help with all your cleaning needs across NSW.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button
                  onClick={handleCallNow}
                  className="relative bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] hover:from-black hover:to-gray-800 text-black hover:text-white font-black px-8 py-4 rounded-full text-base transition-all duration-700 hover:scale-110 hover:-translate-y-3 hover:rotate-1 shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transform-gpu group/btn overflow-hidden w-full sm:w-auto"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span className="text-xl group-hover/btn:animate-bounce">📞</span>
                    Call {formatPhone(COMPANY_INFO.phone)}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 transform group-hover/btn:translate-x-full"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-full blur opacity-30 group-hover/btn:opacity-60 transition-opacity duration-700"></div>
                </Button>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600 font-medium">
                    Response time: Within 2 hours during business hours
                  </p>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#00FF66] to-[#00cc52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-3xl"></div>
          </div>
        </div>

        {showMap && (
          <div className="relative group mb-16 animate-fade-in-up">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] rounded-3xl blur opacity-30"></div>
            <div className="relative bg-white/90 backdrop-blur-xl border-2 border-white/40 rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8 border-b border-[#00FF66]/20">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-black text-gray-900">Our Service Coverage</h3>
                  <button
                    onClick={toggleMap}
                    className="w-10 h-10 bg-white/80 backdrop-blur-lg border-2 border-[#00FF66]/30 rounded-full flex items-center justify-center text-gray-500 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:border-red-500 transition-all duration-500 hover:scale-110 hover:rotate-90 transform-gpu shadow-lg hover:shadow-xl"
                  >
                    <span className="text-lg font-black">✕</span>
                  </button>
                </div>
              </div>
              <div className="h-96 bg-gradient-to-br from-gray-100/90 via-white/90 to-gray-100/90 backdrop-blur-lg flex items-center justify-center">
                <div className="bg-white/80 backdrop-blur-lg border-2 border-[#00FF66]/30 rounded-2xl p-8 text-center shadow-xl">
                  <div className="text-4xl mb-4 animate-bounce">🗺️</div>
                  <p className="text-gray-500 font-medium">Interactive map would be embedded here</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center animate-fade-in-up delay-1200">
          <Button
            onClick={toggleMap}
            className="relative bg-transparent border-3 border-[#00FF66] text-[#00FF66] hover:bg-gradient-to-r hover:from-[#00FF66] hover:to-[#00cc52] hover:text-black font-black px-8 py-4 rounded-full text-base transition-all duration-700 hover:scale-110 hover:-translate-y-2 hover:rotate-1 shadow-2xl hover:shadow-[0_20px_40px_rgba(0,255,102,0.4)] transform-gpu group/btn overflow-hidden"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-xl group-hover/btn:animate-bounce">
                {showMap ? '' : ''}
              </span>
              {showMap ? 'Hide Map' : 'View Service Coverage Map'}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#00FF66]/10 to-[#00cc52]/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 rounded-full"></div>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;


