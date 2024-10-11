import { ValidationRule } from '@/common/interface';

export const loginValidationRules: Record<string, ValidationRule[]> = {
  email: [
    {
      validator: (value) => typeof value === 'string',
      message: 'Email must be a string.',
    },
    {
      validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Invalid email format.',
    },
  ],
  password: [
    {
      validator: (value) => typeof value === 'string',
      message: 'Password must be a string.',
    },
    {
      validator: (value) => value.length >= 8,
      message: (value) =>
        `Password must be at least 8 characters long. You provided ${value.length} characters.`,
    },
  ],
};

export const signupValidationRules: Record<string, ValidationRule[]> = {
  name: [
    {
      validator: (value) => typeof value === 'string',
      message: 'Name must be a string.',
    },
    {
      validator: (value) => value.length >= 2 && value.length <= 50,
      message: (value) =>
        `Name must be between 2 and 50 characters. You provided ${value.length} characters.`,
    },
  ],
  ...loginValidationRules,
};
