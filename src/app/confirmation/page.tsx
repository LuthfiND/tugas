'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store'; // Sesuaikan dengan struktur Redux Anda
import { uploadProof } from '@/store/slices/TransactionSlice';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const token = searchParams.get('token');

  const dispatch = useDispatch<AppDispatch>();
  const uploadStatus = useSelector((state: RootState) => state.transaction.uploadStatus);

  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!file || !id) {
      setMessage('Please select a file and ensure the transaction ID is valid.');
      return;
    }

    const formData = new FormData();
    formData.append('proof', file);

    // Dispatch Redux action
    dispatch(uploadProof({ id, formData }));
  };

  return (
    <div>
      <h1>Confirmation Page</h1>
      <p>Transaction ID: {id}</p>
      <p>Token: {token}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="proof">Upload your proof of payment:</label>
          <input
            type="file"
            id="proof"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" disabled={uploadStatus === 'loading'}>
          {uploadStatus === 'loading' ? 'Uploading...' : 'Submit'}
        </button>
      </form>
      {uploadStatus === 'success' && <p>Proof of payment uploaded successfully!</p>}
      {uploadStatus === 'error' && <p>Failed to upload proof of payment. Please try again.</p>}
      {message && <p>{message}</p>}
    </div>
  );
}