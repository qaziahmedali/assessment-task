import { NextRequest } from 'next/server';
import { GET, POST } from '../../src/app/api/tasks/route';
import dbConnect from '../../src/lib/dbConnect';
import Task from '../../src/models/Task';
import { authenticate } from '../../src/middleware/authenticate';

jest.mock('../../src/lib/dbConnect');
jest.mock('../../src/models/Task');
jest.mock('../../src/middleware/authenticate');

describe('/api/tasks', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (authenticate as jest.Mock).mockImplementation((handler) => handler);
  });

  it('should return tasks for GET request', async () => {
    const mockTasks = [
      { _id: '1', title: 'Test Task', description: 'Test Description' },
    ];
    (Task.find as jest.Mock).mockResolvedValue(mockTasks);

    const req = new NextRequest('http://localhost:3000/api/tasks', {
      method: 'GET',
    });

    const res = await GET(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual({ success: true, data: mockTasks });
  });

  it('should create a new task for POST request', async () => {
    const mockCreatedTask = {
      _id: '2',
      title: 'New Task',
      description: 'New Description',
    };
    (Task.create as jest.Mock).mockResolvedValue(mockCreatedTask);

    const req = new NextRequest('http://localhost:3000/api/tasks', {
      method: 'POST',
      body: JSON.stringify({
        title: 'New Task',
        description: 'New Description',
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data).toEqual({ success: true, data: mockCreatedTask });
  });

  // Add more tests for error cases and other scenarios
});
