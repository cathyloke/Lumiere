import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { styles } from '../modules/homeStyle';
import MenuScreen from './MenuScreen';

const images = [
  require('../img/promo/PromoCroissant.png'),
  require('../img/promo/PromoPancake.png'),
  require('../img/promo/PromoCoffee.png'),
];

const bestSellers = [
  { title: 'Egg Croissant Sandwich', image: require('../img/food/FoodEggCroissantSandwich.png') },
  { title: 'Avocado Toast', image: require('../img/food/FoodAvocadoToast.png') },
  { title: 'Matcha Latte', image: require('../img/drinks/DrinksMatchaLatte.jpeg') },
  { title: 'Berry Pancakes', image: require('../img/food/FoodBerryPancakes.png') },
  { title: 'New York Cheesecake', image: require('../img/food/FoodNewYorkCheesecake.jpeg') },
];

const HomeScreen = ({navigation} : any) => {
  const [imgActive, setImgActive] = useState(0);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const getTimeOfDayGreeting = () => {
      const hours = new Date().getHours();
      if (hours < 12) {return 'Good Morning';}
      if (hours < 18) {return 'Good Afternoon';}
      return 'Good Evening';
    };

    setGreeting(getTimeOfDayGreeting());
  }, []);

  const onchange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != imgActive) {
        setImgActive(slide);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* FOR PHOTO SLIDESHOW */}
        <View style={styles.wrap}>
          <ScrollView
            onScroll={({ nativeEvent }) => onchange(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={styles.wrap}
          >
            {images.map((e, index) => (
              <Image
                key={index}
                resizeMode="stretch"
                style={styles.wrap}
                source={e}
              />
            ))}
          </ScrollView>

          <View style={styles.wrapDot}>
            {images.map((e, index) => (
              <Text
                key={e}
                style={imgActive == index ? styles.dotActive : styles.dot}
              >
                ●
              </Text>
            ))}
          </View>
        </View>

        {/* GREETING MESSAGE */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>
            {greeting}, (username)! {/* replace with {username} */}
          </Text>

          <Text style={styles.readyText}>
            Ready to order?
          </Text>
        </View>

        {/* FOR DELIVERY, PICKUP, MERCH BUTTONS */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Delivery</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Pickup</Text>
          </TouchableOpacity>
        </View>

        {/* BEST SELLERS SECTION */}
        <View style={styles.bestSellersContainer}>
          <Text style={styles.bestSellersTitle}>Best Sellers</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.bestSellersScrollView}
          >
            {bestSellers.map((item, index) => (
              <View key={index} style={styles.bestSellersItem}>
                <Image source={item.image} style={styles.bestSellersImage} />
                <Text style={styles.bestSellersText}>{item.title}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
