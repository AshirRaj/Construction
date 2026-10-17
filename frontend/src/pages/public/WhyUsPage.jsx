// src/pages/public/WhyUsPage.jsx
import React, { useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  ShieldCheck,
  HardHat,
  Award,
  Banknote,
  Clock,
  Cpu,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Building2
} from 'lucide-react';
import { whyChooseUsFeatures, companyStats } from '../../data/mockData';
import { IconHelper } from '../../components/common/IconHelper';
import { Counter } from '../../components/common/Counter';
import { FadeIn, ImageReveal } from '../../components/common/ScrollReveal';
import bgImage from '../../assets/img1.jpeg';

export const WhyUsPage = () => {
  const { openQuoteModal } = useOutletContext() || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const differentiators = [
    {
      title: "In-House Heavy Fleet & Batching",
      desc: "We own and operate automated concrete batching plants, tower cranes, and piling rigs, eliminating third-party rental delays."
    },
    {
      title: "Digital BIM & Drone Telemetry",
      desc: "Weekly aerial photogrammetry and cloud 3D structural clash audits keep clients informed with transparent progress."
    },
    {
      title: "Direct Steel & Cement Sourcing",
      desc: "Tier-1 direct manufacturer contracts with primary steel & cement producers guarantee material authenticity and cost efficiency."
    },
    {
      title: "Decade-Long Structural Warranty",
      desc: "Comprehensive 10-year structural warranty and dedicated post-occupancy facility maintenance support."
    }
  ];

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">

        {/* Page Header */}
        <div className="pt-6 border-b border-slate-800/80 pb-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-amber-400 font-bold">Why Choose Us</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-0 max-w-3xl text-center mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest font-mono">
                ENGINEERING ADVANTAGE
              </div>
              <h1 className="text-4xl sm:text-4xl font-black text-white uppercase font-mono tracking-tight leading-tight">
                PRECISION ENGINEERING, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                  UNWAVERING SAFETY & TRUST.
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* 6 Core Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUsFeatures.map((feat, idx) => (
            <FadeIn key={idx} delay={0.1 * idx}>
              <div className="p-8 rounded-3xl bg-[#14171e]/90 border border-slate-800 shadow-xl hover:border-amber-500/50 transition-all hover:-translate-y-1 group space-y-4 backdrop-blur-sm">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow-inner">
                  <IconHelper name={feat.iconName} className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white uppercase font-mono group-hover:text-amber-400 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-[#14171e]/90 border border-slate-800 backdrop-blur-xl">
          {companyStats.slice(0, 4).map((stat, idx) => (
            <div key={idx} className="text-center space-y-1 p-4 border-r border-slate-800/80 last:border-none">
              <div className="text-4xl sm:text-5xl font-black text-amber-400 font-mono">
                <Counter target={stat.numericValue || stat.value} suffix={stat.value.replace(/[0-9]/g, '')} />
              </div>
              <div className="text-xs uppercase font-bold text-slate-300 font-mono">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Deep Differentiators */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
              <ImageReveal
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80"
                alt="Engineers supervising modern construction facility"
                className="h-[480px]"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase font-mono tracking-tight">
              Why Institutional Developers Choose BuildCore
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              We operate as a true turnkey engineering partner rather than a transactional contractor. Our integrated supply chain and in-house fabrication minimize site bottlenecks.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {differentiators.map((diff, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-[#14171e]/90 border border-slate-800 space-y-2 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-amber-400 text-sm font-bold font-mono uppercase">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{diff.title}</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {diff.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-amber-500/20 via-[#14171e] to-[#14171e] border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-md">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white font-mono uppercase">
              Experience the BuildCore Engineering Standard
            </h3>
            <p className="text-slate-300 text-sm">
              Schedule a site audit or discuss technical specifications for your upcoming tender.
            </p>
          </div>

          <button
            onClick={openQuoteModal}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-8 py-4 rounded-xl text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all hover:-translate-y-0.5 shrink-0"
          >
            Start Your Project
          </button>
        </div>

      </div>
    </div>
  );
};
