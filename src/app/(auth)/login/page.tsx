'use client';

import React from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import { useLogin } from '@/hooks/useAuth';
import { loginValidationSchema } from '../validations/login';

const SignInForm: React.FC = () => {
  const { mutate: login, isPending, isError, error } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      login(values);
    },
  });

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='container mx-auto max-w-md shadow-md rounded-md bg-white'>
        <div className='p-6'>
          <h4 className='text-2xl font-semibold text-center mb-4'>
            Sign in to your account
          </h4>
          <form onSubmit={formik.handleSubmit}>
            <div className='mb-4'>
              <label className='block text-gray-700 font-semibold mb-1'>
                Email
              </label>
              <input
                type='email'
                name='email'
                placeholder='hello@example.com'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`form-input w-full px-4 py-2 border rounded-md ${
                  formik.errors.email && formik.touched.email
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {formik.errors.email && formik.touched.email && (
                <p className='text-red-500 text-sm mt-1'>
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-semibold mb-1'>
                Password
              </label>
              <input
                type='password'
                name='password'
                placeholder='Password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`form-input w-full px-4 py-2 border rounded-md ${
                  formik.errors.password && formik.touched.password
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {formik.errors.password && formik.touched.password && (
                <p className='text-red-500 text-sm mt-1'>
                  {formik.errors.password}
                </p>
              )}
            </div>

            <div className='mt-6'>
              <button
                type='submit'
                disabled={isPending}
                className='w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors'
              >
                {isPending ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            {isError && (
              <p className='text-red-500 text-center mt-4'>
                Error: {error.message}
              </p>
            )}
          </form>

          <div className='mt-6 text-center'>
            <p>
              Don't have an account?{' '}
              <Link
                href='/signup'
                className='text-blue-600 hover:text-blue-800'
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
