/* eslint-disable import/no-extraneous-dependencies */
import { createSlice } from '@reduxjs/toolkit';

import type { WalletType } from './types';

type WalletState = {
  wallets: WalletType[];
};

const initialState: WalletState = {
  wallets: [],
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    addWallet: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.wallets = [...state.wallets, action.payload];
    },
  },
});

export const { addWallet } = walletSlice.actions;

export default walletSlice.reducer;
