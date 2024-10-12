import axios from 'axios';
import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  Task,
  User,
  PaginatedResponse,
} from '@/types';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (credentials: LoginCredentials) =>
    api.post<AuthResponse>('/auth/login', credentials),
  register: (data: RegisterData) =>
    api.post<AuthResponse>('/auth/register', data),
  getCurrentUser: () => api.get<Omit<User, 'password'>>('/auth/me'),
};

export const taskApi = {
  getTasks: (params: {
    status?: string;
    page?: number;
    limit?: number;
    sort?: 'asc' | 'desc';
  }) => api.get<PaginatedResponse<Task>>('/tasks', { params }),
  getTask: (id: string) => api.get<Task>(`/tasks/${id}`),
  createTask: (
    task: Omit<Task, '_id' | 'userId' | 'createdAt' | 'updatedAt'>
  ) => api.post<Task>('/tasks', task),
  updateTask: (id: string, updates: Partial<Task>) =>
    api.put<Task>(`/tasks/${id}`, updates),
  deleteTask: (id: string) => api.delete(`/tasks/${id}`),
};
