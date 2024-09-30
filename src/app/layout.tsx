'use client';
import { Navbar } from '@/components/common/Navbar';
import { ReactQueryClientProvider } from '@/components/query/ReactQueryClientProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CookiesProvider } from 'react-cookie';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

//export const metadata: Metadata = {
//  title: 'Create Next App',
//  description: 'Generated by create next app',
//};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CookiesProvider>
      <ReactQueryClientProvider>
        <html lang="en">
          <body className={inter.className}>
            <div className="flex flex-col w-full min-h-screen bg-background">
              <Navbar />
              {children}
            </div>
          </body>
        </html>
      </ReactQueryClientProvider>
    </CookiesProvider>
  );
}