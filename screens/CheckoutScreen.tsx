import React, { useState, useEffect } from 'react';
import { Alert, View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getDBConnection, getCartItem, processPayment } from '../assets/dbConnection';
import { SafeAreaView } from 'react-native-safe-area-context';
import {styles} from '../modules/checkoutStyle';

type CartItem = {
   cartItemId: string;
   foodID: string;
   name: string;
   image: string;
   price: number;
   quantity: number;
};

const CheckoutScreen = ({ navigation }: any) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState<any>(0);

    const query = async () => {
        try {
            const db = await getDBConnection();
            const cartItemData = await getCartItem(db, '01');  // Replace with current user ID
            setCartItems(cartItemData);
            calculateTotal(cartItemData);
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    const calculateTotal = (cartItems: CartItem[]) => {
        const total = cartItems.reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0);
        setTotal(total);
    };

    useEffect(() => {
        query();
    },[])

    const renderItem = ({ item }: { item: CartItem }) => (
        <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={[styles.itemDetails,{textAlign: 'left'}]}>RM{item.price.toFixed(2)}</Text>
                <Text style={[styles.itemDetails,{textAlign: 'left'}]}>Quantity: {item.quantity}</Text>
                <Text style={[styles.itemDetails,{textAlign: 'right'}]}>Subtotal: RM{(item.price * item.quantity).toFixed(2)}</Text>
            </View>
        </View>
    );

    //this is the delete cart item and update the order history table
    const checkoutAction = async() => {
        try {
            const db = await getDBConnection();
            await processPayment(db, '01');  // Replace with current user ID
            
            Alert.alert('You have successfully paid.');
            query();
            navigation.goBack()
         } catch (error) {
            console.error('Failed to delete process payment:', error);
         }    
    }

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Your order</Text>
        <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.cartItemId || index.toString()}
        />
        <Text style={styles.total}>Total: RM{total.toFixed(2)}</Text>
        <TouchableOpacity
            style={styles.checkoutButton}
            onPress={checkoutAction}>    
            <Text style={styles.buttonText}>Pay</Text>
        </TouchableOpacity>
      </View>
   );
};
export default CheckoutScreen;

