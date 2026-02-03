import { PropsWithChildren } from 'react';

import type { Metadata } from 'next';

import '@/ui/styles/globals.css';

export const metadata: Metadata = {
  title: 'Documents Reader.',
  description: 'Make your life much easier by read the long documents.',
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
