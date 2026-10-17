// src/pages/public/ServicesPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  HardHat,
  Building2,
  ShieldCheck,
  Layers,
  Wrench,
  Cpu
} from 'lucide-react';
import { getServices } from '../../services/api';
import { IconHelper } from '../../components/common/IconHelper';
import { Modal } from '../../components/common/Modal';
import { FadeIn } from '../../components/common/ScrollReveal';
import bgImage from '../../assets/img1.jpeg';

export const ServicesPage = () => {
  const { openQuoteModal } = useOutletContext() || {};
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">

        {/* Page Header */}
        <div className="pt-6 border-b border-slate-800/80 pb-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-amber-400 font-bold">Services</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-3xl text-center mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest font-mono">
                COMPREHENSIVE CAPABILITIES
              </div>
              <h1 className="text-4xl sm:text-4xl font-black text-white uppercase font-mono tracking-tight leading-tight">
                FULL-LIFECYCLE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                  CONSTRUCTION & EPC SERVICES.
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <FadeIn key={service.id} delay={0.1 * idx}>
              <div
                onClick={() => setSelectedService(service)}
                className="group relative p-8 rounded-3xl bg-[#14171e]/90 border border-slate-800 shadow-xl hover:border-amber-500/60 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col justify-between overflow-hidden backdrop-blur-sm"
              >
                {/* Top Index & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black font-mono text-slate-600 group-hover:text-amber-400 transition-colors">
                    0{idx + 1}
                  </span>
                  <div className="w-14 h-14 rounded-2xl bg-[#0c0e12] border border-slate-800 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow-inner">
                    <IconHelper name={service.iconName} className="w-7 h-7 stroke-[2]" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white uppercase font-mono group-hover:text-amber-400 transition-colors">
                    {service.title}
                  </h3>
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">
                    {service.subtitle}
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  <div className="pt-2 space-y-2">
                    {(service.features || []).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-8 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-amber-400 uppercase tracking-wider group-hover:text-amber-300">
                  <span>View Specifications</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Technical Standards Section */}
        <div className="p-10 sm:p-14 rounded-3xl bg-[#14171e]/90 border border-slate-800 space-y-8 backdrop-blur-md">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase font-mono">
              Engineering Delivery Standards
            </h2>
            <p className="text-slate-400 text-xs">
              Every project follows stringent quality assurance protocols and non-destructive structural audits.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-[#0c0e12]/90 border border-slate-800 space-y-2">
              <div className="text-amber-400 font-mono font-black text-lg">ISO 9001:2015</div>
              <div className="text-white text-sm font-bold uppercase font-mono">Quality Certified</div>
              <p className="text-slate-400 text-xs leading-relaxed">Standardized concrete testing, rebar pull tests, and calibrated batch plant audits.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0c0e12]/90 border border-slate-800 space-y-2">
              <div className="text-amber-400 font-mono font-black text-lg">BIM Level 2</div>
              <div className="text-white text-sm font-bold uppercase font-mono">Digital Coordination</div>
              <p className="text-slate-400 text-xs leading-relaxed">Full 3D MEP clash detection and structural schedule forecasting prior to excavation.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0c0e12]/90 border border-slate-800 space-y-2">
              <div className="text-amber-400 font-mono font-black text-lg">OSHA 1926</div>
              <div className="text-white text-sm font-bold uppercase font-mono">Zero Incident Protocol</div>
              <p className="text-slate-400 text-xs leading-relaxed">Daily safety briefings, mandatory PPE enforcement, and dedicated on-site HSE officers.</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-amber-500/20 via-[#14171e] to-[#14171e] border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white font-mono uppercase">
              Need a Custom Engineering Quote?
            </h3>
            <p className="text-slate-300 text-sm">
              Submit your project scope to receive a fast, detailed BOQ assessment.
            </p>
          </div>

          <button
            onClick={openQuoteModal}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-8 py-4 rounded-xl text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all hover:-translate-y-0.5 shrink-0"
          >
            Request a Quote
          </button>
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <Modal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          title={selectedService.title}
        >
          <div className="space-y-6 text-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                <IconHelper name={selectedService.iconName} className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white font-mono uppercase">{selectedService.title}</h4>
                <p className="text-xs text-amber-400 font-medium uppercase tracking-wider">{selectedService.subtitle}</p>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              {selectedService.description}
            </p>

            <div className="space-y-3 pt-2">
              <h5 className="text-xs font-bold text-white uppercase tracking-widest border-b border-slate-800 pb-2 font-mono">
                Core Engineering Capabilities
              </h5>
              <div className="grid sm:grid-cols-2 gap-3">
                {(selectedService.features || []).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-200 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => {
                  setSelectedService(null);
                  if (openQuoteModal) openQuoteModal();
                }}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-lg"
              >
                Inquire For Your Project
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
