// src/components/home/ContactForm.jsx
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { submitQuoteRequest } from '../../services/api';
import { FadeIn } from '../common/ScrollReveal';

export const ContactForm = ({ onShowToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Commercial',
    budget: '₹25 Cr - ₹50 Cr',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Valid email required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.message.trim()) errs.message = 'Please provide project details';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await submitQuoteRequest(formData);
      setLoading(false);
      setSubmitted(true);
      if (onShowToast) {
        onShowToast('Quote request submitted successfully! Our engineers will contact you shortly.', 'success');
      }
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: 'Commercial',
        budget: '₹25 Cr - ₹50 Cr',
        message: ''
      });
    } catch (err) {
      setLoading(false);
      if (onShowToast) {
        onShowToast('Failed to submit quote request. Please try again.', 'error');
      }
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-950/50 backdrop-blur-[2px] text-slate-100 relative border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left Column: Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">

              <FadeIn delay={0.2}>
                <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-mono tracking-tight leading-tight">
                  LET'S BUILD <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                    SOMETHING GREAT.
                  </span>
                </h2>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="text-slate-300 text-base leading-relaxed font-normal">
                  Whether you need a full turnkey commercial project estimate or civil structural engineering consultation, our senior project estimators respond within 24 hours.
                </p>
              </FadeIn>
            </div>

            {/* Info Cards */}
            <FadeIn delay={0.4} className="space-y-4">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#14171e]/90 border border-slate-800 shadow-md backdrop-blur-sm">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-slate-400 font-mono">Phone Support</div>
                  <div className="text-white font-black text-base font-mono">+91 98765 43210</div>
                  <div className="text-[11px] text-slate-400">Mon - Sat: 8:00 AM - 7:00 PM</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#14171e]/90 border border-slate-800 shadow-md backdrop-blur-sm">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-slate-400 font-mono">Email Inquiries</div>
                  <div className="text-white font-black text-base font-mono">info@buildcore.com</div>
                  <div className="text-[11px] text-slate-400">Direct response from tender department</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#14171e]/90 border border-slate-800 shadow-md backdrop-blur-sm">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-slate-400 font-mono">Headquarters Address</div>
                  <div className="text-white font-bold text-sm">
                    Plot 405, Fortune Towers Zone, Jayadev Vihar, Bhubaneswar, Odisha 751013
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="p-4 rounded-xl bg-[#14171e]/90 border border-slate-800 flex items-center gap-3 text-xs font-semibold text-amber-300">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                <span>All quote submissions are held in strict technical non-disclosure confidence.</span>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Quote Request Form */}
          <div className="lg:col-span-7">
            <FadeIn delay={0.3}>
              <div className="p-8 sm:p-10 rounded-3xl bg-[#14171e]/95 border border-slate-800 shadow-2xl space-y-6 backdrop-blur-xl">

                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-white font-mono uppercase">Request A Formal Quote</h3>
                  <p className="text-slate-400 text-xs font-medium">Fill out the project details below to receive an itemized BOQ assessment.</p>
                </div>

                {submitted ? (
                  <div className="py-12 text-center space-y-4 animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-black text-white uppercase font-mono">Request Received!</h4>
                    <p className="text-slate-300 text-sm max-w-md mx-auto">
                      Thank you for reaching out to BuildCore Construction. Our senior engineering estimator has received your details and will get in touch shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-6 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-amber-400 text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-md"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 font-mono">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Rajesh Sharma"
                          className={`w-full px-4 py-3 rounded-xl bg-[#0c0e12] border ${errors.name ? 'border-red-500' : 'border-slate-800 focus:border-amber-500'
                            } text-white text-sm outline-none transition-all shadow-inner`}
                        />
                        {errors.name && <span className="text-[11px] text-red-400">{errors.name}</span>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 font-mono">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@company.com"
                          className={`w-full px-4 py-3 rounded-xl bg-[#0c0e12] border ${errors.email ? 'border-red-500' : 'border-slate-800 focus:border-amber-500'
                            } text-white text-sm outline-none transition-all shadow-inner`}
                        />
                        {errors.email && <span className="text-[11px] text-red-400">{errors.email}</span>}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 font-mono">
                          Phone Number *
                        </label>
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className={`w-full px-4 py-3 rounded-xl bg-[#0c0e12] border ${errors.phone ? 'border-red-500' : 'border-slate-800 focus:border-amber-500'
                            } text-white text-sm outline-none transition-all shadow-inner`}
                        />
                        {errors.phone && <span className="text-[11px] text-red-400">{errors.phone}</span>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 font-mono">
                          Project Type
                        </label>
                        <select
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#0c0e12] border border-slate-800 focus:border-amber-500 text-white text-sm outline-none transition-all shadow-inner"
                        >
                          <option value="Commercial">Commercial Construction</option>
                          <option value="Residential">Residential Development</option>
                          <option value="Industrial">Industrial Warehousing</option>
                          <option value="Renovation">Renovation & Remodeling</option>
                          <option value="Civil Engineering">Civil & Infrastructure</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 font-mono">
                        Estimated Project Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0c0e12] border border-slate-800 focus:border-amber-500 text-white text-sm outline-none transition-all shadow-inner font-mono"
                      >
                        <option value="Under ₹10 Cr">Under ₹10 Cr</option>
                        <option value="₹10 Cr - ₹25 Cr">₹10 Cr - ₹25 Cr</option>
                        <option value="₹25 Cr - ₹50 Cr">₹25 Cr - ₹50 Cr</option>
                        <option value="₹50 Cr - ₹100 Cr">₹50 Cr - ₹100 Cr</option>
                        <option value="₹100 Cr+">₹100 Cr+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 font-mono">
                        Project Specifications & Scope *
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Describe site location, built-up area (sq ft), target start date, and special engineering requirements..."
                        className={`w-full px-4 py-3 rounded-xl bg-[#0c0e12] border ${errors.message ? 'border-red-500' : 'border-slate-800 focus:border-amber-500'
                          } text-white text-sm outline-none transition-all shadow-inner resize-none`}
                      />
                      {errors.message && <span className="text-[11px] text-red-400">{errors.message}</span>}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:-translate-y-0.5"
                    >
                      <Send className="w-4 h-4" />
                      <span>{loading ? 'Submitting Estimate Request...' : 'Request a Free Quote'}</span>
                    </button>
                  </form>
                )}

              </div>
            </FadeIn>
          </div>

        </div>

      </div>
    </section>
  );
};
