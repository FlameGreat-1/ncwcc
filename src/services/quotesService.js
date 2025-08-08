import api from './api.js';

class QuotesService {
  // GET CLIENT'S QUOTES
  async getMyQuotes(params = {}) {
    const response = await api.get('/quotes/my-quotes/', { params });
    return response.data;
  }

  // GET SINGLE QUOTE DETAILS
  async getQuote(id) {
    const response = await api.get(`/quotes/${id}/`);
    return response.data;
  }

  // CREATE NEW QUOTE REQUEST
  async createQuote(data) {
    const response = await api.post('/quotes/', data);
    return response.data;
  }

  // UPDATE QUOTE (only if draft status)
  async updateQuote(id, data) {
    const response = await api.patch(`/quotes/${id}/`, data);
    return response.data;
  }

  // SUBMIT QUOTE FOR REVIEW
  async submitQuote(id) {
    const response = await api.post(`/quotes/${id}/submit/`);
    return response.data;
  }

  // CANCEL QUOTE (client can cancel their own quotes)
  async cancelQuote(id) {
    const response = await api.post(`/quotes/${id}/cancel/`);
    return response.data;
  }

  // DOWNLOAD QUOTE PDF
  async downloadQuotePDF(id) {
    const response = await api.get(`/quotes/${id}/pdf/`, {
      responseType: 'blob'
    });
    return response.data;
  }

  // QUOTE CALCULATOR FOR PRICING ESTIMATES
  async calculateQuote(data) {
    const response = await api.post('/quotes/calculator/', data);
    return response.data;
  }

  // DUPLICATE EXISTING QUOTE (create similar quote)
  async duplicateQuote(id, data = {}) {
    const response = await api.post(`/quotes/${id}/duplicate/`, data);
    return response.data;
  }

  // QUOTE ITEMS MANAGEMENT
  async getQuoteItems(quoteId, params = {}) {
    const response = await api.get('/quotes/items/', { 
      params: { quote_id: quoteId, ...params } 
    });
    return response.data;
  }

  async createQuoteItem(data) {
    const response = await api.post('/quotes/items/', data);
    return response.data;
  }

  async updateQuoteItem(id, data) {
    const response = await api.patch(`/quotes/items/${id}/`, data);
    return response.data;
  }

  async deleteQuoteItem(id) {
    const response = await api.delete(`/quotes/items/${id}/`);
    return response.data;
  }

  // QUOTE ATTACHMENTS (client can upload images/documents)
  async getQuoteAttachments(quoteId, params = {}) {
    const response = await api.get('/quotes/attachments/', { 
      params: { quote_id: quoteId, ...params } 
    });
    return response.data;
  }

  async uploadQuoteAttachment(data) {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    
    const response = await api.post('/quotes/attachments/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async deleteQuoteAttachment(id) {
    const response = await api.delete(`/quotes/attachments/${id}/`);
    return response.data;
  }

  async downloadQuoteAttachment(id) {
    const response = await api.get(`/quotes/attachments/${id}/download/`, {
      responseType: 'blob'
    });
    return response.data;
  }

  // GET SERVICES FOR QUOTE CREATION
  async getServices(params = {}) {
    const response = await api.get('/services/', { params });
    return response.data;
  }

  async getService(id) {
    const response = await api.get(`/services/${id}/`);
    return response.data;
  }

  async getServiceAddons(serviceId, params = {}) {
    const response = await api.get(`/services/${serviceId}/addons/`, { params });
    return response.data;
  }

  // UTILITY METHODS
  async searchQuotes(searchTerm, filters = {}) {
    const params = {
      search: searchTerm,
      ...filters
    };
    return this.getMyQuotes(params);
  }

  // FILTER QUOTES BY STATUS
  async getQuotesByStatus(status, params = {}) {
    return this.getMyQuotes({ status, ...params });
  }

  // GET DRAFT QUOTES
  async getDraftQuotes(params = {}) {
    return this.getQuotesByStatus('draft', params);
  }

  // GET SUBMITTED QUOTES
  async getSubmittedQuotes(params = {}) {
    return this.getQuotesByStatus('submitted', params);
  }

  // GET APPROVED QUOTES
  async getApprovedQuotes(params = {}) {
    return this.getQuotesByStatus('approved', params);
  }

  // GET REJECTED QUOTES
  async getRejectedQuotes(params = {}) {
    return this.getQuotesByStatus('rejected', params);
  }

  // GET NDIS QUOTES (for NDIS clients)
  async getNDISQuotes(params = {}) {
    return this.getMyQuotes({ is_ndis_client: true, ...params });
  }

  // HELPER METHOD TO CREATE BLOB URL FOR DOWNLOADS
  createDownloadUrl(blob, filename) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  // DOWNLOAD QUOTE PDF WITH FILENAME
  async downloadQuotePDFWithFilename(id, filename) {
    try {
      const blob = await this.downloadQuotePDF(id);
      this.createDownloadUrl(blob, filename || `quote-${id}.pdf`);
      return true;
    } catch (error) {
      console.error('Download failed:', error);
      return false;
    }
  }

  // DOWNLOAD ATTACHMENT WITH FILENAME
  async downloadAttachmentWithFilename(id, filename) {
    try {
      const blob = await this.downloadQuoteAttachment(id);
      this.createDownloadUrl(blob, filename || `attachment-${id}`);
      return true;
    } catch (error) {
      console.error('Download failed:', error);
      return false;
    }
  }
}

export default new QuotesService();
