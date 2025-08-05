import { servicesData, getMainServices } from '../../data/services.js';
import { formatCurrency } from '../../utils/helpers.js';
import { SERVICE_AREAS } from '../../utils/constants.js';
import Button from '../common/Button.jsx';
import { scrollToElement } from '../../utils/helpers.js';

const ServicesSection = () => {
  const mainServices = getMainServices();

  const handleGetQuote = () => {
    scrollToElement('quote-calculator', 80);
  };

  const handleLearnMore = (serviceId) => {
    window.location.href = `/services#${serviceId}`;
  };

  return (
    <section className="section-padding bg-gray-50" id="services">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Our Cleaning Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional cleaning solutions tailored to your specific needs across NSW
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mainServices.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#00FF66]/20"
            >
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {service.title}
                  </h3>
                  {service.popular && (
                    <span className="bg-[#00FF66] text-black text-xs font-semibold px-3 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-2xl font-bold text-[#00FF66]">
                      {formatCurrency(service.basePrice)}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">starting from</span>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {service.duration}
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-3">What's included:</h4>
                <ul className="space-y-2">
                  {service.includes.slice(0, 4).map((item, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-[#00FF66] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                  {service.includes.length > 4 && (
                    <li className="text-sm text-[#00FF66] font-medium">
                      +{service.includes.length - 4} more services
                    </li>
                  )}
                </ul>
              </div>

              {service.guarantee && (
                <div className="bg-[#00FF66]/10 border border-[#00FF66]/20 rounded-lg p-3 mb-6">
                  <p className="text-sm font-medium text-[#00cc52] text-center">
                    {service.guarantee}
                  </p>
                </div>
              )}

              {service.ndisCompliant && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                  <p className="text-sm font-medium text-blue-700 text-center">
                    NDIS Compliant Service
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={handleGetQuote}
                  variant="primary"
                  size="sm"
                  className="flex-1"
                >
                  Get Quote
                </Button>
                <Button
                  onClick={() => handleLearnMore(service.id)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Service Areas Across NSW
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide professional cleaning services across multiple areas in New South Wales
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {SERVICE_AREAS.map((area, index) => (
              <div 
                key={index}
                className="text-center p-4 bg-gray-50 rounded-lg hover:bg-[#00FF66]/5 transition-colors"
              >
                <span className="font-medium text-gray-800">{area}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Don't see your area listed? Contact us to check availability in your location.
            </p>
            <Button
              onClick={handleGetQuote}
              variant="primary"
              size="lg"
            >
              Check Your Area & Get Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
