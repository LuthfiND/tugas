import { createSlice,createAsyncThunk,PayloadAction } from "@reduxjs/toolkit";
import { TCoupon } from "@/lib/types";
import axios from "axios";


export type CouponState = {
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
            const response = await axios.get(`/api/coupon`);
            console.log('Response from coupon API:', response.data);
            const data = response.data;
            return data as TCoupon;
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