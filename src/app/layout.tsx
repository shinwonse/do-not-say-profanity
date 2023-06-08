import './globals.css'
import { Inter } from 'next/font/google'
import { ReactNode } from "react";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DO NOT SAY PROFANITY',
  description: 'You are so bad',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
