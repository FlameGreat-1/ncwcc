import { useState, useEffect } from 'react';
import Button from '../common/Button.jsx';
import LoadingSpinner from '../common/LoadingSpinner.jsx';
import { API_ENDPOINTS } from '../../utils/constants.js';

const GallerySection = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);

  const filterOptions = [
    { id: 'all', label: 'All Services' },
    { id: 'general', label: 'General Cleaning' },
    { id: 'deep', label: 'Deep Cleaning' },
    { id: 'end-of-lease', label: 'End-of-Lease' },
    { id: 'ndis', label: 'NDIS Support' }
  ];

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_ENDPOINTS.gallery || '/api/gallery'}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch gallery items');
      }
      
      const data = await response.json();
      setGalleryItems(data.items || []);
    } catch (err) {
      setError(err.message);
      setGalleryItems(getDefaultGalleryItems());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultGalleryItems = () => [
    {
      id: 1,
      title: 'End-of-Lease Clean in Box Hill',
      serviceType: 'end-of-lease',
      beforeImage: '/images/gallery/before-1.jpg',
      afterImage: '/images/gallery/after-1.jpg',
      location: 'Box Hill, NSW',
      description: 'Complete bond cleaning transformation'
    },
    {
      id: 2,
      title: 'Deep Kitchen Clean',
      serviceType: 'deep',
      beforeImage: '/images/gallery/before-2.jpg',
      afterImage: '/images/gallery/after-2.jpg',
      location: 'Sydney CBD, NSW',
      description: 'Professional deep kitchen restoration'
    },
    {
      id: 3,
      title: 'NDIS Participant Home',
      serviceType: 'ndis',
      beforeImage: '/images/gallery/before-3.jpg',
      afterImage: '/images/gallery/after-3.jpg',
      location: 'Western Sydney, NSW',
      description: 'Respectful NDIS cleaning service'
    },
    {
      id: 4,
      title: 'Bathroom Deep Clean',
      serviceType: 'deep',
      beforeImage: '/images/gallery/before-4.jpg',
      afterImage: '/images/gallery/after-4.jpg',
      location: 'North Shore, NSW',
      description: 'Complete bathroom sanitization'
    },
    {
      id: 5,
      title: 'General Home Maintenance',
      serviceType: 'general',
      beforeImage: '/images/gallery/before-5.jpg',
      afterImage: '/images/gallery/after-5.jpg',
      location: 'Eastern Suburbs, NSW',
      description: 'Regular home cleaning service'
    },
    {
      id: 6,
      title: 'Carpet Steam Cleaning',
      serviceType: 'general',
      beforeImage: '/images/gallery/before-6.jpg',
      afterImage: '/images/gallery/after-6.jpg',
      location: 'Inner West, NSW',
      description: 'Professional carpet restoration'
    }
  ];

  const filteredItems = galleryItems.filter(item => 
    filter === 'all' || item.serviceType === filter
  );

  const openLightbox = (item) => {
    setSelectedImage(item);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const handleViewMore = () => {
    window.location.href = '/gallery';
  };

  if (loading) {
    return (
      <section className="section-padding bg-white" id="gallery">
        <div className="container mx-auto text-center">
          <LoadingSpinner size="lg" text="Loading gallery..." />
        </div>
      </section>
    );
  }

  if (error && galleryItems.length === 0) {
    return (
      <section className="section-padding bg-white" id="gallery">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            See the Difference
          </h2>
          <p className="text-gray-600 mb-8">
            Gallery temporarily unavailable. Please check back later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-white" id="gallery">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            See the Difference
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Real transformations from our professional cleaning services across NSW
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setFilter(option.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === option.id
                    ? 'bg-[#00FF66] text-black'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredItems.slice(0, 6).map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
              onClick={() => openLightbox(item)}
            >
              <div className="relative">
                <div className="grid grid-cols-2 h-48">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.beforeImage}
                      alt={`Before - ${item.title}`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        e.target.src = '/images/placeholder-before.jpg';
                      }}
                    />
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      Before
                    </div>
                  </div>
                  <div className="relative overflow-hidden">
                    <img
                      src={item.afterImage}
                      alt={`After - ${item.title}`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        e.target.src = '/images/placeholder-after.jpg';
                      }}
                    />
                    <div className="absolute top-2 right-2 bg-[#00FF66] text-black text-xs font-semibold px-2 py-1 rounded">
                      After
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <p className="text-xs text-gray-500">{item.location}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={handleViewMore}
            variant="primary"
            size="lg"
          >
            View Complete Gallery
          </Button>
        </div>
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="max-w-4xl w-full bg-white rounded-xl overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-bold text-gray-900">{selectedImage.title}</h3>
              <button
                onClick={closeLightbox}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative">
                <img
                  src={selectedImage.beforeImage}
                  alt={`Before - ${selectedImage.title}`}
                  className="w-full h-64 md:h-96 object-cover"
                />
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded">
                  Before
                </div>
              </div>
              <div className="relative">
                <img
                  src={selectedImage.afterImage}
                  alt={`After - ${selectedImage.title}`}
                  className="w-full h-64 md:h-96 object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#00FF66] text-black text-sm font-semibold px-3 py-1 rounded">
                  After
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-2">{selectedImage.description}</p>
              <p className="text-sm text-gray-500">{selectedImage.location}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
