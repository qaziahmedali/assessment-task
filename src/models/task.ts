import { ObjectId } from 'mongodb';

export interface Task {
  _id: ObjectId;
  userId: ObjectId;
  title: string;
  description: string;
  status: 'completed' | 'inProgress';
  createdAt: Date;
  updatedAt: Date;
}
