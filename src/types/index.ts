import { ObjectId } from 'mongodb';

export interface User {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  _id: ObjectId;
  userId: ObjectId;
  title: string;
  description: string;
  status: 'completed' | 'inProgress';
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends Omit<LoginCredentials, 'email'> {
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: Omit<User, 'password'>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
