import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { combineReducers } from 'redux';

import { reducer as authReducer } from './auth/slice';
import { authYARDApi } from './auth-yard-api/auth-yard-api';
import { reducer as deliveryTypeReducer } from './delivery-type/slice';
import { marketApi } from './market-api/market-api';
import { reducer as parcelsListReducer } from './my-parcels/slice';
import { parcelsApi } from './parcels-api/parcels-api';

const rootReducer = combineReducers({
  [marketApi.reducerPath]: marketApi.reducer,
  [authYARDApi.reducerPath]: authYARDApi.reducer,
  [parcelsApi.reducerPath]: parcelsApi.reducer,
  'auth': authReducer,
  'deliveryType': deliveryTypeReducer,
  'parcelsList': parcelsListReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      marketApi.middleware,
      parcelsApi.middleware,
      authYARDApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
