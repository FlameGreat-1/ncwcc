import { memo, useState } from 'react';
import { 
  DocumentArrowDownIcon,
  EnvelopeIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  UserIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  PrinterIcon
} from '@heroicons/react/24/outline';
import InvoiceStatusBadge from './InvoiceStatusBadge';
import NDISInvoiceBadge from './NDISInvoiceBadge';
import LoadingSpinner from '../common/LoadingSpinner';
import invoicesService from '../../services/invoicesService';

const InvoiceDetails = memo(({ 
  invoice, 
  loading = false, 
  error = null,
  onDownload,
  onResendEmail,
  className = ''
}) => {
  const [actionLoading, setActionLoading] = useState({
    download: false,
    email: false
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold app-text-primary mb-2">
          Error Loading Invoice
        </h3>
        <p className="app-text-muted">{error}</p>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="text-center py-12">
        <DocumentArrowDownIcon className="w-12 h-12 app-text-muted mx-auto mb-4" />
        <h3 className="text-lg font-semibold app-text-primary mb-2">
          Invoice Not Found
        </h3>
        <p className="app-text-muted">The requested invoice could not be found.</p>
      </div>
    );
  }

  const summary = invoicesService.getInvoiceSummary(invoice);
  const items = invoicesService.getInvoiceItems(invoice);
  const ndisInfo = invoicesService.getNDISParticipantInfo(invoice);
  const servicePeriod = invoicesService.getServicePeriod(invoice);

  const handleDownload = async () => {
    if (!summary.canDownload || actionLoading.download) return;
    
    setActionLoading(prev => ({ ...prev, download: true }));
    try {
      await onDownload?.(invoice.id);
    } finally {
      setActionLoading(prev => ({ ...prev, download: false }));
    }
  };

  const handleResendEmail = async () => {
    if (!summary.canResend || actionLoading.email) return;
    
    setActionLoading(prev => ({ ...prev, email: true }));
    try {
      await onResendEmail?.(invoice.id);
    } finally {
      setActionLoading(prev => ({ ...prev, email: false }));
    }
  };

  const formatDate = (dateString) => {
    return invoicesService.formatInvoiceDate(dateString);
  };

  const formatAmount = (amount) => {
    return invoicesService.formatInvoiceAmount(amount);
  };

  return (
    <div className={`space-y-6 ${className}`}>
          <div className="glass-card">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-2xl font-black text-gradient">
                {invoice.invoice_number}
              </h1>
              <InvoiceStatusBadge status={invoice.status} size="md" />
              {summary.isNDIS && <NDISInvoiceBadge size="md" />}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <UserIcon className="w-5 h-5 app-text-muted" />
                <div>
                  <p className="font-semibold app-text-primary">{summary.clientName}</p>
                  <p className="text-sm app-text-muted">{invoice.client?.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <BuildingOfficeIcon className="w-5 h-5 app-text-muted" />
                <div>
                  <p className="text-sm app-text-secondary">Billing Address</p>
                  <p className="text-sm app-text-muted whitespace-pre-line">
                    {invoice.billing_address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:text-right">
            <div className="mb-4">
              <p className="text-3xl font-black text-gradient mb-1">
                {summary.totalAmount}
              </p>
              {summary.isOverdue && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <ExclamationTriangleIcon className="w-4 h-4" />
                  <span>{summary.daysOverdue} days overdue</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              {summary.canDownload && (
                <button
                  onClick={handleDownload}
                  disabled={actionLoading.download}
                  className="btn-md btn-modern-primary"
                >
                  {actionLoading.download ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <DocumentArrowDownIcon className="w-4 h-4" />
                  )}
                  <span>Download PDF</span>
                </button>
              )}
              
              {summary.canResend && (
                <button
                  onClick={handleResendEmail}
                  disabled={actionLoading.email}
                  className="btn-md btn-modern-secondary"
                >
                  {actionLoading.email ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <EnvelopeIcon className="w-4 h-4" />
                  )}
                  <span>Resend Email</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center gap-3 p-3 app-bg-secondary rounded-lg">
            <CalendarIcon className="w-5 h-5 app-blue" />
            <div>
              <p className="text-xs app-text-muted">Invoice Date</p>
              <p className="font-semibold app-text-primary">
                {formatDate(invoice.invoice_date)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 app-bg-secondary rounded-lg">
            <ClockIcon className="w-5 h-5 app-blue" />
            <div>
              <p className="text-xs app-text-muted">Due Date</p>
              <p className="font-semibold app-text-primary">
                {formatDate(invoice.due_date)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 app-bg-secondary rounded-lg">
            <CurrencyDollarIcon className="w-5 h-5 app-blue" />
            <div>
              <p className="text-xs app-text-muted">Service Period</p>
              <p className="font-semibold app-text-primary">
                {servicePeriod}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 app-bg-secondary rounded-lg">
            <EnvelopeIcon className="w-5 h-5 app-blue" />
            <div>
              <p className="text-xs app-text-muted">Email Status</p>
              <div className="flex items-center gap-1">
                {summary.emailSent ? (
                  <>
                    <CheckCircleIcon className="w-3 h-3 text-green-600" />
                    <span className="text-sm font-semibold text-green-600">Sent</span>
                  </>
                ) : (
                  <>
                    <ClockIcon className="w-3 h-3 app-text-muted" />
                    <span className="text-sm font-semibold app-text-muted">Not Sent</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {ndisInfo && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheckIcon className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-800">NDIS Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-blue-700">Participant Name</p>
                <p className="text-blue-800">{ndisInfo.participantName || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-700">NDIS Number</p>
                <p className="text-blue-800">{ndisInfo.ndisNumber || 'N/A'}</p>
              </div>
              {ndisInfo.serviceStartDate && (
                <div>
                  <p className="text-sm font-medium text-blue-700">Service Start</p>
                  <p className="text-blue-800">{formatDate(ndisInfo.serviceStartDate)}</p>
                </div>
              )}
              {ndisInfo.serviceEndDate && (
                <div>
                  <p className="text-sm font-medium text-blue-700">Service End</p>
                  <p className="text-blue-800">{formatDate(ndisInfo.serviceEndDate)}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="glass-card">
        <h2 className="text-xl font-bold app-text-primary mb-4">Invoice Items</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b app-border">
                <th className="text-left py-3 px-2 font-semibold app-text-secondary">Description</th>
                <th className="text-right py-3 px-2 font-semibold app-text-secondary">Qty</th>
                <th className="text-right py-3 px-2 font-semibold app-text-secondary">Unit Price</th>
                <th className="text-right py-3 px-2 font-semibold app-text-secondary">GST</th>
                <th className="text-right py-3 px-2 font-semibold app-text-secondary">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id || index} className="border-b app-border">
                  <td className="py-3 px-2 app-text-primary">{item.description}</td>
                  <td className="text-right py-3 px-2 app-text-secondary">{item.quantity}</td>
                  <td className="text-right py-3 px-2 app-text-secondary">
                    {formatAmount(item.unit_price)}
                  </td>
                  <td className="text-right py-3 px-2 app-text-secondary">
                    {item.is_taxable ? formatAmount(item.gst_amount) : 'GST Free'}
                  </td>
                  <td className="text-right py-3 px-2 font-semibold app-text-primary">
                    {formatAmount(item.total_price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 pt-4 border-t app-border">
          <div className="flex justify-end">
            <div className="w-full max-w-sm space-y-2">
              <div className="flex justify-between">
                <span className="app-text-secondary">Subtotal:</span>
                <span className="font-semibold app-text-primary">
                  {formatAmount(invoice.subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="app-text-secondary">GST Amount:</span>
                <span className="font-semibold app-text-primary">
                  {formatAmount(invoice.gst_amount)}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t app-border pt-2">
                <span className="app-text-primary">Total Amount:</span>
                <span className="text-gradient">
                  {formatAmount(invoice.total_amount)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {invoice.notes && (
        <div className="glass-card">
          <h3 className="font-semibold app-text-primary mb-3">Notes</h3>
          <p className="app-text-secondary whitespace-pre-line">{invoice.notes}</p>
        </div>
      )}
    </div>
  );
});

InvoiceDetails.displayName = 'InvoiceDetails';

export default InvoiceDetails;


    
