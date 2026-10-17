// src/pages/public/ContactPage.jsx

import React, { useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  ChevronRight
} from 'lucide-react';
import { ContactForm } from '../../components/home/ContactForm';
import bgImage from '../../assets/img1.jpeg';

export const ContactPage = () => {
  const { showToast } = useOutletContext() || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#0c0e12] text-slate-100 min-h-screen pt-24 pb-24 relative overflow-hidden">

      {/* =====================================================
          FIXED BACKGROUND
      ====================================================== */}
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


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">


        {/* =====================================================
            PAGE HEADER
        ====================================================== */}
        <div className="pt-6 border-b border-slate-800/80 pb-8 space-y-4">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">

            <Link
              to="/"
              className="hover:text-amber-400 transition-colors"
            >
              Home
            </Link>

            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />

            <span className="text-amber-400 font-bold">
              Contact Us
            </span>

          </div>

          {/* Header Content */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-1">

            <div className="space-y-0 max-w-1xl text-center mx-auto">

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest font-mono">
                GET IN TOUCH
              </div>

              <h1 className="text-4xl sm:text-4xl font-black text-white uppercase font-mono tracking-tight leading-tight">
                LET'S DISCUSS YOUR <br />

                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                  NEXT CONSTRUCTION PROJECT.
                </span>
              </h1>

            </div>

          </div>

        </div>


        {/* =====================================================
            CONTACT FORM
            DISPLAYED FIRST
        ====================================================== */}
        <div className="rounded-3xl overflow-hidden border border-slate-800 bg-[#14171e]/50 backdrop-blur-xl">

          <ContactForm
            onShowToast={showToast}
          />

        </div>


        {/* =====================================================
            REGIONAL OFFICES
            DISPLAYED AFTER CONTACT FORM
        ====================================================== */}
        <div className="space-y-6">

          <div>
            <div className="text-xs font-bold text-amber-400 font-mono uppercase tracking-widest mb-2">
              OUR LOCATIONS
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase font-mono">
              REGIONAL OFFICES
            </h2>
          </div>


          <div className="grid sm:grid-cols-3 gap-6">

            {/* =================================================
                BHUBANESWAR
            ================================================== */}
            <div className="p-6 rounded-3xl bg-[#14171e]/90 border border-slate-800 space-y-3 backdrop-blur-sm hover:border-amber-500/40 transition-colors">

              <div className="text-xs font-bold text-amber-400 font-mono uppercase tracking-wider">
                Corporate Headquarters
              </div>

              <h3 className="text-lg font-black text-white uppercase font-mono">
                Bhubaneswar Office
              </h3>

              <p className="text-slate-400 text-xs leading-relaxed">
                Plot 405, Fortune Towers Zone, Jayadev Vihar,
                Bhubaneswar, Odisha 751013
              </p>

              <div className="pt-2 text-xs text-slate-300 font-mono font-bold">
                +91 98765 43210
              </div>

            </div>


            {/* =================================================
                MUMBAI
            ================================================== */}
            <div className="p-6 rounded-3xl bg-[#14171e]/90 border border-slate-800 space-y-3 backdrop-blur-sm hover:border-amber-500/40 transition-colors">

              <div className="text-xs font-bold text-amber-400 font-mono uppercase tracking-wider">
                Western Regional Center
              </div>

              <h3 className="text-lg font-black text-white uppercase font-mono">
                Mumbai Office
              </h3>

              <p className="text-slate-400 text-xs leading-relaxed">
                Level 14, Platina Tower, Bandra Kurla Complex
                (BKC), Mumbai, Maharashtra 400051
              </p>

              <div className="pt-2 text-xs text-slate-300 font-mono font-bold">
                +91 98765 43211
              </div>

            </div>


            {/* =================================================
                BANGALORE
            ================================================== */}
            <div className="p-6 rounded-3xl bg-[#14171e]/90 border border-slate-800 space-y-3 backdrop-blur-sm hover:border-amber-500/40 transition-colors">

              <div className="text-xs font-bold text-amber-400 font-mono uppercase tracking-wider">
                Southern Regional Center
              </div>

              <h3 className="text-lg font-black text-white uppercase font-mono">
                Bangalore Office
              </h3>

              <p className="text-slate-400 text-xs leading-relaxed">
                4th Floor, Prestige Meridian, MG Road,
                Bangalore, Karnataka 560001
              </p>

              <div className="pt-2 text-xs text-slate-300 font-mono font-bold">
                +91 98765 43212
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};