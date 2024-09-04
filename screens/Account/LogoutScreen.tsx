import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { clearSession } from '../../assets/sessionData';

//custom drawer for log out
const LogoutScreen = ({navigation}: any) => {
   return (
      <View>
         <Text>Log out</Text>
         <TouchableOpacity onPress={() => {clearSession(); navigation.navigate('LogInScreen'); }}><Text>Press to back Login Screen</Text></TouchableOpacity>
      </View>
   );
};

export default LogoutScreen;
