
1. `src/styles/theme.js`:
export const theme = {
    colors: {
      background: {
        dark: '#000000',
        white: '#FFFFFF',
        chat: '#1A1A1A',
        card: '#111111'
      },
      primary: {
        green: '#00FF66',
        greenHover: '#00e65a',
        greenDark: '#00cc52',
        greenGlow: 'radial-gradient(circle, #006b3b 0%, #000000 100%)'
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#CCCCCC',
        black: '#000000',
        muted: '#4B4B4B'
      },
      button: {
        green: '#00FF66',
        greenHover: '#00e65a',
        text: '#000000'
      },
      chat: {
        sent: '#002b13',
        received: '#000000'
      },
      border: '#333333',
      inputBorder: '#00FF66'
    },
    
    typography: {
      fontFamily: {
        base: 'Inter, sans-serif'
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '32px',
        '4xl': '48px',
        '5xl': '64px',
        '6xl': '72px'
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900'
      },
      lineHeight: {
        tight: '110%',
        normal: '120%',
        relaxed: '140%'
      }
    },
    
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '32px',
      xl: '64px',
      '2xl': '96px',
      '3xl': '120px'
    },
    
    layout: {
      containerMaxWidth: '1140px',
      containerPadding: '0 24px',
      sectionPadding: '64px 0',
      chatBubblePadding: '12px 16px'
    },
    
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px',
      full: '999px',
      circle: '50%'
    },
    
    shadows: {
      md: '0 4px 12px rgba(0, 0, 0, 0.3)',
      glow: '0 0 20px rgba(0, 255, 102, 0.3)'
    },
    
    components: {
      avatar: {
        md: '40px'
      },
      button: {
        padding: '12px 24px',
        radius: '999px'
      },
      card: {
        padding: '24px',
        radius: '16px'
      }
    },
    
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    }
  };
  

2. `src/styles/globals.css`:

@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

:root {
  --color-background-dark: #000000;
  --color-primary-green: #00FF66;
  --color-secondary-green-glow: radial-gradient(circle, #006b3b 0%, #000000 100%);
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #CCCCCC;
  --color-button-green: #00FF66;
  --color-button-green-hover: #00e65a;
  --color-chat-background: #1A1A1A;
  --color-chat-sent: #002b13;
  --color-chat-received: #000000;
  --color-border: #333333;
  --color-white: #FFFFFF;
  --color-black: #000000;
  --color-hero-green: #00FF66;
  --color-hero-green-dark: #00cc52;
  --color-muted-text: #4B4B4B;
  --color-input-border: #00FF66;
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 32px;
  --spacing-xl: 64px;
  --container-max-width: 1140px;
  --chat-bubble-padding: 12px 16px;
  --avatar-md: 40px;
  --radius-card: 16px;
  --radius-button: 999px;
  --section-padding: 64px 0;
  --shadow-md: 0 4px 12px rgba(0,0,0,0.3);
  --font-base: Inter, sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-base);
  font-weight: 400;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
}

input, textarea, select {
  font-family: inherit;
  outline: none;
}

a {
  text-decoration: none;
  color: inherit;
}

ul, ol {
  list-style: none;
}

.container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: var(--container-padding);
}

.section-padding {
  padding: var(--section-padding);
}

