import { Worker } from 'bullmq';
import connectMongo from './lib/connectMongoDB.js';
import axios from 'axios';
import Task from './models/task.js';
import { redisConnection } from './lib/connectRedisDB.js';

// Ensure MongoDB is connected only once at the start
connectMongo();

async function processTask(job) {
  try {
    const { taskId } = job.data;

    
    const task = await Task.findOne({ taskId });
    if (!task) {
      console.error(`Task ${taskId} not found`);
      return;
    }
    task.status = 'Processing';
    await task.save();
    await new Promise(resolve => setTimeout(resolve, 60000));

    try {
      const response = await axios.head(task.imageUrl);

      const contentType = response.headers['content-type'];
      if (contentType && contentType.startsWith('image/')) {
        task.status = 'Success';
      } else {
        task.status = 'Failed';
      }
    } catch {
      task.status = 'Failed';
    }

    await task.save();
    console.log(`Task ${taskId} processed: ${task.status}`);
  } catch (error) {
    console.error('Worker error:', error);
  }
}

const worker = new Worker('imageProcessingQueue', processTask, {
  connection: redisConnection,
  concurrency: 2,
});

worker.on('completed', job => console.log(`Completed job ${job.id}`));
worker.on('failed', (job, err) => console.error(`Failed job ${job.id}:`, err));
