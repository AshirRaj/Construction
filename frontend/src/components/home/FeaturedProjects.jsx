// src/components/home/FeaturedProjects.jsx
import React, { useState } from 'react';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { FadeIn } from '../common/ScrollReveal';

export const FeaturedProjects = ({ projects = [] }) => {
  const [activeTab, setActiveTab] = useState('All');
  const navigate = useNavigate();

  const categories = ['All', 'Commercial', 'Residential', 'Industrial', 'Civil Engineering'];

  const safeProjects = projects || [];
  const filteredProjects = activeTab === 'All'
    ? safeProjects
    : safeProjects.filter((p) => p.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <section id="featured-projects" className="py-24 bg-slate-950/50 backdrop-blur-[2px] text-slate-100 relative border-t border-slate-800/60">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header & Category Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <FadeIn delay={0.2}>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-mono tracking-tight leading-tight">
                PROJECTS THAT <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                  SPEAK FOR THEMSELVES.
                </span>
              </h2>
            </FadeIn>
          </div>

          {/* Category Filter Tabs */}
          <FadeIn delay={0.3} className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all border ${activeTab === cat
                  ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-lg shadow-amber-500/20'
                  : 'bg-[#14171e]/90 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
              >
                {cat}
              </button>
            ))}
          </FadeIn>
        </div>

        {/* Asymmetric Architectural Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => {

            return (
              <FadeIn key={project.id} delay={0.1 * (idx % 3)} className="lg:col-span-1">
                <Link
                  to={`/projects/${project.id}`}
                  className="group relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 bg-slate-950/90 cursor-pointer h-[350px] sm:h-[400px] flex flex-col justify-end block"
                >
                  {/* Project Photo with Smooth Scale Animation */}
                  <img
                    src={project.image}
                    alt={project.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12] via-[#0c0e12]/50 to-transparent group-hover:via-[#0c0e12]/75 transition-colors duration-300" />

                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-md bg-slate-950/90 backdrop-blur-md border border-slate-700 text-amber-400 text-xs font-black uppercase font-mono">
                      {project.category}
                    </span>
                  </div>

                  {/* Status Tag */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${project.status === 'Completed'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Details Overlay with slide-up motion */}
                  <div className="relative z-10 p-6 sm:p-8 space-y-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-4 text-xs font-semibold text-amber-400">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {project.location}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Year {project.year}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-white font-mono uppercase group-hover:text-amber-400 transition-colors leading-tight">
                      {project.name}
                    </h3>

                    <p className="text-slate-300 text-xs sm:text-sm line-clamp-2 leading-relaxed opacity-90">
                      {project.description}
                    </p>

                    <div className="pt-2 flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider group-hover:text-amber-300">
                      <span>View Full Project Specs</span>
                      <ArrowRight className="w-4 h-4 transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>

      </div>
    </section>
  );
};
