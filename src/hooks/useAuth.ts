// src/hooks/useAuth.ts

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import {
  register,
  login,
  RegisterData,
  LoginData,
  AuthResponse,
} from '@/lib/api/auth';
import { useRouter } from 'next/navigation';

export const useRegister = (): UseMutationResult<
  AuthResponse,
  Error,
  RegisterData,
  unknown
> => {
  const router = useRouter();

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      router.push('/');
    },
  });
};

export const useLogin = (): UseMutationResult<
  AuthResponse,
  Error,
  LoginData,
  unknown
> => {
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      router.push('/');
    },
  });
};
