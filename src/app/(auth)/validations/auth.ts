import * as Yup from 'yup';

const commonValidations = {
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 6 characters long')
    .required('Password is required'),
};

export const loginValidationSchema = Yup.object({
  ...commonValidations,
});

export const signupValidationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  ...commonValidations,
});
