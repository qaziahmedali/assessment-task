'use client';

import React, { useState, useEffect } from 'react';
import {
  useTasks,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
} from '@/hooks/useTasks';
import {
  Task,
  CreateTaskInput,
  UpdateTaskInputWithTimeStamp,
} from '@/types/task';
import Button from '@/components/Button';
import TaskModal from './components/TaskActionModal';
import RootLayout from './layout';
import ConfirmationModal from '@/components/ConfirmationModal';
import TaskCard from './components/TaskCard';
import { ActionsMode, SortOrder, TaskStatus } from '@/common/enums';
import InputField from '@/components/InputField';
import { useTheme } from '@/contexts/ThemeContext';

export default function Home() {
  const [page, setPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder | ''>('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | ''>('');

  const { data, isLoading, error, refetch } = useTasks(
    page,
    8,
    sortOrder || undefined,
    statusFilter || undefined
  );
  const { mutate: createTaskMutation, isPending: isCreating } = useCreateTask();
  const { mutate: updateTaskMutation, isPending: isUpdating } = useUpdateTask();
  const { mutate: deleteTaskMutation, isPending: isDeleting } = useDeleteTask();

  const totalPages = data?.totalRecords
    ? Math.ceil(data.totalRecords / data.limit)
    : 0;

  useEffect(() => {
    refetch();
    setPage(1);
  }, [sortOrder, statusFilter, refetch]);

  const handleAddTask = (newTask: CreateTaskInput) => {
    createTaskMutation(newTask, {
      onSuccess: () => {
        setShowAddModal(false);
        refetch();
      },
    });
  };

  const handleUpdateTask = (updatedTask: UpdateTaskInputWithTimeStamp) => {
    const { _id, updatedAt, createdAt, userId, ...payload } = updatedTask;
    if (selectedTask) {
      updateTaskMutation(
        {
          id: selectedTask._id,
          updates: payload,
        },
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
      deleteTaskMutation(selectedTask._id, {
        onSuccess: () => {
          setShowDeleteModal(false);
          refetch();
        },
      });
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  if (error)
    return (
      <div className='text-red-500'>An error occurred: {error.message}</div>
    );
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col pt-3 ${
        theme === 'dark' ? 'dark' : ''
      }`}
    >
      <RootLayout>
        <div className='flex flex-col space-y-4 sm:flex-row sm:items-end sm:space-y-0 sm:space-x-4 mb-4'>
          <div className='flex-grow sm:flex sm:space-x-4'>
            <div className='w-full sm:w-auto mb-4 sm:mb-0'>
              <InputField
                name='sortOrder'
                label='Sort by Due Date'
                type='select'
                placeholder='Select Order'
                options={[
                  { value: '', label: 'Sort By Order' },
                  { value: SortOrder.ASC, label: 'Ascending' },
                  { value: SortOrder.DESC, label: 'Descending' },
                ]}
                onChange={(e) => setSortOrder(e.target.value as SortOrder | '')}
                value={sortOrder}
                formik={false}
              />
            </div>
            <div className='w-full sm:w-auto'>
              <InputField
                name='statusFilter'
                label='Filter by Status'
                type='select'
                placeholder='Select Status'
                options={[
                  { value: '', label: 'All' },
                  { value: TaskStatus.Completed, label: 'Completed' },
                  { value: TaskStatus.InProgress, label: 'In Progress' },
                ]}
                onChange={(e) =>
                  setStatusFilter(e.target.value as TaskStatus | '')
                }
                value={statusFilter}
                formik={false}
              />
            </div>
          </div>
          <div className='w-full sm:w-auto sm:flex-shrink-0 pb-5'>
            <Button
              onClick={() => setShowAddModal(true)}
              className='w-full sm:w-auto'
            >
              Add Task
            </Button>
          </div>
        </div>
        <TaskList
          tasks={data?.tasks}
          isLoading={isLoading}
          onEdit={(task) => {
            setSelectedTask(task);
            setShowUpdateModal(true);
          }}
          onDelete={(task) => {
            setSelectedTask(task);
            setShowDeleteModal(true);
          }}
        />

        {totalPages > 0 && (
          <div className='flex justify-center items-center space-x-4 mt-6'>
            <Button
              onClick={handlePrevPage}
              disabled={page === 1}
              className={page === 1 ? 'opacity-50 cursor-not-allowed' : ''}
            >
              Previous
            </Button>
            <span className='text-gray-600 dark:text-gray-400'>
              Page {page} of {totalPages}
            </span>
            <Button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className={
                page === totalPages ? 'opacity-50 cursor-not-allowed' : ''
              }
            >
              Next
            </Button>
          </div>
        )}
      </RootLayout>

      <TaskModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddTask as any}
        initialValues={{
          title: '',
          description: '',
          status: TaskStatus.InProgress as const,
        }}
        isSubmitting={isCreating}
        mode={ActionsMode.ADD}
      />

      <TaskModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSubmit={handleUpdateTask as any}
        initialValues={selectedTask!}
        isSubmitting={isUpdating}
        mode={ActionsMode.UPDATE}
      />

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteTask}
        taskTitle={'Task'}
        isSubmitting={isDeleting}
      />
    </div>
  );
}

const TaskList: React.FC<{
  tasks?: Task[];
  isLoading: boolean;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}> = ({ tasks, isLoading, onEdit, onDelete }) => {
  if (isLoading)
    return (
      <div className='text-black text-lg text-center'>Loading tasks...</div>
    );

  if (!tasks || tasks.length === 0) {
    return (
      <div className='inset-0 flex justify-center items-center p-4'>
        <div className='text-black dark:text-white text-lg  w-[90%] md:w-[50%] text-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg shadow pt-10'>
          <p>No tasks found.</p>
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
            Try adding a new task or adjusting your filters.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
      {isLoading ? (
        <div className='text-black text-lg text-center'>Loading tasks...</div>
      ) : (
        tasks?.map((task, index) => (
          <TaskCard
            key={index}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};
