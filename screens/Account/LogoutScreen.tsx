import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { clearSession } from '../../assets/sessionData';

const LogoutScreen = ({ navigation }: any) => {
  const handleLogout = () => {
    clearSession();
    navigation.navigate('LogInScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        Are you sure you want to log out?
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F0E5',
    padding: 20,
  },
  message: {
    fontSize: 18,
    fontFamily: 'Gantari-Regular',
    color: '#102C57',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#E93F3F',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Gantari-Bold',
  },
  cancelButton: {
    backgroundColor: '#cccccc',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  cancelButtonText: {
    color: '#333333',
    fontSize: 16,
    fontFamily: 'Gantari-Bold',
  },
});

export default LogoutScreen;
