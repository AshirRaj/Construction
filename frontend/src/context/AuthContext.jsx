// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminLogin as apiLogin, adminLogout as apiLogout, getAdminProfile } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      const storedUser = localStorage.getItem('buildcore_auth_user');
      const storedToken = localStorage.getItem('buildcore_auth_token');

      if (storedUser || storedToken) {
        try {
          const profile = await getAdminProfile();
          setUser(profile);
        } catch (err) {
          console.warn('Session verification failed, logging out.');
          localStorage.removeItem('buildcore_auth_user');
          localStorage.removeItem('buildcore_auth_token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    verifySession();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await apiLogin(email, password);
      setUser(res.user);
      setLoading(false);
      return res;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await apiLogout();
      setUser(null);
    } catch (error) {
      console.error('Logout error', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (updatedData) => {
    setUser(prev => {
      const next = { ...prev, ...updatedData };
      localStorage.setItem('buildcore_auth_user', JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
