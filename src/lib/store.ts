import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import eventsReducer from '../store/slices/EventsSlice';
import authReducer from '../store/slices/AuthSlice';
import couponReducer from '../store/slices/CouponSlice';


export const makeStore = () => 
  configureStore({
    reducer: {
      events: eventsReducer,
      auth : authReducer,
      coupon: couponReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    devTools: process.env.NODE_ENV !== 'production',
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: process.env.NODE_ENV !== 'production' });