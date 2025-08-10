import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import quotesService from '../../services/quotesService.js';
import useQuoteActions from '../../hooks/useQuoteActions.js';
import QuoteStatusBadge from '../../components/quotes/QuoteStatusBadge.jsx';
import SEO from '../../components/common/SEO.jsx';

const QuoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullAddress, setShowFullAddress] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [quoteItems, setQuoteItems] = useState([]);
  const [quoteAttachments, setQuoteAttachments] = useState([]);
  const [quoteRevisions, setQuoteRevisions] = useState([]);

  const {
    submitQuote,
    cancelQuote,
    downloadPDF,
    duplicateQuote,
    loading: actionLoading,
    error: actionError
  } = useQuoteActions();

  const tabs = [
    { key: 'details', label: 'Quote Details' },
    { key: 'items', label: 'Items' },
    { key: 'attachments', label: 'Attachments' },
    { key: 'history', label: 'History' }
  ];

  useEffect(() => {
    fetchQuoteDetails();
  }, [id]);

  useEffect(() => {
    if (quote && activeTab !== 'details') {
      fetchTabData();
    }
  }, [activeTab, quote]);

  const fetchQuoteDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await quotesService.getQuote(id);
      setQuote(response);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load quote details');
    } finally {
      setLoading(false);
    }
  };

  const fetchTabData = async () => {
    if (!quote) return;

    try {
      switch (activeTab) {
        case 'items':
          const itemsResponse = await quotesService.getQuoteItems(quote.id);
          setQuoteItems(itemsResponse.results || itemsResponse);
          break;
        case 'attachments':
          const attachmentsResponse = await quotesService.getQuoteAttachments(quote.id);
          setQuoteAttachments(attachmentsResponse.results || attachmentsResponse);
          break;
        case 'history':
          const revisionsResponse = await quotesService.getQuoteRevisions(quote.id);
          setQuoteRevisions(revisionsResponse.results || revisionsResponse);
          break;
      }
    } catch (err) {
      console.error(`Failed to fetch ${activeTab} data:`, err);
    }
  };

  const handleAction = async (actionFn, successMessage) => {
    try {
      await actionFn(quote.id);
      await fetchQuoteDetails();
      console.log(successMessage);
    } catch (err) {
      console.error('Action failed:', err.message);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      await downloadPDF(quote.id, `quote-${quote.quote_number}.pdf`);
    } catch (err) {
      console.error('PDF download failed:', err.message);
    }
  };

  const handleDuplicate = async () => {
    try {
      const newQuote = await duplicateQuote(quote.id, { status: 'draft' });
      navigate(`/quotes/${newQuote.id}`);
    } catch (err) {
      console.error('Duplicate failed:', err.message);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateOnly = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getUrgencyConfig = (level) => {
    const configs = {
      1: { color: 'text-green-600', label: 'Flexible', bg: 'bg-green-100' },
      2: { color: 'app-blue', label: 'Standard', bg: 'bg-blue-100' },
      3: { color: 'text-yellow-600', label: 'Priority', bg: 'bg-yellow-100' },
      4: { color: 'text-orange-600', label: 'Urgent', bg: 'bg-orange-100' },
      5: { color: 'text-red-600', label: 'Emergency', bg: 'bg-red-100' }
    };
    return configs[level] || configs[2];
  };

  const canEdit = () => {
    return quote && ['draft', 'rejected'].includes(quote.status) && 
           (user?.id === quote.client || user?.is_staff);
  };

  const canSubmit = () => {
    return quote && quote.status === 'draft' && user?.id === quote.client;
  };

  const canCancel = () => {
    return quote && ['draft', 'submitted'].includes(quote.status) && 
           (user?.id === quote.client || user?.is_staff);
  };

  const canDownloadPDF = () => {
    return quote && quote.status === 'approved';
  };

  const isExpired = quote?.expires_at && new Date(quote.expires_at) < new Date();
  const urgencyConfig = quote ? getUrgencyConfig(quote.urgency_level) : null;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center min-h-96">
          <div className="w-8 h-8 border-4 app-border rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="theme-card text-center py-12">
          <div className="text-red-600 mb-4">
            <h3 className="text-lg font-semibold mb-2">Quote Not Found</h3>
            <p className="app-text-muted">{error || 'The requested quote could not be found.'}</p>
          </div>
          <div className="flex gap-4 justify-center">
            <Link to="/quotes" className="px-6 py-3 bg-transparent border-2 app-border-blue app-text-primary rounded-full font-medium transition-all hover:app-bg-blue hover:text-white">
              Back to Quotes
            </Link>
            <button onClick={fetchQuoteDetails} className="theme-button">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`Quote ${quote.quote_number}`}
        description={`Quote details for ${quote.cleaning_type} cleaning service`}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              to="/quotes" 
              className="app-blue hover:text-blue-800 transition-colors"
            >
              ← Back to Quotes
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-3xl font-black app-text-primary">
                  {quote.quote_number}
                </h1>
                <QuoteStatusBadge status={quote.status} size="lg" />
                {isExpired && (
                  <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full">
                    Expired
                  </span>
                )}
              </div>
              <p className="app-text-secondary text-lg font-medium">
                {quote.cleaning_type.replace('_', ' ').toUpperCase()} Cleaning
              </p>
              {quote.is_ndis_client && (
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mt-2">
                  NDIS Client
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              {canEdit() && (
                <Link
                  to={`/quotes/${quote.id}/edit`}
                  className="px-6 py-3 bg-transparent border-2 app-border-blue app-text-primary rounded-full font-medium transition-all hover:app-bg-blue hover:text-white"
                >
                  Edit Quote
                </Link>
              )}

              {canSubmit() && (
                <button
                  onClick={() => handleAction(submitQuote, 'Quote submitted successfully')}
                  disabled={actionLoading}
                  className="theme-button"
                >
                  {actionLoading ? (
                    <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                  ) : 'Submit Quote'}
                </button>
              )}

              {canDownloadPDF() && (
                <button
                  onClick={handleDownloadPDF}
                  disabled={actionLoading}
                  className="theme-button"
                >
                  {actionLoading ? (
                    <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                  ) : 'Download PDF'}
                </button>
              )}

              <button
                onClick={handleDuplicate}
                disabled={actionLoading}
                className="px-6 py-3 bg-transparent border-2 app-border-blue app-text-primary rounded-full font-medium transition-all hover:app-bg-blue hover:text-white"
              >
                {actionLoading ? (
                  <div className="w-4 h-4 border-2 app-border rounded-full border-t-transparent animate-spin"></div>
                ) : 'Duplicate'}
              </button>

              {canCancel() && (
                <button
                  onClick={() => handleAction(cancelQuote, 'Quote cancelled successfully')}
                  disabled={actionLoading}
                  className="bg-red-100 text-red-800 hover:bg-red-200 rounded-full px-4 py-2 text-sm font-medium transition-all"
                >
                  {actionLoading ? (
                    <div className="w-4 h-4 border-2 border-red-800 rounded-full border-t-transparent animate-spin"></div>
                  ) : 'Cancel Quote'}
                </button>
              )}
            </div>
          </div>

          {actionError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <p className="text-sm">{actionError}</p>
            </div>
          )}

          <div className="theme-card mb-6">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${activeTab === tab.key
                      ? 'app-bg-blue text-white'
                      : 'app-bg-secondary app-text-primary hover:app-bg-blue hover:text-white'
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>
        {activeTab === 'details' && (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="theme-card">
                  <h3 className="text-xl font-bold app-text-primary mb-4">Property Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold app-text-secondary mb-1">
                        Property Address
                      </label>
                      <div className="app-text-primary">
                        {showFullAddress ? (
                          <div>
                            <p>{quote.property_address}</p>
                            <p>{quote.suburb}, {quote.state} {quote.postcode}</p>
                            <button
                              onClick={() => setShowFullAddress(false)}
                              className="app-blue text-sm hover:underline mt-1"
                            >
                              Show less
                            </button>
                          </div>
                        ) : (
                          <div>
                            <p>{quote.property_address.length > 50 
                              ? `${quote.property_address.substring(0, 50)}...` 
                              : quote.property_address}
                            </p>
                            <p>{quote.suburb}, {quote.state} {quote.postcode}</p>
                            {quote.property_address.length > 50 && (
                              <button
                                onClick={() => setShowFullAddress(true)}
                                className="app-blue text-sm hover:underline mt-1"
                              >
                                Show more
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold app-text-secondary mb-1">
                          Number of Rooms
                        </label>
                        <p className="app-text-primary font-medium">{quote.number_of_rooms}</p>
                      </div>

                      {quote.square_meters && (
                        <div>
                          <label className="block text-sm font-semibold app-text-secondary mb-1">
                            Square Meters
                          </label>
                          <p className="app-text-primary font-medium">{quote.square_meters}m²</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold app-text-secondary mb-1">
                        Urgency Level
                      </label>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${urgencyConfig.bg} ${urgencyConfig.color}`}>
                        {urgencyConfig.label}
                      </span>
                    </div>

                    {(quote.preferred_date || quote.preferred_time) && (
                      <div className="grid md:grid-cols-2 gap-4">
                        {quote.preferred_date && (
                          <div>
                            <label className="block text-sm font-semibold app-text-secondary mb-1">
                              Preferred Date
                            </label>
                            <p className="app-text-primary font-medium">{formatDateOnly(quote.preferred_date)}</p>
                          </div>
                        )}

                        {quote.preferred_time && (
                          <div>
                            <label className="block text-sm font-semibold app-text-secondary mb-1">
                              Preferred Time
                            </label>
                            <p className="app-text-primary font-medium">{quote.preferred_time}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {(quote.special_requirements || quote.access_instructions) && (
                  <div className="theme-card">
                    <h3 className="text-xl font-bold app-text-primary mb-4">Additional Information</h3>
                    <div className="space-y-4">
                      {quote.special_requirements && (
                        <div>
                          <label className="block text-sm font-semibold app-text-secondary mb-2">
                            Special Requirements
                          </label>
                          <p className="app-text-primary app-bg-secondary p-3 rounded-lg">
                            {quote.special_requirements}
                          </p>
                        </div>
                      )}

                      {quote.access_instructions && (
                        <div>
                          <label className="block text-sm font-semibold app-text-secondary mb-2">
                            Access Instructions
                          </label>
                          <p className="app-text-primary app-bg-secondary p-3 rounded-lg">
                            {quote.access_instructions}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {quote.is_ndis_client && (
                  <div className="theme-card">
                    <h3 className="text-xl font-bold app-text-primary mb-4">NDIS Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold app-text-secondary mb-1">
                          Participant Number
                        </label>
                        <p className="app-text-primary font-medium">{quote.ndis_participant_number}</p>
                      </div>

                      {(quote.plan_manager_name || quote.support_coordinator_name) && (
                        <div className="grid md:grid-cols-2 gap-4">
                          {quote.plan_manager_name && (
                            <div>
                              <label className="block text-sm font-semibold app-text-secondary mb-1">
                                Plan Manager
                              </label>
                              <p className="app-text-primary">{quote.plan_manager_name}</p>
                              {quote.plan_manager_contact && (
                                <p className="app-text-muted text-sm">{quote.plan_manager_contact}</p>
                              )}
                            </div>
                          )}

                          {quote.support_coordinator_name && (
                            <div>
                              <label className="block text-sm font-semibold app-text-secondary mb-1">
                                Support Coordinator
                              </label>
                              <p className="app-text-primary">{quote.support_coordinator_name}</p>
                              {quote.support_coordinator_contact && (
                                <p className="app-text-muted text-sm">{quote.support_coordinator_contact}</p>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="theme-card">
                  <h3 className="text-xl font-bold app-text-primary mb-4">Pricing Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="app-text-secondary">Base Price:</span>
                      <span className="font-medium">{formatCurrency(quote.base_price)}</span>
                    </div>

                    {quote.extras_cost > 0 && (
                      <div className="flex justify-between">
                        <span className="app-text-secondary">Extras:</span>
                        <span className="font-medium">{formatCurrency(quote.extras_cost)}</span>
                      </div>
                    )}

                    {quote.travel_cost > 0 && (
                      <div className="flex justify-between">
                        <span className="app-text-secondary">Travel Cost:</span>
                        <span className="font-medium">{formatCurrency(quote.travel_cost)}</span>
                      </div>
                    )}

                    {quote.urgency_surcharge > 0 && (
                      <div className="flex justify-between">
                        <span className="app-text-secondary">Urgency Surcharge:</span>
                        <span className="font-medium">{formatCurrency(quote.urgency_surcharge)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="app-text-secondary">GST:</span>
                      <span className="font-medium">{formatCurrency(quote.gst_amount)}</span>
                    </div>

                    <hr className="app-border" />
                    
                    <div className="flex justify-between text-lg font-bold">
                      <span className="app-text-primary">Total:</span>
                      <span className="app-text-primary">{formatCurrency(quote.final_price)}</span>
                    </div>
                  </div>
                </div>

                <div className="theme-card">
                  <h3 className="text-xl font-bold app-text-primary mb-4">Quote Timeline</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="app-text-secondary">Created:</span>
                      <span className="font-medium">{formatDate(quote.created_at)}</span>
                    </div>

                    {quote.submitted_at && (
                      <div className="flex justify-between">
                        <span className="app-text-secondary">Submitted:</span>
                        <span className="font-medium">{formatDate(quote.submitted_at)}</span>
                      </div>
                    )}

                    {quote.approved_at && (
                      <div className="flex justify-between">
                        <span className="app-text-secondary">Approved:</span>
                        <span className="font-medium">{formatDate(quote.approved_at)}</span>
                      </div>
                    )}

                    {quote.expires_at && (
                      <div className="flex justify-between">
                        <span className="app-text-secondary">Expires:</span>
                        <span className={`font-medium ${isExpired ? 'text-red-600' : ''}`}>
                          {formatDate(quote.expires_at)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="app-text-secondary">Last Updated:</span>
                      <span className="font-medium">{formatDate(quote.updated_at)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'items' && (
            <div className="theme-card">
              <h3 className="text-xl font-bold app-text-primary mb-4">Quote Items</h3>
              {quoteItems.length === 0 ? (
                <p className="app-text-muted text-center py-8">No items found for this quote.</p>
              ) : (
                <div className="space-y-4">
                  {quoteItems.map((item, index) => (
                    <div key={item.id || index} className="border app-border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold app-text-primary">{item.description}</h4>
                          <p className="app-text-muted text-sm">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(item.unit_price)}</p>
                          <p className="text-sm app-text-muted">per unit</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'attachments' && (
            <div className="theme-card">
              <h3 className="text-xl font-bold app-text-primary mb-4">Attachments</h3>
              {quoteAttachments.length === 0 ? (
                <p className="app-text-muted text-center py-8">No attachments found for this quote.</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {quoteAttachments.map((attachment, index) => (
                    <div key={attachment.id || index} className="border app-border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold app-text-primary">{attachment.title || 'Attachment'}</h4>
                          <p className="app-text-muted text-sm">{attachment.file_type}</p>
                        </div>
                        <button
                          onClick={() => window.open(attachment.file_url, '_blank')}
                          className="px-4 py-2 bg-transparent border-2 app-border-blue app-text-primary rounded-full font-medium transition-all hover:app-bg-blue hover:text-white"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="theme-card">
              <h3 className="text-xl font-bold app-text-primary mb-4">Quote History</h3>
              {quoteRevisions.length === 0 ? (
                <p className="app-text-muted text-center py-8">No revision history found for this quote.</p>
              ) : (
                <div className="space-y-4">
                  {quoteRevisions.map((revision, index) => (
                    <div key={revision.id || index} className="border app-border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold app-text-primary">Revision {revision.version}</h4>
                        <span className="text-sm app-text-muted">{formatDate(revision.created_at)}</span>
                      </div>
                      <p className="app-text-secondary text-sm">{revision.changes_summary}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QuoteDetail;


