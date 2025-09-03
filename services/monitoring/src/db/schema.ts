import mongoose from 'mongoose';

const { Schema } = mongoose;

const monitoringSchema = new Schema( {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    urls: {
      type: [
        {
          url: { type: String, required: true },
          interval: { type: Number, required: true },
          isActive: { type: Boolean, default: false },
        },
      ],
      default: []
    },
  },
  { timestamps: true }
)

export default monitoringSchema;