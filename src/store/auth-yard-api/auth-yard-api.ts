import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { StorageKey, UserAuthPaths } from '../../common/enums';
import {
  VerifyCodeQuery,
  VerifyCodeResponse,
  SendCodeResponse,
  SendSmsQuery,
  UserInfo,
  GetUserInfoResponse,
} from '../../common/types';
import { setCredentials, setProfileInfo } from '../auth/slice';
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
    sendSms: builder.mutation<SendCodeResponse, SendSmsQuery>({
      query: ({ phone, type }) => ({
        url: UserAuthPaths.SEND_SMS,
        method: 'POST',
        params: { phone, type },
      }),
    }),
    getUserInfo: builder.query<UserInfo, void>({
      query: () => ({
        url: UserAuthPaths.GET_USER_INFO,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        const profile = data;
        dispatch(setProfileInfo({ profile }));
        localStorage.setItem(StorageKey.PROFILE, JSON.stringify(profile));
      },
      transformResponse: (response: GetUserInfoResponse) => {
        return response.data;
      },
    }),

    verifyCode: builder.mutation<VerifyCodeResponse, VerifyCodeQuery>({
      query: ({ phone, type, code }) => ({
        url: UserAuthPaths.VERIFY_SMS,
        method: 'POST',
        params: { phone, type, code },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        const access_token = data.data.access_token;
        dispatch(setCredentials({ access_token }));
        localStorage.setItem(StorageKey.TOKEN, access_token);
      },
    }),
  }),
});

export const {
  useSendSmsMutation,
  useVerifyCodeMutation,
  useGetUserInfoQuery,
} = authYARDApi;
