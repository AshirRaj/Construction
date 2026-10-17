// src/pages/public/AboutPage.jsx
import React, { useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  Building2,
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  HardHat,
  Clock,
  Target
} from 'lucide-react';
import { Counter } from '../../components/common/Counter';
import { FadeIn, ImageReveal, ScaleIn } from '../../components/common/ScrollReveal';
import bgImage from '../../assets/img1.jpeg';

export const AboutPage = () => {
  const { openQuoteModal } = useOutletContext() || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const coreValues = [
    {
      title: "Structural Integrity",
      description: "We never compromise on material grades, structural margins, or engineering safety factors.",
      icon: ShieldCheck
    },
    {
      title: "Punctual Delivery",
      description: "Critical Path Method (CPM) milestone scheduling guarantees on-time project turnover.",
      icon: Clock
    },
    {
      title: "Engineering Innovation",
      description: "Utilizing advanced 3D BIM coordination, drone site telemetry, and pre-engineered steel systems.",
      icon: Target
    },
    {
      title: "Transparent Governance",
      description: "Itemized BOQ billing, real-time client milestone audits, and zero hidden costs.",
      icon: Award
    }
  ];

  const milestones = [
    { year: "2011", title: "Foundation Established", desc: "Started civil structural engineering operations in Bhubaneswar." },
    { year: "2016", title: "Commercial High-Rise Expansion", desc: "Delivered first 20-story commercial tower in Mumbai metropolitan zone." },
    { year: "2020", title: "Industrial Mega-Park EPC", desc: "Expanded into turnkey industrial warehouse & pre-engineered steel complexes." },
    { year: "2026", title: "250+ Turnkey Deliveries", desc: "Over 1.2M safe man-hours logged with ISO 9001:2015 certified quality." }
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

        {/* Page Hero Header & Breadcrumb */}
        <div className="pt-6 border-b border-slate-800/80 pb-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-amber-400 font-bold">About Us</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-3xl text-center mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest font-mono">
                CORPORATE PROFILE
              </div>
              <h1 className="text-4xl sm:text-4xl font-black text-white uppercase font-mono tracking-tight leading-tight">
                PIONEERING MODERN <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                  CIVIL & STRUCTURAL ENGINEERING.
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* Section 1: Main Story & Image Stack */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950/80">
              <ImageReveal
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
                alt="Engineers inspecting construction blueprint"
                className="h-[460px] sm:h-[540px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12]/80 via-transparent to-transparent" />
            </div>

            <ScaleIn delay={0.2} className="absolute -bottom-6 -right-2 sm:right-6">
              <div className="p-6 rounded-2xl bg-[#14171e]/90 border border-slate-700 shadow-2xl backdrop-blur-xl max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white font-mono">
                      <Counter target={15} suffix="+" /> Years
                    </div>
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      Proven Track Record
                    </div>
                  </div>
                </div>
              </div>
            </ScaleIn>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase font-mono tracking-tight leading-tight">
              BUILT ON UNCOMPROMISING PRECISION & TRUST
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Founded in 2011, BuildCore Construction has grown from a specialized civil engineering contractor into a premier nationwide turnkey infrastructure and construction management conglomerate.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Our multidisciplinary team combines seasoned geotechnical engineers, licensed structural architects, BIM digital coordinators, and site safety supervisors to ensure every concrete foundation and steel member exceeds regulatory standards.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#14171e]/90 border border-slate-800 space-y-1">
                <div className="text-2xl font-black text-amber-400 font-mono">
                  <Counter target={250} suffix="+" />
                </div>
                <div className="text-xs uppercase font-bold text-slate-400 font-mono">Delivered Projects</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#14171e]/90 border border-slate-800 space-y-1">
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  <Counter target={100} suffix="%" />
                </div>
                <div className="text-xs uppercase font-bold text-slate-400 font-mono">Safety Compliance</div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={openQuoteModal}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-8 py-4 rounded-xl text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all inline-flex items-center gap-2 hover:-translate-y-0.5"
              >
                <span>Partner With Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Core Engineering Pillars */}
        <div className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase font-mono">
              Our Core Engineering Values
            </h2>
            <p className="text-slate-400 text-sm">
              The fundamental principles that guide every blueprint, foundation pour, and client partnership.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <FadeIn key={idx} delay={0.1 * idx}>
                  <div className="p-6 rounded-2xl bg-[#14171e]/90 border border-slate-800 shadow-xl space-y-4 hover:border-amber-500/50 transition-all hover:-translate-y-1 group">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white uppercase font-mono group-hover:text-amber-400 transition-colors">
                      {val.title}
                    </h3>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

        {/* Section 3: Company Timeline */}
        <div className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase font-mono">
              Milestones of Growth
            </h2>
            <p className="text-slate-400 text-sm">
              Over a decade of landmark engineering achievements and continuous operational scaling.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <FadeIn key={idx} delay={0.1 * idx}>
                <div className="p-6 rounded-2xl bg-[#14171e]/90 border border-slate-800 space-y-3 relative overflow-hidden">
                  <div className="text-3xl font-black text-amber-400 font-mono">
                    {m.year}
                  </div>
                  <h3 className="text-base font-bold text-white uppercase font-mono">
                    {m.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-amber-500/20 via-[#14171e] to-[#14171e] border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white font-mono uppercase">
              Ready to Discuss Your Next Development?
            </h3>
            <p className="text-slate-300 text-sm">
              Connect with our senior engineering team to get an itemized BOQ assessment.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={openQuoteModal}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-8 py-4 rounded-xl text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all hover:-translate-y-0.5"
            >
              Get a Free Quote
            </button>
            <Link
              to="/projects"
              className="px-6 py-4 rounded-xl border border-slate-700 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors"
            >
              View Our Work
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
