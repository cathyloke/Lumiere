import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
       flex: 1,
       padding: 16,
       backgroundColor: '#F8F0E5',
    },
    itemContainer: {
       flexDirection: 'row',
       marginTop: 20,
       borderBottomWidth: 1,
       borderColor: 'grey',
       
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
    price: {
       fontSize: 16,
       fontFamily: 'Gantari-Regular',
       //  color: '#888',
       color: '#102C57',
    },
    quantity: {
       fontSize: 14,
       fontFamily: 'Gantari-Regular',
       marginTop: 8,
       marginBottom: 8,
    },
    qtyButton: {
       backgroundColor: '#102C57',
       alignItems: 'center',
       width: 70,
       borderRadius: 50,
       marginBottom: 8,
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
    }
 });