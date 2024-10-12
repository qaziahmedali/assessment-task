import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '@/lib/api/tasks';
import {
  Task,
  CreateTaskInput,
  UpdateTaskInput,
  TasksResponse,
} from '@/types/task';

export const useTasks = (
  status?: string,
  page: number = 1,
  limit: number = 10,
  sort: 'asc' | 'desc' = 'desc'
) => {
  return useQuery<TasksResponse, Error>({
    queryKey: ['tasks', status, page, limit, sort],
    queryFn: () => getTasks({ status, page, limit, sort }),
  });
};

export const useTask = (id: string) => {
  return useQuery<Task, Error>({
    queryKey: ['task', id],
    queryFn: () => getTaskById(id),
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation<Task, Error, CreateTaskInput>({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation<Task, Error, { id: string; updates: UpdateTaskInput }>({
    mutationFn: ({ id, updates }) => updateTask(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
