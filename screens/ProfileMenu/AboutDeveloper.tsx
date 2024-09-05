import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { clearSession } from '../../assets/sessionData';
import { generalStyles } from '../../modules/generalStyle';

const AboutDeveloper = ({ navigation }: any) => {


  return (
    <View style={styles.container}>
      <Text style={generalStyles.header}>Lumière was developed by a group of students in UTAR Sungai Long in September 2024.</Text>
      <Text style={generalStyles.header}>Lumière Team: </Text>
      <View>
        <Text style={generalStyles.aboutDevText}>Choo Jia Zheng</Text>
        <Text style={generalStyles.aboutDevText}>Leong Ming Shan</Text>
        <Text style={generalStyles.aboutDevText}>Loke Weng Yan</Text>
        <Text style={generalStyles.aboutDevText}>Tin Hui Hui</Text>
      </View>
      <Text style={generalStyles.aboutDevCopyright}>Copyright © 2024 Lumière Team. All rights reserved.</Text>
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

});


export default AboutDeveloper;
