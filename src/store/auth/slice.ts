import { createSlice } from '@reduxjs/toolkit';

import { StorageKey } from '../../common/enums';

type AuthState = {
  token: string | null;
  businessToken: string | null;
};

const initialState: AuthState = {
  token: localStorage.getItem(StorageKey.TOKEN) || null,
  businessToken: localStorage.getItem(StorageKey.BUSINESSTOKEN) || null,
};
interface setCredentialsAction {
  payload: { access_token: string };
  type: string;
}

interface setBusinesTokenAction {
  payload: { business_token: string };
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
    setBusinesToken: (state, action: setBusinesTokenAction) => {
      const { business_token } = action.payload;
      state.businessToken = business_token;
    },
    logOut: (state, _) => {
      state.token = null;
    },
  },
});

export const { setCredentials, logOut, setBusinesToken } = actions;
export { reducer };
