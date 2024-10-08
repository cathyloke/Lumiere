import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const RewardsScreen = () => {
   const images = [
      require('../img/promo/PromoCoffee.png'),
      require('../img/promo/PromoPancake.png'),
      require('../img/promo/PromoCroissant.png'),
   ];

   const renderItem = ({ item }: { item: any }) => (
      <View style={styles.imageContainer}>
         <Image source={item} style={styles.image} />
      </View>
   );

   return (
      <GestureHandlerRootView style={styles.container}>
        <Text style={styles.header}>Rewards</Text>
        <View>
          <Text style={styles.content}>Get rewards</Text>
        </View>
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.flatListContent}
        />
      </GestureHandlerRootView>
    );
};

export default RewardsScreen;

const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#F8F0E5',
   },
   header: {
     fontFamily: 'Gantari-Bold',
     fontSize: 20,
     color: '#102C57',
     padding: 15,
     textAlign: 'left',
     borderBottomWidth: 1,
     borderColor: 'grey',
   },
   content: {
     fontFamily: 'Gantari-Bold',
     fontSize: 20,
     color: '#102C57',
     padding: 15,
     textAlign: 'center',
   },
   flatListContent: {
     paddingHorizontal: 10,
   },
   imageContainer: {
     flex: 1,
     margin: 5,
   },
   image: {
     width: '100%',
     height: 200,
     borderRadius: 10,
   },
 });