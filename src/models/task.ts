import { TaskStatus } from '@/common/enums';
import { ObjectId } from 'mongodb';

export interface Task {
  _id: ObjectId;
  userId: ObjectId;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}
