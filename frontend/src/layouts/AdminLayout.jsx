// src/layouts/AdminLayout.jsx
import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminNavbar } from '../components/admin/AdminNavbar';
import { Toast } from '../components/common/Toast';
import { getMessages } from '../services/api';

export const AdminLayout = () => {
  const { isAuthenticated, loading } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const msgs = await getMessages();
        const unread = msgs.filter(m => m.status === 'Unread').length;
        setUnreadCount(unread);
      } catch (err) {
        console.error('Error fetching unread count', err);
      }
    };
    if (isAuthenticated) {
      fetchUnreadCount();
    }
  }, [isAuthenticated]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-300 font-mono text-sm">
        Loading BuildCore Admin Portal...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex font-sans">
      {/* Desktop & Mobile Sidebar */}
      <div className={`${mobileSidebarOpen ? 'block' : 'hidden'} lg:block`}>
        <AdminSidebar
          collapsed={collapsed}
          closeMobileSidebar={() => setMobileSidebarOpen(false)}
        />
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${collapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        <AdminNavbar
          toggleSidebar={() => {
            if (window.innerWidth < 1024) {
              setMobileSidebarOpen(!mobileSidebarOpen);
            } else {
              setCollapsed(!collapsed);
            }
          }}
          unreadCount={unreadCount}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet context={{ showToast, refreshUnreadCount: () => setUnreadCount(prev => Math.max(0, prev - 1)) }} />
        </main>
      </div>

      {/* Admin Toast Notice */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </div>
  );
};
