import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { StorageKey, UserAuthPaths } from '../../common/enums';
import { DataResponse, Locker } from '../../common/types';

const businessToken = localStorage.getItem(StorageKey.BUSINESSTOKEN) || '';

export const marketApi = createApi({
  reducerPath: 'market/api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_MARKET_URL}`,
    prepareHeaders: (headers) => {
      headers.set('Market-Token', businessToken);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getLockers: build.query<Locker[], void>({
      query: () => ({
        url: UserAuthPaths.GET_LOCKERS_FROM,
        params: {},
      }),
      transformResponse: (response: DataResponse) => response.data,
    }),
  }),
});
export const { useGetLockersQuery } = marketApi;
