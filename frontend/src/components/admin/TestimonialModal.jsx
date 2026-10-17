// src/components/admin/TestimonialModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';

export const TestimonialModal = ({ isOpen, onClose, onSave, testimonial = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    rating: 5,
    quote: '',
    status: 'Published'
  });

  useEffect(() => {
    if (testimonial) {
      setFormData({
        name: testimonial.name || '',
        position: testimonial.position || '',
        company: testimonial.company || '',
        rating: testimonial.rating || 5,
        quote: testimonial.quote || '',
        status: testimonial.status || 'Published'
      });
    } else {
      setFormData({
        name: '',
        position: '',
        company: '',
        rating: 5,
        quote: '',
        status: 'Published'
      });
    }
  }, [testimonial, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={testimonial ? 'Edit Client Story' : 'Add New Client Testimonial'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Client Full Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
            placeholder="e.g. Rajesh Sharma"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Job Title / Position</label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
              placeholder="e.g. Managing Director"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Company / Organization</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
              placeholder="e.g. Horizon Apex Realty"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Star Rating (1 - 5)</label>
            <select
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none font-mono"
            >
              <option value={5}>5 Stars ★★★★★</option>
              <option value={4}>4 Stars ★★★★☆</option>
              <option value={3}>3 Stars ★★★☆☆</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Publication Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Client Quote *</label>
          <textarea
            rows={3}
            required
            value={formData.quote}
            onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none resize-none"
            placeholder="Client's review of BuildCore's construction performance..."
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 text-xs font-bold uppercase tracking-wider hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-extrabold uppercase tracking-wider hover:bg-amber-400 shadow-lg shadow-amber-500/20"
          >
            {testimonial ? 'Save Testimonial' : 'Publish Testimonial'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
