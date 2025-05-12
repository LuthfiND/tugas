// lib/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import eventsReducer from '../store/slices/EventsSlice';

export const makeStore = () => 
  configureStore({
    reducer: {
      events: eventsReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: process.env.NODE_ENV !== 'production' });