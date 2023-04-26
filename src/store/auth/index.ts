/* eslint-disable import/no-extraneous-dependencies */
import { createSlice } from '@reduxjs/toolkit';

import type { AuthType } from './types';

const initialState: AuthType = {
  name: '',
};

const autSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authAction: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.name = action.payload.name;
    },
  },
});

export const { authAction } = autSlice.actions;

export default autSlice.reducer;
