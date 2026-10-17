// src/pages/public/ProjectsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  ArrowRight,
  ChevronRight,
  Filter,
  Search,
  Building2
} from 'lucide-react';
import { getProjects } from '../../services/api';
import { FadeIn } from '../../components/common/ScrollReveal';
import bgImage from '../../assets/img2.jpeg';

export const ProjectsPage = () => {
  const { openQuoteModal } = useOutletContext() || {};
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Commercial', 'Residential', 'Industrial', 'Civil Engineering'];

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = (projects || []).filter((p) => {
    const category = (p.category || '').toLowerCase();
    const name = (p.name || '').toLowerCase();
    const location = (p.location || '').toLowerCase();
    const description = (p.description || '').toLowerCase();
    const query = (searchQuery || '').toLowerCase();

    const matchesCategory = activeCategory === 'All' || category === activeCategory.toLowerCase();
    const matchesSearch = !query || name.includes(query) || location.includes(query) || description.includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#0c0e12] text-slate-100 min-h-screen pt-24 pb-24 relative overflow-hidden">

      {/* Continuous Fixed Background Layer with img1.jpeg */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          filter: 'contrast(100%) brightness(100%)'
        }}
      >
        <div className="absolute inset-0 bg-[#0c0e12]/75" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">

        {/* Page Header */}
        <div className="pt-6 border-b border-slate-800/80 pb-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-amber-400 font-bold">Projects</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1 max-w-4xl text-center mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest font-mono">
                ENGINEERING PORTFOLIO
              </div>
              <h1 className="text-4xl sm:text-4xl font-black text-white uppercase font-mono tracking-tight leading-tight">
                DELIVERING LANDMARK <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                  DEVELOPMENTS NATIONWIDE.
                </span>
              </h1>
            </div>

          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#14171e]/90 border border-slate-800 backdrop-blur-md">

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all border ${activeCategory === cat
                  ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/20'
                  : 'bg-[#0c0e12]/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects or locations..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0c0e12]/80 border border-slate-800 focus:border-amber-500 text-white text-xs outline-none transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-[#14171e]/90 rounded-3xl border border-slate-800 space-y-3 backdrop-blur-sm">
            <Building2 className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white font-mono uppercase">No Matching Projects Found</h3>
            <p className="text-slate-400 text-xs">Try selecting a different category or clearing your search filter.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <FadeIn key={project.id} delay={0.1 * (idx % 3)}>
                <Link
                  to={`/projects/${project.id}`}
                  className="group relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950/80 cursor-pointer h-[400px] flex flex-col justify-end block"
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12] via-[#0c0e12]/50 to-transparent group-hover:via-[#0c0e12]/75 transition-colors" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-md bg-[#0c0e12]/90 backdrop-blur-md border border-slate-700 text-amber-400 text-xs font-black uppercase font-mono">
                      {project.category}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 z-10">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${project.status === 'Completed'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Details Overlay */}
                  <div className="relative z-10 p-6 sm:p-8 space-y-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-4 text-xs font-semibold text-amber-400">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {project.location}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Year {project.year}</span>
                    </div>

                    <h3 className="text-2xl font-black text-white font-mono uppercase group-hover:text-amber-400 transition-colors leading-tight">
                      {project.name}
                    </h3>

                    <p className="text-slate-300 text-xs sm:text-sm line-clamp-2 leading-relaxed opacity-90">
                      {project.description}
                    </p>

                    <div className="pt-2 flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider group-hover:text-amber-300">
                      <span>View Specifications</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-amber-500/20 via-[#14171e] to-[#14171e] border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-md">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white font-mono uppercase">
              Have a Project You Would Like to Commission?
            </h3>
            <p className="text-slate-300 text-sm">
              Our engineering estimators review blueprints and project scopes with strict 24-hour turnaround.
            </p>
          </div>

          <button
            onClick={openQuoteModal}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-8 py-4 rounded-xl text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all hover:-translate-y-0.5 shrink-0"
          >
            Request Project Estimate
          </button>
        </div>

      </div>
    </div>
  );
};
