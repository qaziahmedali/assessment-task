// src/components/ThemeToggle.tsx

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className='p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};
