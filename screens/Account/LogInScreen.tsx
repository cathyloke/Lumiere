import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { getDBConnection, getUser } from '../../assets/dbConnection';
import { saveSession } from '../../assets/sessionData';

const LogInScreen = ({ navigation }: any) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const getUserQuery = async () => {
    try {
      const db = await getDBConnection();
      const user = await getUser(db, phone, password);

      // Save user data to session
      saveSession(user.userID, user.name, user.phone);

      Alert.alert('Login successful', 'You have successfully logged in');
      navigation.navigate('MainMenu');
      setPhone('');
      setPassword('');
    } catch (error) {
      Alert.alert('Login failed', (error as Error).message);
      console.log('Error logging in: ', error);
      setPhone('');
      setPassword('');
    }
  };

  const handleLogin = () => {
    // Validation: Empty input fields
    if (!phone || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    // Validation: Phone number length (e.g., between 10-15 digits)
    if (phone.length < 10 || phone.length > 15) {
      Alert.alert('Error', 'Phone number must be between 10 and 15 digits.');
      return;
    }

    // Validation: Password minimum length (e.g., at least 6 characters)
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long.');
      return;
    }

    // Validation: Phone number pattern (digits only)
    const phonePattern = /^[0-9]+$/;
    if (!phonePattern.test(phone)) {
      Alert.alert('Error', 'Phone number can only contain digits.');
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
        <Text style={styles.linkText}>Don't have an account? Register now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F0E5',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Gantari-Bold',
    color: '#102C57',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#dcdcdc',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    fontFamily: 'Gantari-Regular',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#102C57',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Gantari-Bold',
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    color: '#102C57',
    fontSize: 16,
    fontFamily: 'Gantari-Regular',
  },
});

export default LogInScreen;
