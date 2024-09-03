import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const HelpCentreScreen = () => {
  // Get the width of the screen
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <Image
        style={[styles.headerIMG, { width: screenWidth }]} // Set the width to the screen width
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
    backgroundColor: '#fff',
  },
  headerIMG: {
    height: 150, // Fixed height
    resizeMode: 'cover', // Ensure the image covers the width while maintaining aspect ratio
  },
  listContainer: {
    marginTop: 20, // Margin top to create space below the image
    paddingHorizontal: 20, // Padding on the sides
  },
  item: {
    fontSize: 18,
    paddingVertical: 15,
    color: '#000',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd', // Color of the separator line
    marginVertical: 5, // Vertical margin between items
  },
});

export default HelpCentreScreen;
