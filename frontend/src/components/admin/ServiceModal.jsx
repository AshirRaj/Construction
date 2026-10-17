// src/components/admin/ServiceModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';

export const ServiceModal = ({ isOpen, onClose, onSave, service = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    iconName: 'Building2',
    description: '',
    features: '',
    status: 'Active'
  });

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || '',
        subtitle: service.subtitle || '',
        iconName: service.iconName || 'Building2',
        description: service.description || '',
        features: Array.isArray(service.features) ? service.features.join(', ') : (service.features || ''),
        status: service.status || 'Active'
      });
    } else {
      setFormData({
        title: '',
        subtitle: '',
        iconName: 'Building2',
        description: '',
        features: '',
        status: 'Active'
      });
    }
  }, [service, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const featArray = formData.features
      .split(',')
      .map(f => f.trim())
      .filter(Boolean);
    onSave({
      ...formData,
      features: featArray
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={service ? 'Edit Service' : 'Add New Construction Service'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Service Title *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
            placeholder="e.g. Commercial Construction"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Subtitle</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
              placeholder="e.g. Offices & Towers"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Lucide Icon Name</label>
            <select
              value={formData.iconName}
              onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none font-mono"
            >
              <option value="Building2">Building2</option>
              <option value="Home">Home</option>
              <option value="Factory">Factory</option>
              <option value="Hammer">Hammer</option>
              <option value="HardHat">HardHat</option>
              <option value="ClipboardCheck">ClipboardCheck</option>
              <option value="Wrench">Wrench</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Description *</label>
          <textarea
            rows={3}
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none resize-none"
            placeholder="Overview of this construction service capability..."
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Capabilities (Comma separated)</label>
          <input
            type="text"
            value={formData.features}
            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
            placeholder="e.g. High-Rise Towers, Glass Facades, Smart HVAC"
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
            {service ? 'Save Service' : 'Add Service'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
