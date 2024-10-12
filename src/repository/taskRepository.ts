import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { config } from '@/config';
import { Task } from '@/models/task';
import { SortOrder, TaskStatus } from '@/common/enums';

export const taskRepository = {
  create: async (
    task: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>
  ): Promise<Task> => {
    const client = await clientPromise;
    const db = client.db(config.dbName);

    const now = new Date();
    const newTask: Task = {
      ...task,
      _id: new ObjectId(),
      createdAt: now,
      updatedAt: now,
    };

    await db.collection<Task>('tasks').insertOne(newTask);
    return newTask;
  },

  update: async (
    taskId: ObjectId,
    updates: Partial<Task>
  ): Promise<Task | null> => {
    const client = await clientPromise;
    const db = client.db(config.dbName);

    const updatedTask = await db
      .collection<Task>('tasks')
      .findOneAndUpdate(
        { _id: taskId },
        { $set: { ...updates, updatedAt: new Date() } },
        { returnDocument: 'after' }
      );

    return updatedTask;
  },

  delete: async (taskId: ObjectId): Promise<boolean> => {
    const client = await clientPromise;
    const db = client.db(config.dbName);

    const result = await db
      .collection<Task>('tasks')
      .deleteOne({ _id: taskId });
    return result.deletedCount === 1;
  },

  findById: async (taskId: ObjectId): Promise<Task | null> => {
    const client = await clientPromise;
    const db = client.db(config.dbName);

    return db.collection<Task>('tasks').findOne({ _id: taskId });
  },

  findByUser: async (
    userId: ObjectId,
    status: TaskStatus,
    page: number = 1,
    limit: number = 10,
    sortOrder: SortOrder = SortOrder.DESC
  ): Promise<{ tasks: Task[]; total: number }> => {
    const client = await clientPromise;
    const db = client.db(config.dbName);

    const query: any = { userId };
    if (status) {
      query.status = status;
    }

    const total = await db.collection<Task>('tasks').countDocuments(query);

    const tasks = await db
      .collection<Task>('tasks')
      .find(query)
      .sort({ dueDate: sortOrder === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return { tasks, total };
  },

  findByIdAndCheckOwnership: async (
    taskId: ObjectId,
    userId: string
  ): Promise<{ task: Task | null; error?: string }> => {
    const task = await taskRepository.findById(taskId);

    if (!task) {
      return { task: null, error: 'Task not found' };
    }

    if (task.userId.toString() !== userId) {
      return {
        task: null,
        error: 'You do not have permission to modify this task',
      };
    }

    return { task };
  },
};
