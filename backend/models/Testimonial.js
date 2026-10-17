// models/Testimonial.js
import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    customId: {
      type: String,
      index: true
    },
    name: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true
    },
    position: {
      type: String,
      default: 'Project Director'
    },
    company: {
      type: String,
      default: 'Corporate Partner'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    },
    quote: {
      type: String,
      required: [true, 'Testimonial quote text is required']
    },
    avatar: {
      type: String,
      default: 'BC'
    },
    status: {
      type: String,
      enum: ['Published', 'Draft'],
      default: 'Published'
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

export const Testimonial = mongoose.model('Testimonial', testimonialSchema);
