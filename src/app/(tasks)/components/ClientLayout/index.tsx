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
    <ThemeProvider>
      <main className='flex-grow p-2 pt-14 pb-10 bg-white bg-white-800'>
        <Header />
        {children}
        <Footer />
      </main>
    </ThemeProvider>
  );
}
