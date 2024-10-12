import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { taskRepository } from '@/repository/taskRepository';
import { errorResponseService } from '@/common/services/errorResponseService';
import { successResponseService } from '@/common/services/successResponseService';
import { authService } from '@/common/services/tokenService';
import { genericValidator } from '@/common/genericValidator';
import { fetchTaskRules, getTaskCreationRules } from '@/validations/tasks';
import { getBody } from '@/common/getBody';
import { SortOrder, TaskStatus } from '@/common/enums';

export const taskService = {
  createTask: async (req: NextRequest) => {
    const userId = await authService.getUserIdFromToken(req);
    if (!userId) {
      return errorResponseService.unauthorized('Invalid or missing token');
    }

    const taskData = await getBody(req);

    // Validate task data
    const getValidations = getTaskCreationRules(false);
    const validationErrors = genericValidator(taskData, getValidations);
    if (validationErrors) {
      return errorResponseService.badRequest(validationErrors);
    }

    const newTask = await taskRepository.create({
      ...taskData,
      userId: new ObjectId(userId),
      status: taskData?.status || TaskStatus.InProgress,
    });

    return successResponseService.created({
      message: 'Task created successfully',
      task: newTask,
    });
  },

  updateTask: async (req: NextRequest, id: string) => {
    const userId = await authService.getUserIdFromToken(req);
    if (!userId) {
      return errorResponseService.unauthorized('Invalid or missing token');
    }

    const updates = await getBody(req);

    // Validate update data
    const getValidations = getTaskCreationRules(true);
    const validationErrors = genericValidator(updates, getValidations);
    if (validationErrors) {
      return errorResponseService.badRequest(validationErrors);
    }

    const { error } = await taskRepository.findByIdAndCheckOwnership(
      new ObjectId(id),
      userId
    );

    if (error) {
      return errorResponseService.forbidden(error);
    }

    const updatedTask = await taskRepository.update(new ObjectId(id), updates);

    return successResponseService.ok({
      message: 'Task updated successfully',
      task: updatedTask,
    });
  },

  deleteTask: async (req: NextRequest, id: string) => {
    const userId = await authService.getUserIdFromToken(req);
    if (!userId) {
      return errorResponseService.unauthorized('Invalid or missing token');
    }

    const { error } = await taskRepository.findByIdAndCheckOwnership(
      new ObjectId(id),
      userId
    );

    if (error) {
      return errorResponseService.forbidden(error);
    }

    await taskRepository.delete(new ObjectId(id));

    return successResponseService.ok({
      message: 'Task deleted successfully',
    });
  },

  getTasksByUser: async (req: NextRequest) => {
    const userId = await authService.getUserIdFromToken(req);
    if (!userId) {
      return errorResponseService.unauthorized('Invalid or missing token');
    }

    const { searchParams } = new URL(req.url);

    // Convert URLSearchParams to a plain object
    const queryParams = Object.fromEntries(searchParams.entries());

    const validationErrors = genericValidator(queryParams, fetchTaskRules);
    if (validationErrors) {
      return errorResponseService.badRequest(validationErrors);
    }

    const status = searchParams.get('status');
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';
    const order = searchParams.get('order');

    const tasks = await taskRepository.findByUser(
      new ObjectId(userId),
      status as TaskStatus,
      parseInt(page),
      parseInt(limit),
      order as SortOrder
    );

    return successResponseService.ok({
      tasks: tasks.tasks,
      totalRecords: tasks.total,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  },
};
