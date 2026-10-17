// controllers/dashboardController.js
import { Project } from '../models/Project.js';
import { QuoteRequest } from '../models/QuoteRequest.js';
import { Message } from '../models/Message.js';
import { Testimonial } from '../models/Testimonial.js';

// @desc    Get aggregated dashboard analytics and real-time counts
// @route   GET /api/dashboard/stats
// @access  Private
export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalProjects,
      activeProjects,
      completedProjects,
      planningProjects,
      totalQuotes,
      unreadMessages,
      totalTestimonials,
      recentQuotes
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ status: 'In Progress' }),
      Project.countDocuments({ status: 'Completed' }),
      Project.countDocuments({ status: 'Planning' }),
      QuoteRequest.countDocuments(),
      Message.countDocuments({ status: 'Unread' }),
      Testimonial.countDocuments(),
      QuoteRequest.find().sort({ createdAt: -1 }).limit(5)
    ]);

    const projectStatusData = [
      { name: 'Planning', value: planningProjects, color: '#3b82f6' },
      { name: 'In Progress', value: activeProjects, color: '#f59e0b' },
      { name: 'Completed', value: completedProjects, color: '#10b981' }
    ];

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalProjects,
          activeProjects,
          completedProjects,
          planningProjects,
          quoteRequests: totalQuotes,
          unreadMessages,
          testimonials: totalTestimonials
        },
        projectStatusData,
        recentQuotes
      }
    });
  } catch (error) {
    next(error);
  }
};
