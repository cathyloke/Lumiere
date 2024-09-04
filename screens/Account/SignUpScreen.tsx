import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { getDBConnection, addUserData, getUser } from '../../assets/dbConnection';
import { saveSession } from '../../assets/sessionData';

const SignUpScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const addUser = async (name: string, phone: string, password: string) => {
    try {
      const db = await getDBConnection();
      await addUserData(db, name, phone, password);
      const user = await getUser(db, phone, password); 

      // Save user data to session
      saveSession(user.userID, user.name, user.phone);

      Alert.alert('You had successfully register');
      navigation.navigate('MainMenu')
      setName('');
      setPhone('');
      setPassword('');
    } catch (error) {
      Alert.alert('Login failed', (error as Error).message);
      console.log("Error log in:", error);
      setName('');
      setPhone('');
      setPassword('');
    }
  };

  const handleSignUp = () => {
    if (!name || !phone || !password) {
      Alert.alert('Please fill all fields');
      return;
    } else {
      addUser(name, phone, password);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Sign Up</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
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
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Log in" onPress={() => {navigation.navigate('LogInScreen')}} />
    </View>
  );
};

export default SignUpScreen;
