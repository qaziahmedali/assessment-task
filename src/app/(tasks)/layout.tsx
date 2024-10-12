import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <div className='bg-white text-black min-h-screen flex flex-col'>
        <Header />
        {children}
        <Footer />
      </div>
    </section>
  );
}
