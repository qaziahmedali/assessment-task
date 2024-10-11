import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { config } from '@/config';
import bcrypt from 'bcryptjs';

export const userRepository = {
  findByEmail: async (email: string) => {
    const client = await clientPromise;
    const db = client.db(config.dbName);
    return db.collection('users').findOne({ email });
  },

  create: async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    const client = await clientPromise;
    const db = client.db(config.dbName);

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
    });

    // Fetch and return the newly created user
    return db.collection('users').findOne({ _id: result.insertedId });
  },
};
