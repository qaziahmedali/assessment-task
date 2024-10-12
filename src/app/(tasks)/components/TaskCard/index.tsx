import Button from '@/components/Button';
import Card from '@/components/Card';
import { Task } from '@/types/task';
import React from 'react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  return (
    <Card key={task._id} className='flex flex-col h-full'>
      <div className='p-4 flex-grow'>
        <div className='flex justify-between items-start mb-2'>
          <h5 className='text-lg font-semibold text-black dark:text-white truncate mr-2'>
            {task.title}
          </h5>
          <span className='text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full'>
            #{task._id.slice(-4)}
          </span>
        </div>
        <p className='text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3'>
          {task.description}
        </p>
      </div>
      <div className='p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center'>
        <span
          className={`text-sm font-medium px-3 py-1 rounded-full ${
            task.status === 'completed'
              ? 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200'
              : 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200'
          }`}
        >
          {task.status}
        </span>
        <div className='flex space-x-2'>
          <Button
            variant='secondary'
            onClick={() => onEdit(task)}
            className='flex items-center justify-center p-2 text-sm'
            aria-label='Edit task'
          >
            <span className='sm:hidden'>✏️</span>
            <span className='hidden sm:inline'>Edit</span>
          </Button>
          <Button
            variant='danger'
            onClick={() => onDelete(task)}
            className='flex items-center justify-center p-2 text-sm'
            aria-label='Delete task'
          >
            <span className='sm:hidden'>🗑️</span>
            <span className='hidden sm:inline'>Delete</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
