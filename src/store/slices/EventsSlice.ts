import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '@/lib/types';
import axios from 'axios';

export interface EventsState {
  items: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: {
  events: EventsState;
  eventDetail: {
    item: Event | null;
    loading: boolean;
    error: string | null;
  };
} = {
  events: {
    items: [] as Event[], 
    loading: false,
    error: null,
  },
  eventDetail: {
    item: null, 
    loading: false,
    error: null,
  },
};

export interface EventDetailState { 
  item : Event
  loading : boolean
  error : string | null
}


export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/events');
      return response.data.data as Event[];
    } catch (error) {
      return rejectWithValue('Failed to fetch events');
    }
  }
);

export const postTransaction = createAsyncThunk(
  'events/postTransaction',
  async (
    {
      eventId,
      qty,
      isPointUse,
      isUseCoupon,
      userCouponId,
      isUseVoucher,
      userVoucherId,
    }: {
      eventId: number;
      qty: number;
      isPointUse: boolean;
      isUseCoupon: boolean;

      userCouponId: number | null;
      isUseVoucher: boolean;
      userVoucherId: number | null;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post('/api/events/transaction', {
        eventId,
        qty,
        isPointUse,
        isUseCoupon,
        userCouponId,
        isUseVoucher,
        userVoucherId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to post transaction');
    }
  }
);

export const fetchTransactionDetail = createAsyncThunk(
  'events/fetchTransactionDetail',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/events/transaction/${id}`);
      return response.data;
    }
    catch (error) {
      return rejectWithValue('Failed to fetch transaction detail');
    }
  }
);

export const fetchEventsDetails = createAsyncThunk<Event, string>(
  'events/fetchDetail',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/events/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch event detail');
    }
  }
);
const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.events.loading = true;
        state.events.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
        state.events.loading = false;
        state.events.items = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.events.loading = false;
        state.events.error = action.payload as string;
      })
      .addCase(fetchEventsDetails.pending, (state) => {
        state.eventDetail.loading = true
        state.eventDetail.error = null 
      })
      .addCase(fetchEventsDetails.fulfilled, (state,action : PayloadAction<Event>)=> {
        state.eventDetail.item = action.payload
        state.eventDetail.loading = false
      })
      .addCase(fetchEventsDetails.rejected, (state,action)=> {
        state.eventDetail.error = action.error.message || "Somethin went Wrong"
        state.eventDetail.loading = false
      })
      .addCase(postTransaction.pending, (state) => {
        state.events.loading = true;
        state.events.error = null;
      })
      .addCase(postTransaction.fulfilled, (state, action) => {
        state.events.loading = false;
      }
      )
      .addCase(postTransaction.rejected, (state, action) => {
        state.events.loading = false;
        state.events.error = action.payload as string;
      }
      );
  },
});

export default eventsSlice.reducer;
