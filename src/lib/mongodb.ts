// File: src/lib/mongodb.ts

import { MongoClient } from 'mongodb';
import { config } from '@/config';

if (!config.mongoDbUri) {
  throw new Error('MongoDB URI is not defined');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'test') {
  // For test environment, we'll create a new client for each test
  const testClient = new MongoClient(config.mongoDbUri);
  clientPromise = testClient.connect();
} else if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(config.mongoDbUri);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(config.mongoDbUri);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

// Export a function to close the connection (useful for tests)
export async function closeConnection() {
  if (process.env.NODE_ENV === 'test') {
    const client = await clientPromise;
    await client.close();
  }
}
