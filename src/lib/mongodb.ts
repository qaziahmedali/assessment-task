import { config } from '@/config';
import { MongoClient } from 'mongodb';

if (!config.mongoDbUri) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = config.mongoDbUri;
const options = {};
const clientPromise = new MongoClient(uri, options)
  .connect()
  .then((client) => {
    console.log('Connected to MongoDB');
    return client;
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  });

export default clientPromise;
