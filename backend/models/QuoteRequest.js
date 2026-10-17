// models/QuoteRequest.js
import mongoose from 'mongoose';

const quoteRequestSchema = new mongoose.Schema(
  {
    customId: {
      type: String,
      index: true
    },
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    projectType: {
      type: String,
      required: [true, 'Project type is required'],
      default: 'Commercial'
    },
    budget: {
      type: String,
      default: '₹25 Cr - ₹50 Cr'
    },
    message: {
      type: String,
      required: [true, 'Project scope details are required']
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split('T')[0]
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'In Discussion', 'Approved', 'Rejected'],
      default: 'New'
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret.customId || ret._id.toString();
        delete ret.__v;
        return ret;
      }
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret.customId || ret._id.toString();
        delete ret.__v;
        return ret;
      }
    }
  }
);

export const QuoteRequest = mongoose.model('QuoteRequest', quoteRequestSchema);
