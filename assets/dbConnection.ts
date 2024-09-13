import {SQLiteDatabase, enablePromise, openDatabase} from 'react-native-sqlite-storage';

const databaseName = 'lumiereDatabase.sqlite';

enablePromise(true);

//Function to return today date in the format YYYY-MM-DD
const getTodayDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

//Function to generate unique primary key
const generateUniqueID = (): string => {
  return Math.random().toString(36).substr(2, 9); // Generate a unique ID
};

//Function to return image path
const getImage = (imageName: string) => {
  switch (imageName) {
    case 'FoodEggCroissantSandwich':
      return require('../img/food/FoodEggCroissantSandwich.png');
    case 'FoodBerryPancakes':
      return require('../img/food/FoodBerryPancakes.png');
    case 'FoodAvocadoToast':
      return require('../img/food/FoodAvocadoToast.png');
    case 'FoodChocolateCake':
      return require('../img/food/FoodChocolateCake.png');
    case 'FoodNewYorkCheesecake':
      return require('../img/food/FoodNewYorkCheesecake.jpeg');
    case 'FoodTiramisuCake':
      return require('../img/food/FoodTiramisuCake.jpg');
    case 'FoodHokkaidoCheeseTart':
      return require('../img/food/FoodHokkaidoCheeseTart.png');
    case 'FoodMacarons':
      return require('../img/food/FoodMacarons.jpg');

    case 'DrinksAmericano':
      return require('../img/drinks/DrinksAmericano.png');
    case 'DrinksLatte':
      return require('../img/drinks/DrinksLatte.png');
    case 'DrinksLatteSpecial':
      return require('../img/drinks/DrinksLatteSpecial.png');
    case 'DrinksCappuccino':
      return require('../img/drinks/DrinksCappuccino.png');
    case 'DrinksMocha':
      return require('../img/drinks/DrinksMocha.png');
    case 'DrinksMatchaLatte':
      return require('../img/drinks/DrinksMatchaLatte.jpeg');
    case 'DrinksMatchaMilkTea':
      return require('../img/drinks/DrinksMatchaMilkTea.png');
    case 'DrinksTaroMilkTea':
      return require('../img/drinks/DrinksTaroMilkTea.png');
  }
};

//Function to connect with the SQLite database
export const getDBConnection = async() => {
    return await openDatabase(
        {name: `${databaseName}`, createFromLocation:`~${databaseName}`},
      openCallback,
      errorCallback,
    );
}

//Return when database connected
const openCallback = () => {
  console.log('Database open successfully');
}

//Return when database fail to connect
const errorCallback = (err: any) => {
  console.log('Error in opening the database: ' + err);
}

//Function to get the user data
export const getUser = async( db: SQLiteDatabase, phone?:string, password?: string ): Promise<any> => {
  try {
    const query = 'SELECT * FROM users WHERE phone=?';
    const results = await db.executeSql(query, [phone]);

    //If user data is in the database
    if (results[0].rows.length > 0) {
      const user = results[0].rows.raw()[0];

      // Check password
      if (user.password === password) {
        return user;
      } else {
        throw new Error('Password is wrong.');
      }
    } else {
      throw new Error('User not found. Please make sure you have registered an account.');
    }

  } catch (error) {
    throw error;
  }
}

//Function to get the menu data
export const getMenuData = async (db: SQLiteDatabase, category?: string): Promise<any> => {
  try {
    const menuData: any = [];
    const query = category ? 'SELECT * FROM menu WHERE category=?' : 'SELECT * FROM menu';
    const params = category ? [category] : [];
    
    const results = await db.executeSql(query, params);
    results.forEach(result => {
      result.rows.raw().forEach((item: any) => {
        menuData.push({
          ...item,
          image: getImage(item.image)
        });
      });
    });
    
    return menuData;
  } catch (error) {
    throw new Error('Failed to get Menu Data!');
  }
};

//Function to get the order history data
export const getOrderHistory = async (db: SQLiteDatabase, userID?: string): Promise<any[]> => {
  try {
    const orderHistoryData: any[] = [];
    const query = 'SELECT * FROM orderHistory JOIN menu ON orderHistory.foodID = menu.foodID WHERE userID = ?';
    const results = await db.executeSql(query, [userID]);

    results.forEach(result => {
      (result.rows.raw()).forEach((item: any) => {
        orderHistoryData.push({...item, image: getImage(item.image)});
      });
    });

    return orderHistoryData;
  } catch (error) {
    throw new Error('Failed to get order history');
  }
}

