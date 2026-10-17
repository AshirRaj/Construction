// src/pages/admin/Projects.jsx
import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, Eye, Filter } from 'lucide-react';
import { getProjects, createProject, updateProject, deleteProject } from '../../services/api';
import { ProjectModal } from '../../components/admin/ProjectModal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { Modal } from '../../components/common/Modal';

export const Projects = () => {
  const { showToast } = useOutletContext();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [viewingProject, setViewingProject] = useState(null);

  const fetchProjectsData = async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      showToast('Failed to load projects list', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectsData();
  }, []);

  const handleSaveProject = async (formData) => {
    try {
      if (editingProject) {
        await updateProject(editingProject.id, formData);
        showToast('Project updated successfully!', 'success');
      } else {
        await createProject(formData);
        showToast('New project created successfully!', 'success');
      }
      setIsModalOpen(false);
      setEditingProject(null);
      fetchProjectsData();
    } catch (err) {
      showToast('Error saving project data', 'error');
    }
  };

  const handleDeleteProject = async () => {
    if (!deletingId) return;
    try {
      await deleteProject(deletingId);
      showToast('Project deleted successfully', 'success');
      setDeletingId(null);
      fetchProjectsData();
    } catch (err) {
      showToast('Failed to delete project', 'error');
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-mono uppercase tracking-tight">Construction Projects</h1>
          <p className="text-slate-500 text-xs sm:text-sm font-medium">Manage active sites, completed developments, and planning pipelines</p>
        </div>

        <button
          onClick={() => {
            setEditingProject(null);
            setIsModalOpen(true);
          }}
          className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by project name, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-slate-900 text-xs outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold outline-none focus:border-amber-500 w-full"
          >
            <option value="All">All Categories</option>
            <option value="Commercial">Commercial</option>
            <option value="Residential">Residential</option>
            <option value="Industrial">Industrial</option>
            <option value="Civil Engineering">Civil Engineering</option>
          </select>
        </div>
      </div>

      {/* Projects Data Table */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono uppercase">
              <tr>
                <th className="py-3.5 px-4">Preview Image</th>
                <th className="py-3.5 px-4">Project Name</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Year</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 font-mono">
                    No projects found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <img
                        src={proj.image}
                        alt={proj.name}
                        className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                      />
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 font-mono">{proj.name}</td>
                    <td className="py-3 px-4">{proj.location}</td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 font-bold uppercase text-[10px] text-amber-700">
                        {proj.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                        proj.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : proj.status === 'In Progress'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {proj.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono">{proj.year}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setViewingProject(proj)}
                          className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingProject(proj);
                            setIsModalOpen(true);
                          }}
                          className="p-2 text-slate-500 hover:text-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                          title="Edit Project"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingId(proj.id)}
                          className="p-2 text-slate-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete Project"
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
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProject}
        project={editingProject}
      />

      <ConfirmDialog
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDeleteProject}
        title="Delete Construction Project"
        message="Are you sure you want to permanently remove this project record?"
      />

      {viewingProject && (
        <Modal
          isOpen={!!viewingProject}
          onClose={() => setViewingProject(null)}
          title={`Project Inspector — ${viewingProject.name}`}
        >
          <div className="space-y-4 text-xs text-slate-100">
            <img src={viewingProject.image} alt={viewingProject.name} className="w-full h-56 rounded-xl object-cover" />
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div><span className="text-slate-400 font-bold uppercase">Client:</span> <span className="text-white">{viewingProject.client || 'N/A'}</span></div>
              <div><span className="text-slate-400 font-bold uppercase">Budget:</span> <span className="text-amber-400 font-mono font-bold">{viewingProject.budget || 'N/A'}</span></div>
              <div><span className="text-slate-400 font-bold uppercase">Start Date:</span> <span className="text-white">{viewingProject.startDate || 'N/A'}</span></div>
              <div><span className="text-slate-400 font-bold uppercase">Completion:</span> <span className="text-white">{viewingProject.completionDate || 'N/A'}</span></div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{viewingProject.description}</p>
          </div>
        </Modal>
      )}

    </div>
  );
};
