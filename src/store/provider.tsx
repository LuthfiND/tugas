'use client';

import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import eventsReducer, { EventDetailState, EventsState } from './slices/EventsSlice';
import authReducer , {loginState}  from './slices/AuthSlice'
import { ReactNode } from 'react';
import couponReducer, { CouponState } from './slices/CouponSlice';
import transactionReducer, { initialStateType } from './slices/transactionSlice';

export interface RootState {
  events: {
    events: EventsState;
    eventDetail: EventDetailState; 
  };
  auth : loginState
  coupon : CouponState,
  transaction : initialStateType
}


const rootReducer = combineReducers({
  events: eventsReducer, 
  auth : authReducer,
  coupon : couponReducer,
  transaction : transactionReducer
});

const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as Partial<RootState>,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];

export function Providers({ 
  children, 
  preloadedState 
}: { 
  children: ReactNode, 
  preloadedState?: Partial<RootState> 
}) {
  const store = makeStore(preloadedState);
  return <Provider store={store}>{children}</Provider>;
}
