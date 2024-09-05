import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { Alert, ToastAndroid, View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getDBConnection, getCartItem, processPayment } from '../assets/dbConnection';
import { SafeAreaView } from 'react-native-safe-area-context';
import {styles} from '../modules/checkoutStyle';
import { getSession } from '../assets/sessionData';
import io from 'socket.io-client';

var socket = io('http://10.0.2.2:5000/checkout',{
    transports: ['websocket'],
});

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
    const [userID, setUserID] = useState('');

    const connectSocket = async () => {
        try {
            socket.on('connect', () => {
                console.log('Socket connected:', socket.id);
                socket.emit('client_connected', { connected: true });
                ToastAndroid.show('Connected to server', ToastAndroid.LONG);
            });

            socket.on('error', (error: any) => {
                console.log('Socket error:', error);
                ToastAndroid.show('Failed to connect to server', ToastAndroid.LONG);
            });

            socket.on('server_send', (data: any) => {
                let result = JSON.parse(data);
                setTotal(result.total);
            });
        } catch (error) {
            console.error('Error connecting: ', error);
        }
    };

    const retrieveSessionData = async () => {
        const session = await getSession();
        if (session) {
           const { userId: sessionUserId } = session;
           console.log('User ID:', sessionUserId);
           setUserID(sessionUserId || '');
           return sessionUserId;
        } else {
           console.log('No session found');
           return null;
        }
    };

    const query = async (userId: string) => {
        try {
            const db = await getDBConnection();
            const cartItemData = await getCartItem(db, userId);
            setCartItems(cartItemData);

            // Emit cart data to server once fetched
            socket.emit('client_send_cart', {
            cartItems: cartItemData,
        });
        } catch (error) {
            console.error('Error fetching order data: ', error);
        }
    };

    useEffect(() => {
        console.log('Total updated: ', total);
    }, [total]);

    useFocusEffect(
        useCallback(() => {
           const fetchData = async () => {
              const sessionUserId = await retrieveSessionData();
              if (sessionUserId) {
                 await query(sessionUserId);
                 await connectSocket();
              } else {
                 console.error('User ID is not set, skipping query');
              }
           };

           fetchData();
        }, [])
     );
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
            await processPayment(db, userID);  // Replace with current user ID

            Alert.alert('You have successfully paid.');
            query(userID);
            navigation.goBack();
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

