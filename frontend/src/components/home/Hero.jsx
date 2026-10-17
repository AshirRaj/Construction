// src/components/home/Hero.jsx
import React from 'react';
import { ArrowRight, HardHat, Building2, ShieldCheck, ChevronDown } from 'lucide-react';
import { Counter } from '../common/Counter';
import { FadeIn } from '../common/ScrollReveal';
import heroVideo2 from '../../assets/video.mp4'
import heroVideo from '../../assets/video2.mp4';
import { useNavigate } from 'react-router-dom';

export const Hero = ({ onOpenQuoteModal }) => {
  const navigate = useNavigate();
  const handleScrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-28 lg:pt-36 pb-12 overflow-hidden bg-[#0c0e12]">

      {/* 1. Full-Screen Cinematic Construction Hero Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transform scale-[1.02] transition-transform duration-1000"
        >
          <source src={heroVideo2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* 2. Sophisticated Layered Gradient Overlays */}
        {/* Left-to-right gradient: dark on left for text legibility, transparent on right to show fiery construction video */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0e12]/95 via-[#0c0e12]/75 sm:via-[#0c0e12]/60 to-transparent" />

        {/* Top-to-bottom vignette gradient for smooth navbar & footer integration */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e12]/90 via-transparent to-[#0c0e12]" />

        {/* Architectural subtle ambient gold glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent opacity-70" />

        {/* Subtle architectural grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      </div>

      {/* 3. Hero Main Content Container (Left-Aligned Layout) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Hero Content & Call to Actions */}
          <div className="lg:col-span-8 space-y-6 text-left">

            {/* Small Label Badge */}
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-md bg-amber-500/15 border border-amber-500/35 text-amber-400 text-xs font-extrabold uppercase tracking-widest backdrop-blur-md shadow-lg shadow-amber-500/10">
                <HardHat className="w-4 h-4 text-amber-400" />
                <span>BUILDING THE FUTURE • EST. 2011</span>
              </div>
            </FadeIn>

            {/* Main Headline */}
            <FadeIn delay={0.2}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-[1.05] font-mono drop-shadow-md">
                WE BUILD <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 inline-block">
                  WHAT MATTERS.
                </span>
              </h1>
            </FadeIn>

            {/* Supporting Description Text */}
            <FadeIn delay={0.3}>
              <p className="text-base sm:text-xl text-slate-200 max-w-2xl font-normal leading-relaxed drop-shadow">
                Reliable construction solutions built on quality, precision, safety, and decades of engineering experience across commercial, residential, and heavy industrial domains.
              </p>
            </FadeIn>

            {/* Action Buttons */}
            <FadeIn delay={0.4}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigate('/projects')}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-8 py-4 rounded-xl shadow-2xl shadow-amber-500/30 transition-all flex items-center gap-3 text-sm uppercase tracking-wider group transform hover:-translate-y-0.5"
                >
                  <span>View Our Projects</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </button>

                <button
                  onClick={onOpenQuoteModal}
                  className="bg-[#14171e]/85 hover:bg-[#1c2029] text-white font-extrabold px-8 py-4 rounded-xl border border-slate-700/90 hover:border-amber-500/60 transition-all text-sm uppercase tracking-wider backdrop-blur-md hover:-translate-y-0.5 shadow-lg"
                >
                  Get a Free Quote
                </button>
              </div>
            </FadeIn>

            {/* Trust Badges Bar */}
            <FadeIn delay={0.5}>
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>ISO 9001:2015 Quality Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <span>100% On-Time Project Handover</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Floating Architectural Trust Card */}
          <div className="lg:col-span-4 hidden lg:block">
            <FadeIn delay={0.4}>
              <div className="p-6 rounded-2xl bg-[#14171e]/80 border border-slate-700/70 shadow-2xl backdrop-blur-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Live Project Sites</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">ACTIVE</span>
                </div>

                <div className="space-y-2">
                  <div className="text-2xl font-black font-mono text-white">8 Mega Sites</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Currently executing structural framing, post-tensioned decking, and facade works across metropolitan zones.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-bold text-amber-400 font-mono">
                  <span>Zero Safety Incident Record</span>
                  <span>1.2M+ Hrs</span>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>

      {/* 4. Hero Animated Statistics Bar */}
      <FadeIn delay={0.5} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#14171e]/90 border border-slate-800/90 backdrop-blur-xl shadow-2xl">
          <div className="p-4 border-r border-slate-800/80 last:border-none">
            <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">
              <Counter target={250} suffix="+" />
            </div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mt-1">
              Projects Completed
            </div>
          </div>
          <div className="p-4 border-r border-slate-800/80 last:border-none">
            <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">
              <Counter target={98} suffix="%" />
            </div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mt-1">
              Client Satisfaction
            </div>
          </div>
          <div className="p-4 border-r border-slate-800/80 last:border-none">
            <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">
              <Counter target={40} suffix="+" />
            </div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mt-1">
              Professional Engineers
            </div>
          </div>
          <div className="p-4">
            <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">
              <Counter target={100} suffix="%" />
            </div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mt-1">
              Safety Compliance Rate
            </div>
          </div>
        </div>
      </FadeIn>

    </section>
  );
};
