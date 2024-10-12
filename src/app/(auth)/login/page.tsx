'use client';

import React from 'react';
import Link from 'next/link';
import { Formik, Form } from 'formik';

import { loginValidationSchema } from '../validations/auth';
import { useLogin } from '@/hooks/useAuth';
import InputField from '@/components/InputField';
import { getErrorMessage } from '@/common/utils';
import FormCard from '@/components/FormCard';

const SignInForm: React.FC = () => {
  const { mutate: login, isPending, isError, error } = useLogin();

  return (
    <FormCard
      cardTitle='Sign up your account'
      cardFooter={
        <div className='mt-6 text-center text-black'>
          <p>
            Don't have an account?{' '}
            <Link href='/signup' className='text-blue-600 hover:text-blue-800'>
              Sign up
            </Link>
          </p>
        </div>
      }
    >
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={loginValidationSchema}
        onSubmit={(values) => {
          login(values);
        }}
      >
        <Form>
          <InputField
            name='email'
            label='Email'
            type='email'
            placeholder='hello@example.com'
          />

          <InputField
            name='password'
            label='Password'
            type='password'
            placeholder='Password'
          />

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
              Error: {getErrorMessage(error)}
            </p>
          )}
        </Form>
      </Formik>
    </FormCard>
  );
};

export default SignInForm;
