import { StyleSheet } from 'react-native';

export const orderHistoryStyle = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#F8F0E5',
   },
   orderHeaderSection:{
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   orderDetailSection: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   orderItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
   },
   image: {
      width: 100,
      height: 100,
      borderRadius: 10,
      marginBottom: 10,
   },
   orderTitle: {
      fontFamily: 'Gantari-Bold',
      fontSize: 18,
      color: '#102C57',
   },
   orderDetails: {
      fontFamily: 'Gantari-Regular',
      fontSize: 16,
      color: 'grey',
      textAlign: 'right',
   },
});
