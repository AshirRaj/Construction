// src/pages/admin/Services.jsx
import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import { getServices, createService, updateService, deleteService } from '../../services/api';
import { ServiceModal } from '../../components/admin/ServiceModal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { IconHelper } from '../../components/common/IconHelper';

export const Services = () => {
  const { showToast } = useOutletContext();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchServicesData = async () => {
    setLoading(true);
    try {
      const data = await getServices();
      setServices(data);
    } catch (err) {
      showToast('Failed to load services list', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServicesData();
  }, []);

  const handleSaveService = async (formData) => {
    try {
      if (editingService) {
        await updateService(editingService.id, formData);
        showToast('Service updated successfully!', 'success');
      } else {
        await createService(formData);
        showToast('Service added successfully!', 'success');
      }
      setIsModalOpen(false);
      setEditingService(null);
      fetchServicesData();
    } catch (err) {
      showToast('Error saving service data', 'error');
    }
  };

  const handleDeleteService = async () => {
    if (!deletingId) return;
    try {
      await deleteService(deletingId);
      showToast('Service deleted successfully', 'success');
      setDeletingId(null);
      fetchServicesData();
    } catch (err) {
      showToast('Failed to delete service', 'error');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-black font-mono uppercase tracking-tight">Services Management</h1>
          <p className="text-black-400 text-xs sm:text-sm">Configure core construction service offerings displayed on the public platform</p>
        </div>

        <button
          onClick={() => {
            setEditingService(null);
            setIsModalOpen(true);
          }}
          className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400">
                  <IconHelper name={service.iconName} className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-bold uppercase text-[10px]">
                  {service.status || 'Active'}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white uppercase font-mono">{service.title}</h3>
                <div className="text-xs text-amber-500 font-semibold uppercase">{service.subtitle}</div>
              </div>

              <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">
                {service.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-1.5">
                {service.features.map((feat, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                    {feat}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  setEditingService(service);
                  setIsModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => setDeletingId(service.id)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-500 hover:text-white text-red-400 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveService}
        service={editingService}
      />

      <ConfirmDialog
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDeleteService}
        title="Delete Construction Service"
        message="Are you sure you want to remove this service capability from the catalog?"
      />

    </div>
  );
};
