import { createSlice,createAsyncThunk,PayloadAction } from "@reduxjs/toolkit";
import { TCoupon } from "@/lib/types";
import axios from "axios";


type CouponState = {
    coupons: TCoupon | null;
    loading: boolean;
    error: string | null;
}
const initialState: CouponState = {
    coupons: null,
    loading: false,
    error: null,
};

export const fetchCoupons = createAsyncThunk(
    'coupons/fetchCoupons',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/coupons');
            const data = response.data;
            return data.data as TCoupon;
        } catch (error) {
            return rejectWithValue('Failed to fetch coupons');
        }
    }
);

const couponSlice = createSlice({
    name: 'coupons',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoupons.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCoupons.fulfilled, (state, action: PayloadAction<TCoupon>) => {
                state.loading = false;
                state.coupons = action.payload;
            })
            .addCase(fetchCoupons.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});
export default couponSlice.reducer;