import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#F8F0E5',
   },
   itemContainer: {
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 10,
   },
   header: {
      fontFamily: 'Gantari-Bold',
      fontSize: 25,
      color: '#102C57',
      padding: 15,
      textAlign: 'left',
      borderBottomWidth: 1,
      borderColor: 'grey',
   },
   total: {
   fontFamily: 'Gantari-Bold',
   fontSize: 20,
   color: '#102C57',
   padding: 10,
   textAlign: 'right',
   borderTopWidth: 1,
   borderBottomWidth: 1,
   borderColor: 'grey',
   marginBottom: 10
   },
   image: {
      width: 100,
      height: 100,
      marginRight: 16,
      borderRadius: 15,
   },
   infoContainer: {
      flex: 1,
      justifyContent: 'center',
   },
   name: {
      fontSize: 18,
      fontFamily: 'Gantari-Bold',
      color: '#102C57',
   },
   itemDetails: {
      fontFamily: 'Gantari-Regular',
      fontSize: 16,
      color: 'grey',
   },
   buttonText: {
      color: '#F8F0E5',
      fontSize: 20,
      fontFamily: 'Gantari-Bold',
   },
   checkoutButton: {
      backgroundColor: '#102C57',
      alignItems: 'center',
      padding: 16,
      borderRadius: 50,
   },
});
