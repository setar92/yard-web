import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { StorageKey, UserAuthPaths } from '../../common/enums';
import { ParcelObject } from '../../common/types';
import { setParcelsIds } from '../my-parcels/slice';

interface GetParcelsListResponse {
  data: [
    {
      id: string;
    },
  ];
}

interface GetParcelsInfoResponse {
  data: ParcelObject;
}

const token = localStorage.getItem(StorageKey.TOKEN) || '';

export const parcelsApi = createApi({
  reducerPath: 'parcels/api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_YARD_URL}`,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Parcels'],
  endpoints: (build) => ({
    getParcelsList: build.query<string[], void>({
      query: () => ({
        url: UserAuthPaths.GET_PARCELS_LIST,
      }),
      transformResponse: (response: GetParcelsListResponse) =>
        response.data.map((parcel) => parcel.id),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setParcelsIds(data));
      },
      providesTags: ['Parcels'],
    }),
    getParcelInfo: build.query<ParcelObject, string>({
      query: (id) => ({
        url: `${UserAuthPaths.GET_PARCELS_LIST}/${id}`,
        params: {},
      }),
      transformResponse: (response: GetParcelsInfoResponse) => response.data,
    }),
  }),
});
export const { useGetParcelsListQuery, useGetParcelInfoQuery } = parcelsApi;
