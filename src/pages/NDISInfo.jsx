import { useState, useEffect, useRef } from 'react';
import SEO from '../components/common/SEO.jsx';
import NDISSection from '../components/sections/NDISSection.jsx';
import { NDIS_INFO, COMPANY_INFO } from '../utils/constants.js';
import { getNDISServices } from '../data/services.js';
import { getNDISTestimonials } from '../data/testimonials.js';
import { formatCurrency } from '../utils/helpers.js';
import Button from '../components/common/Button.jsx';

const NDISInfo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [processVisible, setProcessVisible] = useState(false);
  const [testimonialsVisible, setTestimonialsVisible] = useState(false);
  const sectionRef = useRef(null);
  const categoriesRef = useRef(null);
  const processRef = useRef(null);
  const testimonialsRef = useRef(null);
  
  const ndisServices = getNDISServices();
  const ndisTestimonials = getNDISTestimonials();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const categoriesObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCategoriesVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const processObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProcessVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const testimonialsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTestimonialsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    if (categoriesRef.current) {
      categoriesObserver.observe(categoriesRef.current);
    }

    if (processRef.current) {
      processObserver.observe(processRef.current);
    }

    if (testimonialsRef.current) {
      testimonialsObserver.observe(testimonialsRef.current);
    }

    return () => {
      observer.disconnect();
      categoriesObserver.disconnect();
      processObserver.disconnect();
      testimonialsObserver.disconnect();
    };
  }, []);

  const handleBookNDIS = () => {
    window.location.href = '/quote';
  };

  const handleContact = () => {
    window.location.href = '/contact';
  };

  const handleCallNow = () => {
    window.location.href = `tel:${COMPANY_INFO.phone}`;
  };

  const processSteps = [
    {
      step: 1,
      title: 'Initial Contact',
      description: 'Contact us to discuss your NDIS cleaning needs and goals'
    },
    {
      step: 2,
      title: 'Service Planning',
      description: 'We work with you to create a cleaning plan that fits your NDIS goals'
    },
    {
      step: 3,
      title: 'Documentation',
      description: 'We provide all necessary documentation for your plan manager'
    },
    {
      step: 4,
      title: 'Service Delivery',
      description: 'Our trained team provides respectful, professional cleaning services'
    },
    {
      step: 5,
      title: 'Ongoing Support',
      description: 'Regular check-ins and adjustments to ensure your needs are met'
    }
  ];

  const supportCategories = [
    {
      category: 'Core Supports',
      description: 'Daily living activities including household tasks and cleaning',
      serviceCode: '01_011_0107_1_1',
      applicableServices: ['Regular home cleaning', 'Kitchen and bathroom maintenance', 'General tidying']
    },
    {
      category: 'Capacity Building',
      description: 'Building skills for independent living',
      serviceCode: '02_104_0136_6_1',
      applicableServices: ['Teaching cleaning techniques', 'Organizing systems', 'Maintenance planning']
    },
    {
      category: 'Capital Supports',
      description: 'Equipment and home modifications',
      serviceCode: '03_092_0117_7_1',
      applicableServices: ['Specialized cleaning equipment', 'Accessibility modifications for cleaning']
    }
  ];

  return (
    <>
      <SEO
        title="NDIS Cleaning Services - Support for Participants"
        description="Professional NDIS cleaning services for participants across NSW. Self-managed, plan-managed, and NDIA-managed participants welcome. NDIS compliant invoicing and respectful service."
        keywords="NDIS cleaning services, NDIS participant cleaning, disability cleaning support, NDIS approved cleaning, plan managed cleaning, self managed NDIS cleaning"
      />

      <main className="pt-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00FF66]/3 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00cc52]/2 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#00FF66]/2 to-[#00cc52]/2 rounded-full blur-3xl animate-spin-slow"></div>
        </div>

        <section ref={sectionRef} className="section-padding bg-white relative z-10">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <div className="inline-flex items-center bg-gradient-to-r from-blue-100/80 via-white/90 to-blue-100/80 backdrop-blur-xl border-2 border-blue-200/50 rounded-full px-4 py-2 mb-8 shadow-lg hover:shadow-2xl transition-all duration-700 hover:scale-105 animate-fade-in-up">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm font-black text-blue-700">NDIS Approved Provider</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-8 animate-fade-in-up delay-300 leading-tight">
                NDIS <span className="bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] bg-clip-text text-transparent">Cleaning Services</span>
              </h1>
              <p className="text-base md:text-lg text-[#4B4B4B] leading-relaxed font-medium animate-fade-in-up delay-600">
                Professional cleaning support designed specifically for NDIS participants across NSW
              </p>
            </div>
          </div>
        </section>

        <NDISSection />

        <section ref={categoriesRef} className="section-padding bg-white relative z-10">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-black text-black mb-8 animate-fade-in-up">
                  Understanding NDIS <span className="bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] bg-clip-text text-transparent">Support Categories</span>
                </h2>
                <p className="text-base text-[#4B4B4B] max-w-2xl mx-auto font-medium animate-fade-in-up delay-300">
                  Our cleaning services align with various NDIS support categories to meet your specific needs
                </p>
              </div>

              <div className="space-y-12">
                {supportCategories.map((category, index) => (
                  <div 
                    key={index} 
                    className="relative group animate-fade-in-up"
                    style={{ animationDelay: `${categoriesVisible ? 400 + index * 200 : 0}ms` }}
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] rounded-3xl blur opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
                    <div className="relative bg-gradient-to-br from-gray-50/80 via-white/90 to-gray-50/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/40 shadow-2xl hover:shadow-[0_0_60px_rgba(0,255,102,0.15)] transition-all duration-700 hover:-translate-y-2 hover:scale-105 transform-gpu overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00FF66]/5 via-transparent to-[#00cc52]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 rounded-t-3xl"></div>
                      
                      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                          <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-[#00FF66] transition-colors duration-500">{category.category}</h3>
                          <p className="text-[#4B4B4B] mb-6 leading-relaxed font-medium group-hover:text-[#333] transition-colors duration-500">{category.description}</p>
                          
                          <div className="mb-6">
                            <h4 className="font-black text-gray-900 mb-3 group-hover:text-[#00FF66] transition-colors duration-500">Applicable Services:</h4>
                            <ul className="space-y-2">
                              {category.applicableServices.map((service, serviceIndex) => (
                                <li key={serviceIndex} className="flex items-start group/item">
                                  <div className="w-2 h-2 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-full mt-2 mr-3 flex-shrink-0 group-hover/item:animate-pulse"></div>
                                  <span className="text-[#4B4B4B] font-medium group-hover/item:text-[#00FF66] transition-colors duration-300">{service}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="relative group/card">
                          <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] rounded-2xl blur opacity-0 group-hover/card:opacity-30 transition-all duration-700"></div>
                          <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border-2 border-white/40 hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 hover:scale-105 transform-gpu overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#00FF66]/5 via-transparent to-[#00cc52]/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] transform scale-x-0 group-hover/card:scale-x-100 transition-transform duration-700 rounded-t-2xl"></div>
                            
                            <div className="relative z-10">
                              <h4 className="font-black text-gray-900 mb-4 group-hover/card:text-[#00FF66] transition-colors duration-500">Service Details</h4>
                              <div className="space-y-3 text-sm">
                                <div className="flex justify-between border-b border-gray-100 pb-2 group-hover/card:border-[#00FF66]/20 transition-colors duration-500">
                                  <span className="text-[#666] font-semibold">Service Code:</span>
                                  <span className="font-black text-gray-900 group-hover/card:text-[#00FF66] transition-colors duration-500">{category.serviceCode}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 pb-2 group-hover/card:border-[#00FF66]/20 transition-colors duration-500">
                                  <span className="text-[#666] font-semibold">Billing:</span>
                                  <span className="font-black text-gray-900 group-hover/card:text-[#00FF66] transition-colors duration-500">Per hour/service</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-[#666] font-semibold">Documentation:</span>
                                  <span className="font-black text-gray-900 group-hover/card:text-[#00FF66] transition-colors duration-500">Complete</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00FF66] to-[#00cc52] transform scale-x-0 group-hover/card:scale-x-100 transition-transform duration-700 rounded-b-2xl"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#00FF66] to-[#00cc52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-3xl"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section ref={processRef} className="section-padding bg-gradient-to-br from-gray-50/80 via-white/60 to-gray-50/80 backdrop-blur-xl relative z-10">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-black text-black mb-8 animate-fade-in-up">
                  Our NDIS <span className="bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] bg-clip-text text-transparent">Process</span>
                </h2>
                <p className="text-base text-[#4B4B4B] max-w-2xl mx-auto font-medium animate-fade-in-up delay-300">
                  Simple steps to get started with our NDIS cleaning services
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16">
                {processSteps.map((step, index) => (
                  <div key={step.step} className="text-center animate-fade-in-up" style={{ animationDelay: `${processVisible ? 400 + index * 200 : 0}ms` }}>
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-[#00FF66] to-[#00cc52] text-black rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4 shadow-lg hover:shadow-2xl transition-all duration-700 hover:scale-110 hover:-translate-y-2 transform-gpu">
                        {step.step}
                      </div>
                      {index < processSteps.length - 1 && (
                        <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#00FF66] to-[#00cc52] transform -translate-y-1/2"></div>
                      )}
                    </div>
                    <h3 className="font-black text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-sm text-[#4B4B4B] leading-relaxed font-medium">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {ndisTestimonials.length > 0 && (
          <section ref={testimonialsRef} className="section-padding bg-white relative z-10">
            <div className="container mx-auto">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-black text-black mb-8 animate-fade-in-up">
                    What NDIS <span className="bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] bg-clip-text text-transparent">Participants Say</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {ndisTestimonials.map((testimonial, index) => (
                    <div key={testimonial.id} className="relative group animate-fade-in-up" style={{ animationDelay: `${testimonialsVisible ? 400 + index * 200 : 0}ms` }}>
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] rounded-3xl blur opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
                      <div className="relative bg-gradient-to-br from-gray-50/80 via-white/90 to-gray-50/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 hover:scale-105 transform-gpu border-2 border-white/40 overflow-hidden h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00FF66]/5 via-transparent to-[#00cc52]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-t-3xl"></div>
                        
                        <div className="relative z-10">
                          <div className="flex items-center mb-4">
                            <div className="flex text-yellow-400 mr-3">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <span key={i} className="text-lg group-hover:animate-bounce" style={{ animationDelay: `${i * 100}ms` }}>★</span>
                              ))}
                            </div>
                            <span className="text-sm text-[#666] font-semibold">{testimonial.location}</span>
                          </div>
                          <blockquote className="text-[#4B4B4B] mb-4 italic leading-relaxed font-medium group-hover:text-[#333] transition-colors duration-500">
                            "{testimonial.text}"
                          </blockquote>
                          <div className="flex items-center justify-between">
                            <p className="font-black text-gray-900 group-hover:text-[#00FF66] transition-colors duration-500">- {testimonial.name}</p>
                            <span className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 text-xs font-black px-2 py-1 rounded-full shadow-lg">
                              NDIS Participant
                            </span>
                          </div>
                        </div>
                        
                        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#00FF66] to-[#00cc52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-3xl"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="section-padding bg-gradient-to-r from-[#00FF66]/10 via-white/80 to-[#00cc52]/10 backdrop-blur-xl relative z-10 overflow-hidden">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] rounded-3xl blur opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-white/40 hover:shadow-[0_0_60px_rgba(0,255,102,0.15)] transition-all duration-700 hover:-translate-y-2 hover:scale-105 transform-gpu overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] rounded-t-3xl"></div>
                  
                  <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-black text-black mb-8 group-hover:text-[#00FF66] transition-colors duration-500">
                      Ready to Get Started?
                    </h2>
                    <p className="text-base text-[#4B4B4B] mb-8 max-w-2xl mx-auto font-medium group-hover:text-[#333] transition-colors duration-500">
                      Contact us today to discuss your NDIS cleaning needs. We're here to support your independence and well-being.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        onClick={handleBookNDIS}
                        className="relative bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] hover:from-black hover:to-gray-800 text-black hover:text-white font-black px-6 py-3 rounded-full text-sm transition-all duration-700 hover:scale-110 hover:-translate-y-2 shadow-xl hover:shadow-2xl transform-gpu group/btn overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <span className="text-lg group-hover/btn:animate-bounce">🏠</span>
                          Book NDIS Cleaning Service
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 transform group-hover/btn:translate-x-full"></div>
                      </Button>
                      
                      <Button
                        onClick={handleCallNow}
                        className="relative bg-transparent border-2 border-[#00FF66] text-[#00FF66] hover:bg-gradient-to-r hover:from-black hover:to-gray-800 hover:text-white hover:border-black font-black px-6 py-3 rounded-full text-sm transition-all duration-700 hover:scale-110 hover:-translate-y-2 shadow-xl hover:shadow-2xl transform-gpu group/btn overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <span className="text-lg group-hover/btn:animate-pulse">📞</span>
                          Call {COMPANY_INFO.phone}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00FF66]/10 to-[#00cc52]/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 rounded-full"></div>
                      </Button>
                      
                      <Button
                        onClick={handleContact}
                        className="relative bg-white/80 backdrop-blur-lg border-2 border-gray-300 text-gray-700 hover:bg-gradient-to-r hover:from-gray-800 hover:to-black hover:text-white hover:border-gray-800 font-black px-6 py-3 rounded-full text-sm transition-all duration-700 hover:scale-110 hover:-translate-y-2 shadow-xl hover:shadow-2xl transform-gpu group/btn overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <span className="text-lg group-hover/btn:animate-pulse">💬</span>
                          Send Message
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-200/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 rounded-full"></div>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-b-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default NDISInfo;

