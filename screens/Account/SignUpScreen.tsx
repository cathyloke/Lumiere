import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView, Image } from 'react-native';
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

      Alert.alert('Success', 'You have successfully registered');
      navigation.navigate('MainMenu');
      setName('');
      setPhone('');
      setPassword('');
    } catch (error) {
      Alert.alert('Registration failed', (error as Error).message);
      console.log('Error during registration: ', error);
      setName('');
      setPhone('');
      setPassword('');
    }
  };

  const handleSignUp = () => {
    if (!name || !phone || !password) {
      Alert.alert('Missing Fields', 'Please fill all fields');
      return;
    } else {
      addUser(name, phone, password);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../img/lumiere_logo.png')}
        />
      </View>
      <Text style={styles.title}>Create an account</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
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
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('LogInScreen')}>
        <Text style={styles.linkText}>Already have an account? Log In</Text>
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

export default SignUpScreen;
