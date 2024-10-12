import React from 'react';
import Button from '../Button';

export default function Header() {
  return (
    <header className='fixed top-0 left-0 right-0 z-50 p-6 bg-gray-100 dark:bg-gray-900 border-b flex justify-between items-center'>
      <h1 className='text-2xl font-bold text-black dark:text-white'>
        Task Project
      </h1>
      <div className='flex space-x-6 items-center'>
        <Button variant='secondary'>Logout</Button>
      </div>
    </header>
  );
}
