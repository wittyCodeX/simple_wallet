/* eslint-disable testing-library/no-node-access */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jest/no-commented-out-tests */
// Import necessary dependencies and the component to be tested
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import Index from '@/pages/index';
// Create a mock store
import store from '@/store/index';

const persistor = persistStore(store);

describe('Index component', () => {
  it('renders the component', () => {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Index />
        </PersistGate>
      </Provider>
    );
    expect(screen.getByText('Simple Wallet Keeper Login')).toBeInTheDocument();

    // check login
    const loginButton = screen.getByTestId('Login');
    fireEvent.click(loginButton);
    expect(screen.getByTestId('SimpleWalletKeeper')).toBeInTheDocument();

    // check Get Private Key
    const lockButton = screen.getByTestId('Lock');
    fireEvent.click(lockButton);
    expect(screen.getByText('Simple Wallet Keeper Login')).toBeInTheDocument();
  });
});
