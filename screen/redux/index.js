import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import EncryptedStorage from 'react-native-encrypted-storage';
import wallet from './walletSlice';

const reducers = combineReducers({
  wallet: wallet.reducer,
});

// 🔐 EncryptedStorage adapter for redux-persist
const reduxStorage = {
  setItem: async (key, value) => {
    try {
      await EncryptedStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error('Set item error:', error);
      return false;
    }
  },
  getItem: async key => {
    try {
      const value = await EncryptedStorage.getItem(key);
      return value;
    } catch (error) {
      console.error('Get item error:', error);
      return null;
    }
  },
  removeItem: async key => {
    try {
      await EncryptedStorage.removeItem(key);
    } catch (error) {
      console.error('Remove item error:', error);
    }
  },
};

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['wallet'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export {store, persistor};
