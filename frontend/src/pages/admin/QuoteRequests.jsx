// src/pages/admin/QuoteRequests.jsx
import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Search, Eye, Trash2, Filter } from 'lucide-react';
import { getQuoteRequests, updateQuoteStatus, deleteQuoteRequest } from '../../services/api';
import { QuoteModal } from '../../components/admin/QuoteModal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';

export const QuoteRequests = () => {
  const { showToast } = useOutletContext();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [selectedQuote, setSelectedQuote] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchQuotesData = async () => {
    setLoading(true);
    try {
      const data = await getQuoteRequests();
      setQuotes(data);
    } catch (err) {
      showToast('Failed to load quote requests', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotesData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateQuoteStatus(id, newStatus);
      showToast(`Quote status updated to ${newStatus}`, 'success');
      if (selectedQuote && selectedQuote.id === id) {
        setSelectedQuote(prev => ({ ...prev, status: newStatus }));
      }
      fetchQuotesData();
    } catch (err) {
      showToast('Failed to update status', 'error');
    }
  };

  const handleDeleteQuote = async () => {
    if (!deletingId) return;
    try {
      await deleteQuoteRequest(deletingId);
      showToast('Quote request deleted', 'success');
      setDeletingId(null);
      fetchQuotesData();
    } catch (err) {
      showToast('Failed to delete quote request', 'error');
    }
  };

  const filteredQuotes = quotes.filter((q) => {
    const matchesSearch = q.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.projectType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusBadgeColors = {
    New: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    Contacted: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    'In Discussion': 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    Approved: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    Rejected: 'bg-red-500/10 text-red-300 border-red-500/30'
  };

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-black font-mono uppercase tracking-tight">Quote Requests Tenders</h1>
          <p className="text-black-400 text-xs sm:text-sm">Manage incoming client lead estimates and tender negotiation status pipeline</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by client name, email, project type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-white text-xs outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-500 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold outline-none focus:border-amber-500 w-full"
          >
            <option value="All">All Pipeline Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="In Discussion">In Discussion</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Quotes Data Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono uppercase">
              <tr>
                <th className="py-3.5 px-4">Client Name</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Project Type</th>
                <th className="py-3.5 px-4">Budget Range</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status Pipeline</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 font-mono">
                    No quote requests match criteria.
                  </td>
                </tr>
              ) : (
                filteredQuotes.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">{q.name}</td>
                    <td className="py-3.5 px-4 space-y-0.5">
                      <div className="text-slate-200">{q.email}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{q.phone}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 font-bold uppercase text-[10px] text-amber-400">
                        {q.projectType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-400">{q.budget}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">{q.date}</td>
                    <td className="py-3.5 px-4">
                      <select
                        value={q.status}
                        onChange={(e) => handleStatusChange(q.id, e.target.value)}
                        className={`px-2.5 py-1 rounded border text-[10px] font-bold uppercase tracking-wider outline-none bg-slate-950 cursor-pointer ${statusBadgeColors[q.status]}`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Discussion">In Discussion</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedQuote(q)}
                          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                          title="View Full Scope"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingId(q.id)}
                          className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
                          title="Delete Request"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <QuoteModal
        isOpen={!!selectedQuote}
        onClose={() => setSelectedQuote(null)}
        quote={selectedQuote}
        onStatusChange={handleStatusChange}
      />

      <ConfirmDialog
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDeleteQuote}
        title="Delete Quote Request"
        message="Are you sure you want to delete this quote request?"
      />

    </div>
  );
};
