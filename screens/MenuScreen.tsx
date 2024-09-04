import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, SafeAreaView,TouchableHighlight, Alert, } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createStackNavigator} from '@react-navigation/stack';
import { styles } from '../modules/menuStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getDBConnection, getMenuData, getCartItem, updateCartItem, addCartItem } from "../assets/dbConnection";
import { getSession } from '../assets/sessionData';
type FoodItem={
  id: string;
  name: string;
  category: string;
  type: any;
  description: string;
  image: string;
  price: number;
};

type Categories={
  [key:string]:FoodItem[];
};

const Stack=createStackNavigator();

const CustomStackContent = ({ navigation }: any) => { //side bar
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const handlePress = (category: string) => {
    setActiveCategory(category);
    navigation.navigate('CategoryScreen', { category });
  };

  return (
    <View style={styles.sidebar}>
      <TouchableHighlight
        style={[styles.sidebarItem, activeCategory === 'Food' && { backgroundColor: '#DAC0A3' }]}
        underlayColor="#DAC0A3"
        onPress={() => handlePress('Food')}
      >
        <View style={{ alignItems: 'center' }}>
          <MaterialCommunityIcons name="food" size={24} color={activeCategory === 'Food' ? '#102C57' : '#333'} />
          <Text style={[styles.sidebarText, activeCategory === 'Food' && { color: '#102C57' }]}>Food</Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        style={[styles.sidebarItem, activeCategory === 'Drink' && { backgroundColor: '#DAC0A3' }]}
        underlayColor="#DAC0A3"
        onPress={() => handlePress('Drink')}
      >
        <View style={{ alignItems: 'center' }}>
          <Entypo name="drink" size={24} color={activeCategory === 'Drink' ? '#102C57' : '#333'} />
          <Text style={[styles.sidebarText, activeCategory === 'Drink' && { color: '#102C57' }]}>Drink</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const ItemDetailScreen = ({navigation, route}: any) => { //item detail screen
  const {item} = route.params;
  const [quantity, setQuantity] = useState(0);
  const [userID, setUserID] = useState('');

  const retrieveSessionData = async () => {
    const session = await getSession();
    if (session) {
       const { userId: sessionUserId } = session;
       console.log('User ID:', sessionUserId);
       setUserID(sessionUserId || '');
      
    } else {
       console.log('No session found');
       return null;
    }
  };

  const handleAddToCart = async (foodID: string, quantity: number) => {
    try {
      const db = await getDBConnection();
      await addCartItem(db, userID, foodID, quantity);
      console.log('Added the Cart Item')
      Alert.alert('Added to cart', `Added ${quantity} ${item.name} to the cart.`);
      navigation.goBack();
    } catch (error) {
      console.error('Failed to add to cart:', error);
      Alert.alert('Error', 'Failed to add item to cart.');
    }
  };

  useEffect(() => {
    retrieveSessionData();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex:1,justifyContent:'center',marginBottom:100}}>
        <Image source={item.image} style={styles.detailImage} />
        <Text style={styles.detailTitle}>{item.name}</Text>
        <Text style={styles.detailPrice}>RM {item.price.toFixed(2)}</Text>
        <Text style={styles.detailDescription}>{item.description}</Text>

        <View style={{ flexDirection:'row',alignItems:'center',justifyContent:'center', marginTop:20}}>
          <TouchableOpacity onPress={() => setQuantity(q => Math.max(1, q - 1))} style={{marginRight:20}}>
            <Ionicons name="remove-circle-outline" size={30} color="#102C57" />
          </TouchableOpacity>

          <Text style={{ fontSize:30, fontWeight: 'bold', color: '#102C57' }}>{quantity}</Text>

          <TouchableOpacity onPress={() => setQuantity(q => q + 1)} style={{marginLeft:20}}>
            <Ionicons name="add-circle-outline" size={30} color="#102C57" />
          </TouchableOpacity>

        </View>
      </View>

      <TouchableOpacity style={styles.fab} onPress={() => {handleAddToCart(item.foodID, quantity)}}>
        <Text style={styles.addToCartText}>Add to cart</Text>
        <MaterialCommunityIcons name="cart" size={30} color="#102C57" />
      </TouchableOpacity>

    </SafeAreaView>
  );
};

const keyExtractor = (item: FoodItem, index: number) => {
  return item.id ? item.id : `item-${index}`;
};

const CategoryScreen = ({navigation, route}: any) => {

  const [foodMenu, setFoodMenu] = useState<FoodItem[]>([]);
  const [drinkMenu, setDrinkMenu] = useState<FoodItem[]>([]);
  const [menu, setMenu] = useState<Categories>({});
  const [selectedType, setSelectedType] = useState<string>('All');
  
  const query = async () => {
    try {
      const db = await getDBConnection();
      const foodMenuData = await getMenuData(db, 'Food');
      const drinkMenuData = await getMenuData(db, 'Drink');

      setFoodMenu(foodMenuData);
      setDrinkMenu(drinkMenuData);

      setMenu({
        Food: foodMenuData,
        Drink: drinkMenuData
      });
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };
  

  useEffect(() => {
    query();
  }, [])

  const {category} =route.params||{};
  const currentMenu = menu[category] || [];

  if (!category) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Category not found</Text>
      </SafeAreaView>
    );
  }
  if (!currentMenu.length) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Menu not found</Text>
      </SafeAreaView>
    );
  }

  const foodTypes = ['All', ...new Set(currentMenu.map(item=>item.type))];

  const filteredItems = selectedType === 'All' ? currentMenu:currentMenu.filter(item=>item.type === selectedType);
 
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.content}>
        <Picker 
          selectedValue={selectedType} 
          style={styles.picker} 
          onValueChange={(itemValue) => setSelectedType(itemValue)}
        >
          {foodTypes.map(type => (
            <Picker.Item key={type} label={type} value={type}/>
          ))}
        </Picker>

        <FlatList
          data={filteredItems}
          renderItem={({ item }) => (
            <TouchableHighlight 
              style={styles.menuRow} 
              underlayColor="#DAC0A3"
              onPress={() => navigation.navigate('ItemDetail', { item })}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={item.image} style={styles.imageRow} />

                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.price}>RM {item.price.toFixed(2)}</Text>
                </View>
              </View>
            </TouchableHighlight>
          )}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContainer}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

const MenuScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <CustomStackContent navigation={navigation} />
      <Stack.Navigator>
        <Stack.Screen
          name="CategoryScreen"
          component={CategoryScreen}
          initialParams={{category:'Food'}}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ItemDetail"
          component={ItemDetailScreen}
          options={{
            headerStyle: {backgroundColor:'#F8F0E5'},
            headerTitle: '',
            headerBackTitleVisible: false,
            headerTintColor:'#102C57',
          }}
        />
      </Stack.Navigator>
    </View>
  );
};

export default MenuScreen;