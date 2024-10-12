'use client';

import React, { useState } from 'react';
import {
  useTasks,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
} from '@/hooks/useTasks';
import { Task, CreateTaskInput, UpdateTaskInput } from '@/types/task';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const taskSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .max(100, 'Title is too long'),
  description: Yup.string().required('Description is required'),
  status: Yup.string().oneOf(['completed', 'inProgress'], 'Invalid status'),
});

export default function Home() {
  const [page, setPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { data, isLoading, error, refetch } = useTasks(undefined, page, 10);
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const totalPages = data ? Math.ceil(data.total / data.limit) : 0;

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const loadMoreCards = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleAddTask = (newTask: CreateTaskInput) => {
    createTaskMutation.mutate(newTask, {
      onSuccess: () => {
        setShowAddModal(false);
        refetch();
      },
    });
  };

  const handleUpdateTask = (updatedTask: UpdateTaskInput) => {
    if (selectedTask) {
      updateTaskMutation.mutate(
        { id: selectedTask._id, updates: updatedTask },
        {
          onSuccess: () => {
            setShowUpdateModal(false);
            refetch();
          },
        }
      );
    }
  };

  const handleDeleteTask = () => {
    if (selectedTask) {
      deleteTaskMutation.mutate(selectedTask._id, {
        onSuccess: () => {
          setShowDeleteModal(false);
          refetch();
        },
      });
    }
  };

  if (error)
    return (
      <div className='text-red-500'>An error occurred: {error.message}</div>
    );

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <header className='fixed top-0 left-0 right-0 z-50 p-6 bg-gray-100 dark:bg-gray-900 border-b flex justify-between items-center'>
        <h1 className='text-2xl font-bold text-black dark:text-white'>
          Task Project
        </h1>
        <div className='flex space-x-6 items-center'>
          <button
            onClick={toggleDarkMode}
            className='bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded'
          >
            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
          <button className='bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded'>
            Profile
          </button>
        </div>
      </header>

      <main className='flex-grow p-6 pt-24 pb-20 bg-white dark:bg-gray-800'>
        <div className='container mx-auto'>
          <div className='flex justify-between mb-4'>
            <h2 className='text-xl font-semibold text-black dark:text-white'>
              Tasks
            </h2>
            <button
              onClick={() => setShowAddModal(true)}
              className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
            >
              Add Task
            </button>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
            {isLoading ? (
              <div className='text-black dark:text-white'>Loading tasks...</div>
            ) : (
              data?.tasks.map((task) => (
                <div
                  key={task._id}
                  className='bg-white dark:bg-gray-700 rounded-lg shadow hover:shadow-lg transition-shadow'
                >
                  <div className='p-4 border-b flex justify-between items-center'>
                    <h5 className='text-lg font-semibold text-black dark:text-white'>
                      #{task._id} .{task.title}
                    </h5>
                    <div className='flex space-x-2'>
                      <button
                        className='text-blue-500 hover:text-blue-700 dark:hover:text-blue-300'
                        onClick={() => {
                          setSelectedTask(task);
                          setShowUpdateModal(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className='text-red-500 hover:text-red-700 dark:hover:text-red-300'
                        onClick={() => {
                          setSelectedTask(task);
                          setShowDeleteModal(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className='p-4'>
                    <p className='text-gray-700 dark:text-gray-300'>
                      {task.description}
                    </p>
                  </div>
                  <div className='p-4 border-t'>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      Status:{' '}
                      <span className='font-semibold'>{task.status}</span>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {page < totalPages && (
            <div className='text-center mt-6'>
              <button
                onClick={loadMoreCards}
                className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all'
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}

          <div className='text-center mt-4'>
            <p className='text-gray-600 dark:text-gray-400'>
              Page {page} of {totalPages}
            </p>
          </div>
        </div>
      </main>

      <footer className='fixed bottom-0 left-0 right-0 p-6 bg-gray-100 dark:bg-gray-900 border-t text-center'>
        <p className='text-gray-600 dark:text-gray-400'>
          &copy; 2024 Task Project. All rights reserved.
        </p>
      </footer>

      {showAddModal && (
        <TaskModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddTask}
          initialValues={{
            title: '',
            description: '',
            status: 'inProgress' as const,
          }}
          mode='add'
        />
      )}

      {showUpdateModal && selectedTask && (
        <TaskModal
          onClose={() => setShowUpdateModal(false)}
          onSubmit={handleUpdateTask}
          initialValues={selectedTask}
          mode='update'
        />
      )}

      {showDeleteModal && selectedTask && (
        <DeleteConfirmationModal
          task={selectedTask}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
}

interface TaskModalProps {
  onClose: () => void;
  onSubmit: (task: CreateTaskInput | UpdateTaskInput) => void;
  initialValues: CreateTaskInput | Task;
  mode: 'add' | 'update';
}

function TaskModal({ onClose, onSubmit, initialValues, mode }: TaskModalProps) {
  return (
    <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg'>
        <h3 className='text-lg font-bold mb-4 text-black dark:text-white'>
          {mode === 'add' ? 'Add Task' : 'Update Task'}
        </h3>
        <Formik
          initialValues={initialValues}
          validationSchema={taskSchema}
          onSubmit={(values) => {
            onSubmit(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form className='space-y-4'>
              <div>
                <Field
                  name='title'
                  type='text'
                  placeholder='Title'
                  className='w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700'
                />
                <ErrorMessage
                  name='title'
                  component='div'
                  className='text-red-500'
                />
              </div>
              <div>
                <Field
                  name='description'
                  as='textarea'
                  placeholder='Description'
                  className='w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700'
                />
                <ErrorMessage
                  name='description'
                  component='div'
                  className='text-red-500'
                />
              </div>
              <div>
                <Field
                  name='status'
                  as='select'
                  className='w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700'
                >
                  <option value='inProgress'>In Progress</option>
                  <option value='completed'>Completed</option>
                </Field>
                <ErrorMessage
                  name='status'
                  component='div'
                  className='text-red-500'
                />
              </div>
              <div className='flex justify-end'>
                <button
                  type='button'
                  className='bg-red-500 text-white px-4 py-2 rounded mr-2'
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='bg-blue-500 text-white px-4 py-2 rounded'
                  disabled={isSubmitting}
                >
                  {mode === 'add' ? 'Add Task' : 'Update Task'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

interface DeleteConfirmationModalProps {
  task: Task;
  onClose: () => void;
  onDelete: () => void;
}

function DeleteConfirmationModal({
  task,
  onClose,
  onDelete,
}: DeleteConfirmationModalProps) {
  return (
    <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg'>
        <h3 className='text-lg font-bold mb-4 text-black dark:text-white'>
          Are you sure you want to delete "{task.title}"?
        </h3>
        <div className='flex justify-end'>
          <button
            className='bg-gray-500 text-white px-4 py-2 rounded mr-2'
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className='bg-red-500 text-white px-4 py-2 rounded'
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
