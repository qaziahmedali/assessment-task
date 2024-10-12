import React from 'react';

export default function Header() {
  return (
    <header className='fixed top-0 left-0 right-0 z-50 p-6 bg-gray-100 dark:bg-gray-900 border-b flex justify-between items-center'>
      <h1 className='text-2xl font-bold'>Task Project</h1>
      <div className='flex space-x-6 items-center'>
        <button className='bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded'>
          {true ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        </button>
      </div>
    </header>
  );
}
