import SEO from '../components/common/SEO.jsx';
import AboutSection from '../components/sections/AboutSection.jsx';
import { COMPANY_INFO, SERVICE_AREAS, BUSINESS_HOURS } from '../utils/constants.js';
import { formatPhone } from '../utils/helpers.js';
import Button from '../components/common/Button.jsx';

const About = () => {
  const handleGetQuote = () => {
    window.location.href = '/quote';
  };

  const handleContact = () => {
    window.location.href = '/contact';
  };

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Operations Manager',
      experience: '8+ years',
      specialization: 'NDIS Services & Quality Control'
    },
    {
      name: 'Michael Chen',
      role: 'Lead Cleaner',
      experience: '6+ years',
      specialization: 'End-of-Lease & Deep Cleaning'
    },
    {
      name: 'Emma Williams',
      role: 'Customer Relations',
      experience: '5+ years',
      specialization: 'Client Support & Scheduling'
    }
  ];

  const companyValues = [
    {
      title: 'Reliability',
      description: 'We show up on time, every time, and deliver consistent quality service.'
    },
    {
      title: 'Respect',
      description: 'We treat every home and client with the utmost respect and care.'
    },
    {
      title: 'Quality',
      description: 'We use professional-grade equipment and eco-friendly products.'
    },
    {
      title: 'Transparency',
      description: 'Clear pricing, detailed invoices, and honest communication always.'
    }
  ];

  return (
    <>
      <SEO
        title="About Us - Professional Cleaning Team"
        description="Learn about NSW Cleaning Company - your trusted local cleaning professionals. Experienced team serving homes, rentals & NDIS participants across NSW with reliability and care."
        keywords="about NSW cleaning company, professional cleaning team, NDIS cleaning specialists, experienced cleaners NSW, reliable cleaning service"
      />

      <main className="pt-20">
        <section className="section-padding bg-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                About {COMPANY_INFO.name}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Your trusted local cleaning professionals dedicated to making your space shine
              </p>
            </div>

            <AboutSection />
          </div>
        </section>

        <section className="section-padding bg-gray-50">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                  Our Story
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Founded on Trust and Excellence
                  </h3>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      {COMPANY_INFO.name} was established with a simple mission: to provide reliable, 
                      professional cleaning services that exceed expectations. What started as a small 
                      local business has grown into NSW's trusted cleaning partner.
                    </p>
                    <p>
                      We recognized the unique needs of NDIS participants and made it our priority to 
                      offer specialized, respectful services that support independent living. Our team 
                      is trained not just in cleaning techniques, but in understanding and respecting 
                      the diverse needs of our clients.
                    </p>
                    <p>
                      Today, we're proud to serve hundreds of satisfied customers across NSW, from 
                      busy families to NDIS participants, property managers to real estate agents. 
                      Our commitment to quality, reliability, and respect remains unchanged.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h4 className="text-xl font-bold text-gray-900 mb-6">Company Details</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                      <span className="text-gray-600">Business Name:</span>
                      <span className="font-semibold text-gray-900">{COMPANY_INFO.name}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                      <span className="text-gray-600">ABN:</span>
                      <span className="font-semibold text-gray-900">{COMPANY_INFO.abn}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-semibold text-gray-900">{formatPhone(COMPANY_INFO.phone)}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-semibold text-gray-900">{COMPANY_INFO.email.support}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Service Area:</span>
                      <span className="font-semibold text-gray-900">NSW Wide</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {companyValues.map((value, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-md text-center">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                  Meet Our Team
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Our experienced professionals are the heart of our service
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {teamMembers.map((member, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-8 text-center">
                    <div className="w-24 h-24 bg-[#00FF66]/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#00FF66]">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-[#00FF66] font-semibold mb-2">{member.role}</p>
                    <p className="text-sm text-gray-600 mb-3">{member.experience} experience</p>
                    <p className="text-sm text-gray-700">{member.specialization}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-gray-50">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                  Service Areas & Hours
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-white rounded-xl p-8 shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Service Areas</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {SERVICE_AREAS.map((area, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-[#00FF66] rounded-full mr-3"></div>
                        <span className="text-gray-700">{area}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-6">
                    Don't see your area? Contact us to check availability.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Business Hours</h3>
                  <div className="space-y-3">
                    {Object.entries(BUSINESS_HOURS).map(([day, hours]) => (
                      <div key={day} className="flex justify-between items-center">
                        <span className="text-gray-700 capitalize">{day}:</span>
                        <span className="font-medium text-gray-900">{hours}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-6">
                    Emergency and urgent cleaning services available outside regular hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#00FF66]/5">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Ready to Experience the Difference?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Join hundreds of satisfied customers who trust us with their cleaning needs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleGetQuote}
                  variant="primary"
                  size="lg"
                >
                  Get Your Free Quote
                </Button>
                
                <Button
                  onClick={handleContact}
                  variant="secondary"
                  size="lg"
                >
                  Contact Us Today
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
 
