import React from 'react';
import { View, Text, Image, Button, TouchableOpacity } from 'react-native';
import { styles } from '../../modules/profileStyle';

const AboutScreen = ({navigation}:any) => {
   return (
      <View style={{backgroundColor: '#F8F0E5'}}>
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
         <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('LocationScreen')}}>
               <Text style={styles.buttonText} >Click to Find Us</Text>
            </TouchableOpacity>
         </View>
      </View>
   );
};

export default AboutScreen;
