import { useState } from 'react';
import { NDIS_INFO, COMPANY_INFO } from '../../utils/constants.js';
import { getNDISServices } from '../../data/services.js';
import { getNDISTestimonials } from '../../data/testimonials.js';
import { formatCurrency } from '../../utils/helpers.js';
import Button from '../common/Button.jsx';
import { scrollToElement } from '../../utils/helpers.js';

const NDISSection = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const ndisServices = getNDISServices();
  const ndisTestimonials = getNDISTestimonials();

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'services', label: 'Services' },
    { id: 'invoicing', label: 'Invoicing' }
  ];

  const handleBookNDIS = () => {
    scrollToElement('quote-calculator', 80);
  };

  const handleContact = () => {
    scrollToElement('contact-section', 80);
  };

  const handleCallNow = () => {
    window.location.href = `tel:${COMPANY_INFO.phone}`;
  };

  return (
    <section className="section-padding bg-gray-50" id="ndis">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 border border-blue-200 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-blue-700">NDIS Approved Provider</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            NDIS Support Cleaning — Made Easy
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We work with self-managed and plan-managed participants to provide routine or one-off 
            cleaning services that meet your NDIS goals.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-[#00FF66] border-b-2 border-[#00FF66] bg-[#00FF66]/5'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose Our NDIS Services?</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-[#00FF66] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">Clear invoices with service codes</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-[#00FF66] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">Flexible booking times</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-[#00FF66] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">We respect your privacy, space, and schedule</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-[#00FF66] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">Fast response and documentation for plan managers</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-[#00FF66]/10 rounded-xl p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Quick Facts</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Starting Price:</span>
                        <span className="font-semibold text-gray-900">{formatCurrency(140)}/service</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Response Time:</span>
                        <span className="font-semibold text-gray-900">Within 2 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service Areas:</span>
                        <span className="font-semibold text-gray-900">All NSW</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Documentation:</span>
                        <span className="font-semibold text-gray-900">Complete</span>
                      </div>
                    </div>
                  </div>
                </div>

                {ndisTestimonials.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">What NDIS Participants Say</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {ndisTestimonials.slice(0, 2).map((testimonial) => (
                        <div key={testimonial.id} className="bg-gray-50 rounded-lg p-6">
                          <div className="flex items-center mb-3">
                            <div className="flex text-yellow-400 mr-2">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <span key={i}>★</span>
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{testimonial.location}</span>
                          </div>
                          <p className="text-gray-700 mb-3 italic">"{testimonial.text}"</p>
                          <p className="text-sm font-medium text-gray-900">- {testimonial.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'eligibility' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Who Can Use Our NDIS Services?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {NDIS_INFO.eligibility.map((type, index) => (
                      <div key={index} className="bg-blue-50 rounded-lg p-6 text-center">
                        <h4 className="font-semibold text-gray-900 mb-2">{type}</h4>
                        <p className="text-sm text-gray-600">
                          {index === 0 && "You manage your own NDIS funds and choose your providers"}
                          {index === 1 && "Your plan manager handles payments and provider coordination"}
                          {index === 2 && "NDIA manages your plan with pre-approved services"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">NDIS Service Categories We Support</h3>
                  <div className="space-y-4">
                    {NDIS_INFO.serviceTypes.map((serviceType, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{serviceType}</h4>
                        <p className="text-sm text-gray-600">
                          {index === 0 && "Regular cleaning and maintenance tasks to support independent living"}
                          {index === 1 && "Cleaning services for shared accommodation and group homes"}
                          {index === 2 && "Specialized cleaning for disability accommodation facilities"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-6">
                {ndisServices.map((service) => (
                  <div key={service.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                        <p className="text-gray-600">{service.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#00FF66]">
                          {formatCurrency(service.basePrice)}
                        </div>
                        <div className="text-sm text-gray-500">{service.duration}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Service Includes:</h4>
                        <ul className="space-y-2">
                          {service.includes.map((item, index) => (
                            <li key={index} className="flex items-start text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-[#00FF66] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">NDIS Benefits:</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>Participant-focused approach</li>
                          <li>Flexible scheduling</li>
                          <li>Detailed service documentation</li>
                          <li>Plan manager friendly invoicing</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'invoicing' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">NDIS Compliant Invoicing</h3>
                  <p className="text-gray-600 mb-6">
                    Our invoices meet all NDIS requirements and include all necessary information 
                    for your plan manager or NDIA review.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Every Invoice Includes:</h4>
                    <ul className="space-y-3">
                      {NDIS_INFO.invoiceRequirements.map((requirement, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-[#00FF66] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Sample Invoice Details</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-600">Provider ABN:</span>
                        <span className="font-medium">{COMPANY_INFO.abn}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-600">Service Code:</span>
                        <span className="font-medium">01_011_0107_1_1</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-600">GST Status:</span>
                        <span className="font-medium">GST Free</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Terms:</span>
                        <span className="font-medium">7 days</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-900 mb-2">Important Note</h4>
                  <p className="text-blue-800 text-sm">
                    We are not affiliated with the NDIA but work with all types of participant management. 
                    Our services align with NDIS guidelines and support your independence goals.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#00FF66]/10 to-blue-50 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your NDIS cleaning needs. We'll work with you and your 
            plan manager to provide the best possible service.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleBookNDIS}
              variant="primary"
              size="lg"
            >
              Book NDIS Cleaning
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
  );
};

export default NDISSection;
