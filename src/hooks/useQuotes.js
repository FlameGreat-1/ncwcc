import { useState, useEffect, useCallback, useRef } from 'react';
import quotesService from '../services/quotesService.js';

const useQuotes = (type = 'my', params = {}, autoFetch = true) => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
    page: 1,
    totalPages: 1
  });

  const isRequestInProgress = useRef(false);
  const hasInitialized = useRef(false);
  const stableParams = useRef(params);
  const stableType = useRef(type);
  
  useEffect(() => {
    stableParams.current = params;
    stableType.current = type;
  }, [params, type]);

  const serviceMap = {
    my: quotesService.getMyQuotes,
    draft: quotesService.getDraftQuotes,
    submitted: quotesService.getSubmittedQuotes,
    approved: quotesService.getApprovedQuotes,
    rejected: quotesService.getRejectedQuotes,
    ndis: quotesService.getNDISQuotes
  };

  const fetchQuotes = useCallback(async (fetchParams = {}) => {
    const currentType = stableType.current;
    
    if (!serviceMap[currentType]) {
      setError('Invalid quote type');
      return;
    }

    if (isRequestInProgress.current) {
      console.log('🔍 Request already in progress, skipping...');
      return;
    }

    isRequestInProgress.current = true;
    setLoading(true);
    setError(null);

    try {
      const mergedParams = { ...stableParams.current, ...fetchParams };
      console.log('🔍 Making API request with params:', mergedParams);
      
      const response = await serviceMap[currentType](mergedParams);
      
      if (response.results) {
        setQuotes(response.results);
        setPagination({
          count: response.count,
          next: response.next,
          previous: response.previous,
          page: Math.ceil((mergedParams.offset || 0) / (mergedParams.limit || 20)) + 1,
          totalPages: Math.ceil(response.count / (mergedParams.limit || 20))
        });
      } else {
        setQuotes(Array.isArray(response) ? response : []);
        setPagination({
          count: Array.isArray(response) ? response.length : 0,
          next: null,
          previous: null,
          page: 1,
          totalPages: 1
        });
      }
    } catch (err) {
      console.error('🔍 API request failed:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch quotes');
      setQuotes([]);
    } finally {
      setLoading(false);
      isRequestInProgress.current = false;
    }
  }, []); 

  const refetch = useCallback((newParams = {}) => {
    return fetchQuotes(newParams);
  }, [fetchQuotes]);

  const loadMore = useCallback(() => {
    if (pagination.next && !loading && !isRequestInProgress.current) {
      const currentOffset = (pagination.page - 1) * (stableParams.current.limit || 20);
      const nextOffset = currentOffset + (stableParams.current.limit || 20);
      return fetchQuotes({ ...stableParams.current, offset: nextOffset });
    }
  }, [pagination, loading, fetchQuotes]);

  const goToPage = useCallback((page) => {
    if (!isRequestInProgress.current) {
      const offset = (page - 1) * (stableParams.current.limit || 20);
      return fetchQuotes({ ...stableParams.current, offset });
    }
  }, [fetchQuotes]);

  const updateQuoteInList = useCallback((updatedQuote) => {
    setQuotes(prevQuotes => 
      prevQuotes.map(quote => 
        quote.id === updatedQuote.id ? { ...quote, ...updatedQuote } : quote
      )
    );
  }, []);

  const removeQuoteFromList = useCallback((quoteId) => {
    setQuotes(prevQuotes => prevQuotes.filter(quote => quote.id !== quoteId));
    setPagination(prev => ({ ...prev, count: prev.count - 1 }));
  }, []);

  const addQuoteToList = useCallback((newQuote) => {
    setQuotes(prevQuotes => [newQuote, ...prevQuotes]);
    setPagination(prev => ({ ...prev, count: prev.count + 1 }));
  }, []);

  const searchQuotes = useCallback(async (searchTerm, filters = {}) => {
    if (isRequestInProgress.current) return;
    
    setLoading(true);
    setError(null);
    isRequestInProgress.current = true;
    
    try {
      const response = await quotesService.searchQuotes(searchTerm, filters);
      setQuotes(Array.isArray(response) ? response : response.results || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Search failed');
    } finally {
      setLoading(false);
      isRequestInProgress.current = false;
    }
  }, []);

  const filterByStatus = useCallback((status) => {
    return fetchQuotes({ status });
  }, [fetchQuotes]);

  const filterByCleaningType = useCallback((cleaningType) => {
    return fetchQuotes({ cleaning_type: cleaningType });
  }, [fetchQuotes]);

  const filterByDateRange = useCallback((startDate, endDate) => {
    return fetchQuotes({ 
      created_at__gte: startDate,
      created_at__lte: endDate 
    });
  }, [fetchQuotes]);

  useEffect(() => {
    if (autoFetch && !hasInitialized.current) {
      console.log('🔍 Initial fetch triggered');
      hasInitialized.current = true;
      fetchQuotes();
    }
  }, [autoFetch]);

  return {
    quotes,
    loading,
    error,
    pagination,
    refetch,
    loadMore,
    goToPage,
    updateQuoteInList,
    removeQuoteFromList,
    addQuoteToList,
    searchQuotes,
    filterByStatus,
    filterByCleaningType,
    filterByDateRange,
    hasMore: !!pagination.next,
    isEmpty: quotes.length === 0 && !loading,
    totalCount: pagination.count
  };
};

export default useQuotes;
