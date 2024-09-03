import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'lumiereDatabase.sqlite', createFromLocation: 1 },
  () => {},
  error => {
    console.error('Error opening database', error);
  }
);

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (!name || !phone || !password) {
      Alert.alert('Please fill all fields');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO users (userID, name, phone, password) VALUES (?, ?, ?, ?)',
        [Date.now().toString(), name, phone, password],
        () => {
          Alert.alert('User registered successfully!');
          navigation.navigate('Login'); // Navigate to Login screen on successful registration
        },
        error => {
          console.error('Error registering user', error);
          Alert.alert('Error registering user');
        }
      );
    });
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
    </View>
  );
};

export default SignUpScreen;
