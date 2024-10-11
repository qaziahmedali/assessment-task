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
      {
        validator: (value: string) => value.length <= 500,
        message: 'description must not exceed 500 characters.',
        optional: isUpdate,
      },
    ],
    status: [
      {
        validator: (value: string) =>
          ['inProgress', 'completed'].includes(value),
        message: 'status must be either "inProgress" or "completed".',
        optional: true,
      },
    ],
  };
};
