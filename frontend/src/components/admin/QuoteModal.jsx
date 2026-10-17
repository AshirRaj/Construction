// src/components/admin/QuoteModal.jsx
import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Mail, Phone, Calendar, DollarSign, Building, CheckCircle2, MessageCircle, ExternalLink } from 'lucide-react';

export const generateWhatsAppQuoteUrl = (quote) => {
  if (!quote) return '';

  let cleanPhone = (quote.phone || '').replace(/[^0-9]/g, '');
  if (cleanPhone.length === 10) {
    cleanPhone = '91' + cleanPhone;
  }

  const messageText =
`🏗️ *BUILDCORE CONSTRUCTION — QUOTE REQUEST*
----------------------------------------
👤 *Customer:* ${quote.name || 'N/A'}
📞 *Phone:* ${quote.phone || 'N/A'}
✉️ *Email:* ${quote.email || 'N/A'}
🏢 *Project Type:* ${quote.projectType || 'N/A'}
💰 *Budget:* ${quote.budget || 'N/A'}
📅 *Submission Date:* ${quote.date || new Date().toISOString().split('T')[0]}

📝 *Project Scope & Specifications:*
${quote.message || 'No additional details provided.'}
----------------------------------------
_BuildCore Construction Engineering & Estimations_`;

  const encoded = encodeURIComponent(messageText);
  return cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encoded}`
    : `https://wa.me/?text=${encoded}`;
};

export const QuoteModal = ({ isOpen, onClose, quote, onStatusChange, onWhatsAppSent }) => {
  const [waOpened, setWaOpened] = useState(false);

  if (!quote) return null;

  const statusOptions = ['New', 'Contacted', 'In Discussion', 'Approved', 'Rejected'];

  const statusColors = {
    New: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    Contacted: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'In Discussion': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    Approved: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    Rejected: 'bg-red-500/20 text-red-300 border-red-500/30'
  };

  const handleOpenWhatsApp = () => {
    const url = generateWhatsAppQuoteUrl(quote);
    window.open(url, '_blank', 'noopener,noreferrer');
    setWaOpened(true);
    if (onWhatsAppSent) {
      onWhatsAppSent(quote);
    }
    setTimeout(() => setWaOpened(false), 4000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Quote Request Details — #${quote.id}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        
        {/* Status Dropdown Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div>
            <div className="text-xs uppercase font-bold text-slate-400">Current Pipeline Status</div>
            <div className="mt-1 inline-block">
              <span className={`px-3 py-1 rounded-lg text-xs font-bold border uppercase tracking-wider ${statusColors[quote.status]}`}>
                {quote.status}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-bold uppercase text-slate-400">Change Status:</label>
            <select
              value={quote.status}
              onChange={(e) => onStatusChange(quote.id, e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold outline-none focus:border-amber-500 cursor-pointer"
            >
              {statusOptions.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Client Contact Cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-xs text-slate-400 font-semibold uppercase">Client Name</div>
            <div className="text-white font-bold text-base">{quote.name}</div>
            
            <div className="pt-2 space-y-1 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <a href={`mailto:${quote.email}`} className="hover:text-amber-400">{quote.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <a href={`tel:${quote.phone}`} className="hover:text-amber-400">{quote.phone}</a>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-xs text-slate-400 font-semibold uppercase">Project Specifications</div>
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Building className="w-4 h-4 text-amber-400" />
              <span>{quote.projectType}</span>
            </div>

            <div className="pt-2 space-y-1 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                <span>Budget: <strong className="text-amber-400 font-mono">{quote.budget}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Submitted: {quote.date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Message / Scope */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Project Scope & Client Note</h4>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm leading-relaxed whitespace-pre-line font-mono">
            {quote.message}
          </div>
        </div>

        {/* Action Controls with WhatsApp Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all duration-300 ${
              waOpened
                ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                : 'bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 shadow-emerald-500/20 hover:scale-102'
            }`}
          >
            {waOpened ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>WhatsApp Opened!</span>
              </>
            ) : (
              <>
                <MessageCircle className="w-4 h-4 fill-slate-950 text-[#25D366]" />
                <span>Send to WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </Modal>
  );
};
