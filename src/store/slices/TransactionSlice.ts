import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk untuk upload proof
export const uploadProof = createAsyncThunk(
  'transaction/uploadProof',
  async ({ id, formData }: { id: string; formData: FormData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}api/transaction/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to upload proof');
    }
  }
);

export type initialStateType = {
    uploadStatus: 'idle' | 'loading' | 'success' | 'error';
    error: string | null;
    };
// Initial state
const initialState : initialStateType = {
  uploadStatus: 'idle', // idle | loading | success | error
  error: null as string | null,
};

// Slice
const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadProof.pending, (state) => {
        state.uploadStatus = 'loading';
        state.error = null;
      })
      .addCase(uploadProof.fulfilled, (state) => {
        state.uploadStatus = 'success';
        state.error = null;
      })
      .addCase(uploadProof.rejected, (state, action) => {
        state.uploadStatus = 'error';
        state.error = action.payload as string;
      });
  },
});

export default transactionSlice.reducer;