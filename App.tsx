import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import RewardsScreen from './screens/RewardsScreen';
import ProfileDetailScreen from './screens/ProfileMenu/ProfileDetailScreen';
import CartScreen from './screens/CartScreen';

import { generalStyles } from './modules/generalStyle';

import OrderHistoryScreen from './screens/ProfileMenu/OrderHistoryScreen';
import HelpCentreScreen from './screens/ProfileMenu/HelpCentreScreen';
import FeedbackScreen from './screens/ProfileMenu/FeedbackScreen';
import TNCScreen from './screens/ProfileMenu/TNCScreen';
import AboutScreen from './screens/ProfileMenu/AboutScreen';
import LogoutScreen from './screens/Account/LogoutScreen';


import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';

const Tab = createBottomTabNavigator();

const App = () => {

  const windowHeight = Dimensions.get('window').height;

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#EADBC8',
            height: windowHeight * 0.1,
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
          },
          tabBarActiveTintColor: '#102C57',
          tabBarInactiveTintColor: '#999',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
            fontFamily: 'Gantari-Regular',
            marginBottom: 16,
          },
          tabBarIconStyle: {
            marginTop: 16,
          },
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarIcon: (({ focused }: any) => (
              <Feather name="home" size={30} color={focused ? '#102C57' : '#999'} />
            ))
          }}
        />
        <Tab.Screen
          name="Menu"
          component={MenuScreen}
          options={{
            tabBarIcon: (({ focused }: any) => (
              <MaterialIcons name="restaurant-menu" size={30} color={focused ? '#102C57' : '#999'} />
            ))
          }}
        />
        <Tab.Screen 
          name="Cart"
          component={CartScreen}
          options={{
            tabBarIcon: (({ focused }: any) => (
              <MaterialCommunityIcons name="cart-outline" size={30} color={focused ? '#102C57' : '#999'} />
            )),
          }}
        />
        <Tab.Screen
          name="Rewards"
          component={RewardsScreen}
          options={{
            tabBarIcon: (({ focused }: any) => (
              <Feather name="gift" size={30} color={focused ? '#102C57' : '#999'} />
            ))
          }}
        />
        <Tab.Screen 
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: (({ focused }: any) => (
              <Octicons name="person" size={30} color={focused ? '#102C57' : '#999'} />
            ))
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;


const Stack = createStackNavigator();

const ProfileScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: generalStyles.header,
      }}
    >
      <Stack.Screen
        name="ProfileDetailsScreen"
        component={ProfileDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="OrderHistoryScreen" component={OrderHistoryScreen} options={{title: 'My Order History'}}/>
      <Stack.Screen name="HelpCentreScreen" component={HelpCentreScreen} options={{title: 'Help Centre'}}/>
      <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} options={{title: 'Feedback'}}/>
      <Stack.Screen name="TNCScreen" component={TNCScreen} options={{title: 'Terms & Conditions'}}/>
      <Stack.Screen name="AboutScreen" component={AboutScreen} options={{title: 'About Lumière'}}/>
      <Stack.Screen name="LogoutScreen" component={LogoutScreen} options={{title: 'Logout'}}/>
    </Stack.Navigator>
  );
};

