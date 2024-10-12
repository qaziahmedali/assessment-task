// src/lib/api/auth.ts

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  userId: string;
  token: string;
}

const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await authApi.post<AuthResponse>('/auth/signup', data);
  return response.data;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await authApi.post<AuthResponse>('/auth/login', data);
  return response.data;
};
