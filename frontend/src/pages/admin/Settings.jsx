// src/pages/admin/Settings.jsx
import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Save, Building, Share2, User, Key, CheckCircle2, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { getCompanySettings, updateCompanySettings, resetAdminPassword } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export const Settings = () => {
  const { showToast } = useOutletContext();
  const { user, updateUser } = useAuth();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('company');

  // Change / Forgot Password Form State
  const [passForm, setPassForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passLoading, setPassLoading] = useState(false);
  const [passError, setPassError] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getCompanySettings();
        if (data) {
          setSettings(data);
          // If auth user has updated name/email, sync with settings state
          if (user && data.adminProfile) {
            setSettings(prev => ({
              ...prev,
              adminProfile: {
                ...prev.adminProfile,
                name: user.name || prev.adminProfile.name,
                email: user.email || prev.adminProfile.email
              }
            }));
          }
        }
      } catch (err) {
        showToast('Error loading company settings', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e?.preventDefault();
    setSaving(true);
    try {
      const res = await updateCompanySettings(settings);
      setSaving(false);
      
      // Update AuthContext user state immediately so the navbar reflects the new name and email
      if (settings.adminProfile) {
        updateUser({
          name: settings.adminProfile.name,
          email: settings.adminProfile.email
        });
      }

      showToast('Settings and admin profile updated successfully!', 'success');
    } catch (err) {
      setSaving(false);
      showToast(err.message || 'Failed to save settings', 'error');
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPassError('');

    if (!passForm.currentPassword || !passForm.newPassword) {
      setPassError('Please enter both your current password and new password');
      return;
    }

    if (passForm.newPassword.length < 6) {
      setPassError('New password must be at least 6 characters long');
      return;
    }

    if (passForm.newPassword !== passForm.confirmPassword) {
      setPassError('New password and confirm password do not match');
      return;
    }

    setPassLoading(true);
    try {
      const email = settings?.adminProfile?.email || user?.email;
      await resetAdminPassword({
        email,
        currentPassword: passForm.currentPassword,
        newPassword: passForm.newPassword
      });
      setPassLoading(false);
      setPassForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      showToast('Admin password updated successfully!', 'success');
    } catch (err) {
      setPassLoading(false);
      setPassError(err.message || 'Failed to update password. Please check your current password.');
      showToast(err.message || 'Password update failed', 'error');
    }
  };

  if (loading || !settings) {
    return <div className="text-slate-400 font-mono text-xs p-8">Loading settings...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-mono uppercase tracking-tight">System Settings</h1>
          <p className="text-slate-500 text-xs sm:text-sm">Manage company credentials, public contact metadata, social links, and security profile</p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      {/* Tabs Header */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveTab('company')}
          className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${activeTab === 'company'
            ? 'border-amber-500 text-amber-600 bg-amber-50/50'
            : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
        >
          <Building className="w-4 h-4" />
          <span>Company Info</span>
        </button>

        <button
          onClick={() => setActiveTab('social')}
          className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${activeTab === 'social'
            ? 'border-amber-500 text-amber-600 bg-amber-50/50'
            : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
        >
          <Share2 className="w-4 h-4" />
          <span>Social Media Links</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${activeTab === 'profile'
            ? 'border-amber-500 text-amber-600 bg-amber-50/50'
            : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
        >
          <User className="w-4 h-4" />
          <span>Admin Profile & Security</span>
        </button>
      </div>

      {/* Form Container */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">

        {/* Company Info Tab */}
        {activeTab === 'company' && (
          <form onSubmit={handleSave} className="space-y-4 animate-fade-in">
            <h3 className="text-sm font-bold text-slate-900 font-mono uppercase border-b border-slate-100 pb-2">
              Corporate Headquarters Information
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Company Registered Name</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-amber-500 outline-none"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-amber-500 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Official Email</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Head Office Address</label>
              <textarea
                rows={2}
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-amber-500 outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Website URL</label>
              <input
                type="url"
                value={settings.website}
                onChange={(e) => setSettings({ ...settings, website: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-amber-500 outline-none font-mono"
              />
            </div>
          </form>
        )}

        {/* Social Links Tab */}
        {activeTab === 'social' && (
          <form onSubmit={handleSave} className="space-y-4 animate-fade-in">
            <h3 className="text-sm font-bold text-slate-900 font-mono uppercase border-b border-slate-100 pb-2">
              Social Media Channels
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Facebook Profile URL</label>
              <input
                type="url"
                value={settings.socialLinks?.facebook || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, facebook: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-amber-500 outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Instagram Handle URL</label>
              <input
                type="url"
                value={settings.socialLinks?.instagram || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, instagram: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-amber-500 outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">LinkedIn Company Page</label>
              <input
                type="url"
                value={settings.socialLinks?.linkedin || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, linkedin: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-amber-500 outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">YouTube Channel</label>
              <input
                type="url"
                value={settings.socialLinks?.youtube || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, youtube: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-amber-500 outline-none font-mono"
              />
            </div>
          </form>
        )}

        {/* Profile & Security Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* 1. Admin Name and Email Edit */}
            <form onSubmit={handleSave} className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 font-mono uppercase border-b border-slate-100 pb-2">
                Administrator Profile Details
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Admin Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.adminProfile?.name || ''}
                    onChange={(e) => setSettings({
                      ...settings,
                      adminProfile: { ...settings.adminProfile, name: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-amber-500 outline-none"
                    placeholder="Alex Mercer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Admin Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={settings.adminProfile?.email || ''}
                    onChange={(e) => setSettings({
                      ...settings,
                      adminProfile: { ...settings.adminProfile, email: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-amber-500 outline-none"
                    placeholder="admin@buildcore.com"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  {saving ? 'Updating Profile...' : 'Save Name & Email'}
                </button>
              </div>
            </form>

            {/* 2. Forgot / Change Password Security Section */}
            <form onSubmit={handlePasswordUpdate} className="space-y-4 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm uppercase font-mono">
                <Key className="w-4 h-4 text-amber-500" />
                <span>Change / Forgot Security Password</span>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                To update or reset your administrator password, verification of your <strong>current password</strong> is required.
              </p>

              {passError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{passError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1 font-mono">
                  Current Password *
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPass ? 'text' : 'password'}
                    required
                    value={passForm.currentPassword}
                    onChange={(e) => setPassForm({ ...passForm, currentPassword: e.target.value })}
                    placeholder="Enter current password for verification"
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-amber-500 outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1 font-mono">
                    New Password * (Min 6 chars)
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPass ? 'text' : 'password'}
                      required
                      value={passForm.newPassword}
                      onChange={(e) => setPassForm({ ...passForm, newPassword: e.target.value })}
                      placeholder="Enter new password"
                      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-amber-500 outline-none font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1 font-mono">
                    Confirm New Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={passForm.confirmPassword}
                    onChange={(e) => setPassForm({ ...passForm, confirmPassword: e.target.value })}
                    placeholder="Repeat new password"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-amber-500 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={passLoading}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  <Key className="w-3.5 h-3.5 text-amber-400" />
                  <span>{passLoading ? 'Verifying & Updating...' : 'Update Password'}</span>
                </button>
              </div>
            </form>

          </div>
        )}

      </div>
    </div>
  );
};
