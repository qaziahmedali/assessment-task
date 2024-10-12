// src/hooks/useTasks.ts

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { taskApi } from '@/utils/api';
import { Task, PaginatedResponse } from '@/types';

export const useTasks = (
  status?: string,
  page = 1,
  limit = 10,
  sort: 'asc' | 'desc' = 'desc'
) => {
  return useQuery<PaginatedResponse<Task>, Error>(
    ['tasks', status, page, limit, sort],
    () =>
      taskApi.getTasks({ status, page, limit, sort }).then((res) => res.data),
    { keepPreviousData: true }
  );
};

export const useTask = (id: string) => {
  return useQuery<Task, Error>(['task', id], () =>
    taskApi.getTask(id).then((res) => res.data)
  );
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation(taskApi.createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, updates }: { id: string; updates: Partial<Task> }) =>
      taskApi.updateTask(id, updates),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks']);
      },
    }
  );
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation(taskApi.deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
    },
  });
};
