import { Link } from 'react-router-dom';
import { COMPANY_INFO, NAVIGATION_LINKS, SOCIAL_LINKS, SERVICE_AREAS, BUSINESS_HOURS } from '../../utils/constants.js';
import { formatPhone } from '../../utils/helpers.js';
import Button from './Button.jsx';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = NAVIGATION_LINKS.filter(link => 
    ['Home', 'Services', 'Quote Calculator', 'NDIS Info', 'Contact'].includes(link.name)
  );

  const serviceLinks = [
    { name: 'General Cleaning', path: '/services#general' },
    { name: 'Deep Cleaning', path: '/services#deep' },
    { name: 'End-of-Lease', path: '/services#end-of-lease' },
    { name: 'NDIS Support', path: '/services#ndis' }
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      window.open(`mailto:${COMPANY_INFO.email.support}?subject=Newsletter Subscription&body=Please add ${email} to your newsletter.`, '_blank');
      e.target.reset();
    }
  };

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-[#00FF66] mb-2">
                {COMPANY_INFO.name}
              </h3>
              <p className="text-[#CCCCCC] text-sm leading-relaxed">
                Professional cleaning services across NSW including NDIS support, 
                end-of-lease cleaning, and general home cleaning. Reliable, insured, 
                and bond-back guaranteed.
              </p>
            </div>
            
            <div className="flex items-center gap-2 bg-[#1A1A1A] p-3 rounded-lg">
              <div className="w-3 h-3 bg-[#00FF66] rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-[#00FF66]">NDIS Approved Provider</span>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-[#CCCCCC] hover:text-[#00FF66] transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  to="/gallery"
                  className="text-[#CCCCCC] hover:text-[#00FF66] transition-colors duration-200 text-sm"
                >
                  Before & After Gallery
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq"
                  className="text-[#CCCCCC] hover:text-[#00FF66] transition-colors duration-200 text-sm"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service.name}>
                  <Link 
                    to={service.path}
                    className="text-[#CCCCCC] hover:text-[#00FF66] transition-colors duration-200 text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="mt-6">
              <h5 className="text-sm font-medium mb-3">Service Areas</h5>
              <div className="grid grid-cols-2 gap-1 text-xs text-[#CCCCCC]">
                {SERVICE_AREAS.slice(0, 6).map((area) => (
                  <span key={area}>{area}</span>
                ))}
              </div>
              <span className="text-xs text-[#00FF66] mt-2 inline-block">+ More areas</span>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Phone</p>
                <a 
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="text-[#00FF66] hover:text-[#00e65a] transition-colors duration-200 font-medium"
                >
                  {formatPhone(COMPANY_INFO.phone)}
                </a>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Email</p>
                <a 
                  href={`mailto:${COMPANY_INFO.email.support}`}
                  className="text-[#CCCCCC] hover:text-[#00FF66] transition-colors duration-200 text-sm break-all"
                >
                  {COMPANY_INFO.email.support}
                </a>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Business Hours</p>
                <div className="text-xs text-[#CCCCCC] space-y-1">
                  <div className="flex justify-between">
                    <span>Mon - Fri:</span>
                    <span>{BUSINESS_HOURS.monday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>{BUSINESS_HOURS.saturday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="text-red-400">{BUSINESS_HOURS.sunday}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#333333] pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-4">
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center hover:bg-[#00FF66] hover:text-black transition-all duration-200"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center hover:bg-[#00FF66] hover:text-black transition-all duration-200"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243 0-.49.122-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.315.315.49.753.49 1.243 0 .49-.175.928-.49 1.243-.369.315-.807.49-1.297.49z"/>
                  </svg>
                </a>
              </div>
              
              <div className="text-xs text-[#CCCCCC]">
                ABN: {COMPANY_INFO.abn}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Subscribe to updates"
                  className="px-3 py-2 bg-[#1A1A1A] border border-[#333333] rounded-lg text-sm text-white placeholder-[#CCCCCC] focus:outline-none focus:border-[#00FF66] transition-colors duration-200"
                  required
                />
                <Button type="submit" size="sm" variant="primary">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[#333333] text-center">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-xs text-[#CCCCCC]">
              <p>
                © {currentYear} {COMPANY_INFO.name}. All rights reserved.
              </p>
              <div className="flex gap-4">
                <Link to="/terms" className="hover:text-[#00FF66] transition-colors duration-200">
                  Terms of Service
                </Link>
                <Link to="/privacy" className="hover:text-[#00FF66] transition-colors duration-200">
                  Privacy Policy
                </Link>
              </div>
            </div>
            
            <p className="text-xs text-[#CCCCCC] mt-3 max-w-2xl mx-auto">
              We are not affiliated with the NDIA but work with all types of participant management. 
              All services are provided by qualified, insured professionals with police checks.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;