.btn-primary {
  background: var(--color-button-green);
  color: var(--color-black);
  padding: 12px 24px;
  border-radius: var(--radius-button);
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-primary:hover {
  background: var(--color-button-green-hover);
  transform: translateY(-1px);
}

.btn-secondary {
  background: transparent;
  color: var(--color-primary-green);
  border: 2px solid var(--color-primary-green);
  padding: 12px 24px;
  border-radius: var(--radius-button);
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-secondary:hover {
  background: var(--color-primary-green);
  color: var(--color-black);
}

.card {
  background: var(--color-chat-background);
  padding: var(--spacing-lg);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-md);
}

.text-gradient {
  background: linear-gradient(135deg, var(--color-primary-green), var(--color-hero-green-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-glow {
  background: var(--color-secondary-green-glow);
}

.avatar {
  width: var(--avatar-md);
  height: var(--avatar-md);
  border-radius: 50%;
  object-fit: cover;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid var(--color-primary-green);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.fade-in {
  animation: fadeIn 0.6s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.slide-up {
  animation: slideUp 0.8s ease-out;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
  
  .section-padding {
    padding: 48px 0;
  }
  
  .btn-primary, .btn-secondary {
    padding: 10px 20px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 12px;
  }
  
  .section-padding {
    padding: 32px 0;
  }
}

3. `src/utils/constants.js`:

export const COMPANY_INFO = {
  name: 'NSW CLEANING COMPANY',
  domain: 'nswcleaningcompany.com',
  abn: '82 512 603 347',
  email: {
    support: 'support@nswcleaningcompany.com',
    bookings: 'bookings@nswcleaningcompany.com'
  },
  phone: '+61 0406977014',
  address: {
    state: 'NSW',
    country: 'Australia'
  }
};

export const SERVICES = {
  GENERAL: 'general',
  DEEP: 'deep',
  END_OF_LEASE: 'end-of-lease',
  NDIS: 'ndis',
  PET_TREATMENT: 'pet-treatment',
  WINDOW_CARPET: 'window-carpet'
};

export const CLEANING_TYPES = [
  { id: SERVICES.GENERAL, name: 'General Home Cleaning', basePrice: 120 },
  { id: SERVICES.DEEP, name: 'Deep Cleaning', basePrice: 180 },
  { id: SERVICES.END_OF_LEASE, name: 'End-of-Lease Cleaning', basePrice: 250 },
  { id: SERVICES.NDIS, name: 'NDIS Cleaning Support', basePrice: 140 }
];

export const ROOM_TYPES = {
  BEDROOM: { name: 'Bedroom', price: 25 },
  BATHROOM: { name: 'Bathroom', price: 35 },
  KITCHEN: { name: 'Kitchen', price: 45 },
  LIVING_ROOM: { name: 'Living Room', price: 30 },
  DINING_ROOM: { name: 'Dining Room', price: 20 }
};

export const EXTRAS = {
  WINDOWS: { name: 'Window Cleaning', price: 40 },
  CARPET: { name: 'Carpet Steam Cleaning', price: 60 },
  OVEN: { name: 'Oven Deep Clean', price: 35 },
  FRIDGE: { name: 'Fridge Clean', price: 25 },
  GARAGE: { name: 'Garage Clean', price: 50 },
  BALCONY: { name: 'Balcony/Patio Clean', price: 30 }
};

export const URGENCY_MULTIPLIERS = {
  STANDARD: { name: 'Standard (2-3 days)', multiplier: 1.0 },
  URGENT: { name: 'Urgent (Next day)', multiplier: 1.2 },
  SAME_DAY: { name: 'Same Day', multiplier: 1.5 }
};

export const NDIS_INFO = {
  serviceTypes: [
    'Household Tasks',
    'Assistance with Daily Life Tasks in a Group or Shared Living Arrangement',
    'Specialist Disability Accommodation'
  ],
  eligibility: [
    'Self-managed NDIS participants',
    'Plan-managed participants',
    'Agency-managed participants (with pre-approval)'
  ],
  invoiceRequirements: [
    'Participant Name',
    'NDIS Number',
    'Service Dates',
    'Provider Details',
    'GST/Non-GST clarification',
    'Service breakdown by hours'
  ]
};

export const NAVIGATION_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Quote Calculator', path: '/quote' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'NDIS Info', path: '/ndis' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' }
];

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/nswcleaningcompany',
  instagram: 'https://instagram.com/nswcleaningcompany'
};

export const FILE_UPLOAD = {
  maxSize: 5 * 1024 * 1024,
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
  maxFiles: 5
};

export const FORM_VALIDATION = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^(\+61|0)[2-9]\d{8}$/,
  abn: /^\d{11}$/,
  ndisNumber: /^\d{9}$/
};

export const API_ENDPOINTS = {
  quote: '/api/quote',
  contact: '/api/contact',
  upload: '/api/upload',
  invoice: '/api/invoice'
};

export const STORAGE_KEYS = {
  quoteData: 'ncwcc_quote_data',
  userPreferences: 'ncwcc_user_preferences'
};

export const TESTIMONIALS_LIMIT = 6;
export const GALLERY_ITEMS_LIMIT = 12;
export const FAQ_ITEMS_LIMIT = 10;

export const BUSINESS_HOURS = {
  monday: '7:00 AM - 6:00 PM',
  tuesday: '7:00 AM - 6:00 PM',
  wednesday: '7:00 AM - 6:00 PM',
  thursday: '7:00 AM - 6:00 PM',
  friday: '7:00 AM - 6:00 PM',
  saturday: '8:00 AM - 4:00 PM',
  sunday: 'Closed'
};

export const SERVICE_AREAS = [
  'Sydney CBD',
  'North Shore',
  'Eastern Suburbs',
  'Inner West',
  'Western Sydney',
  'Northern Beaches',
  'Sutherland Shire',
  'Hills District'
];


4. `src/utils/helpers.js`:

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('61')) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 3)} ${cleaned.slice(3, 7)} ${cleaned.slice(7)}`;
  }
  if (cleaned.startsWith('0')) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
};

export const formatDateTime = (date) => {
  return new Intl.DateTimeFormat('en-AU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

export const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const calculateQuoteTotal = (basePrice, rooms, extras, urgencyMultiplier = 1) => {
  const roomsTotal = Object.values(rooms).reduce((sum, count) => sum + count, 0);
  const extrasTotal = extras.reduce((sum, extra) => sum + extra.price, 0);
  const subtotal = basePrice + roomsTotal + extrasTotal;
  return Math.round(subtotal * urgencyMultiplier);
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const isValidFileType = (file, allowedTypes) => {
  return allowedTypes.includes(file.type);
};

export const isValidFileSize = (file, maxSize) => {
  return file.size <= maxSize;
};

export const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

export const scrollToElement = (elementId, offset = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};

export const getStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
};

export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
};

export const isMobile = () => {
  return window.innerWidth <= 768;
};

export const isTablet = () => {
  return window.innerWidth > 768 && window.innerWidth <= 1024;
};

export const isDesktop = () => {
  return window.innerWidth > 1024;
};

export const getDeviceType = () => {
  if (isMobile()) return 'mobile';
  if (isTablet()) return 'tablet';
  return 'desktop';
};

export const sanitizeInput = (input) => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

export const generateInvoiceNumber = () => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
  return `NCWCC${year}${month}${random}`;
};

export const calculateGST = (amount, includeGST = true) => {
  const gstRate = 0.1;
  if (includeGST) {
    const gstAmount = amount * gstRate / (1 + gstRate);
    const netAmount = amount - gstAmount;
    return { netAmount, gstAmount, totalAmount: amount };
  } else {
    const gstAmount = amount * gstRate;
    const totalAmount = amount + gstAmount;
    return { netAmount: amount, gstAmount, totalAmount };
  }
};
























5. `src/utils/validation.js`:

import { FORM_VALIDATION } from './constants.js';

export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  if (!FORM_VALIDATION.email.test(email)) return 'Please enter a valid email address';
  return null;
};

export const validatePhone = (phone) => {
  if (!phone) return 'Phone number is required';
  const cleanPhone = phone.replace(/\s/g, '');
  if (!FORM_VALIDATION.phone.test(cleanPhone)) return 'Please enter a valid Australian phone number';
  return null;
};

export const validateName = (name) => {
  if (!name) return 'Name is required';
  if (name.length < 2) return 'Name must be at least 2 characters';
  if (name.length > 50) return 'Name must be less than 50 characters';
  if (!/^[a-zA-Z\s'-]+$/.test(name)) return 'Name can only contain letters, spaces, hyphens and apostrophes';
  return null;
};

export const validateMessage = (message) => {
  if (!message) return 'Message is required';
  if (message.length < 10) return 'Message must be at least 10 characters';
  if (message.length > 1000) return 'Message must be less than 1000 characters';
  return null;
};

export const validateSuburb = (suburb) => {
  if (!suburb) return 'Suburb is required';
  if (suburb.length < 2) return 'Suburb must be at least 2 characters';
  if (suburb.length > 50) return 'Suburb must be less than 50 characters';
  return null;
};

export const validateNDISNumber = (ndisNumber) => {
  if (!ndisNumber) return 'NDIS number is required';
  if (!FORM_VALIDATION.ndisNumber.test(ndisNumber)) return 'NDIS number must be 9 digits';
  return null;
};

export const validateABN = (abn) => {
  if (!abn) return 'ABN is required';
  if (!FORM_VALIDATION.abn.test(abn)) return 'ABN must be 11 digits';
  return null;
};

export const validatePostcode = (postcode) => {
  if (!postcode) return 'Postcode is required';
  if (!/^\d{4}$/.test(postcode)) return 'Postcode must be 4 digits';
  const code = parseInt(postcode);
  if (code < 1000 || code > 9999) return 'Please enter a valid Australian postcode';
  return null;
};

export const validateAddress = (address) => {
  if (!address) return 'Address is required';
  if (address.length < 5) return 'Address must be at least 5 characters';
  if (address.length > 100) return 'Address must be less than 100 characters';
  return null;
};

export const validateRooms = (rooms) => {
  const totalRooms = Object.values(rooms).reduce((sum, count) => sum + count, 0);
  if (totalRooms === 0) return 'Please select at least one room';
  if (totalRooms > 20) return 'Maximum 20 rooms allowed';
  return null;
};

export const validateCleaningType = (cleaningType) => {
  if (!cleaningType) return 'Please select a cleaning type';
  return null;
};

export const validateUrgency = (urgency) => {
  if (!urgency) return 'Please select urgency level';
  return null;
};

export const validateFile = (file, maxSize, allowedTypes) => {
  if (!file) return 'File is required';
  
  if (!allowedTypes.includes(file.type)) {
    return `File type not allowed. Please upload: ${allowedTypes.join(', ')}`;
  }
  
  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024));
    return `File size too large. Maximum size: ${maxSizeMB}MB`;
  }
  
  return null;
};

export const validateFiles = (files, maxFiles, maxSize, allowedTypes) => {
  if (!files || files.length === 0) return null;
  
  if (files.length > maxFiles) {
    return `Too many files. Maximum ${maxFiles} files allowed`;
  }
  
  for (let i = 0; i < files.length; i++) {
    const fileError = validateFile(files[i], maxSize, allowedTypes);
    if (fileError) return fileError;
  }
  
  return null;
};

export const validateQuoteForm = (formData) => {
  const errors = {};
  
  const nameError = validateName(formData.name);
  if (nameError) errors.name = nameError;
  
  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;
  
  const phoneError = validatePhone(formData.phone);
  if (phoneError) errors.phone = phoneError;
  
  const suburbError = validateSuburb(formData.suburb);
  if (suburbError) errors.suburb = suburbError;
  
  const cleaningTypeError = validateCleaningType(formData.cleaningType);
  if (cleaningTypeError) errors.cleaningType = cleaningTypeError;
  
  const roomsError = validateRooms(formData.rooms);
  if (roomsError) errors.rooms = roomsError;
  
  const urgencyError = validateUrgency(formData.urgency);
  if (urgencyError) errors.urgency = urgencyError;
  
  if (formData.ndisNumber) {
    const ndisError = validateNDISNumber(formData.ndisNumber);
    if (ndisError) errors.ndisNumber = ndisError;
  }
  
  return Object.keys(errors).length > 0 ? errors : null;
};

export const validateContactForm = (formData) => {
  const errors = {};
  
  const nameError = validateName(formData.name);
  if (nameError) errors.name = nameError;
  
  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;
  
  const phoneError = validatePhone(formData.phone);
  if (phoneError) errors.phone = phoneError;
  
  const messageError = validateMessage(formData.message);
  if (messageError) errors.message = messageError;
  
  return Object.keys(errors).length > 0 ? errors : null;
};

export const validateNDISForm = (formData) => {
  const errors = {};
  
  const nameError = validateName(formData.participantName);
  if (nameError) errors.participantName = nameError;
  
  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;
  
  const phoneError = validatePhone(formData.phone);
  if (phoneError) errors.phone = phoneError;
  
  const ndisError = validateNDISNumber(formData.ndisNumber);
  if (ndisError) errors.ndisNumber = ndisError;
  
  const addressError = validateAddress(formData.address);
  if (addressError) errors.address = addressError;
  
  return Object.keys(errors).length > 0 ? errors : null;
};

export const sanitizeFormData = (formData) => {
  const sanitized = {};
  
  Object.keys(formData).forEach(key => {
    const value = formData[key];
    if (typeof value === 'string') {
      sanitized[key] = value.trim().replace(/[<>]/g, '');
    } else {
      sanitized[key] = value;
    }
  });
  
  return sanitized;
};

export const isFormValid = (errors) => {
  return !errors || Object.keys(errors).length === 0;
};


6. `src/data/services.js`:

import { SERVICES } from '../utils/constants.js';

export const servicesData = [
  {
    id: SERVICES.GENERAL,
    title: 'General Home Cleaning',
    description: 'Routine cleaning to keep your home fresh and tidy.',
    icon: '🏠',
    basePrice: 120,
    duration: '2-3 hours',
    includes: [
      'Dusting all surfaces',
      'Vacuuming carpets and mopping floors',
      'Bathroom cleaning and sanitizing',
      'Kitchen cleaning including benchtops',
      'Emptying bins and replacing liners',
      'Making beds and tidying rooms'
    ],
    popular: false
  },
  {
    id: SERVICES.DEEP,
    title: 'Deep Cleaning',
    description: 'In-depth, detailed cleaning including skirtings, tiles, and hard-to-reach areas.',
    icon: '🧼',
    basePrice: 180,
    duration: '4-6 hours',
    includes: [
      'Everything in General Cleaning',
      'Deep scrubbing of bathrooms and tiles',
      'Cleaning inside appliances',
      'Detailed skirting board cleaning',
      'Light fixture and fan cleaning',
      'Window sill and frame cleaning',
      'Cupboard exterior cleaning'
    ],
    popular: true
  },
  {
    id: SERVICES.END_OF_LEASE,
    title: 'End-of-Lease Cleaning',
    description: 'Bond-back guaranteed cleaning for tenants and agents.',
    icon: '📦',
    basePrice: 250,
    duration: '6-8 hours',
    includes: [
      'Complete property deep clean',
      'Oven and rangehood deep clean',
      'Carpet steam cleaning',
      'Window cleaning inside and out',
      'Wall washing and mark removal',
      'Cupboard cleaning inside and out',
      'Bond-back guarantee'
    ],
    popular: false,
    guarantee: 'Bond-back guarantee included'
  },
  {
    id: SERVICES.NDIS,
    title: 'NDIS Cleaning Support',
    description: 'Reliable, respectful cleaning for participants with invoices tailored to your plan manager.',
    icon: '♿',
    basePrice: 140,
    duration: '2-4 hours',
    includes: [
      'Participant-focused cleaning approach',
      'Flexible scheduling around your needs',
      'NDIS compliant invoicing',
      'Respectful and understanding staff',
      'Regular or one-off services',
      'Clear service documentation'
    ],
    popular: false,
    ndisCompliant: true
  },
  {
    id: SERVICES.PET_TREATMENT,
    title: 'Pet Hair Removal & Odour Treatment',
    description: 'Add-on service for homes with pets.',
    icon: '🐶',
    basePrice: 50,
    duration: '1-2 hours',
    includes: [
      'Specialized pet hair removal',
      'Odour neutralizing treatment',
      'Pet-safe cleaning products',
      'Furniture and upholstery cleaning',
      'Air freshening service'
    ],
    popular: false,
    addon: true
  },
  {
    id: SERVICES.WINDOW_CARPET,
    title: 'Window & Carpet Cleaning',
    description: 'Add optional window wiping or steam cleaning to any package.',
    icon: '🧽',
    basePrice: 80,
    duration: '2-3 hours',
    includes: [
      'Interior and exterior window cleaning',
      'Professional carpet steam cleaning',
      'Spot stain treatment',
      'Window frame and sill cleaning',
      'Screen cleaning where applicable'
    ],
    popular: false,
    addon: true
  }
];

export const getServiceById = (serviceId) => {
  return servicesData.find(service => service.id === serviceId);
};

export const getPopularServices = () => {
  return servicesData.filter(service => service.popular);
};

export const getMainServices = () => {
  return servicesData.filter(service => !service.addon);
};

export const getAddonServices = () => {
  return servicesData.filter(service => service.addon);
};

export const getNDISServices = () => {
  return servicesData.filter(service => service.ndisCompliant);
};

export const getServicePrice = (serviceId) => {
  const service = getServiceById(serviceId);
  return service ? service.basePrice : 0;
};

export const getServiceDuration = (serviceId) => {
  const service = getServiceById(serviceId);
  return service ? service.duration : 'N/A';
};

export const getServiceIncludes = (serviceId) => {
  const service = getServiceById(serviceId);
  return service ? service.includes : [];
};


7. `src/data/testimonials.js`:

export const testimonialsData = [
  {
    id: 1,
    name: 'Sarah M.',
    location: 'North Shore, NSW',
    service: 'End-of-Lease Cleaning',
    rating: 5,
    text: 'Absolutely fantastic service! The team was professional, thorough, and helped me get my full bond back. The before and after photos they provided were perfect for the real estate agent.',
    date: '2024-01-15',
    verified: true
  },
  {
    id: 2,
    name: 'Michael T.',
    location: 'Western Sydney, NSW',
    service: 'NDIS Cleaning Support',
    rating: 5,
    text: 'As an NDIS participant, I appreciate how respectful and understanding the team is. They work around my schedule and provide clear invoices for my plan manager. Highly recommended!',
    date: '2024-01-20',
    verified: true,
    ndisParticipant: true
  },
  {
    id: 3,
    name: 'Jennifer L.',
    location: 'Eastern Suburbs, NSW',
    service: 'Deep Cleaning',
    rating: 5,
    text: 'The deep clean was incredible! They got into every corner and crevice. My home has never looked better. The attention to detail was outstanding.',
    date: '2024-01-25',
    verified: true
  },
  {
    id: 4,
    name: 'David R.',
    location: 'Inner West, NSW',
    service: 'General Home Cleaning',
    rating: 5,
    text: 'Regular fortnightly service that keeps our busy household running smoothly. The team is reliable, efficient, and always does a great job. Worth every dollar!',
    date: '2024-02-01',
    verified: true
  },
  {
    id: 5,
    name: 'Lisa K.',
    location: 'Hills District, NSW',
    service: 'Pet Hair Removal',
    rating: 5,
    text: 'Amazing work removing pet hair from our furniture and carpets. Our golden retriever sheds everywhere, but they made our home look and smell fresh again!',
    date: '2024-02-05',
    verified: true
  },
  {
    id: 6,
    name: 'Robert P.',
    location: 'Northern Beaches, NSW',
    service: 'Window & Carpet Cleaning',
    rating: 5,
    text: 'Professional window and carpet cleaning service. The carpets look brand new and the windows are crystal clear. Great value for money and excellent customer service.',
    date: '2024-02-10',
    verified: true
  },
  {
    id: 7,
    name: 'Amanda S.',
    location: 'Sutherland Shire, NSW',
    service: 'NDIS Cleaning Support',
    rating: 5,
    text: 'The team understands my specific needs as an NDIS participant. They are patient, kind, and always deliver quality cleaning services. The invoicing is perfect for my plan manager.',
    date: '2024-02-15',
    verified: true,
    ndisParticipant: true
  },
  {
    id: 8,
    name: 'Mark W.',
    location: 'Sydney CBD, NSW',
    service: 'End-of-Lease Cleaning',
    rating: 5,
    text: 'Stress-free bond cleaning experience. They handled everything professionally and I got my full deposit back. The bond-back guarantee gave me peace of mind.',
    date: '2024-02-20',
    verified: true
  }
];

export const getTestimonialsByService = (serviceType) => {
  return testimonialsData.filter(testimonial => 
    testimonial.service.toLowerCase().includes(serviceType.toLowerCase())
  );
};

export const getNDISTestimonials = () => {
  return testimonialsData.filter(testimonial => testimonial.ndisParticipant);
};

export const getVerifiedTestimonials = () => {
  return testimonialsData.filter(testimonial => testimonial.verified);
};

export const getRecentTestimonials = (limit = 6) => {
  return testimonialsData
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
};

export const getAverageRating = () => {
  const totalRating = testimonialsData.reduce((sum, testimonial) => sum + testimonial.rating, 0);
  return (totalRating / testimonialsData.length).toFixed(1);
};

export const getTotalTestimonials = () => {
  return testimonialsData.length;
};

export const getTestimonialById = (id) => {
  return testimonialsData.find(testimonial => testimonial.id === id);
};





















8. `src/data/faq.js`
9. `src/components/common/Button.jsx`:

import { theme } from '../../styles/theme.js';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false, 
  onClick, 
  type = 'button',
  className = '',
  icon,
  fullWidth = false,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-[#00FF66] text-black hover:bg-[#00e65a] focus:ring-[#00FF66] hover:transform hover:-translate-y-0.5',
    secondary: 'bg-transparent text-[#00FF66] border-2 border-[#00FF66] hover:bg-[#00FF66] hover:text-black focus:ring-[#00FF66]',
    outline: 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-black focus:ring-white',
    ghost: 'bg-transparent text-white hover:bg-white/10 focus:ring-white/20',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-full',
    md: 'px-6 py-3 text-base rounded-full',
    lg: 'px-8 py-4 text-lg rounded-full',
    xl: 'px-10 py-5 text-xl rounded-full'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;
  
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {icon && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
    </button>
  );
};

export default Button;


10. `src/components/common/LoadingSpinner.jsx`:

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary', 
  className = '',
  text = null 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };
  
  const colorClasses = {
    primary: 'border-[#00FF66]',
    white: 'border-white',
    gray: 'border-gray-400',
    black: 'border-black'
  };
  
  const spinnerClasses = `animate-spin rounded-full border-2 border-transparent border-t-current ${sizeClasses[size]} ${colorClasses[color]} ${className}`;
  
  if (text) {
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <div className={spinnerClasses}></div>
        <span className="text-sm font-medium text-gray-600">{text}</span>
      </div>
    );
  }
  
  return <div className={spinnerClasses}></div>;
};

export default LoadingSpinner;

11. `src/components/common/SEO.jsx`:

import { Helmet } from 'react-helmet-async';
import { COMPANY_INFO } from '../../utils/constants.js';

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  noIndex = false
}) => {
  const siteTitle = `${title} | ${COMPANY_INFO.name}`;
  const siteDescription = description || 'Professional cleaning services across NSW including NDIS support, end-of-lease cleaning, deep cleaning and general home cleaning. Reliable, insured and bond-back guaranteed.';
  const siteKeywords = keywords || 'cleaning services NSW, NDIS cleaning, end of lease cleaning, deep cleaning, home cleaning, bond cleaning, professional cleaners Sydney';
  const siteImage = image || '/logo.png';
  const siteUrl = url || window.location.href;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={COMPANY_INFO.name} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />
      
      <link rel="canonical" href={siteUrl} />
      
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": COMPANY_INFO.name,
          "description": siteDescription,
          "url": `https://${COMPANY_INFO.domain}`,
          "telephone": COMPANY_INFO.phone,
          "email": COMPANY_INFO.email.support,
          "address": {
            "@type": "PostalAddress",
            "addressRegion": COMPANY_INFO.address.state,
            "addressCountry": COMPANY_INFO.address.country
          },
          "serviceArea": {
            "@type": "State",
            "name": "New South Wales"
          },
          "priceRange": "$$",
          "openingHours": "Mo-Fr 07:00-18:00, Sa 08:00-16:00"
        })}
      </script>
    </Helmet>
  );
};

