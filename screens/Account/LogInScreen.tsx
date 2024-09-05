import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';

import { getDBConnection, getUser } from '../../assets/dbConnection';
import { saveSession } from '../../assets/sessionData';
import { styles } from '../../modules/accountStyle';

const LogInScreen = ({ navigation }: any) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const clearUserInput = () => {
    setPhone('');
    setPassword('')
  }

  const getUserQuery = async () => {
    try {
      const db = await getDBConnection();
      const user = await getUser(db, phone, password);

      // Save user data to session
      saveSession(user.userID, user.name, user.phone);

      Alert.alert('Login successful', 'You have successfully logged in.');
      navigation.navigate('MainMenu');

      clearUserInput();
    } catch (error) {
      Alert.alert('Login failed', (error as Error).message);
      clearUserInput();
    }
  };

  //Input Validation
  const handleLogin = () => {
    // Validation: Empty input fields
    if (!phone || !password) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }

    // Validation: Phone number length (e.g., between 10-15 digits)
    if (phone.length < 10 || phone.length > 15) {
      Alert.alert('Invalid Phone Number', 'Phone number must be between 10 and 15 digits.');
      clearUserInput();
      return;
    }

    // Validation: Password minimum length (e.g., at least 6 characters)
    if (password.length < 6) {
      Alert.alert('Invalid Password', 'Password must be at least 6 characters long.');
      clearUserInput();
      return;
    }

    // Validation: Phone number pattern (digits only)
    const phonePattern = /^[0-9]+$/;
    if (!phonePattern.test(phone)) {
      Alert.alert('Invalid Phone Number', 'Phone number can only contain digits.');
      clearUserInput();
      return;
    }

    // If all validations pass, proceed with login
    getUserQuery();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../img/lumiere_logo.png')}
        />
      </View>

      <Text style={styles.title}>Welcome to Lumière!</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          keyboardType="phone-pad"
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => {navigation.navigate('SignUpScreen')}}>
        <Text style={styles.linkText}>Don't have an account? Sign up now</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

export default LogInScreen;
