import { useState } from 'react';
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
    const baseClasses = 'w-full px-4 py-3 border rounded-lg transition-all duration-200 bg-white';
    const focusClasses = 'focus:outline-none focus:ring-2 focus:ring-[#00FF66] focus:border-transparent';
    const errorClasses = hasError ? 'border-red-500' : 'border-gray-300';
    const hoverClasses = 'hover:border-gray-400';
    
    return `${baseClasses} ${focusClasses} ${errorClasses} ${hoverClasses}`;
  };

  const getLabelClasses = (field, hasError = false) => {
    const baseClasses = 'block text-sm font-medium mb-2 transition-colors duration-200';
    const focusedClasses = focusedField === field ? 'text-[#00FF66]' : 'text-gray-700';
    const errorClasses = hasError ? 'text-red-600' : '';
    
    return `${baseClasses} ${focusedClasses} ${errorClasses}`;
  };

  if (submitStatus === 'success') {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-6 text-center ${className}`}>
        <div className="text-green-600 text-4xl mb-4">✓</div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-green-700">
          Thank you for contacting us. We'll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      <div className={compact ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-6'}>
        <div>
          <label htmlFor="name" className={getLabelClasses('name', getFieldError('name'))}>
            Full Name *
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
            <p className="mt-1 text-sm text-red-600">{getFieldError('name')}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={getLabelClasses('email', getFieldError('email'))}>
            Email Address *
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
            <p className="mt-1 text-sm text-red-600">{getFieldError('email')}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={getLabelClasses('phone', getFieldError('phone'))}>
            Phone Number *
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
            <p className="mt-1 text-sm text-red-600">{getFieldError('phone')}</p>
          )}
        </div>

        <div>
          <label htmlFor="suburb" className={getLabelClasses('suburb', getFieldError('suburb'))}>
            Suburb
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
            <p className="mt-1 text-sm text-red-600">{getFieldError('suburb')}</p>
          )}
        </div>
      </div>

      {showServiceSelect && (
        <div>
          <label htmlFor="serviceType" className={getLabelClasses('serviceType')}>
            Service of Interest
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
      )}

      <div>
        <label htmlFor="preferredContact" className={getLabelClasses('preferredContact')}>
          Preferred Contact Method
        </label>
        <div className="flex gap-4 mt-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="preferredContact"
              value="email"
              checked={formData.preferredContact === 'email'}
              onChange={(e) => handleFieldChange('preferredContact', e.target.value)}
              className="mr-2 text-[#00FF66] focus:ring-[#00FF66]"
              disabled={isSubmitting}
            />
            <span className="text-sm text-gray-700">Email</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="preferredContact"
              value="phone"
              checked={formData.preferredContact === 'phone'}
              onChange={(e) => handleFieldChange('preferredContact', e.target.value)}
              className="mr-2 text-[#00FF66] focus:ring-[#00FF66]"
              disabled={isSubmitting}
            />
            <span className="text-sm text-gray-700">Phone</span>
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={getLabelClasses('message', getFieldError('message'))}>
          Message *
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
        <div className="flex justify-between items-center mt-1">
          {getFieldError('message') ? (
            <p className="text-sm text-red-600">{getFieldError('message')}</p>
          ) : (
            <p className="text-sm text-gray-500">
              {formData.message.length}/1000 characters
            </p>
          )}
        </div>
      </div>

      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="text-red-600 mr-3">⚠️</div>
            <div>
              <h4 className="text-sm font-medium text-red-800">
                Error Sending Message
              </h4>
              <p className="text-sm text-red-700 mt-1">
                Sorry, there was an error sending your message. Please try again or call us directly at +61 0406977014.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button
          type="submit"
          variant="primary"
          size={compact ? 'md' : 'lg'}
          disabled={!isFormValid() || isSubmitting}
          loading={isSubmitting}
          fullWidth={compact}
          className="flex-1"
        >
          {isSubmitting ? 'Sending Message...' : 'Send Message'}
        </Button>
        
        <Button
          type="button"
          variant="outline"
          size={compact ? 'md' : 'lg'}
          onClick={resetForm}
          disabled={isSubmitting}
          className={compact ? 'w-full sm:w-auto' : ''}
        >
          Clear Form
        </Button>
      </div>

      <div className="text-center pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Need immediate assistance? Call us at{' '}
          <a 
            href="tel:+61406977014" 
            className="text-[#00FF66] hover:text-[#00e65a] font-medium transition-colors"
          >
            +61 0406977014
          </a>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          We typically respond within 2-4 hours during business hours
        </p>
      </div>
    </form>
  );
};

export default ContactForm;

 
