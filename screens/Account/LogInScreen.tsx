import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { getDBConnection, getUser } from '../../assets/dbConnection';
import { saveSession, clearSession } from '../../assets/sessionData';

const LogInScreen = ({ navigation }: any) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const getUserQuery = async () => {
    try {
        const db = await getDBConnection();
        const user = await getUser(db, phone, password); 
        
        setPhone(user.phone);

        // Save user data to session
        saveSession(user.userID, user.name, user.phone);

        Alert.alert('You had successfully logged in');
        navigation.navigate('MainMenu')
        setPhone('');
        setPassword('')

    } catch (error) {
      Alert.alert('Login failed', (error as Error).message);
      console.log("Error log in:", error);
      setPhone('');
      setPassword('');
    }
  };

  const handleLogin = () => {
    if (!phone || !password) {
      Alert.alert('Please fill all fields');
      return;
    } else {
      getUserQuery();
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Log In</Text>
      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <Button title="Log In" onPress={handleLogin} />
      <Button title="Register" onPress={() => {navigation.navigate('SignUpScreen')}} />
    </View>
  );
};

export default LogInScreen;
