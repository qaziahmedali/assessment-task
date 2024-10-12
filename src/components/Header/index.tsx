import React from 'react';
import Button from '../Button';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/api/auth';
import { useTheme } from '@/contexts/ThemeContext';

const Header = () => {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const onLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 p-6 bg-gray-100 dark:bg-gray-900 border-b flex justify-between items-center`}
    >
      <h1 className='text-2xl font-bold text-black dark:text-white'>
        Task Project
      </h1>
      <div className='flex space-x-6 items-center'>
        <button
          onClick={toggleTheme}
          className='px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-500 transition'
        >
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>

        <Button variant='secondary' onClick={onLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;
