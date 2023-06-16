import './globals.css';

import classNames from 'classnames';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  description: 'You are so bad',
  title: 'DO NOT SAY PROFANITY',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={
          (classNames(inter.className),
          'flex flex-col items-center justify-center bg-gray-800 text-black')
        }
        style={{ height: '100dvh' }}
      >
        {children}
      </body>
    </html>
  );
}
