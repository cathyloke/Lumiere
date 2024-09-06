import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { generalStyles } from '../../modules/generalStyle';

const AboutDeveloper = () => {
  return (
    <View style={styles.container}>
      <Text style={generalStyles.header}>Lumière was developed by a group of students in UTAR Sungai Long in September 2024.</Text>
      <Text style={generalStyles.header}>Lumière Team: </Text>
      <View>
        <Text style={styles.aboutDevText}>Choo Jia Zheng</Text>
        <Text style={styles.aboutDevText}>Leong Ming Shan</Text>
        <Text style={styles.aboutDevText}>Loke Weng Yan</Text>
        <Text style={styles.aboutDevText}>Tin Hui Hui</Text>
      </View>
      <Text style={styles.aboutDevCopyright}>Copyright © 2024 Lumière Team. All rights reserved.</Text>
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
  aboutDevText: {
    fontFamily: 'Gantari-Regular',
    fontSize: 16,
    color: '#102C57',
    padding: 15,
    textAlign: 'center',
  },
  aboutDevCopyright: {
    fontFamily: 'Gantari-Bold',
    fontSize: 16,
    color: '#102C57',
    padding: 15,
    textAlign: 'center',
    marginTop: 50,
  }
});


export default AboutDeveloper;
