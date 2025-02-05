import mongoose from 'mongoose';
import crypto from 'crypto';

const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    taskId: {
      type: String,
      default: () => crypto.randomBytes(4).toString('hex'),
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Processing', 'Success', 'Failed'],
    },
    timestamp: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);

export default Task;
