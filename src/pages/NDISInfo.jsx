import { useState, useEffect } from 'react';
import SEO from '../components/common/SEO.jsx';
import GallerySection from '../components/sections/GallerySection.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import Button from '../components/common/Button.jsx';
import { API_ENDPOINTS } from '../utils/constants.js';

const Gallery = () => {
  const [allGalleryItems, setAllGalleryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const itemsPerPage = 12;
  
  const filterOptions = [
    { id: 'all', label: 'All Services' },
    { id: 'general', label: 'General Cleaning' },
    { id: 'deep', label: 'Deep Cleaning' },
    { id: 'end-of-lease', label: 'End-of-Lease' },
    { id: 'ndis', label: 'NDIS Support' }
  ];

  useEffect(() => {
    fetchAllGalleryItems();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [filter, allGalleryItems]);

  const fetchAllGalleryItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_ENDPOINTS.gallery || '/api/gallery'}?limit=all`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch gallery items');
      }
      
      const data = await response.json();
      setAllGalleryItems(data.items || getDefaultGalleryItems());
    } catch (err) {
      setError(err.message);
      setAllGalleryItems(getDefaultGalleryItems());
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
      description: 'Complete bond cleaning transformation with full kitchen and bathroom restoration'
    },
    {
      id: 2,
      title: 'Deep Kitchen Clean',
      serviceType: 'deep',
      beforeImage: '/images/gallery/before-2.jpg',
      afterImage: '/images/gallery/after-2.jpg',
      location: 'Sydney CBD, NSW',
      description: 'Professional deep kitchen restoration including oven, rangehood, and appliances'
    },
    {
      id: 3,
      title: 'NDIS Participant Home',
      serviceType: 'ndis',
      beforeImage: '/images/gallery/before-3.jpg',
      afterImage: '/images/gallery/after-3.jpg',
      location: 'Western Sydney, NSW',
      description: 'Respectful NDIS cleaning service supporting independent living'
    },
    {
      id: 4,
      title: 'Bathroom Deep Clean',
      serviceType: 'deep',
      beforeImage: '/images/gallery/before-4.jpg',
      afterImage: '/images/gallery/after-4.jpg',
      location: 'North Shore, NSW',
      description: 'Complete bathroom sanitization with tile and grout restoration'
    },
    {
      id: 5,
      title: 'General Home Maintenance',
      serviceType: 'general',
      beforeImage: '/images/gallery/before-5.jpg',
      afterImage: '/images/gallery/after-5.jpg',
      location: 'Eastern Suburbs, NSW',
      description: 'Regular home cleaning service maintaining cleanliness and hygiene'
    },
    {
      id: 6,
      title: 'Carpet Steam Cleaning',
      serviceType: 'general',
      beforeImage: '/images/gallery/before-6.jpg',
      afterImage: '/images/gallery/after-6.jpg',
      location: 'Inner West, NSW',
      description: 'Professional carpet restoration removing stains and odors'
    },
    {
      id: 7,
      title: 'Post-Construction Clean',
      serviceType: 'deep',
      beforeImage: '/images/gallery/before-7.jpg',
      afterImage: '/images/gallery/after-7.jpg',
      location: 'Hills District, NSW',
      description: 'Complete post-renovation cleaning including dust and debris removal'
    },
    {
      id: 8,
      title: 'NDIS Weekly Service',
      serviceType: 'ndis',
      beforeImage: '/images/gallery/before-8.jpg',
      afterImage: '/images/gallery/after-8.jpg',
      location: 'Sutherland Shire, NSW',
      description: 'Regular NDIS cleaning support maintaining participant independence'
    },
    {
      id: 9,
      title: 'Office Deep Clean',
      serviceType: 'deep',
      beforeImage: '/images/gallery/before-9.jpg',
      afterImage: '/images/gallery/after-9.jpg',
      location: 'Sydney CBD, NSW',
      description: 'Commercial office space deep cleaning and sanitization'
    },
    {
      id: 10,
      title: 'End-of-Lease Apartment',
      serviceType: 'end-of-lease',
      beforeImage: '/images/gallery/before-10.jpg',
      afterImage: '/images/gallery/after-10.jpg',
      location: 'Northern Beaches, NSW',
      description: 'Full apartment bond cleaning with guaranteed bond return'
    },
    {
      id: 11,
      title: 'Pet Hair Removal Service',
      serviceType: 'general',
      beforeImage: '/images/gallery/before-11.jpg',
      afterImage: '/images/gallery/after-11.jpg',
      location: 'Western Sydney, NSW',
      description: 'Specialized pet hair removal and odor treatment service'
    },
    {
      id: 12,
      title: 'Window Cleaning Service',
      serviceType: 'general',
      beforeImage: '/images/gallery/before-12.jpg',
      afterImage: '/images/gallery/after-12.jpg',
      location: 'Eastern Suburbs, NSW',
      description: 'Professional interior and exterior window cleaning service'
    }
  ];

  const applyFilter = () => {
    if (filter === 'all') {
      setFilteredItems(allGalleryItems);
    } else {
      setFilteredItems(allGalleryItems.filter(item => item.serviceType === filter));
    }
    setCurrentPage(1);
  };

  const openLightbox = (item) => {
    setSelectedImage(item);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const handleGetQuote = () => {
    window.location.href = '/quote';
  };

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <>
        <SEO
          title="Gallery - Before & After Photos"
          description="View our professional cleaning transformations. Before and after photos showcasing our quality cleaning services across NSW."
        />
        <main className="pt-20">
          <section className="section-padding bg-white">
            <div className="container mx-auto text-center">
              <LoadingSpinner size="lg" text="Loading gallery..." />
            </div>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Gallery - Before & After Photos of Our Cleaning Services"
        description="View real transformations from our professional cleaning services. Before and after photos showcasing general cleaning, deep cleaning, end-of-lease cleaning, and NDIS support services across NSW."
        keywords="cleaning before after photos, cleaning transformations, professional cleaning results, NSW cleaning gallery, cleaning service photos, bond cleaning results"
      />

      <main className="pt-20">
        <section className="section-padding bg-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                See the Difference We Make
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Real transformations from our professional cleaning services across NSW
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-gray-50">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {filterOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setFilter(option.id)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                      filter === option.id
                        ? 'bg-[#00FF66] text-black shadow-md'
                        : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {error && filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-6">Unable to load gallery at this time.</p>
                  <Button onClick={() => window.location.reload()} variant="primary">
                    Try Again
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {currentItems.map((item) => (
                      <div 
                        key={item.id}
                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer group"
                        onClick={() => openLightbox(item)}
                      >
                        <div className="relative">
                          <div className="grid grid-cols-2 h-56">
                            <div className="relative overflow-hidden">
                              <img
                                src={item.beforeImage}
                                alt={`Before - ${item.title}`}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                onError={(e) => {
                                  e.target.src = '/images/placeholder-before.jpg';
                                }}
                              />
                              <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                Before
                              </div>
                            </div>
                            <div className="relative overflow-hidden">
                              <img
                                src={item.afterImage}
                                alt={`After - ${item.title}`}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                onError={(e) => {
                                  e.target.src = '/images/placeholder-after.jpg';
                                }}
                              />
                              <div className="absolute top-3 right-3 bg-[#00FF66] text-black text-xs font-semibold px-2 py-1 rounded">
                                After
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="font-bold text-gray-900 mb-2 text-lg">{item.title}</h3>
                          <p className="text-sm text-gray-600 mb-3 leading-relaxed">{item.description}</p>
                          <p className="text-xs text-gray-500 flex items-center">
                            <span className="w-2 h-2 bg-[#00FF66] rounded-full mr-2"></span>
                            {item.location}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </button>
                      
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => handlePageChange(index + 1)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            currentPage === index + 1
                              ? 'bg-[#00FF66] text-black'
                              : 'bg-white text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-lg bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Ready for Your Transformation?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Join hundreds of satisfied customers who have experienced our professional cleaning services.
              </p>
              
              <Button
                onClick={handleGetQuote}
                variant="primary"
                size="lg"
              >
                Get Your Free Quote Today
              </Button>
            </div>
          </div>
        </section>
      </main>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="max-w-5xl w-full bg-white rounded-xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">{selectedImage.title}</h3>
              <button
                onClick={closeLightbox}
                className="text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none"
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
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-semibold px-3 py-2 rounded">
                  Before
                </div>
              </div>
              <div className="relative">
                <img
                  src={selectedImage.afterImage}
                  alt={`After - ${selectedImage.title}`}
                  className="w-full h-64 md:h-96 object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#00FF66] text-black text-sm font-semibold px-3 py-2 rounded">
                  After
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-700 mb-3 leading-relaxed">{selectedImage.description}</p>
              <p className="text-sm text-gray-500 flex items-center">
                <span className="w-2 h-2 bg-[#00FF66] rounded-full mr-2"></span>
                {selectedImage.location}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;

