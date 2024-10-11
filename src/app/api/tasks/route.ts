import { errorResponseService } from '@/common/services/errorResponseService';
import { taskService } from '@/services/taskService';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    return taskService.createTask(req);
  } catch (error) {
    return errorResponseService.internalServerError();
  }
}

export async function GET(req: NextRequest) {
  try {
    return taskService.getTasksByUser(req);
  } catch (error) {
    return errorResponseService.internalServerError();
  }
}
