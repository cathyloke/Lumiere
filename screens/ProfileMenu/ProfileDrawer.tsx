import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LogoutScreen from '../Account/LogoutScreen';
import { generalStyles } from '../../modules/generalStyle';

const Drawer = createDrawerNavigator();

const ProfileDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleStyle: generalStyles.header,
        drawerStyle: { backgroundColor: '#EADBC8' },
        drawerActiveTintColor: '#102C57',
      }}
    >
      <Drawer.Screen
        name="LogoutScreen"
        component={LogoutScreen}
        options={{ title: 'Logout' }}
      />
    </Drawer.Navigator>
  );
};

export default ProfileDrawer;
