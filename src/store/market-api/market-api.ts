import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { UserAuthPaths } from '../../common/enums';
import { CreateParcelBody, DataResponse, Locker } from '../../common/types';
import { CreateParcelResponse } from '../../common/types/create-parcel';
import { senderPutResponse } from '../../common/types/parcel-list';
import { RootState } from '../store';

export const marketApi = createApi({
  reducerPath: 'market/api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_MARKET_URL}`,

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.profile?.business.market.prod
        .token;
      if (token) {
        headers.set('Market-Token', token);
      }
      return headers;
    },
  }),
  tagTypes: ['Parcels'],
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
    senderPut: build.mutation<senderPutResponse, { parcelNumber: number }>({
      query: ({ parcelNumber }) => ({
        url: `/api/market/parcels/${parcelNumber}/sender-put`,
        method: 'POST',
      }),
      invalidatesTags: ['Parcels'],
    }),
  }),
});
export const {
  useGetLockersQuery,
  useCreateParcelMutation,
  useSenderPutMutation,
} = marketApi;
