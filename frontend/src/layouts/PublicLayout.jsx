// src/layouts/PublicLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/home/Navbar';
import { Footer } from '../components/home/Footer';
import { Toast } from '../components/common/Toast';
import { Modal } from '../components/common/Modal';
import { submitQuoteRequest } from '../services/api';
import { Send, ShieldCheck } from 'lucide-react';
import { WhatsAppWidget } from '../components/common/WhatsAppWidget';

export const PublicLayout = () => {
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quickQuoteData, setQuickQuoteData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Commercial',
    budget: '₹25 Cr - ₹50 Cr',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleQuickQuoteSubmit = async (e) => {
    e.preventDefault();
    if (!quickQuoteData.name || !quickQuoteData.email || !quickQuoteData.phone) {
      showToast('Please fill out all required fields', 'error');
      return;
    }

    setLoading(true);
    try {
      await submitQuoteRequest(quickQuoteData);
      setLoading(false);
      setQuoteModalOpen(false);
      showToast('Quick Quote request submitted! Our engineers will contact you shortly.', 'success');
      setQuickQuoteData({
        name: '',
        email: '',
        phone: '',
        projectType: 'Commercial',
        budget: '₹25 Cr - ₹50 Cr',
        message: ''
      });
    } catch (err) {
      setLoading(false);
      showToast('Failed to submit quote request.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      {/* Sticky Header Navbar */}
      <Navbar onOpenQuoteModal={() => setQuoteModalOpen(true)} />

      {/* Main Page Outlet */}
      <main className="flex-1">
        <Outlet context={{ showToast, openQuoteModal: () => setQuoteModalOpen(true) }} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Chat Widget */}
      <WhatsAppWidget
        phoneNumber="9525995629"
        message="Hello BuildCore Construction, I am interested in your construction and engineering services. Please share more details."
      />

      {/* Global Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />

      {/* Global Quick Quote Modal */}
      <Modal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        title="Get A Free Project Quote"
      >
        <form onSubmit={handleQuickQuoteSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={quickQuoteData.name}
              onChange={(e) => setQuickQuoteData({ ...quickQuoteData, name: e.target.value })}
              placeholder="e.g. Rajesh Sharma"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={quickQuoteData.email}
                onChange={(e) => setQuickQuoteData({ ...quickQuoteData, email: e.target.value })}
                placeholder="name@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Phone Number *</label>
              <input
                type="text"
                required
                value={quickQuoteData.phone}
                onChange={(e) => setQuickQuoteData({ ...quickQuoteData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Project Category</label>
              <select
                value={quickQuoteData.projectType}
                onChange={(e) => setQuickQuoteData({ ...quickQuoteData, projectType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
              >
                <option value="Commercial">Commercial</option>
                <option value="Residential">Residential</option>
                <option value="Industrial">Industrial</option>
                <option value="Renovation">Renovation</option>
                <option value="Civil Engineering">Civil Engineering</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Estimated Budget</label>
              <select
                value={quickQuoteData.budget}
                onChange={(e) => setQuickQuoteData({ ...quickQuoteData, budget: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
              >
                <option value="Under ₹10 Cr">Under ₹10 Cr</option>
                <option value="₹10 Cr - ₹25 Cr">₹10 Cr - ₹25 Cr</option>
                <option value="₹25 Cr - ₹50 Cr">₹25 Cr - ₹50 Cr</option>
                <option value="₹50 Cr - ₹100 Cr">₹50 Cr - ₹100 Cr</option>
                <option value="₹100 Cr+">₹100 Cr+</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Project Scope Brief</label>
            <textarea
              rows={3}
              value={quickQuoteData.message}
              onChange={(e) => setQuickQuoteData({ ...quickQuoteData, message: e.target.value })}
              placeholder="Brief details about site location, sq ft area, timeline..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Submitting...' : 'Submit Quote Request'}</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
