import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <main className='flex-grow p-2 pt-14 pb-10 bg-white bg-white-800'>
        <Header />
        {children}
        <Footer />
      </main>
    </section>
  );
}
