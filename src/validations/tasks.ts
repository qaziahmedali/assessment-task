import { TaskStatus } from '@/common/enums';
import { ValidationRule } from '@/common/interface';

export const getTaskCreationRules = (isUpdate: boolean) => {
  return {
    title: [
      {
        validator: (value: string) => typeof value === 'string',
        message: 'title must be a string.',
        optional: isUpdate,
      },
      {
        validator: (value: string) => value.length >= 1 && value.length <= 100,
        message: 'title must be between 1 and 100 characters.',
        optional: isUpdate,
      },
    ],
    description: [
      {
        validator: (value: string) => typeof value === 'string',
        message: 'description must be a string.',
        optional: isUpdate,
      },
    ],
    status: [
      {
        validator: (value: string) =>
          Object.values(TaskStatus).includes(value as TaskStatus),
        message: `Invalid status. Must be one of the expected strings are ${Object.values(
          TaskStatus
        ).join(', ')}`,
        optional: true,
      },
    ],
  };
};

export const fetchTaskRules: Record<string, ValidationRule[]> = {
  status: [
    {
      validator: (value: string) => ['completed', 'inProgress'].includes(value),
      message: 'Status must be "completed", or "inProgress".',
      optional: true,
    },
  ],
  page: [
    {
      validator: (value: string) => !isNaN(Number(value)) && Number(value) > 0,
      message: 'Page must be a positive number.',
      optional: true,
    },
  ],
  limit: [
    {
      validator: (value: string) =>
        !isNaN(Number(value)) && Number(value) > 0 && Number(value) <= 100,
      message: 'Limit must be a positive number not exceeding 100.',
      optional: true,
    },
  ],
  order: [
    {
      validator: (value: string) => ['asc', 'desc'].includes(value),
      message: 'Order must be "asc" or "desc".',
      optional: true,
    },
  ],
};
