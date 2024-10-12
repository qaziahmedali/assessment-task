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
  dueDate: any;
}
export interface UpdateTaskInputWithTimeStamp extends UpdateTaskInput {
  _id: string;
  updatedAt: string;
  createdAt: string;
  userId: string;
}

export interface TasksResponse {
  tasks: Task[];
  totalRecords: number;
  page: number;
  limit: number;
}
