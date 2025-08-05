import SEO from '../components/common/SEO.jsx';
import ServicesSection from '../components/sections/ServicesSection.jsx';
import { servicesData, getMainServices, getAddonServices } from '../data/services.js';
import { formatCurrency } from '../utils/helpers.js';
import { COMPANY_INFO } from '../utils/constants.js';
import Button from '../components/common/Button.jsx';

const Services = () => {
  const mainServices = getMainServices();
  const addonServices = getAddonServices();

  const handleGetQuote = () => {
    window.location.href = '/quote';
  };

  const handleContact = () => {
    window.location.href = '/contact';
  };

  const handleCallNow = () => {
    window.location.href = `tel:${COMPANY_INFO.phone}`;
  };

  return (
    <>
      <SEO
        title="Professional Cleaning Services - Complete Service List"
        description="Comprehensive cleaning services including general home cleaning, deep cleaning, end-of-lease cleaning, NDIS support, and specialized services across NSW."
        keywords="cleaning services NSW, home cleaning, deep cleaning, end of lease cleaning, NDIS cleaning, carpet cleaning, window cleaning, professional cleaners"
      />

      <main className="pt-20">
        <section className="section-padding bg-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Our Professional Cleaning Services
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Comprehensive cleaning solutions tailored to your specific needs across NSW
              </p>
            </div>
          </div>
        </section>

        <ServicesSection />

        <section className="section-padding bg-white">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                  Detailed Service Information
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Everything you need to know about our professional cleaning services
                </p>
              </div>

              <div className="space-y-12">
                {mainServices.map((service, index) => (
                  <div key={service.id} id={service.id} className="bg-gray-50 rounded-2xl p-8 md:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2">
                        <div className="flex items-center gap-4 mb-6">
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                            {service.title}
                          </h3>
                          {service.popular && (
                            <span className="bg-[#00FF66] text-black text-sm font-semibold px-3 py-1 rounded-full">
                              Most Popular
                            </span>
                          )}
                          {service.ndisCompliant && (
                            <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                              NDIS Compliant
                            </span>
                          )}
                        </div>

                        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                          {service.description}
                        </p>

                        <div className="mb-8">
                          <h4 className="text-xl font-bold text-gray-900 mb-4">What's Included:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {service.includes.map((item, itemIndex) => (
                              <div key={itemIndex} className="flex items-start">
                                <div className="w-2 h-2 bg-[#00FF66] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-gray-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {service.guarantee && (
                          <div className="bg-[#00FF66]/10 border border-[#00FF66]/20 rounded-lg p-4 mb-6">
                            <h4 className="font-bold text-[#00cc52] mb-2">Our Guarantee</h4>
                            <p className="text-[#00cc52]">{service.guarantee}</p>
                          </div>
                        )}
                      </div>

                      <div className="bg-white rounded-xl p-6 shadow-md h-fit">
                        <div className="text-center mb-6">
                          <div className="text-3xl font-bold text-[#00FF66] mb-2">
                            {formatCurrency(service.basePrice)}
                          </div>
                          <p className="text-sm text-gray-500">Starting from</p>
                          <p className="text-sm text-gray-600 mt-1">Duration: {service.duration}</p>
                        </div>

                        <div className="space-y-3 mb-6">
                          <Button
                            onClick={handleGetQuote}
                            variant="primary"
                            size="md"
                            fullWidth
                          >
                            Get Quote for This Service
                          </Button>
                          
                          <Button
                            onClick={handleCallNow}
                            variant="secondary"
                            size="md"
                            fullWidth
                          >
                            Call {COMPANY_INFO.phone}
                          </Button>
                        </div>

                        <div className="text-xs text-gray-500 text-center">
                          Final price may vary based on property size, condition, and additional requirements
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {addonServices.length > 0 && (
          <section className="section-padding bg-gray-50">
            <div className="container mx-auto">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                    Additional Services
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Enhance your cleaning service with these specialized add-ons
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {addonServices.map((service) => (
                    <div key={service.id} className="bg-white rounded-xl p-8 shadow-md">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#00FF66]">
                            {formatCurrency(service.basePrice)}
                          </div>
                          <div className="text-sm text-gray-500">{service.duration}</div>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-6">{service.description}</p>

                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Includes:</h4>
                        <ul className="space-y-2">
                          {service.includes.map((item, index) => (
                            <li key={index} className="flex items-start text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-[#00FF66] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        onClick={handleGetQuote}
                        variant="outline"
                        size="sm"
                        fullWidth
                      >
                        Add to Quote
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="section-padding bg-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-[#00FF66]/10 to-blue-50 rounded-2xl p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                  Need a Custom Cleaning Solution?
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Every property is unique. Contact us to discuss your specific cleaning requirements 
                  and get a personalized service plan.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={handleGetQuote}
                    variant="primary"
                    size="lg"
                  >
                    Get Custom Quote
                  </Button>
                  
                  <Button
                    onClick={handleContact}
                    variant="secondary"
                    size="lg"
                  >
                    Discuss Requirements
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Services;