//Function to get the cart data
export const getCartItem = async (db: SQLiteDatabase, userID?: string): Promise<any[]> => {
    try {
      const cartItemData: any[] = [];  
      const query = 'SELECT * FROM cartItem JOIN menu ON cartItem.foodID = menu.foodID WHERE userID = ?';
      const results = await db.executeSql(query, [userID]);
      
      results.forEach(result => {
        (result.rows.raw()).forEach((item: any) => {
            cartItemData.push({...item, image: getImage(item.image)});
        });
      });
      
      return cartItemData;
    } catch (error) {
      throw new Error('Failed to get cart item');
    }
  }

//Function to add new user
export const addUserData = async (db: SQLiteDatabase, name: string, phone: string, password: string): Promise<void> => {
  try {
    //Check if the user already exists in the database
    const checkQuery = 'SELECT * FROM users WHERE phone = ? AND password = ?';
    const result = await db.executeSql(checkQuery, [phone, password]);

    if (result[0].rows.length > 0) {            //If the user exists
      throw new Error('User already exist')
    } else {                                    //If the user doesn't exists
      const userID = generateUniqueID();
      const insertQuery = 'INSERT INTO users (userID, name, phone, password) VALUES (?, ?, ?, ?)';
      await db.executeSql(insertQuery, [userID, name, phone, password]);
    }
  } catch (error) {
    throw new Error('Failed to add user data');
  }
};

//Function to update user data
export const updateUserData = async (db: SQLiteDatabase, userID: string, name: string, phone: string): Promise<void> => {
  try {
    const query = 'UPDATE users SET name = ? , phone = ? WHERE userID = ?';
    await db.executeSql(query, [name, phone, userID]);
  } catch (error) {
    throw new Error('Failed to update user data');
  }
};

//Function to add cart data
export const addCartItem = async (db: SQLiteDatabase, userID: string, foodID: string, quantity: number): Promise<void> => {
  try {
    // Check if the item already exists in the cart
    const checkQuery = 'SELECT quantity FROM cartItem WHERE userID = ? AND foodID = ?';
    const result = await db.executeSql(checkQuery, [userID, foodID]);

    if (result[0].rows.length > 0) {                      // If the item exists, update the quantity
      const existingQuantity = result[0].rows.item(0).quantity;
      const newQuantity = existingQuantity + quantity;
      const updateQuery = 'UPDATE cartItem SET quantity = ? WHERE userID = ? AND foodID = ?';
      await db.executeSql(updateQuery, [newQuantity, userID, foodID]);
    } else {                                              // If the item does not exist, insert into table
      const newCartItemID = generateUniqueID();
      const insertQuery = 'INSERT INTO cartItem (cartItemID, userID, foodID, quantity) VALUES (?, ?, ?, ?)';
      await db.executeSql(insertQuery, [newCartItemID, userID, foodID, quantity]);
    }
  } catch (error) {
    throw new Error('Failed to add cart item');
  }
};

//Function to update cart item
export const updateCartItem = async (db: SQLiteDatabase, userID: string, foodID: string, quantity: number): Promise<void> => {
  try {
    const query = 'UPDATE cartItem SET quantity = ? WHERE userID = ? AND foodID = ?';
    await db.executeSql(query, [quantity, userID, foodID]);
  } catch (error) {
    throw new Error('Failed to update cart item');
  }
};

//Function to delete cart item
export const deleteCartItem = async (db: SQLiteDatabase, userID: string, foodID: string): Promise<void> => {
  try {
    const query = 'DELETE FROM cartItem WHERE userID = ? AND foodID = ?';
    await db.executeSql(query, [userID, foodID]);
  } catch (error) {
    throw new Error('Failed to delete cart item');
  }
};

//Function to process payment by delete cart item and add into the order history
export const processPayment = async (db: SQLiteDatabase, userID: string): Promise<void> => {
  try {
    // Retrieve cart items
    const cartItems = await getCartItem(db, userID);
 
    //Get the current date
    const date = getTodayDate();
 
    //Query to insert order history table
    const insertOrderQuery = 'INSERT INTO orderHistory (orderID, userID, foodID, date, quantity) VALUES (?, ?, ?, ?, ?)';
    for (const item of cartItems) {
      const orderID = generateUniqueID();
      await db.executeSql(insertOrderQuery, [orderID, userID, item.foodID, date, item.quantity]);
    }
    
    //Query to delete cart item table
    const deleteCartQuery = 'DELETE FROM cartItem WHERE userID = ?';
    await db.executeSql(deleteCartQuery, [userID]);
  } catch (error) {
    throw new Error('Failed to process payment');
  }
};


