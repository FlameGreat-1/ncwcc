import api from './api';
import { API_ENDPOINTS } from './apiConfig';

class InvoicesService {
  async getMyInvoices(params = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.search) queryParams.append('search', params.search);
    if (params.ordering) queryParams.append('ordering', params.ordering);
    if (params.is_ndis_invoice !== undefined) queryParams.append('is_ndis_invoice', params.is_ndis_invoice);
    
    const url = queryParams.toString() 
      ? `${API_ENDPOINTS.INVOICES.MY_INVOICES}?${queryParams.toString()}`
      : API_ENDPOINTS.INVOICES.MY_INVOICES;
    
    const response = await api.get(url);
    return response.data;
  }

  async getInvoiceDetail(invoiceId) {
    const response = await api.get(`${API_ENDPOINTS.INVOICES.BASE}${invoiceId}/`);
    return response.data;
  }

  async downloadInvoicePDF(invoiceId) {
    const response = await api.get(`${API_ENDPOINTS.INVOICES.BASE}${invoiceId}/download/`, {
      responseType: 'blob'
    });
    
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoice-${invoiceId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return true;
  }

  async getNDISInvoices(params = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.search) queryParams.append('search', params.search);
    if (params.ordering) queryParams.append('ordering', params.ordering);
    
    const url = queryParams.toString() 
      ? `${API_ENDPOINTS.INVOICES.NDIS}?${queryParams.toString()}`
      : API_ENDPOINTS.INVOICES.NDIS;
    
    const response = await api.get(url);
    return response.data;
  }

  async checkNDISCompliance(invoiceId) {
    const response = await api.get(`${API_ENDPOINTS.INVOICES.NDIS}${invoiceId}/compliance-check/`);
    return response.data;
  }

  formatInvoiceAmount(amount) {
    if (amount === null || amount === undefined || isNaN(amount)) {
      return '$0.00';
    }
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }

  formatInvoiceDate(dateString) {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  isInvoiceOverdue(invoice) {
    return invoice.is_overdue || false;
  }

  getDaysOverdue(invoice) {
    return invoice.days_overdue || 0;
  }

  getInvoicePDFUrl(invoice) {
    return invoice.pdf_url || null;
  }

  canDownloadPDF(invoice) {
    return invoice.pdf_file ? true : false;
  }

  getInvoiceItems(invoice) {
    return invoice.items || [];
  }

  calculateInvoiceSubtotal(items) {
    return items.reduce((sum, item) => sum + parseFloat(item.total_price || 0), 0);
  }

  calculateInvoiceGST(items) {
    return items.reduce((sum, item) => {
      return sum + (item.is_taxable ? parseFloat(item.gst_amount || 0) : 0);
    }, 0);
  }

  isNDISInvoice(invoice) {
    return invoice.is_ndis_invoice === true;
  }

  getNDISParticipantInfo(invoice) {
    if (!this.isNDISInvoice(invoice)) return null;
    
    return {
      participantName: invoice.participant_name || '',
      ndisNumber: invoice.ndis_number || '',
      serviceStartDate: invoice.service_start_date || null,
      serviceEndDate: invoice.service_end_date || null
    };
  }

  getServicePeriod(invoice) {
    if (!invoice.service_start_date) return 'N/A';
    
    const startDate = this.formatInvoiceDate(invoice.service_start_date);
    const endDate = invoice.service_end_date 
      ? this.formatInvoiceDate(invoice.service_end_date)
      : startDate;
    
    return startDate === endDate ? startDate : `${startDate} - ${endDate}`;
  }

  getInvoiceSummary(invoice) {
    if (!invoice) return {};
    
    return {
      invoiceNumber: invoice.invoice_number || '',
      clientName: invoice.client_full_name || invoice.client_name || 'Unknown Client',
      totalAmount: this.formatInvoiceAmount(invoice.total_amount),
      subtotal: this.formatInvoiceAmount(invoice.subtotal),
      gstAmount: this.formatInvoiceAmount(invoice.gst_amount),
      dueDate: this.formatInvoiceDate(invoice.due_date),
      invoiceDate: this.formatInvoiceDate(invoice.invoice_date),
      isOverdue: this.isInvoiceOverdue(invoice),
      daysOverdue: this.getDaysOverdue(invoice),
      isNDIS: this.isNDISInvoice(invoice),
      canDownload: this.canDownloadPDF(invoice),
      billingAddress: invoice.billing_address || '',
      serviceAddress: invoice.service_address || '',
      participantName: invoice.participant_name || '',
      ndisNumber: invoice.ndis_number || '',
      servicePeriod: this.getServicePeriod(invoice)
    };
  }

  filterInvoicesByNDIS(invoices, isNDIS) {
    if (isNDIS === undefined || isNDIS === null || isNDIS === 'null') return invoices;
    return invoices.filter(invoice => invoice.is_ndis_invoice === (isNDIS === 'true' || isNDIS === true));
  }

  sortInvoices(invoices, sortBy = '-created_at') {
    const sortedInvoices = [...invoices];
    
    const isDescending = sortBy.startsWith('-');
    const field = isDescending ? sortBy.substring(1) : sortBy;
    
    sortedInvoices.sort((a, b) => {
      let aValue = a[field];
      let bValue = b[field];
      
      if (field.includes('date')) {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (field === 'total_amount') {
        aValue = parseFloat(aValue || 0);
        bValue = parseFloat(bValue || 0);
      }
      
      if (aValue < bValue) return isDescending ? 1 : -1;
      if (aValue > bValue) return isDescending ? -1 : 1;
      return 0;
    });
    
    return sortedInvoices;
  }

  searchInvoices(invoices, searchTerm) {
    if (!searchTerm) return invoices;
    
    const term = searchTerm.toLowerCase();
    return invoices.filter(invoice => 
      invoice.invoice_number?.toLowerCase().includes(term) ||
      invoice.client_full_name?.toLowerCase().includes(term) ||
      invoice.client_name?.toLowerCase().includes(term) ||
      invoice.participant_name?.toLowerCase().includes(term)
    );
  }

  getInvoiceDisplayData(invoice) {
    if (!invoice) return null;
    
    return {
      id: invoice.id,
      invoiceNumber: invoice.invoice_number,
      clientName: invoice.client_full_name || invoice.client_name,
      totalAmount: invoice.total_amount,
      subtotal: invoice.subtotal,
      gstAmount: invoice.gst_amount,
      invoiceDate: invoice.invoice_date,
      dueDate: invoice.due_date,
      billingAddress: invoice.billing_address,
      serviceAddress: invoice.service_address,
      isNDIS: invoice.is_ndis_invoice,
      participantName: invoice.participant_name,
      ndisNumber: invoice.ndis_number,
      serviceStartDate: invoice.service_start_date,
      serviceEndDate: invoice.service_end_date,
      isOverdue: invoice.is_overdue,
      daysOverdue: invoice.days_overdue,
      items: invoice.items || [],
      itemsCount: invoice.items_count || 0,
      pdfFile: invoice.pdf_file,
      createdAt: invoice.created_at
    };
  }
}

export default new InvoicesService();
