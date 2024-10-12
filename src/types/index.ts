import { User } from '@/models/user';

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
