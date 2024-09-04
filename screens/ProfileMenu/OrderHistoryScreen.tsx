import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Image, View, Text, StyleSheet } from 'react-native';
import {getDBConnection, getOrderHistory } from "../../assets/dbConnection";
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import {orderHistoryStyle} from '../../modules/orderHistoryStyle';
import { getSession } from '../../assets/sessionData';

type orderHistoryItem = {
   id: string;
   userID: string;
   foodID: string;
   name: string;
   category: string;
   type: any;
   description: string;
   image: string;
   price: number;
   date: string;
   quantity: number;
}


const OrderHistoryScreen = ({ navigation }: any) => {
   const [orderHistory, setOrderHistory] = useState<orderHistoryItem[]>([]);
   const [userID, setUserID] = useState('');

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
         const orderHistoryData = await getOrderHistory(db, userId);  // Replace with current user ID
         setOrderHistory(orderHistoryData);
      } catch (error) {
         console.error("Error fetching order data:", error);
      }
   };

   useFocusEffect(
      useCallback(() => {
         const fetchData = async () => {
            const sessionUserId = await retrieveSessionData();
            if (sessionUserId) {
               await query(sessionUserId);
            } else {
               console.error('User ID is not set, skipping query');
            }
         };
   
         fetchData();
      }, [])
   );

   const renderOrderHistoryItem = ({ item }: { item: orderHistoryItem }) => (
      <View style={orderHistoryStyle.orderItem}>
         <View>
            <View style= {orderHistoryStyle.orderHeaderSection}>
               <Text style={orderHistoryStyle.orderTitle}>{item.name}</Text>
               <Text style={orderHistoryStyle.orderTitle}>{item.date}</Text>
            </View>
            <View style= {orderHistoryStyle.orderDetailSection}>
               <Image source={item.image} style={orderHistoryStyle.image} />
               <View>
                  <Text style={orderHistoryStyle.orderDetails}>Quantity: {item.quantity}</Text>
                  <Text style={[orderHistoryStyle.orderDetails, { marginBottom: 40 }]}>Price: RM{(item.price).toFixed(2)}</Text>
                  <Text style={orderHistoryStyle.orderDetails}>Subtotal: RM{(item.price * item.quantity).toFixed(2)}</Text>
               </View>
            </View>
         </View>
      </View>
    );

   return (
      <SafeAreaView style={orderHistoryStyle.container}>

            <FlatList
               data = {orderHistory}
               renderItem = {renderOrderHistoryItem}
               keyExtractor={(item, index) => item.id || index.toString()}
            />

      </SafeAreaView>
   );
};





export default OrderHistoryScreen;