export default SEO;


12. `src/hooks/useImageUpload.js`:

import { useState, useCallback } from 'react';
import { FILE_UPLOAD } from '../utils/constants.js';
import { validateFiles, isValidFileType, isValidFileSize } from '../utils/validation.js';

const useImageUpload = (maxFiles = FILE_UPLOAD.maxFiles) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  const createPreview = useCallback((file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve({
        id: Date.now() + Math.random(),
        file,
        preview: e.target.result,
        name: file.name,
        size: file.size,
        type: file.type
      });
      reader.readAsDataURL(file);
    });
  }, []);

  const addFiles = useCallback(async (newFiles) => {
    const fileArray = Array.from(newFiles);
    const validationError = validateFiles(fileArray, maxFiles, FILE_UPLOAD.maxSize, FILE_UPLOAD.allowedTypes);
    
    if (validationError) {
      setErrors(prev => [...prev, validationError]);
      return false;
    }

    if (files.length + fileArray.length > maxFiles) {
      setErrors(prev => [...prev, `Maximum ${maxFiles} files allowed`]);
      return false;
    }

    setErrors([]);
    
    const newPreviews = await Promise.all(
      fileArray.map(file => createPreview(file))
    );

    setFiles(prev => [...prev, ...fileArray]);
    setPreviews(prev => [...prev, ...newPreviews]);
    return true;
  }, [files.length, maxFiles, createPreview]);

  const removeFile = useCallback((index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
    setErrors([]);
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
    setPreviews([]);
    setErrors([]);
    setUploadProgress({});
  }, []);

  const uploadFiles = useCallback(async (uploadUrl, additionalData = {}) => {
    if (files.length === 0) return { success: false, error: 'No files to upload' };

    setUploading(true);
    setErrors([]);

    try {
      const formData = new FormData();
      
      files.forEach((file, index) => {
        formData.append(`files`, file);
      });

      Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key]);
      });

      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(prev => ({ ...prev, overall: progress }));
        }
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      setUploading(false);
      
      return { success: true, data: result };
    } catch (error) {
      setUploading(false);
      setErrors(prev => [...prev, error.message]);
      return { success: false, error: error.message };
    }
  }, [files]);

  const validateFile = useCallback((file) => {
    const typeValid = isValidFileType(file, FILE_UPLOAD.allowedTypes);
    const sizeValid = isValidFileSize(file, FILE_UPLOAD.maxSize);
    
    return {
      valid: typeValid && sizeValid,
      errors: [
        !typeValid && 'Invalid file type',
        !sizeValid && 'File too large'
      ].filter(Boolean)
    };
  }, []);

  const getFileInfo = useCallback(() => {
    return {
      count: files.length,
      totalSize: files.reduce((sum, file) => sum + file.size, 0),
      types: [...new Set(files.map(file => file.type))]
    };
  }, [files]);

  return {
    files,
    previews,
    uploading,
    errors,
    uploadProgress,
    addFiles,
    removeFile,
    clearFiles,
    uploadFiles,
    validateFile,
    getFileInfo,
    hasFiles: files.length > 0,
    canAddMore: files.length < maxFiles
  };
};

