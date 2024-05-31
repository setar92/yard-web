import { createSlice } from '@reduxjs/toolkit';

import { UserRole, FromLocation } from '../../common/types';

type AuthState = {
  userRole: UserRole;
  fromLocation: FromLocation;
};

const initialState: AuthState = {
  userRole: 'sender',
  fromLocation: 'warehouse',
};

interface SetUserRole {
  payload: { userRole: UserRole };
  type: string;
}

interface SetFromLocation {
  payload: { fromLocation: FromLocation };
  type: string;
}

const { reducer, actions } = createSlice({
  name: 'deliveryType',
  initialState,
  reducers: {
    setUserRole: (state, action: SetUserRole) => {
      const { userRole } = action.payload;
      state.userRole = userRole;
    },
    setFromLocation: (state, action: SetFromLocation) => {
      const { fromLocation } = action.payload;
      state.fromLocation = fromLocation;
    },
  },
});

export const { setFromLocation, setUserRole } = actions;
export { reducer };
