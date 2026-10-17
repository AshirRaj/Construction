// src/pages/admin/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Building,
  CheckCircle,
  Clock,
  FileText,
  MessageSquare,
  Star,
  Plus,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { getDashboardStats } from '../../services/api';
import { Counter } from '../../components/common/Counter';

export const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 6,
    activeProjects: 3,
    completedProjects: 2,
    quoteRequests: 4,
    unreadMessages: 1,
    testimonials: 4
  });

  const [projectStatusData, setProjectStatusData] = useState([
    { name: 'Planning', value: 1, color: '#3b82f6' },
    { name: 'In Progress', value: 3, color: '#f59e0b' },
    { name: 'Completed', value: 2, color: '#10b981' }
  ]);

  const [recentQuotes, setRecentQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardStats();
        if (data) {
          if (data.stats) setStats(data.stats);
          if (data.projectStatusData) setProjectStatusData(data.projectStatusData);
          if (data.recentQuotes) setRecentQuotes(data.recentQuotes);
        }
      } catch (err) {
        console.error('Error fetching dashboard stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const monthlyQuotesData = [
    { month: 'Mar', quotes: 18, approved: 12 },
    { month: 'Apr', quotes: 24, approved: 16 },
    { month: 'May', quotes: 28, approved: 19 },
    { month: 'Jun', quotes: 32, approved: 22 },
    { month: 'Jul', quotes: 35, approved: 26 },
    { month: 'Aug', quotes: 37, approved: 29 }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-mono uppercase tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 text-xs sm:text-sm font-medium">Welcome back, Chief Construction Officer</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/projects"
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </Link>
        </div>
      </div>

      {/* 6 Key Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs uppercase font-bold">Total Projects</span>
            <Building className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
            <Counter target={stats.totalProjects} />
          </div>
          <div className="text-[10px] text-blue-600 font-bold">+12% from last quarter</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs uppercase font-bold">Active Sites</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 font-mono">
            <Counter target={stats.activeProjects} />
          </div>
          <div className="text-[10px] text-amber-600 font-bold">Under active execution</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs uppercase font-bold">Completed</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">
            <Counter target={stats.completedProjects} />
          </div>
          <div className="text-[10px] text-emerald-600 font-bold">100% Handover Rate</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs uppercase font-bold">Quote Tenders</span>
            <FileText className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-600 font-mono">
            <Counter target={stats.quoteRequests} />
          </div>
          <div className="text-[10px] text-purple-600 font-bold">+8 new this month</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs uppercase font-bold">Unread Msgs</span>
            <MessageSquare className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-sky-600 font-mono">
            <Counter target={stats.unreadMessages} />
          </div>
          <div className="text-[10px] text-sky-600 font-bold">Pending vendor replies</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs uppercase font-bold">Testimonials</span>
            <Star className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
            <Counter target={stats.testimonials} />
          </div>
          <div className="text-[10px] text-amber-600 font-bold">Average 4.9 / 5 rating</div>
        </motion.div>

      </div>

      {/* Analytics Charts Section */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Monthly Quote Volume Bar Chart */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-mono uppercase">Quote Request Trends</h3>
              <p className="text-xs text-slate-500 font-medium">Monthly breakdown of received vs approved project tenders</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-amber-600"><span className="w-3 h-3 rounded-sm bg-amber-500 inline-block" /> Total Inquiries</span>
              <span className="flex items-center gap-1.5 text-emerald-600"><span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" /> Approved Tenders</span>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyQuotesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.75rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: '#0f172a' }}
                />
                <Bar dataKey="quotes" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="approved" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Status Pie Chart */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-mono uppercase">Project Status Portfolio</h3>
            <p className="text-xs text-slate-500 font-medium">Distribution across current active phases</p>
          </div>

          <div className="h-56 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.75rem' }}
                  itemStyle={{ color: '#0f172a' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            {projectStatusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs font-semibold">
                <span className="flex items-center gap-2 text-slate-700">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-mono font-bold text-slate-900">{item.value} Projects</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Quote Requests Quick Table */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-mono uppercase">Recent Quote Tenders</h3>
            <p className="text-xs text-slate-500 font-medium">Latest project lead inquiries submitted through public site</p>
          </div>
          <Link
            to="/admin/quotes"
            className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1 uppercase tracking-wider"
          >
            <span>View All Tenders</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono uppercase">
              <tr>
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">Project Type</th>
                <th className="py-3 px-4">Estimated Budget</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {recentQuotes.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-900">{q.name}</td>
                  <td className="py-3 px-4">{q.projectType}</td>
                  <td className="py-3 px-4 font-mono font-bold text-amber-600">{q.budget}</td>
                  <td className="py-3 px-4">{q.date}</td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-700 border border-amber-200 font-bold uppercase text-[10px]">
                      {q.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
