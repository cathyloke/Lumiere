import { StyleSheet } from 'react-native';

export const orderHistoryStyle = StyleSheet.create({
   container: {
      flex: 1
   },
   header: {
      fontFamily: 'Gantari-Bold',
      fontSize: 20,
      color: 'black',
      padding: 15,
      textAlign: 'left',
      borderBottomWidth: 1,
      borderColor: 'grey',
   },
   orderHeaderSection:{
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   orderDetailSection: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between'
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
      fontWeight: 'bold',
      color: 'black',
   },
   orderDetails: {
      fontFamily: 'Gantari-Bold',
      fontSize: 16,
      color: 'grey',
      textAlign: 'right'
   },
});