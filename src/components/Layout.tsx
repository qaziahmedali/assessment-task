'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className='min-h-screen bg-white dark:bg-gray-800 text-black dark:text-white'>
        <nav className='bg-gray-800 dark:bg-gray-900 p-4'>
          <div className='container mx-auto flex justify-between items-center'>
            <Link href='/'>
              <span className='text-white text-2xl font-bold cursor-pointer'>
                Task Manager
              </span>
            </Link>
            <div className='flex items-center space-x-4'>
              <button
                onClick={toggleTheme}
                className='text-white bg-gray-700 dark:bg-gray-600 px-3 py-1 rounded'
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
              {isLoggedIn ? (
                <button onClick={handleLogout} className='text-white'>
                  Logout
                </button>
              ) : (
                <>
                  <Link href='/login'>
                    <span className='text-white cursor-pointer'>Login</span>
                  </Link>
                  <Link href='/register'>
                    <span className='text-white cursor-pointer'>Register</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
        <main className='container mx-auto mt-4 p-4'>{children}</main>
      </div>
    </div>
  );
}
