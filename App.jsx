import "./shim";
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './AppRoutes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { persistor, store } from './screen/redux'; 
import { PersistGate } from 'redux-persist/integration/react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <NavigationContainer>
              <AppRoutes />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
