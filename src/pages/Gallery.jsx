import SEO from '../components/common/SEO.jsx';
import NDISSection from '../components/sections/NDISSection.jsx';
import { NDIS_INFO, COMPANY_INFO } from '../utils/constants.js';
import { getNDISServices } from '../data/services.js';
import { getNDISTestimonials } from '../data/testimonials.js';
import { formatCurrency } from '../utils/helpers.js';
import Button from '../components/common/Button.jsx';

const NDISInfo = () => {
  const ndisServices = getNDISServices();
  const ndisTestimonials = getNDISTestimonials();

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

      <main className="pt-20">
        <section className="section-padding bg-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <div className="inline-flex items-center bg-blue-100 border border-blue-200 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium text-blue-700">NDIS Approved Provider</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                NDIS Cleaning Services
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Professional cleaning support designed specifically for NDIS participants across NSW
              </p>
            </div>
          </div>
        </section>

        <NDISSection />

        <section className="section-padding bg-white">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                  Understanding NDIS Support Categories
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Our cleaning services align with various NDIS support categories to meet your specific needs
                </p>
              </div>

              <div className="space-y-8">
                {supportCategories.map((category, index) => (
                  <div key={index} className="bg-gray-50 rounded-2xl p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{category.category}</h3>
                        <p className="text-gray-700 mb-6 leading-relaxed">{category.description}</p>
                        
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-3">Applicable Services:</h4>
                          <ul className="space-y-2">
                            {category.applicableServices.map((service, serviceIndex) => (
                              <li key={serviceIndex} className="flex items-start">
                                <div className="w-2 h-2 bg-[#00FF66] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-gray-700">{service}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-6 shadow-md">
                        <h4 className="font-bold text-gray-900 mb-4">Service Details</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600">Service Code:</span>
                            <span className="font-medium text-gray-900">{category.serviceCode}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600">Billing:</span>
                            <span className="font-medium text-gray-900">Per hour/service</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Documentation:</span>
                            <span className="font-medium text-gray-900">Complete</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-gray-50">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                  Our NDIS Process
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Simple steps to get started with our NDIS cleaning services
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16">
                {processSteps.map((step, index) => (
                  <div key={step.step} className="text-center">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-[#00FF66] text-black rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                        {step.step}
                      </div>
                      {index < processSteps.length - 1 && (
                        <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  Frequently Asked Questions
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Do I need to be NDIA-managed to use your services?</h4>
                      <p className="text-gray-700 text-sm">No, we work with self-managed, plan-managed, and NDIA-managed participants.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">How do you ensure NDIS compliance?</h4>
                      <p className="text-gray-700 text-sm">Our invoices include all required NDIS information including service codes, ABN, and detailed service descriptions.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Can I change my cleaning schedule?</h4>
                      <p className="text-gray-700 text-sm">Yes, we offer flexible scheduling to accommodate your changing needs and preferences.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">What if I'm not satisfied with the service?</h4>
                      <p className="text-gray-700 text-sm">We offer a satisfaction guarantee and will work with you to address any concerns immediately.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Do you provide service documentation?</h4>
                      <p className="text-gray-700 text-sm">Yes, we provide detailed service reports and before/after photos for your records.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Are your staff trained in disability awareness?</h4>
                      <p className="text-gray-700 text-sm">All our team members receive disability awareness training and are police-checked.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {ndisTestimonials.length > 0 && (
          <section className="section-padding bg-white">
            <div className="container mx-auto">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                    What NDIS Participants Say
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {ndisTestimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-gray-50 rounded-xl p-8">
                      <div className="flex items-center mb-4">
                        <div className="flex text-yellow-400 mr-3">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i} className="text-lg">★</span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{testimonial.location}</span>
                      </div>
                      <blockquote className="text-gray-700 mb-4 italic leading-relaxed">
                        "{testimonial.text}"
                      </blockquote>
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-900">- {testimonial.name}</p>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                          NDIS Participant
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="section-padding bg-[#00FF66]/5">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Contact us today to discuss your NDIS cleaning needs. We're here to support your independence and well-being.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleBookNDIS}
                  variant="primary"
                  size="lg"
                >
                  Book NDIS Cleaning Service
                </Button>
                
                <Button
                  onClick={handleCallNow}
                  variant="secondary"
                  size="lg"
                >
                  Call {COMPANY_INFO.phone}
                </Button>
                
                <Button
                  onClick={handleContact}
                  variant="outline"
                  size="lg"
                >
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default NDISInfo;
 
