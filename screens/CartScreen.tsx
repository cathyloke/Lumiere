import React, {useState} from 'react';
import { View, Text } from 'react-native';

type CartItem = {
   id: string;
   name: string;
   image: any;
   price: number;
   quantity: number; 
}

const CartScreen = ({navigation}:any) => {
   const [cartItems, setCartItems] = useState<CartItem[]>();

   
   return (
      <View>
         <View>
            <Text>Cart</Text>
         </View>
      </View>
   );
};

export default CartScreen;
