import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTabs from './screen/MainTabs';
import NewWalletScreen from './screen/BottomTab/NewWallettab/NewWalletScreen';

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
    </Stack.Navigator>
  );
};

export default AppRoutes;
