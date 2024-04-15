import { createSlice } from '@reduxjs/toolkit';

import { StorageKey } from '../../common/enums';

type AuthState = {
  token: string | null;
};

const initialState: AuthState = {
  token: localStorage.getItem(StorageKey.TOKEN) || null,
};

const { reducer, actions } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    logOut: (state, _) => {
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = actions;
export { reducer };
