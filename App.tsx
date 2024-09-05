import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions } from 'react-native';

//Account Management Screen
import LogInScreen from './screens/Account/LogInScreen';
import SignUpScreen from './screens/Account/SignUpScreen';

//Screens in Main menu
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import RewardsScreen from './screens/RewardsScreen';
import ProfileDetailScreen from './screens/ProfileMenu/ProfileDetailScreen';
import CartScreen from './screens/CartScreen';
import { generalStyles } from './modules/generalStyle';

//Screens in Cart Screen
import CheckoutScreen from './screens/CheckoutScreen';

//Screens in Profile Detail Screen - Account page
import OrderHistoryScreen from './screens/ProfileMenu/OrderHistoryScreen';
import HelpCentreScreen from './screens/ProfileMenu/HelpCentreScreen';
import FeedbackScreen from './screens/ProfileMenu/FeedbackScreen';
import TNCScreen from './screens/ProfileMenu/TNCScreen';
import AboutScreen from './screens/ProfileMenu/AboutScreen';
import LocationScreen from './screens/ProfileMenu/LocationScreen';
import LogoutScreen from './screens/Account/LogoutScreen';
import AboutDeveloper from './screens/ProfileMenu/AboutDeveloper';

//Icons
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';

//Create Navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const windowHeight = Dimensions.get('window').height;

//NavigatorContainer
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: generalStyles.header,
          headerShown: false
        }}
      >
        <Stack.Screen
          name="LogInScreen"
          component={LogInScreen}

        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
        />
        <Stack.Screen
          name="MainMenu"
          component={MainMenu}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

//Nested Navigator for Bottom Tab Menu
const MainMenu = () => {
  return (

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
        component={CartMenu}
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
  );
};

//Nested Navigator for Cart Menu - CartScreen and CheckoutScreen
const CartMenu = () => {
  return (
    <Stack.Navigator
      screenOptions={{
      headerTitleStyle: generalStyles.header,
    }}>
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="CheckoutScreen" 
        component={CheckoutScreen} 
        options={{title: 'Checkout'}}
      />
    </Stack.Navigator>
  );
};

//Nested Navigator for Profile Menu
const ProfileDrawerScreen = ({navigation}: any) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleStyle: generalStyles.header,
        headerStyle: {
          backgroundColor: '#EADBC8',
        },
        drawerStyle: { backgroundColor: '#EADBC8' },
        drawerActiveTintColor: '#102C57',
        drawerLabelStyle: {
          fontFamily: 'Gantari-Regular',
          fontSize: 16,
        },
      }}
    >
      <Drawer.Screen
        name="ProfileDetailsScreen"
        component={ProfileDetailScreen}
        options={{
          title: 'Profile',
          drawerIcon: (({ focused }: any) => (
            <Octicons name="person" size={30} color={focused ? '#102C57' : '#999'} />
          ))
        }}
      />
      <Drawer.Screen
        name="AboutDeveloper"
        component={AboutDeveloper}
        options={{
          title: 'About Developers',
          drawerIcon: (({ focused }: any) => (
            <Feather name="info" size={30} color={focused ? '#102C57' : '#999'} />
          ))
        }}
      />
      <Drawer.Screen
        name="LogoutScreen"
        component={LogoutScreen}
        options={{
          title: 'Log Out',
          headerShown: false,
          drawerIcon: (({ focused }: any) => (
            <MaterialIcons name="logout" size={30} color={focused ? '#102C57' : '#999'} />
          ))
        }}
      />
    </Drawer.Navigator>
  );
};

//Nested Navigator for Profile Menu
const ProfileScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: generalStyles.header,
      }}
    >
      <Stack.Screen name="ProfileDrawerScreen" component={ProfileDrawerScreen} options={{ headerShown: false }} />
      <Stack.Screen name="OrderHistoryScreen" component={OrderHistoryScreen} options={{ title: 'My Order History'}}/>
      <Stack.Screen name="HelpCentreScreen" component={HelpCentreScreen} options={{title: 'Help Centre'}}/>
      <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} options={{title: 'Feedback'}}/>
      <Stack.Screen name="TNCScreen" component={TNCScreen} options={{title: 'Terms & Conditions'}}/>
      <Stack.Screen name="AboutScreen" component={AboutScreen} options={{title: 'About Lumière'}}/>
      <Stack.Screen name="LocationScreen" component={LocationScreen} options={{title: 'Find Lumière'}}/>
    </Stack.Navigator>
  );
};








