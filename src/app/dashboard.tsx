'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';
import Toast from '../components/Toast';
import { useTheme } from '../contexts/ThemeContext';

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'incomplete' | 'completed';
}

const ITEMS_PER_PAGE = 5;

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
  });
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const res = await fetch('/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setTasks(data.data);
      } else {
        setToast({ message: 'Failed to fetch tasks', type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Error fetching tasks', type: 'error' });
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTask),
      });
      if (res.ok) {
        setNewTask({ title: '', description: '', dueDate: '' });
        fetchTasks();
        setToast({ message: 'Task added successfully', type: 'success' });
      } else {
        setToast({ message: 'Failed to add task', type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Error adding task', type: 'error' });
    }
  };

  const handleUpdateTask = async (taskId: string, updates: Partial<Task>) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        fetchTasks();
        setToast({ message: 'Task updated successfully', type: 'success' });
      } else {
        setToast({ message: 'Failed to update task', type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Error updating task', type: 'error' });
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        fetchTasks();
        setToast({ message: 'Task deleted successfully', type: 'success' });
      } else {
        setToast({ message: 'Failed to delete task', type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Error deleting task', type: 'error' });
    }
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'all') return true;
      return task.status === filter;
    })
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return a.title.localeCompare(b.title);
    });

  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);

  return (
    <Layout>
      <div
        className={`${
          theme === 'dark' ? 'dark' : ''
        } bg-white dark:bg-gray-800 text-black dark:text-white min-h-screen`}
      >
        <h1 className='text-2xl font-bold mb-4'>Task Dashboard</h1>

        <form onSubmit={handleAddTask} className='mb-8'>
          <h2 className='text-xl font-semibold mb-2'>Add New Task</h2>
          <div className='flex space-x-2'>
            <input
              type='text'
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              placeholder='Task title'
              className='flex-grow p-2 border rounded dark:bg-gray-700 dark:border-gray-600'
              required
            />
            <input
              type='text'
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              placeholder='Description'
              className='flex-grow p-2 border rounded dark:bg-gray-700 dark:border-gray-600'
            />
            <input
              type='date'
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask({ ...newTask, dueDate: e.target.value })
              }
              className='p-2 border rounded dark:bg-gray-700 dark:border-gray-600'
              required
            />
            <button
              type='submit'
              className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
            >
              Add Task
            </button>
          </div>
        </form>

        <div className='mb-4 flex space-x-4'>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className='p-2 border rounded dark:bg-gray-700 dark:border-gray-600'
          >
            <option value='all'>All Tasks</option>
            <option value='incomplete'>Incomplete</option>
            <option value='completed'>Completed</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className='p-2 border rounded dark:bg-gray-700 dark:border-gray-600'
          >
            <option value='dueDate'>Sort by Due Date</option>
            <option value='title'>Sort by Title</option>
          </select>
        </div>

        <ul className='space-y-4'>
          {paginatedTasks.map((task) => (
            <li
              key={task._id}
              className='border p-4 rounded dark:border-gray-700'
            >
              <h3 className='text-lg font-semibold'>{task.title}</h3>
              <p>{task.description}</p>
              <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              <p>Status: {task.status}</p>
              <div className='mt-2 space-x-2'>
                <button
                  onClick={() =>
                    handleUpdateTask(task._id, {
                      status:
                        task.status === 'completed'
                          ? 'incomplete'
                          : 'completed',
                    })
                  }
                  className='bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600'
                >
                  Toggle Status
                </button>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className='mt-4 flex justify-center space-x-2'>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </Layout>
  );
}
