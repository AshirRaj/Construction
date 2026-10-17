// src/pages/admin/Testimonials.jsx
import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, Edit2, Trash2, Star, CheckCircle, EyeOff } from 'lucide-react';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../../services/api';
import { TestimonialModal } from '../../components/admin/TestimonialModal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';

export const Testimonials = () => {
  const { showToast } = useOutletContext();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchTestimonialsData = async () => {
    setLoading(true);
    try {
      const data = await getTestimonials();
      setTestimonials(data);
    } catch (err) {
      showToast('Failed to load testimonials list', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonialsData();
  }, []);

  const handleSaveTestimonial = async (formData) => {
    try {
      if (editingTestimonial) {
        await updateTestimonial(editingTestimonial.id, formData);
        showToast('Testimonial updated successfully!', 'success');
      } else {
        await createTestimonial(formData);
        showToast('Testimonial added successfully!', 'success');
      }
      setIsModalOpen(false);
      setEditingTestimonial(null);
      fetchTestimonialsData();
    } catch (err) {
      showToast('Error saving testimonial data', 'error');
    }
  };

  const handleToggleStatus = async (item) => {
    const newStatus = item.status === 'Published' ? 'Draft' : 'Published';
    try {
      await updateTestimonial(item.id, { ...item, status: newStatus });
      showToast(`Status changed to ${newStatus}`, 'success');
      fetchTestimonialsData();
    } catch (err) {
      showToast('Failed to change status', 'error');
    }
  };

  const handleDeleteTestimonial = async () => {
    if (!deletingId) return;
    try {
      await deleteTestimonial(deletingId);
      showToast('Testimonial deleted successfully', 'success');
      setDeletingId(null);
      fetchTestimonialsData();
    } catch (err) {
      showToast('Failed to delete testimonial', 'error');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-black font-mono uppercase tracking-tight">Client Testimonials</h1>
          <p className="text-black-400 text-xs sm:text-sm">Manage client reviews, ratings, and social proof published on the website</p>
        </div>

        <button
          onClick={() => {
            setEditingTestimonial(null);
            setIsModalOpen(true);
          }}
          className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Testimonials List */}
      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <button
                  onClick={() => handleToggleStatus(item)}
                  className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border cursor-pointer ${item.status === 'Published'
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                >
                  {item.status}
                </button>
              </div>

              <blockquote className="text-slate-200 text-sm italic leading-relaxed">
                "{item.quote}"
              </blockquote>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm font-mono">
                  {item.avatar || 'BC'}
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-mono">{item.name}</div>
                  <div className="text-xs text-amber-400 font-medium">{item.position} — <span className="text-slate-400">{item.company}</span></div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  setEditingTestimonial(item);
                  setIsModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => setDeletingId(item.id)}
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
      <TestimonialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTestimonial}
        testimonial={editingTestimonial}
      />

      <ConfirmDialog
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDeleteTestimonial}
        title="Delete Testimonial"
        message="Are you sure you want to remove this client testimonial?"
      />

    </div>
  );
};
