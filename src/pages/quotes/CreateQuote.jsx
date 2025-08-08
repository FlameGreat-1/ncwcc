import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import QuoteForm from '../../components/quotes/QuoteForm.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import SEO from '../../components/common/SEO.jsx';
import quotesService from '../../services/quotesService.js';

const CreateQuote = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [services, setServices] = useState([]);
  const [initialFormData, setInitialFormData] = useState(null);

  useEffect(() => {
    initializePage();
  }, []);

  useEffect(() => {
    const templateId = searchParams.get('template');
    const serviceId = searchParams.get('service');
    const clientId = searchParams.get('client');
    
    if (templateId) {
      loadTemplate(templateId);
    } else if (serviceId || clientId) {
      setInitialFormData({
        service: serviceId || '',
        client: clientId || ''
      });
    }
  }, [searchParams]);

  const initializePage = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadServices(),
        loadTemplates()
      ]);
    } catch (err) {
      setError('Failed to initialize page data');
      console.error('Initialization error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadServices = async () => {
    try {
      const response = await fetch('/api/v1/services/');
      const data = await response.json();
      setServices(data.results || data);
    } catch (err) {
      console.error('Failed to load services:', err);
    }
  };

  const loadTemplates = async () => {
    try {
      const response = await quotesService.getQuoteTemplates({ limit: 10 });
      setTemplates(response.results || response);
      setShowTemplates((response.results || response).length > 0);
    } catch (err) {
      console.error('Failed to load templates:', err);
    }
  };

  const loadTemplate = async (templateId) => {
    setLoading(true);
    try {
      const template = await quotesService.getQuoteTemplate(templateId);
      setSelectedTemplate(template);
      setInitialFormData({
        service: template.service || '',
        cleaning_type: template.cleaning_type || 'general',
        number_of_rooms: template.number_of_rooms || 1,
        square_meters: template.square_meters || '',
        urgency_level: template.urgency_level || 2,
        special_requirements: template.special_requirements || '',
        access_instructions: template.access_instructions || '',
        is_ndis_client: template.is_ndis_client || false
      });
    } catch (err) {
      setError('Failed to load template');
      console.error('Template loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUseTemplate = async (templateId) => {
    await loadTemplate(templateId);
    setShowTemplates(false);
  };

  const handleQuoteSuccess = (newQuote) => {
    navigate(`/quotes/${newQuote.id}`, {
      state: { message: 'Quote created successfully!' }
    });
  };

  const handleCancel = () => {
    navigate('/quotes');
  };

  const clearTemplate = () => {
    setSelectedTemplate(null);
    setInitialFormData(null);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('template');
    navigate(`${window.location.pathname}?${newSearchParams}`, { replace: true });
  };

  const getQuickStartOptions = () => [
    {
      title: 'General Cleaning',
      description: 'Standard house cleaning service',
      data: {
        cleaning_type: 'general',
        urgency_level: 2
      }
    },
    {
      title: 'Deep Cleaning',
      description: 'Comprehensive deep cleaning service',
      data: {
        cleaning_type: 'deep',
        urgency_level: 2
      }
    },
    {
      title: 'End of Lease',
      description: 'Move-out cleaning service',
      data: {
        cleaning_type: 'end_of_lease',
        urgency_level: 3
      }
    },
    {
      title: 'NDIS Cleaning',
      description: 'NDIS participant cleaning service',
      data: {
        cleaning_type: 'ndis',
        is_ndis_client: true,
        urgency_level: 2
      }
    }
  ];

  const handleQuickStart = (optionData) => {
    setInitialFormData({
      ...initialFormData,
      ...optionData
    });
    setShowTemplates(false);
  };

  if (loading && !initialFormData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-96">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Create New Quote" 
        description="Create a new cleaning service quote with our easy-to-use form"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={handleCancel}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← Back to Quotes
            </button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-gradient mb-4">Create New Quote</h1>
            <p className="text-lg app-text-muted max-w-2xl mx-auto">
              Get started by choosing a template, using quick start options, or creating a quote from scratch
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 max-w-2xl mx-auto">
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {showTemplates && templates.length > 0 && !selectedTemplate && (
            <div className="mb-8">
              <div className="card-modern max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gradient">Quick Start Options</h2>
                  <button
                    onClick={() => setShowTemplates(false)}
                    className="text-gray-500 hover:text-gray-700 text-sm"
                  >
                    Skip and create from scratch
                  </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {getQuickStartOptions().map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickStart(option.data)}
                      className="text-left p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 group"
                    >
                      <h3 className="font-semibold app-text-primary group-hover:text-blue-600 mb-2">
                        {option.title}
                      </h3>
                      <p className="text-sm app-text-muted">
                        {option.description}
                      </p>
                    </button>
                  ))}
                </div>

                {templates.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold app-text-primary mb-4">
                      Or choose from your saved templates
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {templates.map((template) => (
                        <div
                          key={template.id}
                          className="border app-border rounded-lg p-4 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold app-text-primary mb-1">
                                {template.name}
                              </h4>
                              <p className="text-sm app-text-muted">
                                {template.cleaning_type.replace('_', ' ').toUpperCase()}
                              </p>
                            </div>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {template.number_of_rooms} rooms
                            </span>
                          </div>

                          {template.description && (
                            <p className="text-sm app-text-secondary mb-3 line-clamp-2">
                              {template.description}
                            </p>
                          )}

                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUseTemplate(template.id)}
                              className="btn-modern-primary btn-sm flex-1"
                            >
                              Use Template
                            </button>
                            <button
                              onClick={() => {
                                navigate(`/templates/${template.id}`);
                              }}
                              className="btn-modern-secondary btn-sm"
                            >
                              View
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {selectedTemplate && (
            <div className="mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 max-w-2xl mx-auto">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
                      Using Template: {selectedTemplate.name}
                    </h3>
                    <p className="text-sm text-blue-600 dark:text-blue-300">
                      Pre-filled with template data. You can modify any field below.
                    </p>
                  </div>
                  <button
                    onClick={clearTemplate}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Clear Template
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto">
          <QuoteForm
            mode="create"
            initialData={initialFormData}
            onSuccess={handleQuoteSuccess}
            onCancel={handleCancel}
            className="animate-fade-in-up"
          />
        </div>

        <div className="max-w-4xl mx-auto mt-8">
          <div className="card-modern">
            <h3 className="text-lg font-semibold app-text-primary mb-4">Need Help?</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium app-text-primary mb-2">Pricing Calculator</h4>
                <p className="app-text-muted mb-3">
                  Get instant pricing estimates before creating your quote
                </p>
                <a
                  href="/calculator"
                  className="btn-modern-secondary btn-sm"
                >
                  Open Calculator
                </a>
              </div>

              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium app-text-primary mb-2">Service Guide</h4>
                <p className="app-text-muted mb-3">
                  Learn about different cleaning services and requirements
                </p>
                <a
                  href="/services"
                  className="btn-modern-secondary btn-sm"
                >
                  View Services
                </a>
              </div>

              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium app-text-primary mb-2">Contact Support</h4>
                <p className="app-text-muted mb-3">
                  Get help from our team if you have questions
                </p>
                <a
                  href="/contact"
                  className="btn-modern-secondary btn-sm"
                >
                  Get Help
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gradient mb-2">
              Save Time with Templates
            </h3>
            <p className="app-text-muted text-sm mb-4">
              Create templates from your frequently used quote configurations to speed up future quote creation
            </p>
            <a
              href="/templates"
              className="btn-modern-secondary btn-sm"
            >
              Manage Templates
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateQuote;


