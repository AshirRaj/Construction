// src/pages/admin/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HardHat, Lock, Mail, Eye, EyeOff, AlertCircle, ArrowRight, KeyRound, CheckCircle2, X } from 'lucide-react';
import { resetAdminPassword } from '../../services/api';
import { Modal } from '../../components/common/Modal';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Forgot Password Modal State
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotForm, setForgotForm] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showForgotCurrentPass, setShowForgotCurrentPass] = useState(false);
  const [showForgotNewPass, setShowForgotNewPass] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both email and password');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      setLoading(false);
      navigate('/admin/dashboard');
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Invalid email or password credentials provided');
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');

    if (!forgotForm.email || !forgotForm.currentPassword || !forgotForm.newPassword) {
      setForgotError('Please fill in all required fields');
      return;
    }

    if (forgotForm.newPassword.length < 6) {
      setForgotError('New password must be at least 6 characters long');
      return;
    }

    if (forgotForm.newPassword !== forgotForm.confirmPassword) {
      setForgotError('New password and confirm password do not match');
      return;
    }

    setForgotLoading(true);
    try {
      const res = await resetAdminPassword({
        email: forgotForm.email,
        currentPassword: forgotForm.currentPassword,
        newPassword: forgotForm.newPassword
      });
      setForgotLoading(false);
      setForgotSuccess(res.message || 'Password has been reset successfully!');
      // Pre-fill email in login
      setEmail(forgotForm.email);
      setPassword('');
      setTimeout(() => {
        setIsForgotModalOpen(false);
        setForgotSuccess('');
        setForgotForm({ email: '', currentPassword: '', newPassword: '', confirmPassword: '' });
      }, 2500);
    } catch (err) {
      setForgotLoading(false);
      setForgotError(err.message || 'Failed to reset password. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0e12] flex items-center justify-center p-4 sm:p-6 font-sans relative overflow-hidden">
      
      {/* Subtle Background Blueprint Grid Layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Main Login Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#14171e] border border-slate-800 shadow-2xl space-y-6 backdrop-blur-xl">
          
          {/* Brand Header */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
              <HardHat className="w-7 h-7 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1.5 font-mono">
                <span className="text-xl font-extrabold tracking-wider text-white uppercase">BUILDCORE</span>
                <span className="text-xs tracking-[0.2em] text-amber-400 uppercase font-semibold">ADMIN</span>
              </div>
              <p className="text-xs text-slate-400">Sign in to access your administrative control dashboard</p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@buildcore.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0c0e12] border border-slate-800 focus:border-amber-500 text-white text-xs outline-none transition-colors shadow-inner"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setForgotForm({ ...forgotForm, email: email || '' });
                    setForgotError('');
                    setForgotSuccess('');
                    setIsForgotModalOpen(true);
                  }}
                  className="text-[11px] text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#0c0e12] border border-slate-800 focus:border-amber-500 text-white text-xs outline-none transition-colors shadow-inner font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer hover:-translate-y-0.5"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In To Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer Back Link */}
          <div className="pt-2 border-t border-slate-800/80 text-center">
            <Link
              to="/"
              className="text-xs text-slate-400 hover:text-amber-400 transition-colors font-medium"
            >
              ← Return to BuildCore Public Website
            </Link>
          </div>

        </div>

      </div>

      {/* Forgot / Reset Password Modal */}
      {isForgotModalOpen && (
        <Modal
          isOpen={isForgotModalOpen}
          onClose={() => setIsForgotModalOpen(false)}
          title="Reset Administrator Password"
        >
          <form onSubmit={handleForgotPasswordSubmit} className="space-y-4 text-slate-100">
            
            <p className="text-xs text-slate-300 leading-relaxed">
              To securely reset your password, please verify your identity by providing your registered email, current password, and your new password.
            </p>

            {forgotError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{forgotError}</span>
              </div>
            )}

            {forgotSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{forgotSuccess}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1 font-mono">
                Admin Email Address *
              </label>
              <input
                type="email"
                required
                value={forgotForm.email}
                onChange={(e) => setForgotForm({ ...forgotForm, email: e.target.value })}
                placeholder="admin@buildcore.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1 font-mono">
                Current Password * (Verification)
              </label>
              <div className="relative">
                <input
                  type={showForgotCurrentPass ? 'text' : 'password'}
                  required
                  value={forgotForm.currentPassword}
                  onChange={(e) => setForgotForm({ ...forgotForm, currentPassword: e.target.value })}
                  placeholder="Enter current password"
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-amber-500 outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowForgotCurrentPass(!showForgotCurrentPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  {showForgotCurrentPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1 font-mono">
                  New Password * (Min 6 chars)
                </label>
                <div className="relative">
                  <input
                    type={showForgotNewPass ? 'text' : 'password'}
                    required
                    value={forgotForm.newPassword}
                    onChange={(e) => setForgotForm({ ...forgotForm, newPassword: e.target.value })}
                    placeholder="New password"
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-amber-500 outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowForgotNewPass(!showForgotNewPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                  >
                    {showForgotNewPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1 font-mono">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  required
                  value={forgotForm.confirmPassword}
                  onChange={(e) => setForgotForm({ ...forgotForm, confirmPassword: e.target.value })}
                  placeholder="Repeat new password"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-amber-500 outline-none font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 text-xs font-bold uppercase tracking-wider hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={forgotLoading}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 disabled:opacity-50"
              >
                <span>{forgotLoading ? 'Verifying...' : 'Reset Password'}</span>
              </button>
            </div>

          </form>
        </Modal>
      )}

    </div>
  );
};
