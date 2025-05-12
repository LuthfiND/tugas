'use client';

import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import eventsReducer, { EventsState } from './slices/EventsSlice';
import { ReactNode } from 'react';

export interface RootState {
  events: EventsState;
}

const rootReducer = combineReducers({
  events: eventsReducer,
});

const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as RootState
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