import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const HelpCentreScreen = () => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <Image
        style={[styles.headerIMG, { width: screenWidth }]}
        source={require('../../img/help_center.png')}
      />
      <View style={styles.listContainer}>
        <Text style={styles.item}>DELIVERY</Text>
        <View style={styles.separator} />
        <Text style={styles.item}>PICKUP</Text>
        <View style={styles.separator} />
        <Text style={styles.item}>ORDER ISSUE</Text>
        <View style={styles.separator} />
        <Text style={styles.item}>FOOD/DRINK QUALITY</Text>
        <View style={styles.separator} />
        <Text style={styles.item}>PROMOTION</Text>
        <View style={styles.separator} />
        <Text style={styles.item}>PAYMENT & REFUND</Text>
        <View style={styles.separator} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F0E5',
  },
  headerIMG: {
    height: 150,
    resizeMode: 'cover',
  },
  listContainer: {
    marginTop: 20, 
    paddingHorizontal: 20,
  },
  item: {
    fontSize: 18,
    paddingVertical: 15,
    color: '#000',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
});

export default HelpCentreScreen;
