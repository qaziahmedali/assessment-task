'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ThemeProvider } from '@/contexts/ThemeContext';
import React from 'react';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='flex-grow p-2 pt-14 pb-14 bg-gray-300 dark:bg-white bg-white-8000'>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
