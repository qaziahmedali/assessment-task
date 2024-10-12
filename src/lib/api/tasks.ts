import axios from 'axios';
import {
  Task,
  CreateTaskInput,
  UpdateTaskInput,
  TasksResponse,
} from '@/types/task';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const taskApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
taskApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getTasks = async (params: {
  status?: string;
  page?: number;
  limit?: number;
  sort?: 'asc' | 'desc';
}): Promise<TasksResponse> => {
  const response = await taskApi.get<TasksResponse>('/tasks', { params });
  return response.data;
};

export const getTaskById = async (id: string): Promise<Task> => {
  const response = await taskApi.get<Task>(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (task: CreateTaskInput): Promise<Task> => {
  const response = await taskApi.post<Task>('/tasks', task);
  return response.data;
};

export const updateTask = async (
  id: string,
  updates: UpdateTaskInput
): Promise<Task> => {
  const response = await taskApi.put<Task>(`/tasks/${id}`, updates);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await taskApi.delete(`/tasks/${id}`);
};
