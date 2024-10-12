'use server';

import { axiosInstance } from '@/common/interceptors';
import { cookies } from 'next/headers';

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

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/auth/signup', data);
  cookies().set('token', response.data.token);

  return response.data;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/auth/login', data);
  cookies().set('token', response.data.token);

  return response.data;
};

export const logout = () => {
  cookies().delete('token');
};

export const getToken = (): string | undefined => {
  return cookies().get('token')?.value;
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};
