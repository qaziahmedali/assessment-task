import { MongoClient } from 'mongodb';

declare global {
  // Extending the global namespace
  namespace NodeJS {
    interface Global {
      _mongoClientPromise: Promise<MongoClient>;
    }
  }

  // Prevent TypeScript from considering the file a module
  var _mongoClientPromise: Promise<MongoClient>;
}

export {};
