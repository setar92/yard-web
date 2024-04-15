import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { UserAuthPaths } from '../../common/enums';
import { AuthResponse, SendSmsQuery } from '../../common/types';
import { RootState } from '../store';

export const authYARDApi = createApi({
  reducerPath: 'userAuth',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_YARD_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    sendSms: builder.mutation<AuthResponse, SendSmsQuery>({
      query: ({ phone, type }) => ({
        url: UserAuthPaths.SEND_SMS,
        method: 'POST',
        params: { phone, type },
      }),
    }),
  }),
});

export const { useSendSmsMutation } = authYARDApi;
