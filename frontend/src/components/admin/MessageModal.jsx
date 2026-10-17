// src/components/admin/MessageModal.jsx
import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Mail, Phone, Calendar, Send, Check } from 'lucide-react';

export const MessageModal = ({ isOpen, onClose, message, onStatusChange, onShowToast }) => {
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);

  if (!message) return null;

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setSending(true);
    setTimeout(() => {
      setSending(false);
      onStatusChange(message.id, 'Replied');
      if (onShowToast) onShowToast(`Simulated email reply sent to ${message.email}`, 'success');
      setReplyText('');
      onClose();
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Inquiry Details — ${message.subject || 'No Subject'}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        
        {/* Header Metadata */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-white font-bold text-base">{message.name}</div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-amber-400" /> {message.email}</span>
              {message.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-amber-400" /> {message.phone}</span>}
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-amber-400" /> {message.date}</span>
            </div>
          </div>

          <div>
            <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
              message.status === 'Unread'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                : message.status === 'Replied'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-slate-800 text-slate-300 border border-slate-700'
            }`}>
              {message.status}
            </span>
          </div>
        </div>

        {/* Message Body */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Inquiry Message Body</h4>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm leading-relaxed whitespace-pre-line">
            {message.message}
          </div>
        </div>

        {/* Simulated Quick Reply Form */}
        <form onSubmit={handleSendReply} className="space-y-3 pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Send Quick Reply (Simulated)</h4>
          <textarea
            rows={3}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={`Draft reply to ${message.name}...`}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none resize-none"
          />

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => onStatusChange(message.id, message.status === 'Unread' ? 'Read' : 'Unread')}
              className="text-xs text-slate-400 hover:text-white underline font-medium"
            >
              Mark as {message.status === 'Unread' ? 'Read' : 'Unread'}
            </button>

            <button
              type="submit"
              disabled={sending || !replyText.trim()}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{sending ? 'Sending...' : 'Send Reply'}</span>
            </button>
          </div>
        </form>

      </div>
    </Modal>
  );
};
