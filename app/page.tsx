'use client';

import dynamic from 'next/dynamic';

const FormBuilder = dynamic(
  () => import('@/components/form-builder').then(mod => mod.FormBuilder),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <FormBuilder />
    </main>
  );
}
