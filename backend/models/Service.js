// models/Service.js
import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    customId: {
      type: String,
      index: true
    },
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true
    },
    subtitle: {
      type: String,
      trim: true
    },
    iconName: {
      type: String,
      default: 'HardHat'
    },
    description: {
      type: String,
      required: [true, 'Service description is required']
    },
    features: {
      type: [String],
      default: []
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active'
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

export const Service = mongoose.model('Service', serviceSchema);