export default useImageUpload;

13. `src/hooks/useContactForm.js`:

import { useState, useCallback } from 'react';
import { validateContactForm, sanitizeFormData } from '../utils/validation.js';
import { API_ENDPOINTS } from '../utils/constants.js';

const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    suburb: '',
    message: '',
    serviceType: '',
    preferredContact: 'email'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const updateField = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  }, [errors]);

  const updateFormData = useCallback((data) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
  }, []);

  const validateForm = useCallback(() => {
    const sanitizedData = sanitizeFormData(formData);
    const validationErrors = validateContactForm(sanitizedData);
    
    setErrors(validationErrors || {});
    return !validationErrors;
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      suburb: '',
      message: '',
      serviceType: '',
      preferredContact: 'email'
    });
    setErrors({});
    setSubmitStatus(null);
  }, []);

  const submitForm = useCallback(async () => {
    if (!validateForm()) {
      return { success: false, errors };
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const sanitizedData = sanitizeFormData(formData);
      
      const response = await fetch(API_ENDPOINTS.contact, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...sanitizedData,
          timestamp: new Date().toISOString(),
          source: 'website_contact_form'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      setSubmitStatus('success');
      setIsSubmitting(false);
      
      return { 
        success: true, 
        data: result,
        message: 'Thank you for your message. We will get back to you within 24 hours.'
      };
      
    } catch (error) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      
      return { 
        success: false, 
        error: error.message,
        message: 'Sorry, there was an error sending your message. Please try again or call us directly.'
      };
    }
  }, [formData, validateForm, errors]);

  const hasErrors = useCallback(() => {
    return Object.keys(errors).length > 0;
  }, [errors]);

  const isFormValid = useCallback(() => {
    const requiredFields = ['name', 'email', 'phone', 'message'];
    return requiredFields.every(field => formData[field]?.trim()) && !hasErrors();
  }, [formData, hasErrors]);

  const getFieldError = useCallback((field) => {
    return errors[field] || null;
  }, [errors]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const setFieldError = useCallback((field, error) => {
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    updateField,
    updateFormData,
    validateForm,
    resetForm,
    submitForm,
    hasErrors,
    isFormValid,
    getFieldError,
    clearErrors,
    setFieldError,
    isSuccess: submitStatus === 'success',
    isError: submitStatus === 'error'
  };
};

export default useContactForm;


14. `src/hooks/useQuoteCalculator.js`:

import { useState, useCallback, useEffect } from 'react';
import { CLEANING_TYPES, ROOM_TYPES, EXTRAS, URGENCY_MULTIPLIERS, STORAGE_KEYS, API_ENDPOINTS } from '../utils/constants.js';
import { validateQuoteForm, sanitizeFormData } from '../utils/validation.js';
import { calculateQuoteTotal, getStorageItem, setStorageItem } from '../utils/helpers.js';

const useQuoteCalculator = () => {
  const [quoteData, setQuoteData] = useState({
    cleaningType: '',
    rooms: {
      bedrooms: 0,
      bathrooms: 0,
      kitchens: 0,
      livingRooms: 0,
      diningRooms: 0
    },
    extras: [],
    urgency: 'standard',
    location: {
      suburb: '',
      postcode: ''
    },
    customerInfo: {
      name: '',
      email: '',
      phone: '',
      ndisNumber: '',
      isNDISParticipant: false
    },
    specialRequests: '',
    preferredDate: '',
    preferredTime: ''
  });

  const [pricing, setPricing] = useState({
    basePrice: 0,
    roomsTotal: 0,
    extrasTotal: 0,
    urgencyMultiplier: 1,
    subtotal: 0,
    gst: 0,
    total: 0
  });

  const [errors, setErrors] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const loadSavedData = useCallback(() => {
    const savedData = getStorageItem(STORAGE_KEYS.quoteData);
    if (savedData) {
      setQuoteData(prev => ({ ...prev, ...savedData }));
    }
  }, []);

  const saveData = useCallback(() => {
    setStorageItem(STORAGE_KEYS.quoteData, quoteData);
  }, [quoteData]);

  useEffect(() => {
    loadSavedData();
  }, [loadSavedData]);

  useEffect(() => {
    saveData();
  }, [saveData]);

  const updateCleaningType = useCallback((type) => {
    const service = CLEANING_TYPES.find(s => s.id === type);
    setQuoteData(prev => ({
      ...prev,
      cleaningType: type
    }));
    
    if (service) {
      setPricing(prev => ({
        ...prev,
        basePrice: service.basePrice
      }));
    }
    
    if (errors.cleaningType) {
      setErrors(prev => ({ ...prev, cleaningType: null }));
    }
  }, [errors.cleaningType]);

  const updateRoomCount = useCallback((roomType, count) => {
    setQuoteData(prev => ({
      ...prev,
      rooms: {
        ...prev.rooms,
        [roomType]: Math.max(0, count)
      }
    }));
    
    if (errors.rooms) {
      setErrors(prev => ({ ...prev, rooms: null }));
    }
  }, [errors.rooms]);

  const toggleExtra = useCallback((extraId) => {
    const extra = EXTRAS[extraId];
    if (!extra) return;

    setQuoteData(prev => {
      const currentExtras = prev.extras;
      const existingIndex = currentExtras.findIndex(e => e.id === extraId);
      
      let newExtras;
      if (existingIndex >= 0) {
        newExtras = currentExtras.filter((_, index) => index !== existingIndex);
      } else {
        newExtras = [...currentExtras, { id: extraId, ...extra }];
      }
      
      return {
        ...prev,
        extras: newExtras
      };
    });
  }, []);

  const updateUrgency = useCallback((urgencyLevel) => {
    const multiplier = URGENCY_MULTIPLIERS[urgencyLevel.toUpperCase()];
    setQuoteData(prev => ({
      ...prev,
      urgency: urgencyLevel
    }));
    
    if (multiplier) {
      setPricing(prev => ({
        ...prev,
        urgencyMultiplier: multiplier.multiplier
      }));
    }
  }, []);

  const updateCustomerInfo = useCallback((field, value) => {
    setQuoteData(prev => ({
      ...prev,
      customerInfo: {
        ...prev.customerInfo,
        [field]: value
      }
    }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  }, [errors]);

  const updateLocation = useCallback((field, value) => {
    setQuoteData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value
      }
    }));
  }, []);

  const calculatePricing = useCallback(() => {
    setIsCalculating(true);
    
    const basePrice = pricing.basePrice;
    const roomsTotal = Object.entries(quoteData.rooms).reduce((sum, [roomType, count]) => {
      const roomPrice = ROOM_TYPES[roomType.toUpperCase()]?.price || 0;
      return sum + (roomPrice * count);
    }, 0);
    
    const extrasTotal = quoteData.extras.reduce((sum, extra) => sum + extra.price, 0);
    const subtotal = basePrice + roomsTotal + extrasTotal;
    const total = Math.round(subtotal * pricing.urgencyMultiplier);
    const gst = Math.round(total * 0.1);
    
    setPricing(prev => ({
      ...prev,
      roomsTotal,
      extrasTotal,
      subtotal,
      gst,
      total
    }));
    
    setIsCalculating(false);
  }, [quoteData, pricing.basePrice, pricing.urgencyMultiplier]);

  const validateQuote = useCallback(() => {
    const flattenedData = {
      ...quoteData.customerInfo,
      ...quoteData.location,
      cleaningType: quoteData.cleaningType,
      rooms: quoteData.rooms,
      urgency: quoteData.urgency
    };
    
    const validationErrors = validateQuoteForm(flattenedData);
    setErrors(validationErrors || {});
    return !validationErrors;
  }, [quoteData]);

  const submitQuote = useCallback(async () => {
    if (!validateQuote()) {
      return { success: false, errors };
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const sanitizedData = sanitizeFormData({
        ...quoteData,
        pricing,
        timestamp: new Date().toISOString()
      });

      const response = await fetch(API_ENDPOINTS.quote, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setSubmitStatus('success');
      setIsSubmitting(false);
      
      return { 
        success: true, 
        data: result,
        quoteId: result.quoteId,
        message: 'Quote submitted successfully! We will contact you within 2 hours.'
      };
      
    } catch (error) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      
      return { 
        success: false, 
        error: error.message,
        message: 'Error submitting quote. Please try again or call us directly.'
      };
    }
  }, [quoteData, pricing, validateQuote, errors]);

  const resetQuote = useCallback(() => {
    setQuoteData({
      cleaningType: '',
      rooms: {
        bedrooms: 0,
        bathrooms: 0,
        kitchens: 0,
        livingRooms: 0,
        diningRooms: 0
      },
      extras: [],
      urgency: 'standard',
      location: { suburb: '', postcode: '' },
      customerInfo: {
        name: '',
        email: '',
        phone: '',
        ndisNumber: '',
        isNDISParticipant: false
      },
      specialRequests: '',
      preferredDate: '',
      preferredTime: ''
    });
    
    setPricing({
      basePrice: 0,
      roomsTotal: 0,
      extrasTotal: 0,
      urgencyMultiplier: 1,
      subtotal: 0,
      gst: 0,
      total: 0
    });
    
    setErrors({});
    setSubmitStatus(null);
  }, []);

  useEffect(() => {
    calculatePricing();
  }, [calculatePricing]);

  return {
    quoteData,
    pricing,
    errors,
    isCalculating,
    isSubmitting,
    submitStatus,
    updateCleaningType,
    updateRoomCount,
    toggleExtra,
    updateUrgency,
    updateCustomerInfo,
    updateLocation,
    calculatePricing,
    validateQuote,
    submitQuote,
    resetQuote,
    isValid: Object.keys(errors).length === 0,
    hasRooms: Object.values(quoteData.rooms).some(count => count > 0),
    totalRooms: Object.values(quoteData.rooms).reduce((sum, count) => sum + count, 0)
  };
};

