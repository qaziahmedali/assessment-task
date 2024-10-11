import { NextRequest } from 'next/server';
import { taskService } from '@/services/taskService';
import { errorResponseService } from '@/common/services/errorResponseService';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    return taskService.updateTask(req, params.id);
  } catch (error) {
    return errorResponseService.internalServerError();
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    return taskService.deleteTask(req, params.id);
  } catch (error) {
    return errorResponseService.internalServerError();
  }
}
