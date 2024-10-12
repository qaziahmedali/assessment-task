import '@/styles/globals.css';
import type { Metadata } from 'next';
import ReactQueryProvider from '@/providers/ReactQueryProvider';

export const metadata: Metadata = {
  title: 'Task Management App',
  description: 'Manage your tasks efficiently',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
