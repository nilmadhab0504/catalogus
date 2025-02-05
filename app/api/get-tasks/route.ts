

import { NextResponse } from 'next/server';
import Task from "../../../models/task";
import connectMongo from "../../../lib/connectMongoDB";


export async function GET() {
  try {
    await connectMongo();

    const tasks = await Task.find();

    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    console.error('Error handling GET request:', error);
    return NextResponse.json({ error: 'Failed to retrieve tasks' }, { status: 500 });
  }
}
