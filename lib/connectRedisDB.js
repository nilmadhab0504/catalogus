import { Redis } from 'ioredis';

const redisConnection = new Redis("redis://default:mk3TThrCboaaveso9RkQUXkzYeyPCzhV@redis-15534.crce179.ap-south-1-1.ec2.redns.redis-cloud.com:15534", {
  maxRetriesPerRequest: null, 
  enableReadyCheck: false, 
});

redisConnection.on('error', (err) => {
  console.error('Redis connection error:', err);
});

export { redisConnection };
