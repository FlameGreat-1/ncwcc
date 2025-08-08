import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import QuoteForm from '../../components/quotes/QuoteForm.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import SEO from '../../components/common/SEO.jsx';
import quotesService from '../../services/quotesService.js';

const EditQuote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    fetchQuote();
  }, [id]);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await quotesService.getQuote(id);
      setQuote(response);
      
      const editableStatuses = ['draft', 'rejected'];
      const userCanEdit = editableStatuses.includes(response.status) && 
                         (user?.id === response.client || user?.is_staff);
      
      setCanEdit(userCanEdit);
      
      if (!userCanEdit) {
        setError('You do not have permission to edit this quote or it cannot be edited in its current status.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load quote for editing');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSuccess = (updatedQuote) => {
    navigate(`/quotes/${updatedQuote.id}`, {
      state: { message: 'Quote updated successfully!' }
    });
  };

  const handleCancel = () => {
    navigate(`/quotes/${id}`);
  };

  const prepareFormData = (quote) => {
    return {
      service: quote.service?.toString() || '',
      cleaning_type: quote.cleaning_type || 'general',
      property_address: quote.property_address || '',
      suburb: quote.suburb || '',
      postcode: quote.postcode || '',
      state: quote.state || 'NSW',
      number_of_rooms: quote.number_of_rooms || 1,
      square_meters: quote.square_meters || '',
      urgency_level: quote.urgency_level || 2,
      preferred_date: quote.preferred_date || '',
      preferred_time: quote.preferred_time || '',
      special_requirements: quote.special_requirements || '',
      access_instructions: quote.access_instructions || '',
      is_ndis_client: quote.is_ndis_client || false,
      ndis_participant_number: quote.ndis_participant_number || '',
      plan_manager_name: quote.plan_manager_name || '',
      plan_manager_contact: quote.plan_manager_contact || '',
      support_coordinator_name: quote.support_coordinator_name || '',
      support_coordinator_contact: quote.support_coordinator_contact || ''
    };
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-96">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card-modern text-center py-12">
          <div className="text-red-600 dark:text-red-400 mb-4">
            <h3 className="text-lg font-semibold mb-2">Cannot Edit Quote</h3>
            <p className="app-text-muted">{error || 'Quote not found or cannot be edited.'}</p>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/quotes')}
              className="btn-modern-secondary btn-md"
            >
              Back to Quotes
            </button>
            {quote && (
              <button
                onClick={() => navigate(`/quotes/${quote.id}`)}
                className="btn-modern-primary btn-md"
              >
                View Quote
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!canEdit) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card-modern text-center py-12">
          <div className="text-yellow-600 dark:text-yellow-400 mb-4">
            <h3 className="text-lg font-semibold mb-2">Quote Cannot Be Edited</h3>
            <p className="app-text-muted">
              This quote is in "{quote.status.replace('_', ' ')}" status and cannot be modified.
              Only draft and rejected quotes can be edited.
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/quotes')}
              className="btn-modern-secondary btn-md"
            >
              Back to Quotes
            </button>
            <button
              onClick={() => navigate(`/quotes/${quote.id}`)}
              className="btn-modern-primary btn-md"
            >
              View Quote Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`Edit Quote ${quote.quote_number}`}
        description={`Edit quote ${quote.quote_number} for ${quote.cleaning_type} cleaning service`}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={handleCancel}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← Back to Quote
            </button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-gradient mb-4">
              Edit Quote {quote.quote_number}
            </h1>
            <p className="text-lg app-text-muted max-w-2xl mx-auto">
              Update your quote details below. Changes will be saved as a new revision.
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 max-w-2xl mx-auto mb-8">
            <div className="flex items-start gap-3">
              <div className="text-blue-600 text-xl">ℹ️</div>
              <div>
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
                  Editing Quote in {quote.status.replace('_', ' ').toUpperCase()} Status
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-300">
                  {quote.status === 'draft' 
                    ? 'You can modify all fields since this quote is still in draft status.'
                    : 'This quote was rejected and can now be edited and resubmitted.'
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <div className="card-modern text-center">
              <h3 className="font-semibold app-text-primary mb-2">Current Status</h3>
              <span className={`
                inline-block px-3 py-1 rounded-full text-sm font-medium
                ${quote.status === 'draft' ? 'bg-gray-100 text-gray-800' : 'bg-red-100 text-red-800'}
              `}>
                {quote.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            <div className="card-modern text-center">
              <h3 className="font-semibold app-text-primary mb-2">Service Type</h3>
              <p className="app-text-secondary text-sm">
                {quote.cleaning_type.replace('_', ' ').toUpperCase()}
              </p>
            </div>

            <div className="card-modern text-center">
              <h3 className="font-semibold app-text-primary mb-2">Current Total</h3>
              <p className="text-lg font-bold text-gradient">
                {new Intl.NumberFormat('en-AU', {
                  style: 'currency',
                  currency: 'AUD'
                }).format(quote.final_price)}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <QuoteForm
            mode="edit"
            initialData={prepareFormData(quote)}
            onSuccess={handleUpdateSuccess}
            onCancel={handleCancel}
            className="animate-fade-in-up"
          />
        </div>

        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gradient mb-2">
              Need to Start Over?
            </h3>
            <p className="app-text-muted text-sm mb-4">
              If you need to make major changes, you might want to create a new quote instead
            </p>
            <button
              onClick={() => navigate('/quotes/create', { 
                state: { duplicateFrom: quote.id } 
              })}
              className="btn-modern-secondary btn-sm"
            >
              Create New Quote
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditQuote;
