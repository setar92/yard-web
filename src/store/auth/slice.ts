import { createSlice } from '@reduxjs/toolkit';

import { StorageKey } from '../../common/enums';
import { UserInfo } from '../../common/types';

type AuthState = {
  token: string | null;
  profile: UserInfo | null;
};

const initialState: AuthState = {
  token: localStorage.getItem(StorageKey.TOKEN) || null,
  profile: localStorage.getItem(StorageKey.PROFILE)
    ? (JSON.parse(
        localStorage.getItem(StorageKey.PROFILE) as string,
      ) as UserInfo)
    : null,
};
interface setCredentialsAction {
  payload: { access_token: string };
  type: string;
}

interface setProfileTokenAction {
  payload: { profile: UserInfo };
  type: string;
}

const { reducer, actions } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: setCredentialsAction) => {
      const { access_token } = action.payload;
      state.token = access_token;
    },
    setProfileInfo: (state, action: setProfileTokenAction) => {
      const { profile } = action.payload;
      state.profile = profile;
    },
    logOut: (state, _) => {
      state.token = null;
      state.profile = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logOut, setProfileInfo } = actions;
export { reducer };
