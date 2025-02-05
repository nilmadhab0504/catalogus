import mongoose from 'mongoose';

const connectMongo = async () => {
  try {
    await mongoose.connect("mongodb+srv://nil:nilu0504@cluster0.fgyq7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectMongo;


