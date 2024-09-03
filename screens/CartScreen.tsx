import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getDBConnection, getCartItem, updateCartItem, deleteCartItem } from '../assets/dbConnection';
import { SafeAreaView } from 'react-native-safe-area-context';
import {styles} from '../modules/cartStyle';

type CartItem = {
   cartItemID: string;
   foodID: string;
   name: string;
   category: string;
   type: any;
   description: string;
   image: string;
   price: number;
   quantity: number;
};


const CartScreen = ({ navigation }: any) => {
   const [cartItems, setCartItems] = useState<CartItem[]>([]);

   const query = async () => {
      try {
         const db = await getDBConnection();
         const cartItemData = await getCartItem(db, '01');  // Replace with current user ID
         setCartItems(cartItemData);
      } catch (error) {
         console.error('Error fetching order data: ', error);
      }
   };

   // useEffect(() => {
   //    query();
   // }, []);
   useFocusEffect(
      useCallback(() => {
         query(); // Fetch the latest cart items whenever the screen is focused
      }, [])
   );

   const updateQuantity = async (foodID: string, quantity: number) => {
      try {
         const db = await getDBConnection();
         const updatedItems = cartItems.map(item =>
            item.foodID === foodID ? { ...item, quantity } : item
         );   
         await updateCartItem(db, '01', foodID, quantity);  // Replace with current user ID
         setCartItems(updatedItems);
      } catch (error) {
         console.error('Failed to update quantity:', error);
      }
   };

   const removeItem = async (id: string) => {
      try {
         const db = await getDBConnection();
         await deleteCartItem(db, '01', id);  // Replace with current user ID
         const updatedItems = cartItems.filter(item => item.cartItemID !== id);
         setCartItems(updatedItems);
         query();       //add this to refresh
      } catch (error) {
         console.error('Failed to delete cart item:', error);
      }
   };

   const renderItem = ({ item }: { item: CartItem }) => (
      <View style={styles.itemContainer}>
         <Image source={item.image} style={styles.image} />
         <View style={styles.infoContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>RM{item.price.toFixed(2)}</Text>
            <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
            <View style={{flexDirection: 'row',marginHorizontal: 2}}>
               <TouchableOpacity
                  style={[styles.qtyButton, {marginRight: 30}]}
                  onPress={() => updateQuantity(item.foodID, Math.max(item.quantity - 1, 1))}
               >
                  <Text style={styles.buttonText}>-</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => updateQuantity(item.foodID, item.quantity + 1)}
               >
                  <Text style={styles.buttonText}>+</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => removeItem(item.foodID)}
               >
                  <Text>Remove Item</Text>
               </TouchableOpacity>
            </View>
            
         </View>
      </View>
   );

   return (
      <View style={styles.container}>
         <Text style={styles.header}>My cart</Text>

         <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.cartItemID || index.toString()}
         />

         <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => navigation.navigate('CheckoutScreen')}>
            <Text style={styles.buttonText}>Proceed to payment</Text>
         </TouchableOpacity>
      </View>

   );
};

export default CartScreen;
