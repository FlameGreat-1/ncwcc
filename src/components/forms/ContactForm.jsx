import { useState, useRef, useEffect } from 'react';
import useContactForm from '../../hooks/useContactForm.js';
import Button from '../common/Button.jsx';
import LoadingSpinner from '../common/LoadingSpinner.jsx';
import { SERVICES } from '../../utils/constants.js';

const ContactForm = ({ 
  className = '',
  showServiceSelect = true,
  defaultService = '',
  onSubmitSuccess,
  compact = false
}) => {
  const {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    updateField,
    submitForm,
    resetForm,
    isFormValid,
    getFieldError
  } = useContactForm();

  const [focusedField, setFocusedField] = useState('');
  const [isVisible, setIsVisible] = useState(false);
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

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await submitForm();
    
    if (result.success) {
      onSubmitSuccess?.(result);
      setTimeout(() => {
        resetForm();
      }, 2000);
    }
  };

  const handleFieldChange = (field, value) => {
    updateField(field, value);
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField('');
  };

  const getInputClasses = (field, hasError = false) => {
    const baseClasses = 'w-full px-6 py-4 border-2 rounded-2xl transition-all duration-500 bg-white/90 backdrop-blur-lg shadow-lg font-medium text-gray-900 placeholder-gray-500';
    const focusClasses = 'focus:outline-none focus:border-[#00FF66] focus:ring-4 focus:ring-[#00FF66]/20 focus:shadow-2xl focus:scale-105 transform-gpu';
    const errorClasses = hasError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-[#00FF66]/30';
    const hoverClasses = 'hover:border-[#00FF66]/50 hover:shadow-xl hover:scale-105';
    
    return `${baseClasses} ${focusClasses} ${errorClasses} ${hoverClasses}`;
  };

  const getLabelClasses = (field, hasError = false) => {
    const baseClasses = 'block text-sm font-black mb-3 transition-all duration-500';
    const focusedClasses = focusedField === field ? 'text-[#00FF66] scale-105' : 'text-gray-700';
    const errorClasses = hasError ? 'text-red-600' : '';
    
    return `${baseClasses} ${focusedClasses} ${errorClasses}`;
  };

  if (submitStatus === 'success') {
    return (
      <div className={`relative group ${className}`}>
        <div className="absolute -inset-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-3xl blur opacity-30 animate-pulse"></div>
        <div className="relative bg-gradient-to-r from-green-50/90 via-white/90 to-green-50/90 backdrop-blur-xl border-2 border-green-200/50 rounded-3xl p-8 text-center shadow-2xl hover:shadow-[0_0_60px_rgba(34,197,94,0.3)] transition-all duration-700 hover:-translate-y-2 hover:scale-105 transform-gpu overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-transparent to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 rounded-t-3xl"></div>
          
          <div className="relative z-10">
            <div className="relative group/check mb-6">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-green-600 rounded-full blur opacity-40 animate-pulse"></div>
              <div className="relative text-green-600 text-6xl animate-bounce">✓</div>
            </div>
            <h3 className="text-2xl font-black text-green-800 mb-4 group-hover:text-green-600 transition-colors duration-500">
              Message Sent Successfully!
            </h3>
            <p className="text-green-700 font-medium group-hover:text-green-800 transition-colors duration-500">
              Thank you for contacting us. We'll get back to you within 24 hours.
            </p>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-3xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div ref={formRef} className={`relative group ${className}`}>
      <div className="absolute -inset-2 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] rounded-3xl blur opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
      <div className="relative bg-white/90 backdrop-blur-xl border-2 border-white/40 rounded-3xl p-8 shadow-2xl hover:shadow-[0_0_60px_rgba(0,255,102,0.15)] transition-all duration-700 hover:-translate-y-2 hover:scale-105 transform-gpu overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00FF66]/5 via-transparent to-[#00cc52]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 rounded-t-3xl"></div>
        
        <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
          <div className={compact ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-8'}>
            <div className="relative group/field animate-fade-in-up" style={{ animationDelay: `${isVisible ? 100 : 0}ms` }}>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-2xl blur opacity-0 group-hover/field:opacity-20 transition-all duration-500"></div>
              <div className="relative">
                <label htmlFor="name" className={getLabelClasses('name', getFieldError('name'))}>
                  <span className="flex items-center gap-2">
                    <span className="text-lg"></span>
                    Full Name *
                  </span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  className={getInputClasses('name', getFieldError('name'))}
                  placeholder="Enter your full name"
                  disabled={isSubmitting}
                />
                {getFieldError('name') && (
                  <div className="relative group/error mt-2">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-red-500 rounded-xl blur opacity-20"></div>
                    <p className="relative text-sm text-red-600 font-medium bg-red-50/80 backdrop-blur-lg px-3 py-2 rounded-xl border border-red-200/50">
                      {getFieldError('name')}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="relative group/field animate-fade-in-up" style={{ animationDelay: `${isVisible ? 200 : 0}ms` }}>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-2xl blur opacity-0 group-hover/field:opacity-20 transition-all duration-500"></div>
              <div className="relative">
                <label htmlFor="email" className={getLabelClasses('email', getFieldError('email'))}>
                  <span className="flex items-center gap-2">
                    <span className="text-lg"></span>
                    Email Address *
                  </span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  className={getInputClasses('email', getFieldError('email'))}
                  placeholder="your.email@example.com"
                  disabled={isSubmitting}
                />
                {getFieldError('email') && (
                  <div className="relative group/error mt-2">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-red-500 rounded-xl blur opacity-20"></div>
                    <p className="relative text-sm text-red-600 font-medium bg-red-50/80 backdrop-blur-lg px-3 py-2 rounded-xl border border-red-200/50">
                      {getFieldError('email')}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="relative group/field animate-fade-in-up" style={{ animationDelay: `${isVisible ? 300 : 0}ms` }}>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-2xl blur opacity-0 group-hover/field:opacity-20 transition-all duration-500"></div>
              <div className="relative">
                <label htmlFor="phone" className={getLabelClasses('phone', getFieldError('phone'))}>
                  <span className="flex items-center gap-2">
                    <span className="text-lg"></span>
                    Phone Number *
                  </span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleFieldChange('phone', e.target.value)}
                  onFocus={() => handleFocus('phone')}
                  onBlur={handleBlur}
                  className={getInputClasses('phone', getFieldError('phone'))}
                  placeholder="0400 000 000"
                  disabled={isSubmitting}
                />
                {getFieldError('phone') && (
                  <div className="relative group/error mt-2">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-red-500 rounded-xl blur opacity-20"></div>
                    <p className="relative text-sm text-red-600 font-medium bg-red-50/80 backdrop-blur-lg px-3 py-2 rounded-xl border border-red-200/50">
                      {getFieldError('phone')}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="relative group/field animate-fade-in-up" style={{ animationDelay: `${isVisible ? 400 : 0}ms` }}>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-2xl blur opacity-0 group-hover/field:opacity-20 transition-all duration-500"></div>
              <div className="relative">
                <label htmlFor="suburb" className={getLabelClasses('suburb', getFieldError('suburb'))}>
                  <span className="flex items-center gap-2">
                    <span className="text-lg"></span>
                    Suburb
                  </span>
                </label>
                <input
                  id="suburb"
                  type="text"
                  value={formData.suburb}
                  onChange={(e) => handleFieldChange('suburb', e.target.value)}
                  onFocus={() => handleFocus('suburb')}
                  onBlur={handleBlur}
                  className={getInputClasses('suburb', getFieldError('suburb'))}
                  placeholder="Your suburb"
                  disabled={isSubmitting}
                />
                {getFieldError('suburb') && (
                  <div className="relative group/error mt-2">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-red-500 rounded-xl blur opacity-20"></div>
                    <p className="relative text-sm text-red-600 font-medium bg-red-50/80 backdrop-blur-lg px-3 py-2 rounded-xl border border-red-200/50">
                      {getFieldError('suburb')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {showServiceSelect && (
            <div className="relative group/field animate-fade-in-up" style={{ animationDelay: `${isVisible ? 500 : 0}ms` }}>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-2xl blur opacity-0 group-hover/field:opacity-20 transition-all duration-500"></div>
              <div className="relative">
                <label htmlFor="serviceType" className={getLabelClasses('serviceType')}>
                  <span className="flex items-center gap-2">
                    <span className="text-lg"></span>
                    Service of Interest
                  </span>
                </label>
                <select
                  id="serviceType"
                  value={formData.serviceType || defaultService}
                  onChange={(e) => handleFieldChange('serviceType', e.target.value)}
                  onFocus={() => handleFocus('serviceType')}
                  onBlur={handleBlur}
                  className={getInputClasses('serviceType')}
                  disabled={isSubmitting}
                >
                  <option value="">Select a service</option>
                  <option value={SERVICES.GENERAL}>General Home Cleaning</option>
                  <option value={SERVICES.DEEP}>Deep Cleaning</option>
                  <option value={SERVICES.END_OF_LEASE}>End-of-Lease Cleaning</option>
                  <option value={SERVICES.NDIS}>NDIS Cleaning Support</option>
                  <option value={SERVICES.PET_TREATMENT}>Pet Hair Removal</option>
                  <option value={SERVICES.WINDOW_CARPET}>Window & Carpet Cleaning</option>
                </select>
              </div>
            </div>
          )}

          <div className="relative group/field animate-fade-in-up" style={{ animationDelay: `${isVisible ? 600 : 0}ms` }}>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-2xl blur opacity-0 group-hover/field:opacity-20 transition-all duration-500"></div>
            <div className="relative">
              <label className={getLabelClasses('preferredContact')}>
                <span className="flex items-center gap-2">
                  <span className="text-lg">📞</span>
                  Preferred Contact Method
                </span>
              </label>
              <div className="flex gap-6 mt-4">
                <label className="relative group/radio flex items-center cursor-pointer">
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-xl blur opacity-0 group-hover/radio:opacity-20 transition-all duration-500"></div>
                  <div className="relative flex items-center bg-white/80 backdrop-blur-lg border-2 border-[#00FF66]/30 rounded-xl px-4 py-3 hover:border-[#00FF66]/50 hover:bg-white/90 transition-all duration-500 hover:scale-105 transform-gpu shadow-lg hover:shadow-xl">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="email"
                      checked={formData.preferredContact === 'email'}
                      onChange={(e) => handleFieldChange('preferredContact', e.target.value)}
                      className="mr-3 w-5 h-5 text-[#00FF66] focus:ring-[#00FF66] focus:ring-2"
                      disabled={isSubmitting}
                    />
                    <span className="text-sm font-black text-gray-700 group-hover/radio:text-[#00FF66] transition-colors duration-500">Email</span>
                  </div>
                </label>
                <label className="relative group/radio flex items-center cursor-pointer">
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-xl blur opacity-0 group-hover/radio:opacity-20 transition-all duration-500"></div>
                  <div className="relative flex items-center bg-white/80 backdrop-blur-lg border-2 border-[#00FF66]/30 rounded-xl px-4 py-3 hover:border-[#00FF66]/50 hover:bg-white/90 transition-all duration-500 hover:scale-105 transform-gpu shadow-lg hover:shadow-xl">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="phone"
                      checked={formData.preferredContact === 'phone'}
                      onChange={(e) => handleFieldChange('preferredContact', e.target.value)}
                      className="mr-3 w-5 h-5 text-[#00FF66] focus:ring-[#00FF66] focus:ring-2"
                      disabled={isSubmitting}
                    />
                    <span className="text-sm font-black text-gray-700 group-hover/radio:text-[#00FF66] transition-colors duration-500">Phone</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="relative group/field animate-fade-in-up" style={{ animationDelay: `${isVisible ? 700 : 0}ms` }}>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-2xl blur opacity-0 group-hover/field:opacity-20 transition-all duration-500"></div>
            <div className="relative">
              <label htmlFor="message" className={getLabelClasses('message', getFieldError('message'))}>
                <span className="flex items-center gap-2">
                  <span className="text-lg">💬</span>
                  Message *
                </span>
              </label>
              <textarea
                id="message"
                rows={compact ? 4 : 6}
                value={formData.message}
                onChange={(e) => handleFieldChange('message', e.target.value)}
                onFocus={() => handleFocus('message')}
                onBlur={handleBlur}
                className={getInputClasses('message', getFieldError('message'))}
                placeholder="Tell us about your cleaning needs, property size, specific requirements, or any questions you have..."
                disabled={isSubmitting}
              />
              <div className="flex justify-between items-center mt-2">
                {getFieldError('message') ? (
                  <div className="relative group/error">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-red-500 rounded-xl blur opacity-20"></div>
                    <p className="relative text-sm text-red-600 font-medium bg-red-50/80 backdrop-blur-lg px-3 py-2 rounded-xl border border-red-200/50">
                      {getFieldError('message')}
                    </p>
                  </div>
                ) : (
                  <div className="relative group/counter">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-xl blur opacity-0 group-hover/counter:opacity-20 transition-all duration-500"></div>
                    <p className="relative text-sm text-gray-500 font-medium bg-white/80 backdrop-blur-lg px-3 py-2 rounded-xl border border-gray-200/50 group-hover/counter:text-[#00FF66] transition-colors duration-500">
                      {formData.message.length}/1000 characters
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {submitStatus === 'error' && (
            <div className="relative group/error animate-fade-in-up">
              <div className="absolute -inset-2 bg-gradient-to-r from-red-400 via-red-500 to-red-600 rounded-3xl blur opacity-30"></div>
              <div className="relative bg-gradient-to-r from-red-50/90 via-white/90 to-red-50/90 backdrop-blur-xl border-2 border-red-200/50 rounded-3xl p-6 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-400/5 via-transparent to-red-600/5 opacity-0 group-hover/error:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-400 via-red-500 to-red-600 rounded-t-3xl"></div>
                
                <div className="relative z-10 flex items-center">
                  <div className="text-red-600 mr-4 text-2xl animate-bounce">⚠️</div>
                  <div>
                    <h4 className="text-sm font-black text-red-800 mb-2">
                      Error Sending Message
                    </h4>
                    <p className="text-sm text-red-700 font-medium">
                      Sorry, there was an error sending your message. Please try again or call us directly at +61 0406977014.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-6 pt-8 animate-fade-in-up" style={{ animationDelay: `${isVisible ? 800 : 0}ms` }}>
            <Button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              loading={isSubmitting}
              className={`relative bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] hover:from-black hover:to-gray-800 text-black hover:text-white font-black px-8 py-4 rounded-full text-base transition-all duration-700 hover:scale-110 hover:-translate-y-3 hover:rotate-1 shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transform-gpu group/btn overflow-hidden ${compact ? 'flex-1' : 'flex-1'}`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="text-xl group-hover/btn:animate-bounce">
                  {isSubmitting ? '⏳' : '📤'}
                </span>
                {isSubmitting ? 'Sending Message...' : 'Send Message'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 transform group-hover/btn:translate-x-full"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-full blur opacity-30 group-hover/btn:opacity-60 transition-opacity duration-700"></div>
            </Button>
            
            <Button
              type="button"
              onClick={resetForm}
              disabled={isSubmitting}
              className={`relative bg-transparent border-3 border-[#00FF66] text-[#00FF66] hover:bg-gradient-to-r hover:from-black hover:to-gray-800 hover:text-white hover:border-black font-black px-8 py-4 rounded-full text-base transition-all duration-700 hover:scale-110 hover:-translate-y-3 hover:-rotate-1 shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transform-gpu group/btn overflow-hidden ${compact ? 'w-full sm:w-auto' : ''}`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="text-xl group-hover/btn:animate-spin">🔄</span>
                Clear Form
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00FF66]/10 to-[#00cc52]/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 rounded-full"></div>
            </Button>
          </div>

          <div className="relative group/contact text-center pt-8 border-t border-[#00FF66]/20 animate-fade-in-up" style={{ animationDelay: `${isVisible ? 900 : 0}ms` }}>
            <div className="absolute -inset-2 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-2xl blur opacity-0 group-hover/contact:opacity-20 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-r from-[#00FF66]/10 via-white/50 to-[#00cc52]/10 backdrop-blur-lg border border-[#00FF66]/20 rounded-2xl p-6 hover:border-[#00FF66]/40 transition-all duration-500 hover:scale-105 transform-gpu">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00FF66]/5 via-transparent to-[#00cc52]/5 opacity-0 group-hover/contact:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
              <div className="relative z-10">
                <p className="text-sm text-gray-600 font-medium mb-2 group-hover/contact:text-gray-800 transition-colors duration-500">
                  Need immediate assistance? Call us at{' '}
                  <a 
                    href="tel:+61406977014" 
                    className="relative group/phone text-[#00FF66] hover:text-white font-black transition-all duration-500 hover:scale-110 inline-block transform-gpu"
                  >
                    <span className="relative z-10">+61 0406977014</span>
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-lg opacity-0 group-hover/phone:opacity-100 transition-opacity duration-500 -z-10"></div>
                  </a>
                </p>
                <p className="text-xs text-gray-500 font-medium group-hover/contact:text-gray-600 transition-colors duration-500">
                  We typically respond within 2-4 hours during business hours
                </p>
              </div>
            </div>
          </div>
        </form>
        
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#00FF66] to-[#00cc52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-3xl"></div>
      </div>
    </div>
  );
};

export default ContactForm;

