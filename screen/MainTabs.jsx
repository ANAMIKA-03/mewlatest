import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Earn from './BottomTab/EarnTab/Earn';
import Swap from './BottomTab/SwapTab/Swap';
import WalletTabScreen from './BottomTab/WalletTab/WalletTabScreen';
import BrowserScreen from './BottomTab/BrowserTab/BrowserScreen';
import MarketsScreen from './BottomTab/MarketTab/MarketsScreen';

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Wallet"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#000000',   // active: black
        tabBarInactiveTintColor: '#BDBDBD', // inactive: gray
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
          backgroundColor: '#F9F9F9', // slightly off-white
          borderTopWidth: 0.5,
          borderTopColor: '#e0e0e0',
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          let IconComponent = Ionicons;

          if (route.name === 'Wallet') {
            iconName = 'wallet';
            IconComponent = Ionicons;
            size = 24;
          } else if (route.name === 'Market') {
            iconName = 'insert-chart';
            IconComponent = MaterialIcons;
            size = 24;
          } else if (route.name === 'Swap') {
            iconName = 'exchange-alt';
            IconComponent = FontAwesome5;
            size = 22;
          } else if (route.name === 'Earn') {
            iconName = 'seedling';
            IconComponent = FontAwesome5;
            size = 26;
          } else if (route.name === 'Browser') {
            iconName = 'compass';
            IconComponent = Ionicons;
            size = 24;
          }

          return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: 2,
        },
      })}
    >
      <Tab.Screen name="Wallet" component={WalletTabScreen} />
      <Tab.Screen name="Market" component={MarketsScreen} />
      <Tab.Screen name="Swap" component={Swap} />
      <Tab.Screen name="Earn" component={Earn} />
      <Tab.Screen name="Browser" component={BrowserScreen} />
    </Tab.Navigator>
  );
}

export default MainTabs;
