import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { booton } from '@/fonts/fonts';

import './globals.css';
import { Providers } from '@/app/providers';

export const metadata: Metadata = {
  title: 'Developer Portal | Alien',
  description: 'Developer Portal | Alien',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning data-theme="dark" className="h-full">
      <body
        className={`${booton.className} ${booton.variable} h-full antialiased bg-bg-primary text-text-primary flex flex-col`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
