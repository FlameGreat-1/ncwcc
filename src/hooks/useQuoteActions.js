import { useState, useCallback } from 'react';
import quotesService from '../services/quotesService.js';

const useQuoteActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeAction = useCallback(async (action, ...args) => {
    setLoading(true);
    setError(null);

    try {
      const result = await action(...args);
      return result;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Action failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const createQuote = useCallback(async (quoteData) => {
    return executeAction(quotesService.createQuote, quoteData);
  }, [executeAction]);

  const updateQuote = useCallback(async (quoteId, updateData) => {
    return executeAction(quotesService.updateQuote, quoteId, updateData);
  }, [executeAction]);

  const submitQuote = useCallback(async (quoteId) => {
    return executeAction(quotesService.submitQuote, quoteId);
  }, [executeAction]);

  const cancelQuote = useCallback(async (quoteId) => {
    return executeAction(quotesService.cancelQuote, quoteId);
  }, [executeAction]);

  const duplicateQuote = useCallback(async (quoteId, modifications = {}) => {
    return executeAction(quotesService.duplicateQuote, quoteId, modifications);
  }, [executeAction]);

  const downloadPDF = useCallback(async (quoteId, filename) => {
    try {
      const success = await quotesService.downloadQuotePDFWithFilename(quoteId, filename || `quote-${quoteId}.pdf`);
      if (!success) {
        throw new Error('Download failed');
      }
      return true;
    } catch (err) {
      setError('Failed to download PDF');
      throw err;
    }
  }, []);

  const calculateQuote = useCallback(async (calculationData) => {
    return executeAction(quotesService.calculateQuote, calculationData);
  }, [executeAction]);

  const uploadAttachment = useCallback(async (quoteId, file, attachmentType = 'image', title = '', description = '') => {
    return executeAction(quotesService.uploadQuoteAttachment, {
      quote: quoteId,
      file,
      attachment_type: attachmentType,
      title,
      description,
      is_public: true
    });
  }, [executeAction]);

  const deleteAttachment = useCallback(async (attachmentId) => {
    return executeAction(quotesService.deleteQuoteAttachment, attachmentId);
  }, [executeAction]);

  const downloadAttachment = useCallback(async (attachmentId, filename) => {
    try {
      const success = await quotesService.downloadAttachmentWithFilename(attachmentId, filename);
      if (!success) {
        throw new Error('Download failed');
      }
      return true;
    } catch (err) {
      setError('Failed to download attachment');
      throw err;
    }
  }, []);

  const createQuoteItem = useCallback(async (quoteId, itemData) => {
    return executeAction(quotesService.createQuoteItem, {
      quote: quoteId,
      ...itemData
    });
  }, [executeAction]);

  const updateQuoteItem = useCallback(async (itemId, itemData) => {
    return executeAction(quotesService.updateQuoteItem, itemId, itemData);
  }, [executeAction]);

  const deleteQuoteItem = useCallback(async (itemId) => {
    return executeAction(quotesService.deleteQuoteItem, itemId);
  }, [executeAction]);

  const getServices = useCallback(async (params = {}) => {
    return executeAction(quotesService.getServices, params);
  }, [executeAction]);

  const getService = useCallback(async (serviceId) => {
    return executeAction(quotesService.getService, serviceId);
  }, [executeAction]);

  const getServiceAddons = useCallback(async (serviceId, params = {}) => {
    return executeAction(quotesService.getServiceAddons, serviceId, params);
  }, [executeAction]);

  const searchQuotes = useCallback(async (searchTerm, filters = {}) => {
    return executeAction(quotesService.searchQuotes, searchTerm, filters);
  }, [executeAction]);

  const getQuotesByStatus = useCallback(async (status, params = {}) => {
    return executeAction(quotesService.getQuotesByStatus, status, params);
  }, [executeAction]);

  const validateQuoteData = useCallback((quoteData) => {
    const errors = {};
    
    if (!quoteData.service) {
      errors.service = 'Service is required';
    }
    
    if (!quoteData.cleaning_type) {
      errors.cleaning_type = 'Cleaning type is required';
    }
    
    if (!quoteData.property_address) {
      errors.property_address = 'Property address is required';
    }
    
    if (!quoteData.postcode) {
      errors.postcode = 'Postcode is required';
    }
    
    if (!quoteData.suburb) {
      errors.suburb = 'Suburb is required';
    }
    
    if (!quoteData.state) {
      errors.state = 'State is required';
    }
    
    if (!quoteData.number_of_rooms || quoteData.number_of_rooms < 1) {
      errors.number_of_rooms = 'Number of rooms must be at least 1';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    clearError,
    createQuote,
    updateQuote,
    submitQuote,
    cancelQuote,
    duplicateQuote,
    downloadPDF,
    calculateQuote,
    uploadAttachment,
    deleteAttachment,
    downloadAttachment,
    createQuoteItem,
    updateQuoteItem,
    deleteQuoteItem,
    getServices,
    getService,
    getServiceAddons,
    searchQuotes,
    getQuotesByStatus,
    validateQuoteData
  };
};

export default useQuoteActions;
