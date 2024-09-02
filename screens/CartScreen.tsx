import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getDBConnection, getCartItem } from '../assets/dbConnection';
import { SafeAreaView } from 'react-native-safe-area-context';
import {styles} from '../modules/cartStyle';

type CartItem = {
   id: string;
   name: string;
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
         console.error("Error fetching order data:", error);
      }
   };

   useEffect(() => {
      query();
   }, []);

   /*
   const updateQuantity = (id: string, quantity: number) => {
      const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
      );
      setCartItems(updatedItems);
   };
   */

   const updateQuantity = async (id: string, quantity: number) => {
      try {
         const db = await getDBConnection();
         await updateCartItem(db, '01', id, quantity);  // Replace with current user ID
         const updatedItems = cartItems.map(item =>
            item.id === id ? { ...item, quantity } : item
         );
         setCartItems(updatedItems);
      } catch (error) {
         console.error('Failed to update quantity:', error);
      }
   };

   const removeItem = async (id: string) => {
      try {
         const db = await getDBConnection();
         await deleteCartItem(db, '01', id);  // Replace with current user ID
         const updatedItems = cartItems.filter(item => item.id !== id);
         setCartItems(updatedItems);
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
                  onPress={() => updateQuantity(item.id, Math.max(item.quantity - 1, 1))}
               >
                  <Text style={styles.buttonText}>-</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => updateQuantity(item.id, item.quantity + 1)}
               >
                  <Text style={styles.buttonText}>+</Text>
               </TouchableOpacity>
            </View>
         </View>
      </View>
   );

   return (
      <View style={styles.container}>
         <Text style={styles.header}>My Cart</Text>
      
         <FlatList
         data={cartItems}
         renderItem={renderItem}
         keyExtractor={(item, index) => item.id || index.toString()}
         />
         
         <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => navigation.navigate('CheckoutScreen')}>
            <Text style={styles.buttonText}>Checkout</Text>
         </TouchableOpacity>
      </View>

   );
};

export default CartScreen;




const CheckoutScreen = () => {

   return(
      <View>
         <Text>Hi there</Text>

      </View>
   );
};