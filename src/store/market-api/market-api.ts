import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { DataResponse, Locker } from '../../common/types';

export const marketApi = createApi({
  reducerPath: 'market/api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_MARKET_URL}`,
    prepareHeaders: (headers) => {
      headers.set('Market-Token', `${process.env.REACT_APP_MARKET_TOKEN}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getLockers: build.query<Locker[], void>({
      query: () => ({
        url: '/api/market/lockers-from',
        params: {},
      }),
      transformResponse: (response: DataResponse) => response.data,
    }),
  }),
});

export const { useGetLockersQuery } = marketApi;
