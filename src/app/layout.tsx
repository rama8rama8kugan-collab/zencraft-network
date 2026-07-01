'use client';

import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MinecraftLoginModal from '@/components/MinecraftLoginModal';
import AnnouncementBanner from '@/components/AnnouncementBanner';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0e27" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-dark text-white overflow-x-hidden`}>
        <AnnouncementBanner />
        <Navigation />
        <MinecraftLoginModal />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
