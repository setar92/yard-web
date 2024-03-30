import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { marketApi } from './market-api/market-api';

const rootReducer = combineReducers({
  [marketApi.reducerPath]: marketApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(marketApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
