import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const termsData = require('../../assets/termsAndConditions.json');

const TNCScreen = () => {
   return (
      <ScrollView contentContainerStyle={styles.container}>
         <Text style={styles.header}>
            Last updated: {termsData.lastUpdated}
         </Text>
         
         {termsData.sections.map((section, index) => (
            <View key={index}>
               <Text style={styles.sectionTitle}>{section.title}</Text>
               <Text style={styles.paragraph}>{section.content}</Text>
            </View>
         ))}
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: '#F8F0E5',
   },
   sectionTitle: {
      fontFamily: 'Gantari-Bold',
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 10,
      marginTop: 20,
   },
   paragraph: {
      fontFamily: 'Gantari-Regular',
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 15,
   },
   header: {
      fontFamily: 'Gantari-Regular',
      fontSize: 14,
      color: '#888',
      textAlign: 'center',
   },
});

export default TNCScreen;
