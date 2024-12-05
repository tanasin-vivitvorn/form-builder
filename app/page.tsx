'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Import FormBuilder with no SSR
const FormBuilder = dynamic(
  () => import('@/components/form-builder'),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen">
      <FormBuilder />
    </main>
  );
}