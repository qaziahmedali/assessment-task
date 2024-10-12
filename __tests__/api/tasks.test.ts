import { NextApiRequest, NextApiResponse } from 'next';
import httpMocks from 'node-mocks-http';
import { taskService } from '@/services/taskService';
import { GET, POST } from '@/app/api/tasks/route';

jest.mock('@/services/taskService');
jest.mock('@/common/services/errorResponseService');

describe('Task API', () => {
  let req: NextApiRequest;
  let res: NextApiResponse;

  beforeEach(() => {
    req = httpMocks.createRequest<NextApiRequest>();
    res = httpMocks.createResponse<NextApiResponse>();
  });

  describe('POST /api/tasks', () => {
    it('should create a new task successfully', async () => {
      const mockTask = {
        _id: '123456789',
        title: 'Test Task',
        description: 'Test Description',
        status: 'InProgress',
        userId: '987654321',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      (taskService.createTask as jest.Mock).mockResolvedValue({
        json: jest.fn().mockReturnValue({
          message: 'Task created successfully',
          task: mockTask,
        }),
        status: 200,
      });

      req.method = 'POST';
      req.body = { title: 'Test Task', description: 'Test Description' };

      await POST(req as any);

      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /api/tasks', () => {
    it('should retrieve tasks successfully', async () => {
      const mockTasks = [
        {
          _id: '123456789',
          title: 'Task 1',
          description: 'Description 1',
          status: 'InProgress',
          userId: '987654321',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          _id: '987654321',
          title: 'Task 2',
          description: 'Description 2',
          status: 'Completed',
          userId: '987654321',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      (taskService.getTasksByUser as jest.Mock).mockResolvedValue({
        json: jest.fn().mockReturnValue({
          tasks: mockTasks,
          totalRecords: 2,
          page: 1,
          limit: 10,
        }),
        status: 200,
      });

      req.method = 'GET';

      await GET(req as any);

      expect(res.statusCode).toBe(200);
    });
  });
});
