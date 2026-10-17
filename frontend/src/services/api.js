// src/services/api.js
import axios from 'axios';

// Backend Base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Enables sending and receiving HTTP-only secure cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios Request Interceptor: inject Bearer Token if stored in localStorage
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('buildcore_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Axios Response Interceptor: handle unauthorized responses gracefully
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('buildcore_auth_user');
        localStorage.removeItem('buildcore_auth_token');
      }
    }
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred.';
    return Promise.reject(new Error(message));
  }
);


// ----------------------------------------------------
// 1. PROJECTS API
// ----------------------------------------------------
export const getProjects = async (params = {}) => {
  const res = await apiClient.get('/projects', { params });
  return res.data.data || [];
};

export const getProjectById = async (id) => {
  const res = await apiClient.get(`/projects/${id}`);
  return res.data.data || null;
};

export const createProject = async (projectData) => {
  const res = await apiClient.post('/projects', projectData);
  return res.data.data;
};

export const updateProject = async (id, projectData) => {
  const res = await apiClient.put(`/projects/${id}`, projectData);
  return res.data.data;
};

export const deleteProject = async (id) => {
  const res = await apiClient.delete(`/projects/${id}`);
  return res.data;
};


// ----------------------------------------------------
// 2. SERVICES API
// ----------------------------------------------------
export const getServices = async () => {
  const res = await apiClient.get('/services');
  return res.data.data || [];
};

export const createService = async (serviceData) => {
  const res = await apiClient.post('/services', serviceData);
  return res.data.data;
};

export const updateService = async (id, serviceData) => {
  const res = await apiClient.put(`/services/${id}`, serviceData);
  return res.data.data;
};

export const deleteService = async (id) => {
  const res = await apiClient.delete(`/services/${id}`);
  return res.data;
};


// ----------------------------------------------------
// 3. TESTIMONIALS API
// ----------------------------------------------------
export const getTestimonials = async (status) => {
  const res = await apiClient.get('/testimonials', { params: status ? { status } : {} });
  return res.data.data || [];
};

export const createTestimonial = async (testimonialData) => {
  const res = await apiClient.post('/testimonials', testimonialData);
  return res.data.data;
};

export const updateTestimonial = async (id, testimonialData) => {
  const res = await apiClient.put(`/testimonials/${id}`, testimonialData);
  return res.data.data;
};

export const deleteTestimonial = async (id) => {
  const res = await apiClient.delete(`/testimonials/${id}`);
  return res.data;
};


// ----------------------------------------------------
// 4. QUOTE REQUESTS API
// ----------------------------------------------------
export const submitQuoteRequest = async (quoteData) => {
  const res = await apiClient.post('/quotes', quoteData);
  return res.data.data;
};

export const getQuoteRequests = async (status) => {
  const res = await apiClient.get('/quotes', { params: status ? { status } : {} });
  return res.data.data || [];
};

export const getQuoteById = async (id) => {
  const res = await apiClient.get(`/quotes/${id}`);
  return res.data.data;
};

export const updateQuoteStatus = async (id, newStatus) => {
  const res = await apiClient.patch(`/quotes/${id}`, { status: newStatus });
  return res.data.data;
};

export const deleteQuoteRequest = async (id) => {
  const res = await apiClient.delete(`/quotes/${id}`);
  return res.data;
};


// ----------------------------------------------------
// 5. MESSAGES API
// ----------------------------------------------------
export const submitContactMessage = async (messageData) => {
  const res = await apiClient.post('/messages', messageData);
  return res.data.data;
};

export const getMessages = async (status) => {
  const res = await apiClient.get('/messages', { params: status ? { status } : {} });
  return res.data.data || [];
};

export const updateMessageStatus = async (id, newStatus) => {
  const res = await apiClient.patch(`/messages/${id}`, { status: newStatus });
  return res.data.data;
};

export const deleteMessage = async (id) => {
  const res = await apiClient.delete(`/messages/${id}`);
  return res.data;
};


// ----------------------------------------------------
// 6. SETTINGS API
// ----------------------------------------------------
export const getCompanySettings = async () => {
  const res = await apiClient.get('/settings');
  return res.data.data;
};

export const updateCompanySettings = async (newSettings) => {
  const res = await apiClient.put('/settings', newSettings);
  return res.data;
};


// ----------------------------------------------------
// 7. DASHBOARD ANALYTICS API
// ----------------------------------------------------
export const getDashboardStats = async () => {
  const res = await apiClient.get('/dashboard/stats');
  return res.data.data;
};


// ----------------------------------------------------
// 8. AUTHENTICATION & SECURITY API
// ----------------------------------------------------
export const adminLogin = async (email, password) => {
  const res = await apiClient.post('/auth/login', { email, password });
  const { user, token } = res.data;
  if (user) {
    localStorage.setItem('buildcore_auth_user', JSON.stringify(user));
  }
  if (token) {
    localStorage.setItem('buildcore_auth_token', token);
  }
  return res.data;
};

export const adminLogout = async () => {
  try {
    await apiClient.post('/auth/logout');
  } catch (err) {
    console.error('Logout error on server:', err);
  } finally {
    localStorage.removeItem('buildcore_auth_user');
    localStorage.removeItem('buildcore_auth_token');
  }
  return { success: true };
};

export const getAdminProfile = async () => {
  const res = await apiClient.get('/auth/me');
  return res.data.user;
};

export const resetAdminPassword = async ({ email, currentPassword, newPassword }) => {
  const res = await apiClient.post('/auth/reset-password', {
    email,
    currentPassword,
    newPassword
  });
  return res.data;
};

export const updateAdminProfile = async ({ name, email }) => {
  const res = await apiClient.put('/auth/profile', { name, email });
  if (res.data.user) {
    localStorage.setItem('buildcore_auth_user', JSON.stringify(res.data.user));
  }
  return res.data;
};
