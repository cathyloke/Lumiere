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

const LogInScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!phone || !password) {
      Alert.alert('Please fill all fields');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE phone = ? AND password = ?',
        [phone, password],
        (tx, results) => {
          if (results.rows.length > 0) {
            Alert.alert('Login successful!');
            // You can navigate to a home screen or dashboard after successful login
            // navigation.navigate('Home');
          } else {
            Alert.alert('Login failed. Invalid phone number or password.');
          }
        },
        error => {
          console.error('Error logging in', error);
          Alert.alert('Error logging in');
        }
      );
    });
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
    </View>
  );
};

export default LogInScreen;
