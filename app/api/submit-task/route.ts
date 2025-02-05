import { NextResponse } from 'next/server';
import { Queue } from 'bullmq';
import Task from "../../../models/task";
import connectMongo from "../../../lib/connectMongoDB";
import { redisConnection } from '../../../lib/connectRedisDB';

const taskQueue = new Queue('imageProcessingQueue', { connection: redisConnection });

export async function POST(req: Request) {
  try {
    await connectMongo();

    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    const newTask = new Task({ imageUrl: url, status: 'Pending', timestamp });

    await newTask.save();

    // Add the taskId to Redis queue
    await taskQueue.add('processImage', { taskId: newTask.taskId });

    return NextResponse.json({ taskId: newTask.taskId }, { status: 201 });

  } catch (error) {
    console.error('Error handling POST request:', error);
    return NextResponse.json({ error: 'Failed to process the task' }, { status: 500 });
  }
}




