import mongoose, { Schema, Model } from 'mongoose';
import { Drop } from '@/types';

const DropSchema = new Schema<Drop>(
  {
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: function (v: number[]) {
            return v.length === 2 && v[0] >= -180 && v[0] <= 180 && v[1] >= -90 && v[1] <= 90;
          },
          message: 'Coordinates must be [longitude, latitude] within valid ranges',
        },
      },
    },
    amount: {
      type: Number,
      required: true,
      min: 0.1,
    },
    message: {
      type: String,
      required: true,
      maxlength: 200,
    },
    createdBy: {
      type: String,
      required: true,
    },
    claimed: {
      type: Boolean,
      default: false,
    },
    claimedBy: {
      type: String,
    },
    claimedAt: {
      type: Date,
    },
    transactionHash: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create 2dsphere index for geospatial queries
DropSchema.index({ location: '2dsphere' });

// Create index for querying unclaimed drops
DropSchema.index({ claimed: 1, createdAt: -1 });

const DropModel: Model<Drop> = mongoose.models.Drop || mongoose.model<Drop>('Drop', DropSchema);

export default DropModel;

