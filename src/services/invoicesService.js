import api from './api';
import { API_ENDPOINTS } from './apiConfig';

class InvoicesService {
  async getMyInvoices(params = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.status) queryParams.append('status', params.status);
    if (params.search) queryParams.append('search', params.search);
    if (params.ordering) queryParams.append('ordering', params.ordering);
    if (params.is_ndis_invoice !== undefined) queryParams.append('is_ndis_invoice', params.is_ndis_invoice);
    if (params.email_sent !== undefined) queryParams.append('email_sent', params.email_sent);
    
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

  async resendInvoiceEmail(invoiceId) {
    const response = await api.post(`${API_ENDPOINTS.INVOICES.BASE}${invoiceId}/resend-email/`);
    return response.data;
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
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }

  formatInvoiceDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  getInvoiceStatusColor(status) {
    const statusColors = {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      paid: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  }

  isInvoiceOverdue(dueDate) {
    return new Date(dueDate) < new Date();
  }

  calculateDaysOverdue(dueDate) {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = today - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }

  getInvoicePDFUrl(invoice) {
    return invoice.pdf_url || null;
  }

  canDownloadPDF(invoice) {
    return invoice.pdf_file || invoice.status !== 'draft';
  }

  canResendEmail(invoice) {
    return invoice.status === 'sent' && invoice.client?.email;
  }

  getInvoiceItems(invoice) {
    return invoice.items || [];
  }

  calculateInvoiceSubtotal(items) {
    return items.reduce((sum, item) => sum + parseFloat(item.total_price), 0);
  }

  calculateInvoiceGST(items) {
    return items.reduce((sum, item) => {
      return sum + (item.is_taxable ? parseFloat(item.gst_amount) : 0);
    }, 0);
  }

  isNDISInvoice(invoice) {
    return invoice.is_ndis_invoice === true;
  }

  getNDISParticipantInfo(invoice) {
    if (!this.isNDISInvoice(invoice)) return null;
    
    return {
      participantName: invoice.participant_name,
      ndisNumber: invoice.ndis_number,
      serviceStartDate: invoice.service_start_date,
      serviceEndDate: invoice.service_end_date
    };
  }

  getServicePeriod(invoice) {
    if (!invoice.service_start_date) return null;
    
    const startDate = this.formatInvoiceDate(invoice.service_start_date);
    const endDate = invoice.service_end_date 
      ? this.formatInvoiceDate(invoice.service_end_date)
      : startDate;
    
    return startDate === endDate ? startDate : `${startDate} - ${endDate}`;
  }

  getInvoiceSummary(invoice) {
    return {
      invoiceNumber: invoice.invoice_number,
      clientName: invoice.client?.full_name || `${invoice.client?.first_name} ${invoice.client?.last_name}`,
      totalAmount: this.formatInvoiceAmount(invoice.total_amount),
      status: invoice.status,
      statusDisplay: invoice.status_display,
      dueDate: this.formatInvoiceDate(invoice.due_date),
      isOverdue: this.isInvoiceOverdue(invoice.due_date),
      daysOverdue: this.calculateDaysOverdue(invoice.due_date),
      isNDIS: this.isNDISInvoice(invoice),
      emailSent: invoice.email_sent,
      canDownload: this.canDownloadPDF(invoice),
      canResend: this.canResendEmail(invoice)
    };
  }

  filterInvoicesByStatus(invoices, status) {
    if (!status || status === 'all') return invoices;
    return invoices.filter(invoice => invoice.status === status);
  }

  filterInvoicesByNDIS(invoices, isNDIS) {
    if (isNDIS === undefined || isNDIS === null) return invoices;
    return invoices.filter(invoice => invoice.is_ndis_invoice === isNDIS);
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
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
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
      invoice.invoice_number.toLowerCase().includes(term) ||
      invoice.client?.full_name?.toLowerCase().includes(term) ||
      invoice.client?.first_name?.toLowerCase().includes(term) ||
      invoice.client?.last_name?.toLowerCase().includes(term) ||
      invoice.participant_name?.toLowerCase().includes(term)
    );
  }
}

export default new InvoicesService();
