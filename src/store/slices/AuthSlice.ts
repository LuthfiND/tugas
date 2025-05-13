import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Login {
  email: string;
  password: string;
}

export interface loginState {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  fullname: string | null;
}

const initialState: loginState = {
  email: '',
  password: '',
  loading: false,
  error: null,
  isAuthenticated: false,
  fullname: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (user: Login, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/login', user);

      const fullName = response.data.data.fullName;
      localStorage.setItem('fullname', fullName);
      return { fullName };
    } catch (error) {
      return rejectWithValue('Failed to login');
    }
  }
);

export const isAuthenticatedUser = createAsyncThunk(
  'auth/isAuthenticated',
  async (_, { rejectWithValue }) => {
    console.log('isAuthenticatedUser thunk started');
    try {
      console.log('Making API call to /api/auth/me');
      const response = await axios.get('/api/auth/me');
      console.log('API call successful:', response.data);
      return true
    } catch (error) {
      console.error('API call failed:', error);
      return rejectWithValue('User not authenticated');
    }
  }
);

export const loadUserFromLocalStorage = createAsyncThunk(
  'auth/loadUserFromLocalStorage',
  async (_, { rejectWithValue }) => {
    const fullname = localStorage.getItem('fullname');

    if (fullname) {
      return { fullName: fullname };
    } else {
      return rejectWithValue('No user data in localStorage');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    clearAuthState: (state) => {
      state.email = '';
      state.password = '';
      state.loading = false;
      state.error = null;
      state.fullname = null;
      state.isAuthenticated = false;
      localStorage.removeItem('fullname');
      localStorage.removeItem('username');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.fullname = action.payload.fullName;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(isAuthenticatedUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('Checking authentication...');
      })
      .addCase(isAuthenticatedUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
        console.log('User is authenticated', state.isAuthenticated);
      })
      .addCase(isAuthenticatedUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        console.log('User is not authenticated', state.isAuthenticated);
      })
      .addCase(loadUserFromLocalStorage.fulfilled, (state, action) => {
        state.fullname = action.payload.fullName;
        state.isAuthenticated = true;
      })
      .addCase(loadUserFromLocalStorage.rejected, (state) => {
    
      });
  },
});

export default authSlice.reducer;
