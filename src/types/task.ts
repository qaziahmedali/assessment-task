// src/types/task.ts

export interface Task {
  _id: string;
  userId: string;
  title: string;
  description: string;
  status: 'completed' | 'inProgress';
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  description: string;
  status: 'completed' | 'inProgress';
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: 'completed' | 'inProgress';
}

export interface TasksResponse {
  tasks: Task[];
  total: number;
  page: number;
  limit: number;
}
