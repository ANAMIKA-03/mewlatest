import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './screen/MainTabs';
import NewWalletScreen from './screen/BottomTab/NewWallettab/NewWalletScreen';
import TransactionScreen from './screen/BottomTab/Transaction/TransactionScreen';
import InternalBrowser from './screen/BottomTab/BrowserTab/InternalBrowser';

const Stack = createNativeStackNavigator();
const AppRoutes = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={MainTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="InternalBrowser"
        component={InternalBrowser}
        options={{
          headerShown: false,
          animationEnabled: true,
          title: 'InternalBrowsers',
          gestureDirection: 'horizontal-inverted',
        }}
      />

    </Stack.Navigator>
  );
};

export default AppRoutes;
