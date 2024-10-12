'use client';

import React from 'react';
import Link from 'next/link';
import { Formik, Form } from 'formik';

import { useRegister } from '@/hooks/useAuth';
import InputField from '@/components/InputField';
import { signupValidationSchema } from '../validations/auth';
import { getErrorMessage } from '@/common/utils';
import FormCard from '@/components/FormCard';

const SignupForm: React.FC = () => {
  const { mutate: register, isPending, isError, error } = useRegister();

  return (
    <FormCard
      cardTitle='Sign up your account'
      cardFooter={
        <div className='mt-6 text-center text-black'>
          <p>
            Already have an account?{' '}
            <Link href='/login' className='text-blue-600 hover:text-blue-800'>
              Sign in
            </Link>
          </p>
        </div>
      }
    >
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        validationSchema={signupValidationSchema}
        onSubmit={(values) => {
          register(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='name'
              label='Name'
              type='text'
              placeholder='Your Name'
            />

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
              placeholder='••••••••'
            />

            <div className='mt-6'>
              <button
                type='submit'
                disabled={isPending || isSubmitting}
                className='w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                {isPending ? 'Signing up...' : 'Sign me up'}
              </button>
            </div>

            {isError && (
              <p className='text-red-500 text-center mt-4'>
                Error: {getErrorMessage(error)}
              </p>
            )}
          </Form>
        )}
      </Formik>
    </FormCard>
  );
};

export default SignupForm;
