// app/confirmation/page.tsx
'use client'

import { useSearchParams } from 'next/navigation';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const token = searchParams.get('token');

  return (
    <div>
      <h1>Confirmation Page</h1>
      <p>Transaction ID: {id}</p>
      <p>Token: {token}</p>
    </div>
  );
}
