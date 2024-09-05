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

const ProfileDetailsScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [userID, setUserId] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [newPhone, setNewPhone] = useState(phone);

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
        return;
      }
      if (newPhone.length < 10 || newPhone.length > 15) {
        Alert.alert('Error', 'Phone number must be between 10 and 15 digits.');
        return;
      }

      // Input pattern validation (e.g., email format or phone number)
      const phonePattern = /^[0-9]+$/; // Only digits for phone number
      if (!phonePattern.test(newPhone)) {
        Alert.alert('Error', 'Phone number can only contain digits.');
        return;
      }

      if (isEditing) {
        setUsername(newUsername);
        setPhone(newPhone);

        const db = await getDBConnection();
        updateUserData(db, userID, newUsername, newPhone);

        clearSession();
        saveSession(userID, newUsername, newPhone);

        setNewUsername('');
        setNewPhone('');
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
              <TouchableOpacity style={styles.cancelButton} onPress={() => {setIsEditing(false)}}>
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
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate('LocationScreen')}
          >
            <Text style={styles.optionText}>Find Lumière</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate('AboutDeveloper')}
          >
            <Text style={styles.optionText}>About Developers</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileDetailsScreen;
