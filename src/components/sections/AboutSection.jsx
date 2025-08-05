import { COMPANY_INFO } from '../../utils/constants.js';

const AboutSection = () => {
  const features = [
    {
      icon: '✅',
      text: 'NDIS registered or compliant',
      highlight: true
    },
    {
      icon: '✅', 
      text: 'ABN-registered & GST-included invoices'
    },
    {
      icon: '✅',
      text: 'Before & After job photo documentation'
    },
    {
      icon: '✅',
      text: 'Fully insured & police-checked team'
    }
  ];

  return (
    <section className="section-padding bg-white" id="about">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
            About {COMPANY_INFO.name}
          </h2>
          
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-12">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              We're a local Australian cleaning company proudly serving homes, rentals, and NDIS participants 
              with respect, care, and reliability. Whether you're after a one-time deep clean, end-of-lease service, 
              or ongoing NDIS support, we're here to make your space shine — and your experience hassle-free.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`flex items-center p-4 rounded-lg transition-all duration-300 hover:shadow-md ${
                    feature.highlight 
                      ? 'bg-[#00FF66]/10 border border-[#00FF66]/20' 
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <span className="text-2xl mr-4 flex-shrink-0">{feature.icon}</span>
                  <span className={`font-medium ${
                    feature.highlight ? 'text-[#00cc52]' : 'text-gray-800'
                  }`}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-[#00FF66] mb-2">500+</div>
              <p className="text-gray-600 font-medium">Happy Customers</p>
            </div>
            
            <div className="p-6">
              <div className="text-4xl font-bold text-[#00FF66] mb-2">100%</div>
              <p className="text-gray-600 font-medium">Bond-Back Guarantee</p>
            </div>
            
            <div className="p-6">
              <div className="text-4xl font-bold text-[#00FF66] mb-2">24/7</div>
              <p className="text-gray-600 font-medium">Customer Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
