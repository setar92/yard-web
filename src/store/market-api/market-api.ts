import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { StorageKey, UserAuthPaths } from '../../common/enums';
import {
  CreateParcelBody,
  DataResponse,
  Locker,
  UserInfo,
} from '../../common/types';
import { CreateParcelResponse } from '../../common/types/create-parcel';
import { senderPutResponse } from '../../common/types/parcel-list';

const userInfo = localStorage.getItem(StorageKey.PROFILE);
const userInfoObject = userInfo ? (JSON.parse(userInfo) as UserInfo) : null;
const businessToken = userInfoObject
  ? userInfoObject.business.market.prod.token
  : '';

export const marketApi = createApi({
  reducerPath: 'market/api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_MARKET_URL}`,
    prepareHeaders: (headers) => {
      headers.set('Market-Token', businessToken);
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
