import { useState, useEffect, useCallback, useMemo } from 'react';
import invoicesService from '../services/invoicesService';
import { useAuth } from './useAuth';

export const useInvoices = (initialFilters = {}) => {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    is_ndis_invoice: null,
    email_sent: null,
    search: '',
    ordering: '-created_at',
    ...initialFilters
  });

  const fetchInvoices = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const params = {
        ...filters,
        status: filters.status === 'all' ? undefined : filters.status
      };
      
      const data = await invoicesService.getMyInvoices(params);
      setInvoices(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch invoices');
    } finally {
      setLoading(false);
    }
  }, [user, filters]);

  const refreshInvoices = useCallback(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      status: 'all',
      is_ndis_invoice: null,
      email_sent: null,
      search: '',
      ordering: '-created_at'
    });
  }, []);

  const downloadInvoice = useCallback(async (invoiceId) => {
    try {
      await invoicesService.downloadInvoicePDF(invoiceId);
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to download invoice' 
      };
    }
  }, []);

  const resendInvoiceEmail = useCallback(async (invoiceId) => {
    try {
      const result = await invoicesService.resendInvoiceEmail(invoiceId);
      
      setInvoices(prev => prev.map(invoice => 
        invoice.id === invoiceId 
          ? { ...invoice, email_sent: true, email_sent_at: new Date().toISOString() }
          : invoice
      ));
      
      return { success: true, message: result.message };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to resend invoice email' 
      };
    }
  }, []);

  const filteredInvoices = useMemo(() => {
    let result = [...invoices];
    
    if (filters.search) {
      result = invoicesService.searchInvoices(result, filters.search);
    }
    
    if (filters.status && filters.status !== 'all') {
      result = invoicesService.filterInvoicesByStatus(result, filters.status);
    }
    
    if (filters.is_ndis_invoice !== null) {
      result = invoicesService.filterInvoicesByNDIS(result, filters.is_ndis_invoice);
    }
    
    if (filters.email_sent !== null) {
      result = result.filter(invoice => invoice.email_sent === filters.email_sent);
    }
    
    return invoicesService.sortInvoices(result, filters.ordering);
  }, [invoices, filters]);

  const invoiceStats = useMemo(() => {
    const stats = {
      total: invoices.length,
      draft: 0,
      sent: 0,
      paid: 0,
      overdue: 0,
      ndis: 0,
      totalAmount: 0,
      overdueAmount: 0
    };
    
    invoices.forEach(invoice => {
      stats[invoice.status] = (stats[invoice.status] || 0) + 1;
      stats.totalAmount += parseFloat(invoice.total_amount || 0);
      
      if (invoice.is_ndis_invoice) {
        stats.ndis += 1;
      }
      
      if (invoicesService.isInvoiceOverdue(invoice.due_date) && invoice.status !== 'paid') {
        stats.overdueAmount += parseFloat(invoice.total_amount || 0);
      }
    });
    
    return stats;
  }, [invoices]);

  const overdueInvoices = useMemo(() => {
    return invoices.filter(invoice => 
      invoicesService.isInvoiceOverdue(invoice.due_date) && 
      invoice.status !== 'paid' && 
      invoice.status !== 'cancelled'
    );
  }, [invoices]);

  const recentInvoices = useMemo(() => {
    return invoicesService.sortInvoices(invoices, '-created_at').slice(0, 5);
  }, [invoices]);

  const ndisInvoices = useMemo(() => {
    return invoices.filter(invoice => invoice.is_ndis_invoice);
  }, [invoices]);

  const getInvoiceById = useCallback((invoiceId) => {
    return invoices.find(invoice => invoice.id === invoiceId);
  }, [invoices]);

  const hasInvoices = useMemo(() => invoices.length > 0, [invoices]);

  const hasOverdueInvoices = useMemo(() => overdueInvoices.length > 0, [overdueInvoices]);

  const hasNDISInvoices = useMemo(() => ndisInvoices.length > 0, [ndisInvoices]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  return {
    invoices: filteredInvoices,
    allInvoices: invoices,
    loading,
    error,
    filters,
    invoiceStats,
    overdueInvoices,
    recentInvoices,
    ndisInvoices,
    hasInvoices,
    hasOverdueInvoices,
    hasNDISInvoices,
    fetchInvoices,
    refreshInvoices,
    updateFilters,
    clearFilters,
    downloadInvoice,
    resendInvoiceEmail,
    getInvoiceById
  };
};

export const useInvoiceDetail = (invoiceId) => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInvoiceDetail = useCallback(async () => {
    if (!invoiceId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await invoicesService.getInvoiceDetail(invoiceId);
      setInvoice(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch invoice details');
    } finally {
      setLoading(false);
    }
  }, [invoiceId]);

  const downloadInvoice = useCallback(async () => {
    if (!invoice) return { success: false, error: 'No invoice data' };
    
    try {
      await invoicesService.downloadInvoicePDF(invoice.id);
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to download invoice' 
      };
    }
  }, [invoice]);

  const resendEmail = useCallback(async () => {
    if (!invoice) return { success: false, error: 'No invoice data' };
    
    try {
      const result = await invoicesService.resendInvoiceEmail(invoice.id);
      setInvoice(prev => ({ 
        ...prev, 
        email_sent: true, 
        email_sent_at: new Date().toISOString() 
      }));
      return { success: true, message: result.message };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to resend invoice email' 
      };
    }
  }, [invoice]);

  const invoiceSummary = useMemo(() => {
    return invoice ? invoicesService.getInvoiceSummary(invoice) : null;
  }, [invoice]);

  const invoiceItems = useMemo(() => {
    return invoice ? invoicesService.getInvoiceItems(invoice) : [];
  }, [invoice]);

  const ndisInfo = useMemo(() => {
    return invoice ? invoicesService.getNDISParticipantInfo(invoice) : null;
  }, [invoice]);

  const servicePeriod = useMemo(() => {
    return invoice ? invoicesService.getServicePeriod(invoice) : null;
  }, [invoice]);

  useEffect(() => {
    fetchInvoiceDetail();
  }, [fetchInvoiceDetail]);

  return {
    invoice,
    loading,
    error,
    invoiceSummary,
    invoiceItems,
    ndisInfo,
    servicePeriod,
    fetchInvoiceDetail,
    downloadInvoice,
    resendEmail
  };
};

export const useNDISInvoices = () => {
  const [ndisInvoices, setNdisInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNDISInvoices = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await invoicesService.getNDISInvoices(params);
      setNdisInvoices(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch NDIS invoices');
    } finally {
      setLoading(false);
    }
  }, []);

  const checkCompliance = useCallback(async (invoiceId) => {
    try {
      const result = await invoicesService.checkNDISCompliance(invoiceId);
      return { success: true, data: result };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to check NDIS compliance' 
      };
    }
  }, []);

  useEffect(() => {
    fetchNDISInvoices();
  }, [fetchNDISInvoices]);

  return {
    ndisInvoices,
    loading,
    error,
    fetchNDISInvoices,
    checkCompliance
  };
};
