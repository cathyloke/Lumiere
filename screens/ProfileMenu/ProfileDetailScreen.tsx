import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { styles } from '../../modules/profileStyle';
import { getDBConnection, updateUserData } from '../../assets/dbConnection';
import { clearSession, getSession, saveSession } from '../../assets/sessionData';
import { ProfileButton } from '../../customComponents/customButton'

const ProfileDetailsScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [userID, setUserId] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [newPhone, setNewPhone] = useState(phone);

  const clearUserInput = () => {
    setNewUsername('');
    setNewPhone('')
  }

  const retrieveSessionData = async () => {
    const session = await getSession();
    if (session) {
      const { userId: sessionUserId, userPhone: sessionUserPhone, userName: sessionUserName } = session;
      console.log('User ID:', sessionUserId);
      console.log('User Name:', sessionUserName);
      console.log('User Phone:', sessionUserPhone);
      setUserId(sessionUserId || '');
      setUsername(sessionUserName || '');
      setPhone(sessionUserPhone || '');

    } else {
        console.log('No session found');
    }
  };

  useEffect(() => {
    retrieveSessionData();
  }, []);

  const handleEdit = async() => {
    try {
      // Empty input validation
      if (!newUsername || !newPhone) {
        Alert.alert('Error', 'Username and Phone number cannot be empty.');
        return;
      }

      // Minimum and maximum length validation (for example, username: 3-20 characters, phone: 10-15 characters)
      if (newUsername.length < 3 || newUsername.length > 20) {
        Alert.alert('Error', 'Username must be between 3 and 20 characters.');
        clearUserInput();
        return;
      }
      if (newPhone.length < 10 || newPhone.length > 15) {
        Alert.alert('Error', 'Phone number must be between 10 and 15 digits.');
        clearUserInput();
        return;
      }

      // Input pattern validation (e.g., email format or phone number)
      const phonePattern = /^[0-9]+$/; // Only digits for phone number
      if (!phonePattern.test(newPhone)) {
        Alert.alert('Error', 'Phone number can only contain digits.');
        clearUserInput();
        return;
      }

      if (isEditing) {
        setUsername(newUsername);
        setPhone(newPhone);

        const db = await getDBConnection();
        updateUserData(db, userID, newUsername, newPhone);

        clearSession();
        saveSession(userID, newUsername, newPhone);

        clearUserInput();
      }
      setIsEditing(!isEditing);
      return (Alert.alert('Success', 'Data edited successfully.'));
    } catch (error) {
        console.error('Error', 'Error editing user data: ', error);
    }
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
                placeholder={username}
                onChangeText={setNewUsername}
              />
            ) : (
              <Text style={styles.value}>{username}</Text>
            )}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Phone number:</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={newPhone}
                placeholder={phone}
                onChangeText={setNewPhone}
              />
            ) : (
              <Text style={styles.value}>{phone}</Text>
            )}
          </View>

          {!isEditing &&
          <TouchableOpacity style={styles.button} onPress={() => {setIsEditing(true)}}>
            <Text style={styles.buttonText}>
              Edit Profile
            </Text>
          </TouchableOpacity>
          }
          {isEditing &&
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity style={styles.saveButton} onPress={handleEdit}>
                <Text style={styles.buttonText}>
                  Save
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => {setIsEditing(false); clearUserInput();}}>
                <Text style={styles.buttonText}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          }

          {/* Navigate to Logout Screen */}
          <TouchableOpacity
            style={[styles.button, styles.logoutButton]} 
            onPress={() => navigation.navigate('LogoutScreen')}
          >
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.optionsContainer}>
          <ProfileButton onPress={() => navigation.navigate('OrderHistoryScreen')} title='My Orders' />
          <ProfileButton onPress={() => navigation.navigate('HelpCentreScreen')} title='Help Centre' />
          <ProfileButton onPress={() => navigation.navigate('FeedbackScreen')} title='Feedback' />
          <ProfileButton onPress={() => navigation.navigate('TNCScreen')} title='Terms & Conditions' />
          <ProfileButton onPress={() => navigation.navigate('AboutScreen')} title='About Lumière' />
          <ProfileButton onPress={() => navigation.navigate('LocationScreen')} title='Find Lumière' />
          <ProfileButton onPress={() => navigation.navigate('AboutDeveloper')} title='About Developers' />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileDetailsScreen;
