// src/pages/public/ProjectDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useOutletContext } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Building2, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  HardHat, 
  ShieldAlert, 
  ArrowRight, 
  Layers,
  ChevronRight
} from 'lucide-react';
import { getProjectById } from '../../services/api';
import { FadeIn, ScaleIn } from '../../components/common/ScrollReveal';
import bgImage from '../../assets/img1.jpeg';

export const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const outletContext = useOutletContext();
  const openQuoteModal = outletContext?.openQuoteModal;

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProject = async () => {
      setLoading(true);
      try {
        const data = await getProjectById(id);
        setProject(data);
        if (data && data.image) {
          setSelectedGalleryImg(data.image);
        }
      } catch (err) {
        console.error('Error fetching project:', err);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0c0e12] flex items-center justify-center pt-24 pb-16">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mx-auto" />
          <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">Loading Project Specifications...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0c0e12] flex items-center justify-center px-4 pt-28 pb-16 text-white">
        <div className="max-w-md w-full text-center p-8 rounded-3xl bg-[#14171e] border border-slate-800 shadow-2xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
            <HardHat className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black font-mono uppercase">Project Not Found</h2>
            <p className="text-slate-400 text-sm">
              The project ID <span className="text-amber-400 font-mono">"{id}"</span> does not exist or has been relocated.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Projects</span>
          </Link>
        </div>
      </div>
    );
  }

  const galleryImages = project.gallery && project.gallery.length > 0 
    ? project.gallery 
    : [project.image];

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
        <div className="absolute inset-0 bg-[#0c0e12]/80" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Top Breadcrumbs & Back Action */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link to="/#projects" className="hover:text-amber-400 transition-colors">Projects</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-amber-400 font-bold truncate max-w-xs">{project.name}</span>
          </div>

          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-amber-400 px-4 py-2 rounded-xl bg-[#14171e] border border-slate-800 hover:border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>
        </div>

        {/* 1. Cinematic Project Hero Banner */}
        <FadeIn delay={0.1}>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 h-[360px] sm:h-[480px] lg:h-[540px] flex flex-col justify-end">
            <img
              src={selectedGalleryImg || project.image}
              alt={project.name}
              className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700"
            />
            {/* Dark Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12] via-[#0c0e12]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c0e12]/90 via-[#0c0e12]/40 to-transparent" />

            {/* Top Badges */}
            <div className="absolute top-6 left-6 flex flex-wrap gap-2.5 z-10">
              <span className="px-3.5 py-1.5 rounded-lg bg-[#0c0e12]/90 backdrop-blur-md border border-amber-500/40 text-amber-400 text-xs font-black uppercase font-mono tracking-wider">
                {project.category}
              </span>
              <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
                project.status === 'Completed'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}>
                {project.status}
              </span>
            </div>

            {/* Bottom Title & Key Metadata */}
            <div className="relative z-10 p-6 sm:p-10 space-y-4 max-w-4xl">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase font-mono tracking-tight leading-tight drop-shadow-lg">
                {project.name}
              </h1>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm font-semibold text-slate-300">
                <span className="flex items-center gap-1.5 text-amber-400 font-mono">
                  <MapPin className="w-4 h-4" /> {project.location}
                </span>
                <span className="flex items-center gap-1.5 text-slate-300 font-mono">
                  <Calendar className="w-4 h-4 text-amber-400" /> Year {project.year}
                </span>
                {project.client && (
                  <span className="flex items-center gap-1.5 text-slate-300 font-mono">
                    <Building2 className="w-4 h-4 text-amber-400" /> Client: {project.client}
                  </span>
                )}
                {project.duration && (
                  <span className="flex items-center gap-1.5 text-slate-300 font-mono">
                    <Clock className="w-4 h-4 text-amber-400" /> Duration: {project.duration}
                  </span>
                )}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 2. Key Engineering Specifications Cards Strip */}
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl bg-[#14171e]/90 border border-slate-800 backdrop-blur-xl shadow-xl">
            <div className="p-4 border-r border-slate-800/80 last:border-none">
              <div className="text-xs uppercase font-bold text-slate-400 font-mono">Project Budget</div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono mt-1">
                {project.budget || '₹35 Cr+'}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Approved Estimate</div>
            </div>

            <div className="p-4 border-r border-slate-800/80 last:border-none">
              <div className="text-xs uppercase font-bold text-slate-400 font-mono">Execution Status</div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1">
                {project.status}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">{project.completionDate ? `Target: ${project.completionDate}` : 'On Schedule'}</div>
            </div>

            <div className="p-4 border-r border-slate-800/80 last:border-none">
              <div className="text-xs uppercase font-bold text-slate-400 font-mono">Construction Domain</div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1">
                {project.category}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Turnkey EPC Delivery</div>
            </div>

            <div className="p-4">
              <div className="text-xs uppercase font-bold text-slate-400 font-mono">Site Safety Rating</div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1">
                100% Zero LTI
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">OSHA Compliant</div>
            </div>
          </div>
        </FadeIn>

        {/* 3. Main Project Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left 8 Cols: Overview, Scope, Highlights, Challenge */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* About Project */}
            <FadeIn delay={0.3} className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest font-mono">
                OVERVIEW
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-mono uppercase">
                About The Project
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
                {project.description}
              </p>
            </FadeIn>

            {/* Scope of Work */}
            {project.scope && project.scope.length > 0 && (
              <FadeIn delay={0.4} className="p-8 rounded-3xl bg-[#14171e]/85 border border-slate-800 shadow-xl space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white uppercase font-mono">Scope of Engineering Work</h3>
                    <p className="text-xs text-slate-400">Structural, mechanical, and architectural responsibilities executed</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  {project.scope.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-slate-200 text-sm font-semibold p-3 rounded-xl bg-[#0c0e12] border border-slate-800/80">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            )}

            {/* Key Project Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <FadeIn delay={0.45} className="space-y-4">
                <h3 className="text-xl font-black text-white uppercase font-mono">Project Highlights</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.highlights.map((highlight, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-[#14171e]/80 border border-slate-800 flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0" />
                      <span className="text-slate-200 text-sm leading-relaxed font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            )}

            {/* Construction Challenges & Solutions */}
            {project.challenges && (
              <FadeIn delay={0.5} className="p-8 rounded-3xl bg-amber-500/5 border border-amber-500/25 space-y-4">
                <div className="flex items-center gap-3 text-amber-400">
                  <ShieldAlert className="w-6 h-6 shrink-0" />
                  <h3 className="text-lg font-black uppercase font-mono">Engineering Challenges & Solutions</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed font-normal">
                  {project.challenges}
                </p>
              </FadeIn>
            )}

            {/* Project Gallery */}
            <FadeIn delay={0.55} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-white uppercase font-mono">Project Gallery</h3>
                <span className="text-xs text-slate-400 font-mono">{galleryImages.length} Photographs</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {galleryImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedGalleryImg(imgUrl)}
                    className={`relative rounded-2xl overflow-hidden h-28 sm:h-36 border transition-all ${
                      selectedGalleryImg === imgUrl 
                        ? 'border-amber-500 ring-2 ring-amber-500/50 scale-102' 
                        : 'border-slate-800 opacity-75 hover:opacity-100 hover:border-slate-700'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${project.name} photo ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </FadeIn>

          </div>

          {/* Right 4 Cols: Project Statistics & Quote Action Card */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Custom Project Stats Card */}
            {project.stats && project.stats.length > 0 && (
              <FadeIn delay={0.35} className="p-6 rounded-3xl bg-[#14171e] border border-slate-800 shadow-xl space-y-5">
                <h3 className="text-base font-black text-white font-mono uppercase border-b border-slate-800 pb-3">
                  Technical Project Data
                </h3>

                <div className="space-y-4">
                  {project.stats.map((stat, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-800/60 last:border-none">
                      <span className="text-xs text-slate-400 uppercase font-mono">{stat.label}</span>
                      <span className="text-sm font-black text-amber-400 font-mono">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            )}

            {/* Inquire / Quote Action Card */}
            <FadeIn delay={0.4} className="p-8 rounded-3xl bg-gradient-to-b from-[#14171e] to-slate-950 border border-amber-500/30 shadow-2xl space-y-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
                <HardHat className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-white font-mono uppercase">
                  Planning A Similar Project?
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Get a comprehensive engineering assessment and itemized BOQ estimate from our senior technical team.
                </p>
              </div>

              <button
                onClick={() => {
                  if (openQuoteModal) {
                    openQuoteModal();
                  } else {
                    navigate('/#contact');
                  }
                }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <span>Request Project Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-[11px] text-slate-500 font-mono">
                Response turnaround: Under 24 hours
              </div>
            </FadeIn>

          </div>

        </div>

        {/* Bottom Navigation CTA */}
        <div className="pt-12 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl bg-[#14171e] border border-slate-800 hover:border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>

          <button
            onClick={() => {
              if (openQuoteModal) {
                openQuoteModal();
              } else {
                navigate('/#contact');
              }
            }}
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl border border-amber-500/40 hover:bg-amber-500/10 transition-colors font-mono"
          >
            <span>Discuss Tender Specs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
