import mongoose, { Schema, Model } from 'mongoose';
import { User } from '@/types';

const UserSchema = new Schema<User>(
  {
    publicKey: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    username: {
      type: String,
      maxlength: 50,
    },
    bio: {
      type: String,
      maxlength: 200,
    },
    persona: {
      type: String,
      enum: ['personal', 'business', 'nonprofit'],
      required: true,
    },
    badge: {
      type: String,
    },
    level: {
      type: Number,
      default: 1,
      min: 1,
    },
    totalDropsCreated: {
      type: Number,
      default: 0,
    },
    totalDropsClaimed: {
      type: Number,
      default: 0,
    },
    totalAmountSent: {
      type: Number,
      default: 0,
    },
    totalAmountReceived: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel: Model<User> = mongoose.models.User || mongoose.model<User>('User', UserSchema);

export default UserModel;

