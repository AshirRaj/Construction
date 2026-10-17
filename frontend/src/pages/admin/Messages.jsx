// src/pages/admin/Messages.jsx
import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Mail, Search, Eye, Trash2, CheckCircle, MessageSquare } from 'lucide-react';
import { getMessages, updateMessageStatus, deleteMessage } from '../../services/api';
import { MessageModal } from '../../components/admin/MessageModal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';

export const Messages = () => {
  const { showToast, refreshUnreadCount } = useOutletContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchMessagesData = async () => {
    setLoading(true);
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (err) {
      showToast('Failed to load messages inbox', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessagesData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateMessageStatus(id, newStatus);
      showToast(`Status updated to ${newStatus}`, 'success');
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(prev => ({ ...prev, status: newStatus }));
      }
      fetchMessagesData();
      if (refreshUnreadCount) refreshUnreadCount();
    } catch (err) {
      showToast('Failed to update status', 'error');
    }
  };

  const handleDeleteMessage = async () => {
    if (!deletingId) return;
    try {
      await deleteMessage(deletingId);
      showToast('Message deleted', 'success');
      setDeletingId(null);
      fetchMessagesData();
    } catch (err) {
      showToast('Failed to delete message', 'error');
    }
  };

  const filteredMessages = messages.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-black font-mono uppercase tracking-tight">Messages Inbox</h1>
          <p className="text-black-400 text-xs sm:text-sm">General corporate inquiries, vendor registrations, and subcontractor communications</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by sender, email, subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-white text-xs outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold outline-none focus:border-amber-500 w-full"
          >
            <option value="All">All Statuses</option>
            <option value="Unread">Unread Only</option>
            <option value="Read">Read</option>
            <option value="Replied">Replied</option>
          </select>
        </div>
      </div>

      {/* Messages List Container */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="space-y-3">
          {filteredMessages.length === 0 ? (
            <div className="py-12 text-center text-slate-500 font-mono text-xs">
              No messages found in inbox.
            </div>
          ) : (
            filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => {
                  if (msg.status === 'Unread') {
                    handleStatusChange(msg.id, 'Read');
                  }
                  setSelectedMessage(msg);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${msg.status === 'Unread'
                  ? 'bg-slate-950 border-amber-500/40 hover:border-amber-500'
                  : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2.5 rounded-xl shrink-0 ${msg.status === 'Unread' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-900 text-slate-500'
                    }`}>
                    <Mail className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-white font-mono">{msg.name}</span>
                      <span className="text-xs text-slate-400 font-mono">({msg.email})</span>
                    </div>

                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                      {msg.subject || 'General Inquiry'}
                    </h4>

                    <p className="text-xs text-slate-300 line-clamp-1">
                      {msg.message}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                  <span className="text-[11px] text-slate-500 font-mono">{msg.date}</span>

                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${msg.status === 'Unread'
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    : msg.status === 'Replied'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                    {msg.status}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeletingId(msg.id);
                    }}
                    className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modals */}
      <MessageModal
        isOpen={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
        message={selectedMessage}
        onStatusChange={handleStatusChange}
        onShowToast={showToast}
      />

      <ConfirmDialog
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDeleteMessage}
        title="Delete Inquiry Message"
        message="Are you sure you want to delete this message?"
      />

    </div>
  );
};
