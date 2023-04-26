/* eslint-disable import/no-extraneous-dependencies */
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import autSlice from './auth/index';
import wallet from './wallet/index';

const rootReducer = combineReducers({ wallet, autSlice });

const persistConfig = {
  key: 'root',
  storage,
};

const RootState = persistReducer(persistConfig, rootReducer);

export default RootState;
