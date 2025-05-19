// store/slices/EventsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Event } from "@/lib/types";
import axios from "axios";

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
    items: [],
    loading: false,
    error: null,
  },
  eventDetail: {
    item: null,
    loading: false,
    error: null,
  },
};

// 1) Ubah createAsyncThunk untuk menerima `searchQuery`
export const fetchEvents = createAsyncThunk<
  Event[],
  { searchQuery: string; selectedDate: Date | null },
  { rejectValue: string }
>(
  "events/fetchEvents",
  async ({ searchQuery, selectedDate }, { rejectWithValue }) => {
    try {
      const params: any = {};
      if (searchQuery) params.search = searchQuery;
      if (selectedDate) params.date = selectedDate.toISOString().slice(0, 10); // format YYYY-MM-DD
      const response = await axios.get<{ data: Event[] }>("/api/events", {
        params,
      });
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch events");
    }
  }
);

// Action lainnya dibiarkan seperti semula...
export const postTransaction = createAsyncThunk(
  "events/postTransaction",
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
      const response = await axios.post("/api/events/transaction", {
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
      return rejectWithValue("Failed to post transaction");
    }
  }
);

export const fetchEventsDetails = createAsyncThunk<Event, string>(
  "events/fetchDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/events/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch event detail");
    }
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchEvents
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.events.loading = true;
        state.events.error = null;
      })
      .addCase(
        fetchEvents.fulfilled,
        (state, action: PayloadAction<Event[]>) => {
          state.events.loading = false;
          state.events.items = action.payload;
        }
      )
      .addCase(fetchEvents.rejected, (state, action) => {
        state.events.loading = false;
        state.events.error = action.payload as string;
      });

    // fetchEventsDetails
    builder
      .addCase(fetchEventsDetails.pending, (state) => {
        state.eventDetail.loading = true;
        state.eventDetail.error = null;
      })
      .addCase(
        fetchEventsDetails.fulfilled,
        (state, action: PayloadAction<Event>) => {
          state.eventDetail.loading = false;
          state.eventDetail.item = action.payload;
        }
      )
      .addCase(fetchEventsDetails.rejected, (state, action) => {
        state.eventDetail.loading = false;
        state.eventDetail.error =
          action.error.message || "Something went wrong";
      });

    // postTransaction
    builder
      .addCase(postTransaction.pending, (state) => {
        state.events.loading = true;
        state.events.error = null;
      })
      .addCase(postTransaction.fulfilled, (state) => {
        state.events.loading = false;
      })
      .addCase(postTransaction.rejected, (state, action) => {
        state.events.loading = false;
        state.events.error = action.payload as string;
      });
  },
});

export default eventsSlice.reducer;
