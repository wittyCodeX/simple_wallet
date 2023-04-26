/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable simple-import-sort/imports */
import crypto from 'crypto';
import { ethers } from 'ethers';
import { useState } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { useDispatch, useSelector } from 'react-redux';
import { addWallet, authAction } from '@/store/actions';

declare global {
  interface Window {
    localStorage: any;
    ethereum: any;
  }
}

const Index = () => {
  const [privateKey, setPrivateKey] = useState<string>();
  const [name, setName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [confirm, setConfirm] = useState<Boolean>(false);
  const [alert, setAlert] = useState<string>();
  const walletData = useSelector((state: any) => state.wallet.wallets);
  const userName = useSelector((state: any) => state.autSlice.name);
  const dispatch = useDispatch();

  const handleCreate = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const key = `0x${crypto.randomBytes(32).toString('hex')}`;
    const wallet = new ethers.Wallet(key, provider);
    const balance = await provider.getBalance(wallet.address);
    const decimalBalance = ethers.utils.formatEther(balance);
    dispatch(
      addWallet({
        address: wallet.address,
        coinBalance: decimalBalance,
        privateKey: wallet.privateKey,
      })
    );
  };

  const handleLogin = () => {
    if (password) {
      dispatch(authAction({ name }));
    } else {
      setAlert('Please Input Password');
    }
  };

  const handleConfirm = () => {
    if (confirmPassword === password) {
      setConfirm(true);
    } else {
      setConfirm(false);
      setAlert('Password is incorrect!');
    }
  };

  const handleGetPrimaryKey = async (val: string) => {
    setPrivateKey(val);
  };

  const handleClose = () => {
    setConfirm(false);
    setConfirmPassword('');
    setPrivateKey('');
  };

  const handleLock = () => {
    dispatch(authAction(''));
  };

  return (
    <>
      <Main
        meta={
          <Meta
            title="Simple Wallet Keeper"
            description="Simple Wallet Keeper"
          />
        }
      >
        <div className="flex items-center justify-center">
          <div className="container">
            {alert && (
              <div className="fixed top-10 z-30 w-full">
                <div className="mx-auto flex w-1/2 justify-between border border-red-600 bg-white p-3 text-red-600">
                  <h1>{alert}</h1>
                  <button
                    className="border-l border-red-600 pl-2"
                    onClick={() => setAlert('')}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
            <div className="w-full border border-gray-700 p-6">
              <button
                data-testid="Lock"
                onClick={handleLock}
                className="float-left mt-2 border border-b-2 border-gray-700 px-3 py-2 hover:bg-gray-700 hover:text-white"
              >
                Lock
              </button>
              <button
                data-testid="genarate"
                onClick={handleCreate}
                className="float-right mt-2 border border-b-2 border-gray-700 px-3 py-2 hover:bg-gray-700 hover:text-white"
              >
                Generate
              </button>
              <h5
                data-testid="SimpleWalletKeeper"
                className="my-3 text-center font-bold tracking-tight"
              >
                Simple Wallet Keeper
              </h5>
              <hr className="border border-gray-700" />
              <div className="font-normal">
                <div className="relative w-full overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Num
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Address
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Token
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Balance
                        </th>
                        <th scope="col" className="px-6 py-3">
                          view
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {walletData &&
                        walletData.map((val: any, key: number) => {
                          return (
                            <tr
                              key={`address${key}`}
                              className="border-b border-gray-700"
                            >
                              <td className="px-6 py-4">{key + 1}</td>
                              <td className="px-6 py-4">{val.address}</td>
                              <td className="px-6 py-4">ETH</td>
                              <td className="px-6 py-4">{val.coinBalance}</td>
                              <td className="px-6 py-4">
                                <button
                                  data-testid={`PrivateKey${key}`}
                                  onClick={() =>
                                    handleGetPrimaryKey(val.privateKey)
                                  }
                                  className="border border-gray-700 px-3 py-2 hover:bg-gray-700 hover:text-white"
                                >
                                  Private Key
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {privateKey && (
          <div className="fixed right-0 top-0 z-10 flex h-full w-full items-center justify-center bg-[#4a556882]">
            <div className="w-[400px] border border-gray-700 bg-white p-6 shadow-sm">
              <h1 className="text-center">Private Key</h1>
              <hr className="my-2 border border-gray-700" />
              <div className="py-5">
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-700 px-3 py-2"
                  type="text"
                  placeholder="Input Password"
                />
                <div className="flex w-full justify-between">
                  <button
                    data-testid="privateConfirm"
                    onClick={handleConfirm}
                    className="mr-1 mt-3 w-full border border-gray-700 px-3 py-2 hover:bg-gray-700 hover:text-white"
                  >
                    confirm
                  </button>
                  <button
                    onClick={handleClose}
                    className="ml-1 mt-3 w-full border border-gray-700 px-3 py-2 hover:bg-gray-700 hover:text-white"
                  >
                    close
                  </button>
                </div>
                {confirm && (
                  <h1 className="mt-2" style={{ overflowWrap: 'break-word' }}>
                    {privateKey}
                  </h1>
                )}
              </div>
            </div>
          </div>
        )}
        {!userName && (
          <div className="fixed right-0 top-0 z-10 flex h-full w-full items-center justify-center bg-white">
            <div className="w-[400px] border border-gray-700 bg-white p-6 shadow-sm">
              <h1 className="text-center">Simple Wallet Keeper Login</h1>
              <hr className="my-2 border border-gray-700" />
              <div className="py-5">
                <input
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-700 px-3 py-2"
                  type="text"
                  placeholder="Input username"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-3 w-full border border-gray-700 px-3 py-2"
                  type="text"
                  placeholder="Input Password"
                />
                <div className="flex w-full justify-between">
                  <button
                    data-testid="Login"
                    onClick={() => handleLogin()}
                    className="mr-1 mt-3 w-full border border-gray-700 bg-gray-700 px-3 py-2 text-white hover:bg-white hover:text-gray-700"
                  >
                    Login
                  </button>
                </div>
                {confirm && (
                  <h1
                    data-testid="privateKey"
                    className="mt-2"
                    style={{ overflowWrap: 'break-word' }}
                  >
                    {privateKey}
                  </h1>
                )}
              </div>
            </div>
          </div>
        )}
      </Main>
    </>
  );
};
export default Index;
