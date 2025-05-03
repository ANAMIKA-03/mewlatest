import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { networks } from '../../screen/utils/walletConstants';

// Define the initial state using that type
const initialState = {
  lockwallet: false,
  initialized: false,
  onboarding: false,
  walletCreated: false,
  mnemonic: '',
  address: '',
  privateKey: '',
  password: '',
  biometrics: false,
  activeWallet: 0,
  activeNetwork: 0,
  wallets: [
    {
      index: 0,
      address: '0x0000000000000000000000000000000000000000',
      privateKey: '',
      name: 'Account 1',
      assets: [
        {
          chainId: '0x38',
          balance: '0',
          tokens: [
            {
              balance: 0,
              chainId: '0x38',
              slug: 'bsc',
              decimals: 18,
              logo: 'https://raw.githubusercontent.com/OMTrip/merkle_wallet/main/assets-main/assets-main/images/bsc/0x42dABca1aF369FBd9e8Ea286dAFBA45b23fC92D9/logo.png',
              explorerLogo:
                'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
              name: 'Big Tycoon',
              possible_spam: false,
              show: true,
              type: 'token',
              symbol: 'BTYC',
              thumbnail: null,
              token_address: '0x42dABca1aF369FBd9e8Ea286dAFBA45b23fC92D9',
            },
            {
              balance: 0,
              chainId: '0x38',
              slug: 'bsc',
              decimals: 18,
              logo: 'https://raw.githubusercontent.com/OMTrip/merkle_wallet/main/assets-main/assets-main/images/bsc/0x2B9ec6d94199F80e63fBAa0a4A502E411B211058/logo.png',
              explorerLogo:
                'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
              name: 'BUZZBT',
              possible_spam: false,
              show: true,
              type: 'token',
              symbol: 'BUBT',
              thumbnail: null,
              token_address: '0x2B9ec6d94199F80e63fBAa0a4A502E411B211058',
            },
            {
              balance: 0,
              chainId: '0x38',
              slug: 'bsc',
              decimals: 18,
              logo: 'https://raw.githubusercontent.com/OMTrip/merkle_wallet/main/assets-main/assets-main/images/bsc/0x0A23558A20A128F463b1E7034C89620c862c36F5/logo.png',
              explorerLogo:
                'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
              name: 'Big Shot',
              possible_spam: false,
              show: true,
              type: 'token',
              symbol: 'BSBT',
              thumbnail: null,
              token_address: '0x0A23558A20A128F463b1E7034C89620c862c36F5',
            },
          ],
          nfts: [],
          slug: 'bsc',
          rpcUrl: 'https://bsc-dataseed.binance.org/',
          blockExplorerUrl: 'https://bscscan.com',
          name: 'Binance Coin',
          symbol: 'BNB',
          decimals: 18,
          nativeCurrency: {
            name: 'Binance Coin',
            symbol: 'BNB',
            decimals: 18,
            address: '0x0000000000000000000000000000000000000000',
            slug: 'bsc',
          },
          show: true,
        },
      ],
      transactions: {
        bsc: [],
      },
    },
  ],
  pincode: '', 
  networks: networks,
  refresh: false,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    createWallet: (state, action) => {
      state.wallets = [action.payload];
    },
    addWallet: (state, action) => {
      state.wallets = [...action.payload];
    },
    deleteWallet: (state, action) => {
      const walletIndex = action.payload;
      state.wallets.splice(walletIndex, 1);
    },
    updateWallets: (state, action) => {
      state.wallets = [...action.payload];
    },
    setActiveWallet: (state, action) => {
      state.activeWallet = action.payload;
    },
    updateTokens: (state, action) => {
      state.wallets.push(action.payload);
    },
    updateTransactions: (state, action) => {
      state.wallets.push(action.payload);
    },
    setMnemonic: (state, action) => {
      state.mnemonic = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setPrivateKey: (state, action) => {
      state.privateKey = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setBiometrics: (state, action) => {
      state.biometrics = action.payload;
    },
    setActiveNetwork: (state, action) => {
      state.activeNetwork = action.payload;
    },
    setRefresh: (state, action) => {
      state.refresh = action.payload;
    },
    setInitialised: (state, action) => {
      state.initialized = action.payload;
      state.walletCreated = true;
    },
    setWalletCreated: (state, action) => {
      state.walletCreated = false;
    },
    setOnboarding: (state, action) => {
      state.onboarding = action.payload;
    },
    lockWallet: (state, action) => {
      state.lockwallet = action.payload;
    },
    updateNetworks: (state, action) => {
      state.networks = action.payload;
    },
    setBscTransactions: (state, action) => {
      state.wallets[action.payload.index].transactions.bsc =
        action.payload.transactions;
    },
    setPincode: (state, action) => {
      state.pincode = action.payload;
    },    
    resetState: state => {
      state = initialState;
    },
  },
});

export default walletSlice;

export const {
  setInitialised,
  setOnboarding,
  setMnemonic,
  setAddress,
  setPrivateKey,
  setAddMnemonic,
  setPassword,
  setBiometrics,
  createWallet,
  addWallet,
  deleteWallet,
  updateWallets,
  setActiveWallet,
  setActiveNetwork,
  updateTransactions,
  resetState,
  updateNetworks,
  setBscTransactions,
  setTokens,
  lockWallet,
  setRefresh,
  setWalletCreated,
  setPincode,
} = walletSlice.actions;