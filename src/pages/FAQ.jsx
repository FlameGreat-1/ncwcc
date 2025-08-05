import { useState, useEffect } from 'react';
import SEO from '../components/common/SEO.jsx';
import { 
  faqData, 
  getFAQCategories, 
  getFAQByCategory, 
  searchFAQs, 
  getTotalFAQs 
} from '../data/faq.js';
import { COMPANY_INFO } from '../utils/constants.js';
import Button from '../components/common/Button.jsx';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredFAQs, setFilteredFAQs] = useState(faqData);
  const [openItems, setOpenItems] = useState(new Set());

  const categories = getFAQCategories();
  const totalFAQs = getTotalFAQs();

  useEffect(() => {
    filterFAQs();
  }, [searchTerm, selectedCategory]);

  const filterFAQs = () => {
    let filtered = faqData;

    if (searchTerm.trim()) {
      filtered = searchFAQs(searchTerm);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(faq => 
        faq.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredFAQs(filtered);
    setOpenItems(new Set());
  };

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  const handleContact = () => {
    window.location.href = '/contact';
  };

  const handleCallNow = () => {
    window.location.href = `tel:${COMPANY_INFO.phone}`;
  };

  const handleGetQuote = () => {
    window.location.href = '/quote';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'General': 'bg-blue-100 text-blue-800',
      'Pricing': 'bg-green-100 text-green-800',
      'NDIS': 'bg-purple-100 text-purple-800',
      'Services': 'bg-orange-100 text-orange-800',
      'Booking': 'bg-indigo-100 text-indigo-800',
      'Bond Cleaning': 'bg-red-100 text-red-800',
      'Payment': 'bg-yellow-100 text-yellow-800',
      'Insurance': 'bg-gray-100 text-gray-800',
      'Quality': 'bg-pink-100 text-pink-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      <SEO
        title="Frequently Asked Questions - Cleaning Services FAQ"
        description="Find answers to common questions about our professional cleaning services, NDIS support, pricing, booking process, and service areas across NSW."
        keywords="cleaning services FAQ, NDIS cleaning questions, cleaning service answers, NSW cleaning FAQ, professional cleaning questions"
      />

      <main className="pt-20">
        <section className="section-padding bg-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Find answers to common questions about our professional cleaning services
              </p>
              
              <div className="bg-[#00FF66]/10 rounded-lg p-4 inline-block">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-[#00cc52]">{totalFAQs} questions</span> answered to help you make informed decisions
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-gray-50">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-md mb-12">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Search questions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FF66] focus:border-transparent"
                    />
                  </div>
                  
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FF66] focus:border-transparent bg-white"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category.toLowerCase()}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {(searchTerm || selectedCategory !== 'all') && (
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      Showing {filteredFAQs.length} of {totalFAQs} questions
                      {searchTerm && ` for "${searchTerm}"`}
                      {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                    </p>
                    <button
                      onClick={handleClearSearch}
                      className="text-sm text-[#00FF66] hover:text-[#00cc52] font-medium"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>

              {filteredFAQs.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center shadow-md">
                  <div className="text-6xl mb-6">🔍</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">No questions found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search terms or browse all categories
                  </p>
                  <Button onClick={handleClearSearch} variant="primary">
                    View All Questions
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFAQs.map((faq) => (
                    <div key={faq.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(faq.category)}`}>
                                {faq.category}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 pr-4">
                              {faq.question}
                            </h3>
                          </div>
                          <div className={`transform transition-transform duration-200 ${
                            openItems.has(faq.id) ? 'rotate-180' : ''
                          }`}>
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </button>
                      
                      {openItems.has(faq.id) && (
                        <div className="px-6 pb-6">
                          <div className="border-t border-gray-100 pt-4">
                            <p className="text-gray-700 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-[#00FF66]/10 to-blue-50 rounded-2xl p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                  Still Have Questions?
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Can't find the answer you're looking for? Our friendly team is here to help you with any questions about our cleaning services.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={handleCallNow}
                    variant="primary"
                    size="lg"
                  >
                    Call {COMPANY_INFO.phone}
                  </Button>
                  
                  <Button
                    onClick={handleContact}
                    variant="secondary"
                    size="lg"
                  >
                    Send Message
                  </Button>
                  
                  <Button
                    onClick={handleGetQuote}
                    variant="outline"
                    size="lg"
                  >
                    Get Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-gray-50">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                  Quick Help Topics
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                  <div className="text-4xl mb-4">💰</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Pricing & Quotes</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Learn about our transparent pricing structure and how to get accurate quotes
                  </p>
                  <button
                    onClick={() => setSelectedCategory('pricing')}
                    className="text-[#00FF66] hover:text-[#00cc52] font-medium text-sm"
                  >
                    View Pricing FAQs
                  </button>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                  <div className="text-4xl mb-4">🏥</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">NDIS Services</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Everything you need to know about our NDIS cleaning support services
                  </p>
                  <button
                    onClick={() => setSelectedCategory('ndis')}
                    className="text-[#00FF66] hover:text-[#00cc52] font-medium text-sm"
                  >
                    View NDIS FAQs
                  </button>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                  <div className="text-4xl mb-4">📅</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Booking & Scheduling</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Find out how to book services and manage your cleaning schedule
                  </p>
                  <button
                    onClick={() => setSelectedCategory('booking')}
                    className="text-[#00FF66] hover:text-[#00cc52] font-medium text-sm"
                  >
                    View Booking FAQs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default FAQ;

