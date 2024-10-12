'use client';

import React from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import { useRegister } from '@/hooks/useAuth';
import { signupValidationSchema } from '../validations/signup';

const SignupForm: React.FC = () => {
  const { mutate: register, isPending, isError, error } = useRegister();

  const formik = useFormik({
    initialValues: {
      name: '', // Changed to name
      email: '',
      password: '',
    },
    validationSchema: signupValidationSchema,
    onSubmit: (values) => {
      register(values); // Passes the object with name
    },
  });

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-md'>
        <h4 className='text-xl font-semibold text-center mb-4'>
          Sign up your account
        </h4>
        <form onSubmit={formik.handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='name' className='block mb-1 font-medium'>
              Name
            </label>
            <input
              type='text'
              name='name' // Changed to name
              id='name' // Changed to name
              placeholder='Your Name'
              className={`w-full p-2 border rounded-md ${
                formik.errors.name && formik.touched.name
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name} // Changed to name
            />
            {formik.errors.name && formik.touched.name && (
              <div className='text-red-500 text-sm'>
                {formik.errors.name as string}
              </div>
            )}
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='block mb-1 font-medium'>
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='hello@example.com'
              className={`w-full p-2 border rounded-md ${
                formik.errors.email && formik.touched.email
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email && (
              <div className='text-red-500 text-sm'>
                {formik.errors.email as string}
              </div>
            )}
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='block mb-1 font-medium'>
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='••••••••'
              className={`w-full p-2 border rounded-md ${
                formik.errors.password && formik.touched.password
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password && (
              <div className='text-red-500 text-sm'>
                {formik.errors.password as string}
              </div>
            )}
          </div>
          <button
            type='submit'
            className='w-full py-2 mt-4 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            disabled={isPending}
          >
            {isPending ? 'Signing up...' : 'Sign me up'}
          </button>
        </form>
        {isError && (
          <div className='mt-3 text-red-500'>{(error as Error).message}</div>
        )}
        <div className='mt-4 text-center'>
          <p>
            Already have an account?{' '}
            <Link className='text-blue-600 hover:underline' href='login'>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
