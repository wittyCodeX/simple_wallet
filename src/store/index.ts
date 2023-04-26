/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import thunk from 'redux-thunk';

import persistedReducer from './reducers';

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const useAppDispatch = () => useDispatch();
export default store;
