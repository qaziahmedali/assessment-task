'use server';

import { Task, CreateTaskInput, UpdateTaskInput } from '@/types/task';
import { axiosInstance } from '@/common/interceptors';
import { SortOrder, TaskStatus } from '@/common/enums';

export const getTasks = async (
  page = 1,
  limit = 10,
  order?: SortOrder,
  status?: TaskStatus
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(order && { order }),
    ...(status && { status }),
  });

  const response = await axiosInstance.get(`/tasks?${params.toString()}`);
  return response.data;
};

export const getTaskById = async (id: string): Promise<Task> => {
  const response = await axiosInstance.get<Task>(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (task: CreateTaskInput): Promise<Task> => {
  const response = await axiosInstance.post<Task>('/tasks', task);
  return response.data;
};

export const updateTask = async (
  id: string,
  updates: UpdateTaskInput
): Promise<Task> => {
  const response = await axiosInstance.put<Task>(`/tasks/${id}`, updates);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/tasks/${id}`);
};
