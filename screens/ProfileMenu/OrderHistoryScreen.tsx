import React, {useState,useEffect} from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import {getDBConnection, getMenuData, getOrderHistory } from "../../assets/dbConnection";
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import {orderHistoryStyle} from '../../modules/orderHistoryStyle';

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


const OrderHistoryScreen = () => {
   const [orderHistory, setOrderHistory] = useState<orderHistoryItem[]>([]);

   const query = async () => {
      try {
         const db = await getDBConnection();
         const orderHistoryData = await getOrderHistory(db, '01');  // Replace with current user ID
         setOrderHistory(orderHistoryData);
      } catch (error) {
         console.error("Error fetching order data:", error);
      }
   };

   useEffect(() => {
      query();
   }, []);

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
                  <Text style={[orderHistoryStyle.orderDetails, { marginBottom: 40 }]}>Price: {item.price}</Text>
                  <Text style={orderHistoryStyle.orderDetails}>SubTotal: {(item.price * item.quantity).toFixed(2)}</Text>
               </View>
            </View>
         </View>
         
         
      </View>
    );

   return (
      <SafeAreaView style={orderHistoryStyle.container}>
         <Text style={orderHistoryStyle.header}>My orders</Text>

            <FlatList
               data = {orderHistory}   
               renderItem = {renderOrderHistoryItem}
               keyExtractor={(item, index) => item.id || index.toString()}
            />
      </SafeAreaView>
   );
};





export default OrderHistoryScreen;
