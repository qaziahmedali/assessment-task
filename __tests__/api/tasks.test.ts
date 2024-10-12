// import { NextApiRequest, NextApiResponse } from 'next';
// import httpMocks from 'node-mocks-http';
// import { ObjectId } from 'mongodb';
// import { POST, GET } from './api/tasks'; // Adjust the import path as needed
// import { taskService } from '@/services/taskService';
// import { errorResponseService } from '@/common/services/errorResponseService';
// import { TaskStatus, SortOrder } from '@/common/enums';

// jest.mock('@/services/taskService');
// jest.mock('@/common/services/errorResponseService');

// describe('Task API', () => {
//   let req: NextApiRequest;
//   let res: NextApiResponse;

//   beforeEach(() => {
//     req = httpMocks.createRequest();
//     res = httpMocks.createResponse();
//   });

//   describe('POST /api/tasks', () => {
//     it('should create a new task successfully', async () => {
//       const mockTask = {
//         _id: new ObjectId(),
//         title: 'Test Task',
//         description: 'Test Description',
//         status: TaskStatus.InProgress,
//         userId: new ObjectId(),
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       };

//       (taskService.createTask as jest.Mock).mockResolvedValue({
//         json: () => ({ message: 'Task created successfully', task: mockTask }),
//         status: 201,
//       });

//       await POST(req, res);

//       expect(taskService.createTask).toHaveBeenCalledWith(req);
//       expect(res.statusCode).toBe(201);
//       expect(res._getJSONData()).toEqual({
//         message: 'Task created successfully',
//         task: mockTask,
//       });
//     });

//     it('should handle errors during task creation', async () => {
//       (taskService.createTask as jest.Mock).mockRejectedValue(new Error('Database error'));
//       (errorResponseService.internalServerError as jest.Mock).mockReturnValue({
//         json: () => ({ message: 'Internal server error' }),
//         status: 500,
//       });

//       await POST(req, res);

//       expect(errorResponseService.internalServerError).toHaveBeenCalled();
//       expect(res.statusCode).toBe(500);
//       expect(res._getJSONData()).toEqual({ message: 'Internal server error' });
//     });
//   });

//   describe('GET /api/tasks', () => {
//     it('should retrieve tasks successfully', async () => {
//       const mockTasks = [
//         {
//           _id: new ObjectId(),
//           title: 'Task 1',
//           description: 'Description 1',
//           status: TaskStatus.InProgress,
//           userId: new ObjectId(),
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           _id: new ObjectId(),
//           title: 'Task 2',
//           description: 'Description 2',
//           status: TaskStatus.Completed,
//           userId: new ObjectId(),
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//       ];

//       (taskService.getTasksByUser as jest.Mock).mockResolvedValue({
//         json: () => ({
//           tasks: mockTasks,
//           totalRecords: 2,
//           page: 1,
//           limit: 10,
//         }),
//         status: 200,
//       });

//       await GET(req, res);

//       expect(taskService.getTasksByUser).toHaveBeenCalledWith(req);
//       expect(res.statusCode).toBe(200);
//       expect(res._getJSONData()).toEqual({
//         tasks: mockTasks,
//         totalRecords: 2,
//         page: 1,
//         limit: 10,
//       });
//     });

//     it('should handle errors during task retrieval', async () => {
//       (taskService.getTasksByUser as jest.Mock).mockRejectedValue(new Error('Database error'));
//       (errorResponseService.internalServerError as jest.Mock).mockReturnValue({
//         json: () => ({ message: 'Internal server error' }),
//         status: 500,
//       });

//       await GET(req, res);

//       expect(errorResponseService.internalServerError).toHaveBeenCalled();
//       expect(res.sta
