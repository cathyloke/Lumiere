import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { styles } from '../../modules/profileStyle';
import LogInScreen from '../Account/LogInScreen';  
import SignUpScreen from '../Account/SignUpScreen'; 
const Stack = createStackNavigator();

const ProfileDetailsScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('Alyssa');
  const [email, setEmail] = useState('alyssa@example.com');
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState(email);

  const handleEdit = () => {
    if (isEditing) {
      setUsername(newUsername);
      setEmail(newEmail);
    }
    setIsEditing(!isEditing);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* FOR USER PROFILE */}
        <View style={styles.profileContainer}>
          <Image
            source={require('../../img/profile-placeholder.jpeg')}
            style={styles.profileImage}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Username:</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={newUsername}
                onChangeText={setNewUsername}
              />
            ) : (
              <Text style={styles.value}>{username}</Text>
            )}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Email:</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={newEmail}
                onChangeText={setNewEmail}
              />
            ) : (
              <Text style={styles.value}>{email}</Text>
            )}
          </View>
          <TouchableOpacity style={styles.button} onPress={handleEdit}>
            <Text style={styles.buttonText}>
              {isEditing ? 'Save' : 'Edit Profile'}
            </Text>
          </TouchableOpacity>
          
          {/* Navigate to Log In Screen */}
          <TouchableOpacity 
            style={[styles.button, styles.logInButton]} 
            onPress={() => navigation.navigate('LogInScreen')}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          {/* Navigate to Sign Up Screen */}
          <TouchableOpacity 
            style={[styles.button, styles.signUpButton]} 
            onPress={() => navigation.navigate('SignUpScreen')}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Navigate to Logout Screen */}
          <TouchableOpacity 
            style={[styles.button, styles.logoutButton]} 
            onPress={() => navigation.navigate('LogoutScreen')}
          >
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        {/* Additional Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity 
            style={styles.optionButton}
            onPress={() => navigation.navigate('OrderHistoryScreen')}
          >
            <Text style={styles.optionText}>My Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.optionButton}
            onPress={() => navigation.navigate('HelpCentreScreen')}
          >
            <Text style={styles.optionText}>Help Centre</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.optionButton}
            onPress={() => navigation.navigate('FeedbackScreen')}
          >
            <Text style={styles.optionText}>Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.optionButton}
            onPress={() => navigation.navigate('TNCScreen')}
          >
            <Text style={styles.optionText}>Terms & Conditions</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.optionButton}
            onPress={() => navigation.navigate('AboutScreen')}
          >
            <Text style={styles.optionText}>About Lumière</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileDetailsScreen">
      <Stack.Screen name="ProfileDetailsScreen" component={ProfileDetailsScreen} />
      <Stack.Screen name="LogInScreen" component={LogInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      {/* Add other screens like LogoutScreen, OrderHistoryScreen, etc. */}
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
