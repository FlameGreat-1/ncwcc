import { useState, useRef, useEffect } from 'react';
import SEO from '../components/common/SEO.jsx';
import ContactSection from '../components/sections/ContactSection.jsx';
import { COMPANY_INFO, BUSINESS_HOURS, SERVICE_AREAS } from '../utils/constants.js';
import { formatPhone } from '../utils/helpers.js';
import Button from '../components/common/Button.jsx';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [contactMethodsVisible, setContactMethodsVisible] = useState(false);
  const [businessInfoVisible, setBusinessInfoVisible] = useState(false);
  const sectionRef = useRef(null);
  const contactMethodsRef = useRef(null);
  const businessInfoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const contactMethodsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setContactMethodsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const businessInfoObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBusinessInfoVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    if (contactMethodsRef.current) {
      contactMethodsObserver.observe(contactMethodsRef.current);
    }
    if (businessInfoRef.current) {
      businessInfoObserver.observe(businessInfoRef.current);
    }

    return () => {
      observer.disconnect();
      contactMethodsObserver.disconnect();
      businessInfoObserver.disconnect();
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
      icon: '📞',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Email Support',
      value: COMPANY_INFO.email.support,
      description: 'General inquiries and support',
      action: handleEmailSupport,
      buttonText: 'Send Email',
      icon: '📧',
      gradient: 'from-[#00FF66] to-[#00cc52]'
    },
    {
      title: 'Email Bookings',
      value: COMPANY_INFO.email.bookings,
      description: 'Service bookings and scheduling',
      action: handleEmailBookings,
      buttonText: 'Send Email',
      icon: '📅',
      gradient: 'from-purple-500 to-purple-600'
    }
  ];

  const responseTimeInfo = [
    {
      method: 'Phone Calls',
      time: 'Immediate',
      availability: 'Business Hours',
      icon: '⚡'
    },
    {
      method: 'Email Inquiries',
      time: 'Within 2 hours',
      availability: 'Business Days',
      icon: '📨'
    },
    {
      method: 'Quote Requests',
      time: 'Within 1 hour',
      availability: '7 Days a Week',
      icon: '💰'
    },
    {
      method: 'Emergency Services',
      time: 'Within 30 minutes',
      availability: '24/7 Available',
      icon: '🚨'
    }
  ];

  return (
    <>
      <SEO
        title="Contact Us - Get Your Free Cleaning Quote"
        description="Contact NSW Cleaning Company for professional cleaning services. Call us, email us, or request a free quote online. Fast response times and excellent customer service."
        keywords="contact NSW cleaning company, cleaning quote, professional cleaners contact, cleaning services inquiry, book cleaning service"
      />

      <main className="relative pt-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00FF66]/3 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00cc52]/2 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#00FF66]/2 to-[#00cc52]/2 rounded-full blur-3xl animate-spin-slow"></div>
        </div>

        <section ref={sectionRef} className="relative z-10 section-padding bg-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-20">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-8 animate-fade-in-up leading-tight">
                Get in <span className="bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] bg-clip-text text-transparent">Touch</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed font-medium animate-fade-in-up delay-300">
                Ready to book your cleaning service? We're here to help with any questions or special requests.
              </p>
            </div>

            <div ref={contactMethodsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
              {contactMethods.map((method, index) => (
                <div 
                  key={index} 
                  className="relative group animate-fade-in-up"
                  style={{ animationDelay: `${contactMethodsVisible ? 400 + index * 200 : 0}ms` }}
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] rounded-3xl blur opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
                  <div className="relative bg-white/90 backdrop-blur-xl border-2 border-white/40 rounded-3xl p-8 text-center shadow-2xl hover:shadow-[0_0_60px_rgba(0,255,102,0.15)] transition-all duration-700 hover:-translate-y-4 hover:scale-105 transform-gpu overflow-hidden h-full flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00FF66]/5 via-transparent to-[#00cc52]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-t-3xl"></div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#00FF66] rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-700"></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="relative group/icon mb-6">
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-full blur opacity-0 group-hover/icon:opacity-40 transition-all duration-500"></div>
                        <div className="relative text-6xl group-hover/icon:animate-bounce group-hover/icon:scale-110 transition-transform duration-500">{method.icon}</div>
                      </div>
                      
                      <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-[#00FF66] transition-colors duration-500">{method.title}</h3>
                      <p className="text-[#00FF66] font-black mb-3 text-lg group-hover:scale-105 transition-transform duration-500">{method.value}</p>
                      <p className="text-sm text-gray-600 mb-8 font-medium flex-grow group-hover:text-gray-800 transition-colors duration-500">{method.description}</p>
                      
                      <Button
                        onClick={method.action}
                        className={`relative bg-gradient-to-r ${method.gradient} hover:from-black hover:to-gray-800 text-white hover:text-white font-black px-6 py-3 rounded-full text-sm transition-all duration-700 hover:scale-110 hover:-translate-y-2 shadow-lg hover:shadow-2xl transform-gpu group/btn overflow-hidden mt-auto`}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <span className="text-lg group-hover/btn:animate-pulse">{method.icon}</span>
                          {method.buttonText}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 transform group-hover/btn:translate-x-full"></div>
                      </Button>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#00FF66] to-[#00cc52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-3xl"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContactSection />
        <section ref={businessInfoRef} className="relative z-10 section-padding bg-gradient-to-br from-gray-50/80 via-white/60 to-gray-50/80 backdrop-blur-xl">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-3xl md:text-4xl font-black text-black mb-8 animate-fade-in-up">
                  Business <span className="bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] bg-clip-text text-transparent">Information</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium animate-fade-in-up delay-300">
                  Everything you need to know about our availability and service areas
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                <div className="relative group animate-fade-in-up" style={{ animationDelay: `${businessInfoVisible ? 400 : 0}ms` }}>
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] rounded-3xl blur opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
                  <div className="relative bg-white/90 backdrop-blur-xl border-2 border-white/40 rounded-3xl p-8 shadow-2xl hover:shadow-[0_0_60px_rgba(0,255,102,0.15)] transition-all duration-700 hover:-translate-y-2 hover:scale-105 transform-gpu overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00FF66]/5 via-transparent to-[#00cc52]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 rounded-t-3xl"></div>
                    
                    <div className="relative z-10">
                      <h3 className="text-xl font-black text-gray-900 mb-8 group-hover:text-[#00FF66] transition-colors duration-500">Business Hours</h3>
                      <div className="space-y-6">
                        {Object.entries(BUSINESS_HOURS).map(([day, hours]) => (
                          <div key={day} className="relative group/day flex justify-between items-center border-b border-[#00FF66]/20 pb-4">
                            <div className="absolute -inset-2 bg-gradient-to-r from-[#00FF66]/10 to-transparent opacity-0 group-hover/day:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                            <span className="relative text-gray-700 capitalize font-black group-hover/day:text-[#00FF66] transition-colors duration-500">{day}</span>
                            <span className={`relative font-black transition-colors duration-500 ${hours === 'Closed' ? 'text-red-600' : 'text-gray-900 group-hover/day:text-[#00FF66]'}`}>{hours}</span>
                          </div>
                        ))}
                      </div>
                      <div className="relative group/emergency mt-8">
                        <div className="absolute -inset-2 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-2xl blur opacity-0 group-hover/emergency:opacity-20 transition-all duration-500"></div>
                        <div className="relative p-6 bg-gradient-to-r from-[#00FF66]/10 via-white/80 to-[#00cc52]/10 backdrop-blur-lg border-2 border-[#00FF66]/30 rounded-2xl hover:border-[#00FF66]/50 transition-all duration-500 hover:scale-105 transform-gpu shadow-lg hover:shadow-xl">
                          <p className="relative text-sm text-[#00cc52] font-black group-hover/emergency:text-black transition-colors duration-500">
                            Emergency and urgent cleaning services available outside regular hours
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#00FF66] to-[#00cc52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-3xl"></div>
                  </div>
                </div>

                <div className="relative group animate-fade-in-up" style={{ animationDelay: `${businessInfoVisible ? 600 : 0}ms` }}>
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] rounded-3xl blur opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
                  <div className="relative bg-white/90 backdrop-blur-xl border-2 border-white/40 rounded-3xl p-8 shadow-2xl hover:shadow-[0_0_60px_rgba(0,255,102,0.15)] transition-all duration-700 hover:-translate-y-2 hover:scale-105 transform-gpu overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00FF66]/5 via-transparent to-[#00cc52]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 rounded-t-3xl"></div>
                    
                    <div className="relative z-10">
                      <h3 className="text-xl font-black text-gray-900 mb-8 group-hover:text-[#00FF66] transition-colors duration-500">Service Areas</h3>
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {SERVICE_AREAS.map((area, index) => (
                          <div key={index} className="relative group/area flex items-center">
                            <div className="absolute -inset-2 bg-gradient-to-r from-[#00FF66]/10 to-transparent opacity-0 group-hover/area:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                            <div className="relative w-3 h-3 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-full mr-4 group-hover/area:animate-pulse shadow-lg"></div>
                            <span className="relative text-gray-700 font-medium group-hover/area:text-[#00FF66] transition-colors duration-500">{area}</span>
                          </div>
                        ))}
                      </div>
                      <div className="relative group/note">
                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl blur opacity-0 group-hover/note:opacity-20 transition-all duration-500"></div>
                        <div className="relative p-6 bg-gradient-to-r from-blue-50/90 via-white/80 to-blue-50/90 backdrop-blur-lg border-2 border-blue-200/50 rounded-2xl hover:border-blue-300/70 transition-all duration-500 hover:scale-105 transform-gpu shadow-lg hover:shadow-xl">
                          <p className="text-sm text-blue-700 font-black mb-2 group-hover/note:text-blue-800 transition-colors duration-500">
                            Don't see your area listed?
                          </p>
                          <p className="text-sm text-blue-600 font-medium group-hover/note:text-blue-700 transition-colors duration-500">
                            Contact us to check availability in your location. We're always expanding our service areas.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#00FF66] to-[#00cc52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-3xl"></div>
                  </div>
                </div>
              </div>

              <div className="relative group animate-fade-in-up" style={{ animationDelay: `${businessInfoVisible ? 800 : 0}ms` }}>
                <div className="absolute -inset-2 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] rounded-3xl blur opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
                <div className="relative bg-white/90 backdrop-blur-xl border-2 border-white/40 rounded-3xl p-8 shadow-2xl hover:shadow-[0_0_60px_rgba(0,255,102,0.15)] transition-all duration-700 hover:-translate-y-2 hover:scale-105 transform-gpu overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00FF66]/5 via-transparent to-[#00cc52]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 rounded-t-3xl"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-black text-gray-900 mb-8 text-center group-hover:text-[#00FF66] transition-colors duration-500">
                      Response Times
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {responseTimeInfo.map((info, index) => (
                        <div key={index} className="relative group/response text-center">
                          <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-2xl blur opacity-0 group-hover/response:opacity-30 transition-all duration-500"></div>
                          <div className="relative p-6 bg-gradient-to-r from-gray-50/90 via-white/90 to-gray-50/90 backdrop-blur-lg border border-white/40 rounded-2xl hover:bg-white/90 transition-all duration-500 hover:scale-105 hover:-translate-y-2 transform-gpu shadow-lg hover:shadow-xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#00FF66]/5 via-transparent to-[#00cc52]/5 opacity-0 group-hover/response:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FF66] to-transparent transform scale-x-0 group-hover/response:scale-x-100 transition-transform duration-700"></div>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00FF66] rounded-full opacity-0 group-hover/response:opacity-100 animate-ping transition-opacity duration-700"></div>
                            
                            <div className="relative z-10">
                              <div className="text-3xl mb-3 group-hover/response:animate-bounce">{info.icon}</div>
                              <h4 className="font-black text-gray-900 mb-3 group-hover/response:text-[#00FF66] transition-colors duration-500">{info.method}</h4>
                              <div className="text-2xl font-black text-[#00FF66] mb-2 group-hover/response:text-black transition-colors duration-500">{info.time}</div>
                              <p className="text-xs text-gray-600 font-medium group-hover/response:text-gray-800 transition-colors duration-500">{info.availability}</p>
                            </div>
                            
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00FF66] to-[#00cc52] transform scale-x-0 group-hover/response:scale-x-100 transition-transform duration-700 rounded-b-2xl"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#00FF66] to-[#00cc52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 section-padding bg-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="relative group animate-fade-in-up delay-1000">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] rounded-3xl blur opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
                <div className="relative bg-gradient-to-r from-[#00FF66]/10 via-white/80 to-blue-50/80 backdrop-blur-xl border-2 border-[#00FF66]/30 rounded-3xl p-8 md:p-16 text-center shadow-2xl hover:shadow-[0_0_60px_rgba(0,255,102,0.2)] transition-all duration-700 hover:-translate-y-2 hover:scale-105 transform-gpu overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00FF66]/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 rounded-t-3xl"></div>
                  
                  <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-black text-black mb-8 group-hover:text-[#00FF66] transition-colors duration-500">
                      Ready to Get Started?
                    </h2>
                    <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto font-medium leading-relaxed group-hover:text-gray-800 transition-colors duration-500">
                      Get your free, no-obligation quote today. Our team is standing by to help 
                      with all your cleaning needs.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                      <Button
                        onClick={handleGetQuote}
                        className="relative bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] hover:from-black hover:to-gray-800 text-black hover:text-white font-black px-8 py-4 rounded-full text-base transition-all duration-700 hover:scale-110 hover:-translate-y-3 hover:rotate-1 shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transform-gpu group/btn overflow-hidden"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <span className="text-xl group-hover/btn:animate-bounce">💰</span>
                          Get Free Quote
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 transform group-hover/btn:translate-x-full"></div>
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-full blur opacity-30 group-hover/btn:opacity-60 transition-opacity duration-700"></div>
                      </Button>
                      
                      <Button
                        onClick={handleCallNow}
                        className="relative bg-transparent border-3 border-[#00FF66] text-[#00FF66] hover:bg-gradient-to-r hover:from-black hover:to-gray-800 hover:text-white hover:border-black font-black px-8 py-4 rounded-full text-base transition-all duration-700 hover:scale-110 hover:-translate-y-3 hover:-rotate-1 shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transform-gpu group/btn overflow-hidden"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <span className="text-xl group-hover/btn:animate-pulse">📞</span>
                          Call {COMPANY_INFO.phone}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00FF66]/10 to-[#00cc52]/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 rounded-full"></div>
                      </Button>
                    </div>

                    <div className="relative group/business pt-8 border-t border-[#00FF66]/20">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                        <div className="text-center group/info">
                          <h4 className="font-black text-gray-900 mb-2 group-hover/info:text-[#00FF66] transition-colors duration-500">Business Name</h4>
                          <p className="text-gray-600 font-medium group-hover/info:text-gray-800 transition-colors duration-500">{COMPANY_INFO.name}</p>
                        </div>
                        <div className="text-center group/info">
                          <h4 className="font-black text-gray-900 mb-2 group-hover/info:text-[#00FF66] transition-colors duration-500">ABN</h4>
                          <p className="text-gray-600 font-medium group-hover/info:text-gray-800 transition-colors duration-500">{COMPANY_INFO.abn}</p>
                        </div>
                        <div className="text-center group/info">
                          <h4 className="font-black text-gray-900 mb-2 group-hover/info:text-[#00FF66] transition-colors duration-500">Location</h4>
                          <p className="text-gray-600 font-medium group-hover/info:text-gray-800 transition-colors duration-500">{COMPANY_INFO.address.state}, {COMPANY_INFO.address.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-3xl"></div>
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


