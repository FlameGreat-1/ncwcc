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