export default useQuoteCalculator;



15. `src/components/forms/ImageUpload.jsx`:

import { useRef } from 'react';
import useImageUpload from '../../hooks/useImageUpload.js';
import LoadingSpinner from '../common/LoadingSpinner.jsx';
import Button from '../common/Button.jsx';
import { formatFileSize } from '../../utils/helpers.js';

const ImageUpload = ({
  maxFiles = 5,
  onFilesChange,
  onUploadComplete,
  className = '',
  label = 'Upload Images',
  description = 'Upload photos for a more accurate estimate',
  showPreviews = true,
  autoUpload = false,
  uploadUrl = '/api/upload'
}) => {
  const fileInputRef = useRef(null);
  
  const {
    files,
    previews,
    uploading,
    errors,
    uploadProgress,
    addFiles,
    removeFile,
    clearFiles,
    uploadFiles,
    hasFiles,
    canAddMore
  } = useImageUpload(maxFiles);

  const handleFileSelect = async (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles.length > 0) {
      const success = await addFiles(selectedFiles);
      if (success) {
        onFilesChange?.(files);
        if (autoUpload) {
          handleUpload();
        }
      }
    }
    event.target.value = '';
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const success = await addFiles(droppedFiles);
      if (success) {
        onFilesChange?.(files);
        if (autoUpload) {
          handleUpload();
        }
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleUpload = async () => {
    if (!hasFiles) return;
    
    const result = await uploadFiles(uploadUrl);
    if (result.success) {
      onUploadComplete?.(result.data);
    }
  };

  const handleRemoveFile = (index) => {
    removeFile(index);
    onFilesChange?.(files.filter((_, i) => i !== index));
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {label && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
      )}

      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          canAddMore 
            ? 'border-gray-300 hover:border-[#00FF66] cursor-pointer' 
            : 'border-gray-200 cursor-not-allowed opacity-50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={canAddMore ? openFileDialog : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf"
          onChange={handleFileSelect}
          className="hidden"
          disabled={!canAddMore}
        />

        <div className="space-y-2">
          <div className="text-4xl">📸</div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {canAddMore ? 'Click to upload or drag and drop' : `Maximum ${maxFiles} files reached`}
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, PDF up to 5MB each
            </p>
          </div>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="space-y-1">
          {errors.map((error, index) => (
            <p key={index} className="text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      )}

      {showPreviews && previews.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900">
            Selected Files ({previews.length}/{maxFiles})
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {previews.map((preview, index) => (
              <div key={preview.id} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  {preview.type.startsWith('image/') ? (
                    <img
                      src={preview.preview}
                      alt={preview.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl mb-1">📄</div>
                        <p className="text-xs text-gray-600 truncate px-2">
                          {preview.name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
                
                <div className="mt-1">
                  <p className="text-xs text-gray-600 truncate">
                    {preview.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(preview.size)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {hasFiles && (
        <div className="flex gap-2">
          {!autoUpload && (
            <Button
              onClick={handleUpload}
              disabled={uploading}
              loading={uploading}
              variant="primary"
              size="sm"
            >
              Upload Files
            </Button>
          )}
          
          <Button
            onClick={clearFiles}
            disabled={uploading}
            variant="outline"
            size="sm"
          >
            Clear All
          </Button>
        </div>
      )}

      {uploading && uploadProgress.overall && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <LoadingSpinner size="sm" />
            <span className="text-sm text-gray-600">
              Uploading... {uploadProgress.overall}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#00FF66] h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress.overall}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
















16. `src/components/forms/ContactForm.jsx`
17. `src/components/forms/QuoteForm.jsx`:

import { useState } from 'react';
import useQuoteCalculator from '../../hooks/useQuoteCalculator.js';
import Button from '../common/Button.jsx';
import LoadingSpinner from '../common/LoadingSpinner.jsx';
import { CLEANING_TYPES, ROOM_TYPES, EXTRAS, URGENCY_MULTIPLIERS } from '../../utils/constants.js';
import { formatCurrency } from '../../utils/helpers.js';

const QuoteForm = ({ 
  className = '',
  onQuoteComplete,
  showPricing = true,
  embedded = false
}) => {
  const {
    quoteData,
    pricing,
    errors,
    isSubmitting,
    submitStatus,
    updateCleaningType,
    updateRoomCount,
    toggleExtra,
    updateUrgency,
    updateCustomerInfo,
    updateLocation,
    submitQuote,
    resetQuote,
    isValid,
    hasRooms,
    totalRooms
  } = useQuoteCalculator();

  const [currentStep, setCurrentStep] = useState(1);
  const [focusedField, setFocusedField] = useState('');

  const steps = [
    { id: 1, title: 'Service Type', icon: '🏠' },
    { id: 2, title: 'Rooms & Extras', icon: '🛏️' },
    { id: 3, title: 'Details', icon: '📋' },
    { id: 4, title: 'Contact Info', icon: '👤' }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await submitQuote();
    
    if (result.success) {
      onQuoteComplete?.(result);
      setCurrentStep(steps.length + 1);
    }
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

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return quoteData.cleaningType;
      case 2:
        return hasRooms;
      case 3:
        return quoteData.location.suburb && quoteData.urgency;
      case 4:
        return quoteData.customerInfo.name && quoteData.customerInfo.email && quoteData.customerInfo.phone;
      default:
        return false;
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-xl p-8 text-center ${className}`}>
        <div className="text-green-600 text-6xl mb-6">✓</div>
        <h3 className="text-2xl font-bold text-green-800 mb-4">
          Quote Submitted Successfully!
        </h3>
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="text-3xl font-bold text-[#00FF66] mb-2">
            {formatCurrency(pricing.total)}
          </div>
          <p className="text-gray-600">Estimated Total (including GST)</p>
        </div>
        <p className="text-green-700 mb-6">
          We'll contact you within 2 hours to confirm your booking and arrange the service.
        </p>
        <Button onClick={resetQuote} variant="primary">
          Get Another Quote
        </Button>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      {!embedded && (
        <div className="bg-gradient-to-r from-[#00FF66] to-[#00e65a] p-6">
          <h2 className="text-2xl font-bold text-black mb-2">Get Your Instant Quote</h2>
          <p className="text-black/80">Professional cleaning services tailored to your needs</p>
        </div>
      )}

      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all duration-200 ${
                currentStep >= step.id 
                  ? 'bg-[#00FF66] text-black' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > step.id ? '✓' : step.id}
              </div>
              <div className="ml-3 hidden sm:block">
                <p className={`text-sm font-medium ${
                  currentStep >= step.id ? 'text-[#00FF66]' : 'text-gray-500'
                }`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-[#00FF66]' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  What type of cleaning do you need?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CLEANING_TYPES.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => updateCleaningType(service.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                        quoteData.cleaningType === service.id
                          ? 'border-[#00FF66] bg-[#00FF66]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {service.name}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Starting from {formatCurrency(service.basePrice)}
                          </p>
                          {service.popular && (
                            <span className="inline-block bg-[#00FF66] text-black text-xs font-medium px-2 py-1 rounded-full">
                              Most Popular
                            </span>
                          )}
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          quoteData.cleaningType === service.id
                            ? 'border-[#00FF66] bg-[#00FF66]'
                            : 'border-gray-300'
                        }`}>
                          {quoteData.cleaningType === service.id && (
                            <div className="w-2 h-2 bg-black rounded-full" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.cleaningType && (
                  <p className="text-sm text-red-600 mt-2">{errors.cleaningType}</p>
                )}
              </div>
            </div>
          )}

{currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  How many rooms need cleaning?
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(ROOM_TYPES).map(([key, room]) => (
                    <div key={key} className="bg-gray-50 rounded-lg p-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {room.name}
                      </label>
                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => updateRoomCount(key.toLowerCase(), Math.max(0, quoteData.rooms[key.toLowerCase()] - 1))}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                          -
                        </button>
                        <span className="text-lg font-semibold text-gray-900 mx-4">
                          {quoteData.rooms[key.toLowerCase()] || 0}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateRoomCount(key.toLowerCase(), (quoteData.rooms[key.toLowerCase()] || 0) + 1)}
                          className="w-8 h-8 rounded-full bg-[#00FF66] hover:bg-[#00e65a] text-black flex items-center justify-center transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        +{formatCurrency(room.price)} each
                      </p>
                    </div>
                  ))}
                </div>
                {errors.rooms && (
                  <p className="text-sm text-red-600 mt-2">{errors.rooms}</p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Add extra services (optional)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(EXTRAS).map(([key, extra]) => (
                    <label
                      key={key}
                      className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={quoteData.extras.some(e => e.id === key)}
                        onChange={() => toggleExtra(key)}
                        className="mr-3 text-[#00FF66] focus:ring-[#00FF66] rounded"
                      />
                      <div className="flex-1">
                        <span className="font-medium text-gray-900">{extra.name}</span>
                        <span className="text-[#00FF66] font-semibold ml-2">
                          +{formatCurrency(extra.price)}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Service details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={getLabelClasses('suburb', errors.suburb)}>
                      Suburb *
                    </label>
                    <input
                      type="text"
                      value={quoteData.location.suburb}
                      onChange={(e) => updateLocation('suburb', e.target.value)}
                      onFocus={() => setFocusedField('suburb')}
                      onBlur={() => setFocusedField('')}
                      className={getInputClasses('suburb', errors.suburb)}
                      placeholder="Enter your suburb"
                    />
                    {errors.suburb && (
                      <p className="text-sm text-red-600 mt-1">{errors.suburb}</p>
                    )}
                  </div>

                  <div>
                    <label className={getLabelClasses('postcode')}>
                      Postcode
                    </label>
                    <input
                      type="text"
                      value={quoteData.location.postcode}
                      onChange={(e) => updateLocation('postcode', e.target.value)}
                      onFocus={() => setFocusedField('postcode')}
                      onBlur={() => setFocusedField('')}
                      className={getInputClasses('postcode')}
                      placeholder="2000"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className={getLabelClasses('urgency')}>
                  When do you need this service? *
                </label>
                <div className="space-y-2">
                  {Object.entries(URGENCY_MULTIPLIERS).map(([key, urgency]) => (
                    <label
                      key={key}
                      className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="radio"
                        name="urgency"
                        value={key.toLowerCase()}
                        checked={quoteData.urgency === key.toLowerCase()}
                        onChange={(e) => updateUrgency(e.target.value)}
                        className="mr-3 text-[#00FF66] focus:ring-[#00FF66]"
                      />
                      <div className="flex-1 flex justify-between items-center">
                        <span className="font-medium text-gray-900">{urgency.name}</span>
                        {urgency.multiplier > 1 && (
                          <span className="text-sm text-orange-600 font-medium">
                            +{Math.round((urgency.multiplier - 1) * 100)}% surcharge
                          </span>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Contact information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={getLabelClasses('name', errors.name)}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={quoteData.customerInfo.name}
                      onChange={(e) => updateCustomerInfo('name', e.target.value)}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField('')}
                      className={getInputClasses('name', errors.name)}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className={getLabelClasses('email', errors.email)}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={quoteData.customerInfo.email}
                      onChange={(e) => updateCustomerInfo('email', e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                      className={getInputClasses('email', errors.email)}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className={getLabelClasses('phone', errors.phone)}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={quoteData.customerInfo.phone}
                      onChange={(e) => updateCustomerInfo('phone', e.target.value)}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField('')}
                      className={getInputClasses('phone', errors.phone)}
                      placeholder="0400 000 000"
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center mt-6">
                      <input
                        type="checkbox"
                        checked={quoteData.customerInfo.isNDISParticipant}
                        onChange={(e) => updateCustomerInfo('isNDISParticipant', e.target.checked)}
                        className="mr-2 text-[#00FF66] focus:ring-[#00FF66] rounded"
                      />
                      <span className="text-sm text-gray-700">I am an NDIS participant</span>
                    </label>
                  </div>
                </div>

                {quoteData.customerInfo.isNDISParticipant && (
                  <div>
                    <label className={getLabelClasses('ndisNumber', errors.ndisNumber)}>
                      NDIS Number
                    </label>
                    <input
                      type="text"
                      value={quoteData.customerInfo.ndisNumber}
                      onChange={(e) => updateCustomerInfo('ndisNumber', e.target.value)}
                      onFocus={() => setFocusedField('ndisNumber')}
                      onBlur={() => setFocusedField('')}
                      className={getInputClasses('ndisNumber', errors.ndisNumber)}
                      placeholder="123456789"
                    />
                    {errors.ndisNumber && (
                      <p className="text-sm text-red-600 mt-1">{errors.ndisNumber}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {showPricing && pricing.total > 0 && (
            <div className="bg-gray-50 rounded-lg p-6 mt-6">
              <h4 className="font-semibold text-gray-900 mb-4">Quote Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Base service</span>
                  <span>{formatCurrency(pricing.basePrice)}</span>
                </div>
                {pricing.roomsTotal > 0 && (
                  <div className="flex justify-between">
                    <span>Rooms ({totalRooms})</span>
                    <span>{formatCurrency(pricing.roomsTotal)}</span>
                  </div>
                )}
                {pricing.extrasTotal > 0 && (
                  <div className="flex justify-between">
                    <span>Extras</span>
                    <span>{formatCurrency(pricing.extrasTotal)}</span>
                  </div>
                )}
                {pricing.urgencyMultiplier > 1 && (
                  <div className="flex justify-between text-orange-600">
                    <span>Urgency surcharge</span>
                    <span>+{Math.round((pricing.urgencyMultiplier - 1) * 100)}%</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                  <span>Total (inc. GST)</span>
                  <span className="text-[#00FF66]">{formatCurrency(pricing.total)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={isSubmitting}
              >
                Previous
              </Button>
            )}
            
            <div className="ml-auto">
              {currentStep < steps.length ? (
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleNext}
                  disabled={!canProceedToNext()}
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                >
                  {isSubmitting ? 'Submitting Quote...' : 'Get My Quote'}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuoteForm;


18. `src/components/common/Header.jsx` (THIS IS WHERE WE STOPPED):


import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../common/Button.jsx';
import { NAVIGATION_LINKS, COMPANY_INFO } from '../../utils/constants.js';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const servicesDropdown = [
    { name: 'General Home Cleaning', path: '/services#general' },
    { name: 'Deep Cleaning', path: '/services#deep' },
    { name: 'End-of-Lease Cleaning', path: '/services#end-of-lease' },
    { name: 'NDIS Cleaning Support', path: '/services#ndis' },
    { name: 'Pet Hair Removal', path: '/services#pet-treatment' },
    { name: 'Window & Carpet Cleaning', path: '/services#window-carpet' }
  ];

  const resourcesDropdown = [
    { name: 'FAQ', path: '/faq' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'NDIS Information', path: '/ndis' },
    { name: 'Cleaning Tips', path: '/blog' }
  ];

  const isActivePath = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/95 backdrop-blur-md shadow-lg' 
        : 'bg-black/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Left Section - Logo/Brand */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-[#00FF66] rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-xl">N</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-white font-bold text-lg leading-tight">
                  {COMPANY_INFO.name}
                </h1>
                <p className="text-gray-400 text-xs">Professional Cleaning Services</p>
              </div>
            </Link>
          </div>

          {/* Center Section - Multi-Level Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-[#00FF66] ${
                isActivePath('/') ? 'text-[#00FF66]' : 'text-white'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-[#00FF66] ${
                isActivePath('/about') ? 'text-[#00FF66]' : 'text-white'
              }`}
            >
              About
            </Link>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('services')}
                className={`flex items-center text-sm font-medium transition-colors hover:text-[#00FF66] ${
                  isActivePath('/services') ? 'text-[#00FF66]' : 'text-white'
                }`}
              >
                Services
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  {servicesDropdown.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#00FF66]/10 hover:text-[#00FF66] transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/quote"
              className={`text-sm font-medium transition-colors hover:text-[#00FF66] ${
                isActivePath('/quote') ? 'text-[#00FF66]' : 'text-white'
              }`}
            >
              Get Quote
            </Link>

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('resources')}
                className="flex items-center text-sm font-medium text-white transition-colors hover:text-[#00FF66]"
              >
                Resources
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {activeDropdown === 'resources' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  {resourcesDropdown.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#00FF66]/10 hover:text-[#00FF66] transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-[#00FF66] ${
                isActivePath('/contact') ? 'text-[#00FF66]' : 'text-white'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Section - User/Action Tools */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-3">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                📞 {COMPANY_INFO.phone}
              </a>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`tel:${COMPANY_INFO.phone}`, '_self')}
              >
                Call Now
              </Button>
              
              <Button
                variant="primary"
                size="sm"
                onClick={() => window.location.href = '/quote'}
              >
                Get Quote
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-md text-white hover:text-[#00FF66] hover:bg-white/10 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {NAVIGATION_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActivePath(link.path)
                      ? 'text-[#00FF66] bg-[#00FF66]/10'
                      : 'text-white hover:text-[#00FF66] hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-800 mt-4">
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => window.open(`tel:${COMPANY_INFO.phone}`, '_self')}
                  >
                    📞 Call Now
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={() => window.location.href = '/quote'}
                  >
                    Get Free Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

