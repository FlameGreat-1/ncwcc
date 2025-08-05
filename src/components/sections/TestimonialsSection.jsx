import { useState, useEffect } from 'react';
import { testimonialsData, getRecentTestimonials, getAverageRating } from '../../data/testimonials.js';
import LoadingSpinner from '../common/LoadingSpinner.jsx';
import Button from '../common/Button.jsx';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = () => {
      setLoading(true);
      const recentTestimonials = getRecentTestimonials(6);
      setTestimonials(recentTestimonials);
      setLoading(false);
    };

    loadTestimonials();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  const handleDotClick = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const handleViewAllTestimonials = () => {
    window.location.href = '/testimonials';
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`text-lg ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  const getServiceBadgeColor = (service) => {
    const serviceColors = {
      'End-of-Lease Cleaning': 'bg-blue-100 text-blue-800',
      'NDIS Cleaning Support': 'bg-green-100 text-green-800',
      'Deep Cleaning': 'bg-purple-100 text-purple-800',
      'General Home Cleaning': 'bg-gray-100 text-gray-800',
      'Pet Hair Removal': 'bg-orange-100 text-orange-800',
      'Window & Carpet Cleaning': 'bg-indigo-100 text-indigo-800'
    };
    return serviceColors[service] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <section className="section-padding bg-gray-50" id="testimonials">
        <div className="container mx-auto text-center">
          <LoadingSpinner size="lg" text="Loading testimonials..." />
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const averageRating = getAverageRating();
  const totalTestimonials = testimonialsData.length;

  return (
    <section className="section-padding bg-gray-50" id="testimonials">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            What Our Clients Say
          </h2>
          
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                {renderStars(Math.round(averageRating))}
                <span className="ml-2 text-lg font-bold text-gray-900">{averageRating}</span>
              </div>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
            
            <div className="w-px h-12 bg-gray-300"></div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-[#00FF66] mb-1">{totalTestimonials}+</div>
              <p className="text-sm text-gray-600">Happy Customers</p>
            </div>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 min-h-[300px] flex items-center">
            {testimonials.length > 0 && (
              <div className="w-full text-center">
                <div className="flex justify-center mb-6">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
                
                <blockquote className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed italic">
                  "{testimonials[currentIndex].text}"
                </blockquote>
                
                <div className="flex flex-col items-center">
                  <div className="font-bold text-gray-900 text-lg mb-2">
                    {testimonials[currentIndex].name}
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-3">
                    {testimonials[currentIndex].location}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getServiceBadgeColor(testimonials[currentIndex].service)}`}>
                      {testimonials[currentIndex].service}
                    </span>
                    
                    {testimonials[currentIndex].verified && (
                      <span className="flex items-center text-xs text-green-600">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                        Verified
                      </span>
                    )}
                    
                    {testimonials[currentIndex].ndisParticipant && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                        NDIS Participant
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {testimonials.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-[#00FF66] transition-colors"
              >
                ←
              </button>
              
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-[#00FF66] transition-colors"
              >
                →
              </button>
            </>
          )}
        </div>

        {testimonials.length > 1 && (
          <div className="flex justify-center gap-2 mb-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-[#00FF66]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex">
                  {renderStars(testimonial.rating)}
                </div>
                {testimonial.verified && (
                  <span className="text-xs text-green-600 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    Verified
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                "{testimonial.text.length > 120 ? testimonial.text.substring(0, 120) + '...' : testimonial.text}"
              </p>
              
              <div className="border-t pt-4">
                <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                <div className="text-xs text-gray-500 mb-2">{testimonial.location}</div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getServiceBadgeColor(testimonial.service)}`}>
                  {testimonial.service}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={handleViewAllTestimonials}
            variant="primary"
            size="lg"
          >
            View All Testimonials
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
