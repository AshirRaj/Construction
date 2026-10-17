// models/Setting.js
import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: 'BuildCore Construction Pvt. Ltd.'
    },
    tagline: {
      type: String,
      default: 'Building Better. Building Stronger.'
    },
    phone: {
      type: String,
      default: '+91 98765 43210'
    },
    email: {
      type: String,
      default: 'info@buildcore.com'
    },
    address: {
      type: String,
      default: 'Plot 405, Fortune Towers Zone, Jayadev Vihar, Bhubaneswar, Odisha 751013'
    },
    website: {
      type: String,
      default: 'https://www.buildcore.com'
    },
    establishedYear: {
      type: Number,
      default: 2011
    },
    socialLinks: {
      facebook: { type: String, default: 'https://facebook.com/buildcoreconstruction' },
      instagram: { type: String, default: 'https://instagram.com/buildcore_official' },
      linkedin: { type: String, default: 'https://linkedin.com/company/buildcore-construction' },
      youtube: { type: String, default: 'https://youtube.com/@buildcoreconstruction' }
    },
    adminProfile: {
      name: { type: String, default: 'Alex Mercer' },
      email: { type: String, default: 'admin@buildcore.com' },
      role: { type: String, default: 'Chief Construction Officer' },
      avatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' }
    }
  },
  {
    timestamps: true
  }
);

export const Setting = mongoose.model('Setting', settingSchema);
