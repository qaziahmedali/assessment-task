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
    10,
    sortOrder || undefined,
    statusFilter || undefined
  );
  const { mutate: createTaskMutation, isPending: isCreating } = useCreateTask();
  const { mutate: updateTaskMutation, isPending: isUpdating } = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const totalPages = data?.totalRecords
    ? Math.ceil(data.totalRecords / data.limit)
    : 0;

  useEffect(() => {
    refetch();
  }, [sortOrder, statusFilter, refetch]);

  const loadMoreCards = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

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
    <div className='min-h-screen flex flex-col'>
      <RootLayout>
        <div className='flex justify-between mb-4'>
          <div className='flex space-x-5'>
            <InputField
              name='sortOrder'
              label='Sort by Due Date'
              type='select'
              placeholder='Select Order'
              options={[
                { value: '', label: 'Sort By Order' },
                { value: 'asc', label: 'Ascending' },
                { value: 'desc', label: 'Descending' },
              ]}
              onChange={(e) => setSortOrder(e.target.value as SortOrder | '')}
              value={sortOrder}
              formik={false}
            />

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
          <div>
            <Button onClick={() => setShowAddModal(true)}>Add Task</Button>
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

        {page < totalPages && (
          <div className='text-center mt-6'>
            <Button onClick={loadMoreCards} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Load More'}
            </Button>
          </div>
        )}

        {totalPages > 0 ? (
          <div className='text-center mt-4'>
            <p className='text-gray-600 dark:text-gray-400'>
              Page {page} of {totalPages}
            </p>
          </div>
        ) : (
          <div></div>
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

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
      {tasks?.map((task, index) => (
        <TaskCard key={index} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};
