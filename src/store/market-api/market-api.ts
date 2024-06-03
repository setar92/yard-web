import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { StorageKey, UserAuthPaths } from '../../common/enums';
import { CreateParcelBody, DataResponse, Locker } from '../../common/types';
import { CreateParcelResponse } from '../../common/types/parcel';

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
    createParcel: build.mutation<CreateParcelResponse, CreateParcelBody>({
      query: (parcel) => ({
        url: UserAuthPaths.CREATE_PARCEL,
        method: 'POST',
        body: parcel,
      }),
    }),
    getLockers: build.query<Locker[], void>({
      query: () => ({
        url: UserAuthPaths.GET_LOCKERS_FROM,
        params: {},
      }),
      transformResponse: (response: DataResponse) => response.data,
    }),
  }),
});
export const { useGetLockersQuery, useCreateParcelMutation } = marketApi;
