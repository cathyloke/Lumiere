import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TNCScreen = () => {
   return (
      <ScrollView contentContainerStyle={styles.container}>
      
         <Text style={styles.header}>
         Last updated: [24th June 2024]
         </Text>
         <Text style={styles.sectionTitle}>1. Introduction</Text>
         <Text style={styles.paragraph}>
         Welcome to Lumiere. These Terms and Conditions govern your use of our application. By accessing or using our app, you agree to comply with these terms. If you do not agree, please do not use the app.
         </Text>

         <Text style={styles.sectionTitle}>2. User Responsibilities</Text>
         <Text style={styles.paragraph}>
         You agree to use the app in accordance with applicable laws and regulations. You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.
         </Text>

         <Text style={styles.sectionTitle}>3. Prohibited Activities</Text>
         <Text style={styles.paragraph}>
         You must not use the app for any illegal or unauthorized purpose. This includes, but is not limited to, the distribution of harmful content or engaging in fraudulent activities.
         </Text>

         <Text style={styles.sectionTitle}>4. Changes to Terms</Text>
         <Text style={styles.paragraph}>
         We may update these Terms and Conditions from time to time. We will notify you of any changes by posting the new terms on this page. You are advised to review these terms periodically for any changes.
         </Text>

         <Text style={styles.sectionTitle}>5. Contact Us</Text>
         <Text style={styles.paragraph}>
         If you have any questions about these Terms and Conditions, please contact us at lumiere@gmail.com.
         </Text>

         
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   container: {
      fontFamily: 'Gantari-Regular',
      flexGrow: 1,
      padding: 20,
      backgroundColor: '#fff',
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
})

export default TNCScreen;
