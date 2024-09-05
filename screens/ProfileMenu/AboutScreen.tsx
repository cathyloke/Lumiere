import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../../modules/profileStyle';
import { ScrollView } from 'react-native-gesture-handler';

const AboutScreen = ({navigation}:any) => {
   return (
      <ScrollView style={styles.container}>
         <View>
            <Image
            style={styles.logo}
            source={require('../../img/lumiere_logo.png')}
            />
         </View>
         <View>
            <Image
            style={styles.cafeImage}
            source={require('../../img/cafe_sample.jpg')}
            />
         </View>
         <View>
            <Text style={styles.description}>
               Lumière began its breakthrough as a humble cafe brand from Malaysia. Today, we are 
               Southeast Asia's largest cafe brand with over 800 outlets around the world!
               Still, one thing reamins true to us - our quest to bring joy through cafe cuisines.
            </Text>
         </View>
         <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('LocationScreen')}}>
               <Text style={styles.buttonText} >Click to Find Us</Text>
            </TouchableOpacity>
         </View>
      </ScrollView>
   );
};

export default AboutScreen;
