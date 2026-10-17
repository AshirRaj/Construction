// models/Project.js
import mongoose from 'mongoose';

const projectStatSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true }
}, { _id: false });

const projectSchema = new mongoose.Schema(
  {
    customId: {
      type: String,
      index: true
    },
    name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Project category is required'],
      enum: ['Commercial', 'Residential', 'Industrial', 'Civil Engineering'],
      default: 'Commercial'
    },
    location: {
      type: String,
      required: [true, 'Project location is required'],
      trim: true
    },
    status: {
      type: String,
      enum: ['Planning', 'In Progress', 'Completed'],
      default: 'In Progress'
    },
    year: {
      type: String,
      default: () => new Date().getFullYear().toString()
    },
    startDate: {
      type: String
    },
    completionDate: {
      type: String
    },
    duration: {
      type: String
    },
    client: {
      type: String,
      default: 'Confidential Client'
    },
    budget: {
      type: String
    },
    image: {
      type: String,
      required: [true, 'Main project image URL is required']
    },
    gallery: {
      type: [String],
      default: []
    },
    description: {
      type: String,
      required: [true, 'Project description is required']
    },
    scope: {
      type: [String],
      default: []
    },
    highlights: {
      type: [String],
      default: []
    },
    challenges: {
      type: mongoose.Schema.Types.Mixed,
      default: ''
    },
    stats: {
      type: [projectStatSchema],
      default: []
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

export const Project = mongoose.model('Project', projectSchema);
