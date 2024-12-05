'use client';
import React from 'react';
import { ClientOnly } from '@/components/client-wrapper';
import { Providers } from '@/store/provider';
import { Toaster } from "@/components/ui/toaster";
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientOnly>
        <Providers>
          {children}
          </Providers>
          <Toaster />
        </ClientOnly>
      </body>
    </html>
  );
}
