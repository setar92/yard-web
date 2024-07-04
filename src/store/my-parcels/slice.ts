import { createSlice } from '@reduxjs/toolkit';

import { ParcelObject } from '../../common/types';

type ParcelsState = {
  parcelsIds: string[];
  parcelsObjects: ParcelObject[];
};

const initialState: ParcelsState = {
  parcelsIds: [],
  parcelsObjects: [],
};

interface setParcelIdsAction {
  payload: string[];
  type: string;
}

interface setParcelObjectsAction {
  payload: { parcel: ParcelObject };
  type: string;
}

const { reducer, actions } = createSlice({
  name: 'parcelsList',
  initialState,
  reducers: {
    setParcelsIds: (state, action: setParcelIdsAction) => {
      const ids = action.payload;
      state.parcelsIds = ids;
    },
    setParcelsObjects: (state, action: setParcelObjectsAction) => {
      const { parcel } = action.payload;
      state.parcelsObjects = [...state.parcelsObjects, parcel];
    },
  },
});

export const { setParcelsIds, setParcelsObjects } = actions;
export { reducer };
