/* eslint-disable import/no-extraneous-dependencies */
import '../styles/global.css';

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import store from '@/store/index';

const persistor = persistStore(store);

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
};

export default MyApp;
