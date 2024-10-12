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
        <Button variant='secondary' onClick={toggleTheme}>
          {theme === 'light' ? 'Dark mode 🌙' : 'Light Mode ☀️'}
        </Button>
        <Button variant='secondary' onClick={onLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;
