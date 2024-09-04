import {SQLiteDatabase, enablePromise, openDatabase} from 'react-native-sqlite-storage';

const databaseName = 'lumiereDatabase.sqlite';

enablePromise(true);

//get the today date
const getTodayDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
  const day = String(today.getDate()).padStart(2, '0'); // Ensure two digits for day
  return `${year}-${month}-${day}`;
};

//generate primary key
const generateUniqueID = (): string => {
  return Math.random().toString(36).substr(2, 9); // Generate a unique ID
};

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

export const getDBConnection = async() => {
    return await openDatabase(
        {name: `${databaseName}`, createFromLocation:`~${databaseName}`},
      openCallback,
      errorCallback,
    );
}

export const getUser = async( db: SQLiteDatabase, phone?:string, password?: string ): Promise<any> => {
  try {
    
    const query = 'SELECT * FROM users WHERE phone=?';
    const results = await db.executeSql(query, [phone]);
    console.log(results)

    //found match user
    if (results.length > 0) {
      const resultSet = results[0];
      
      // Ensure the query returned rows
      if (resultSet.rows.length > 0) {
        const user = resultSet.rows.raw()[0];

        // Check password
        if (user.password === password) {
          return user;
        } else {
          console.log('Password is wrong');  
          throw new Error('Password wrong');
        }
      } else {
        console.log('User does not exist');
        throw new Error('User not found. Ensure you had register an account.');
      }
    } else {
      console.log('No results returned');
      throw new Error('User not found. Ensure you had register an account.');
    }
  } catch (error) {
    console.log('Fail to log in: ', error);
    throw error;
  }
}

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
    console.error(error);
    throw new Error('Failed to get Menu Data!');
  }
};

export const getOrderHistory = async (db: SQLiteDatabase, userID?: string): Promise<any[]> => {
  try {
    const orderHistoryData: any[] = [];
    if (!userID) {
      throw new Error('User ID is required');
    }

    const query = 'SELECT * FROM orderHistory JOIN menu ON orderHistory.foodID = menu.foodID WHERE userID = ?';
    const results = await db.executeSql(query, [userID]);

    results.forEach(result => {
      (result.rows.raw()).forEach((item: any) => {
        orderHistoryData.push({...item, image: getImage(item.image)});
      });
    });

    return orderHistoryData;
  } catch (error) {
    console.error('Failed to get order history:', error);
    throw new Error('Failed to get order history');
  }
}

export const getCartItem = async (db: SQLiteDatabase, userID?: string): Promise<any[]> => {
    try {
      const cartItemData: any[] = [];
      if (!userID) {
        console.log('Missing user ID');
        throw new Error('User ID is required');
      }
  
      const query = 'SELECT * FROM cartItem JOIN menu ON cartItem.foodID = menu.foodID WHERE userID = ?';
      const results = await db.executeSql(query, [userID]);
      
      results.forEach(result => {
        (result.rows.raw()).forEach((item: any) => {
            cartItemData.push({...item, image: getImage(item.image)});
        });
      });
      
      return cartItemData;
    } catch (error) {
      console.error('Failed to get cart item:', error);
      throw new Error('Failed to get cart item');
    }
  }

// Add the user data 
export const addUserData = async (db: SQLiteDatabase, name: string, phone: string, password: string): Promise<void> => {
  try {
    if (!name) {
      console.log('Missing user name');
      throw new Error('Name is required');
    } else if (!phone) {
      console.log('Missing phone number');
      throw new Error('Phone number is required');
    } else if (!password) {
      console.log('Missing password');
      throw new Error('Password is required');
    }else {
      console.log('No missing error in name, phone number and password')
    }
    

    // Check if the user already exists in the database
    const checkQuery = 'SELECT * FROM users WHERE phone = ? AND password = ?';
    const result = await db.executeSql(checkQuery, [phone, password]);

    if (result[0].rows.length > 0) {
      // If the user exists
      console.log('User already exists')
      throw new Error('User already exist')
    } else {
      // If the user does not exist, insert it as a new entry
      const userID = generateUniqueID();
      const insertQuery = 'INSERT INTO users (userID, name, phone, password) VALUES (?, ?, ?, ?)';
      await db.executeSql(insertQuery, [userID, name, phone, password]);
    }
    console.log('User added successfully');

  } catch (error) {
    console.error('Failed to update user data:', error);
    throw new Error('Failed to update user data');
  }
};

// Update the user data - name and phone number
export const updateUserData = async (db: SQLiteDatabase, userID: string, name: string, phone: string): Promise<void> => {
  try {
    if (!userID) {
      console.log('Missing user ID');
      throw new Error('User ID is required');
    } else if (!name) {
      console.log('Missing user name');
      throw new Error('Name is required');
    } else if (!phone) {
      console.log('Missing phone number');
      throw new Error('Phone number is required');
    } else {
      console.log('No missing error in user ID, name and phone number')
    }

    const query = 'UPDATE users SET name = ? , phone = ? WHERE userID = ?';
    await db.executeSql(query, [name, phone, userID]);

  } catch (error) {
    console.error('Failed to update user data:', error);
    throw new Error('Failed to update user data');
  }
};

//add cart into cartItem table
export const addCartItem = async (db: SQLiteDatabase, userID: string, foodID: string, quantity: number): Promise<void> => {
  try {
    if (!userID) {
      console.log('Missing user ID');
      throw new Error('User ID is required');
    } else if (!foodID) {
      console.log('Missing food ID');
      throw new Error('Food ID is required');
    } else if (!quantity) {
      console.log('Missing quantity');
      throw new Error('Quantity is required');
    } else {
      console.log('No missing error in userID, foodID and quantity')
    }
    
    // Check if the item already exists in the cart
    const checkQuery = 'SELECT quantity FROM cartItem WHERE userID = ? AND foodID = ?';
    const result = await db.executeSql(checkQuery, [userID, foodID]);

    if (result[0].rows.length > 0) {
      // If the item exists, update the quantity
      const existingQuantity = result[0].rows.item(0).quantity;
      const newQuantity = existingQuantity + quantity;
      const updateQuery = 'UPDATE cartItem SET quantity = ? WHERE userID = ? AND foodID = ?';
      await db.executeSql(updateQuery, [newQuantity, userID, foodID]);
    } else {
      // If the item does not exist, insert it as a new entry
      const newCartItemID = generateUniqueID();
      console.log(newCartItemID)
      const insertQuery = 'INSERT INTO cartItem (cartItemID, userID, foodID, quantity) VALUES (?, ?, ?, ?)';
      await db.executeSql(insertQuery, [newCartItemID, userID, foodID, quantity]);

    }
    console.log('Cart item added successfully');
  } catch (error) {
    console.error('Failed to add cart item:', error);
    throw new Error('Failed to add cart item');
  }
};

// Update the quantity of a cart item
export const updateCartItem = async (db: SQLiteDatabase, userID: string, foodID: string, quantity: number): Promise<void> => {
  try {
    if (!userID) {
      console.log('Missing user ID');
      throw new Error('User ID is required');
    } else if (!foodID) {
      console.log('Missing food ID');
      throw new Error('Food ID is required');
    } else if (!quantity) {
      console.log('Missing quantity');
      throw new Error('Quantity is required');
    } else {
      console.log('No missing error in userID, foodID and quantity')
    }
    const query = 'UPDATE cartItem SET quantity = ? WHERE userID = ? AND foodID = ?';
    await db.executeSql(query, [quantity, userID, foodID]);

  } catch (error) {
    console.error('Failed to update cart item:', error);
    throw new Error('Failed to update cart item');
  }
};

// Delete a cart item
export const deleteCartItem = async (db: SQLiteDatabase, userID: string, foodID: string): Promise<void> => {
  try {
    const query = 'DELETE FROM cartItem WHERE userID = ? AND foodID = ?';
    await db.executeSql(query, [userID, foodID]);
  } catch (error) {
    console.error('Failed to delete cart item:', error);
    throw new Error('Failed to delete cart item');
  }
};

//process payment by delete cart item and add into the order history
export const processPayment = async (db: SQLiteDatabase, userID: string): Promise<void> => {
  try {
    if (!userID) {
      console.log('Missing user ID');
      throw new Error('User ID is required');
    } else {
      console.log('No missing error in userID')
    }

    // Retrieve cart items
    const cartItems = await getCartItem(db, userID);
    console.log(cartItems)
    console.log("aasdasd")
    if (cartItems.length === 0) {
      console.log('Cart is empty');
      throw new Error('Cart is empty');
    }
 
    // Get the current date
    const date = getTodayDate();
 
    //Query to Insert and Delete
    const insertOrderQuery = 'INSERT INTO orderHistory (orderID, userID, foodID, date, quantity) VALUES (?, ?, ?, ?, ?)';
    
    //update order history table
    for (const item of cartItems) {
      const orderID = generateUniqueID();
      await db.executeSql(insertOrderQuery, [orderID, userID, item.foodID, date, item.quantity]);
  
    }
    console.log("Done update cart Item table in database")

    //delete cart item table
    const deleteCartQuery = 'DELETE FROM cartItem WHERE userID = ?';
    await db.executeSql(deleteCartQuery, [userID]);
    console.log('Payment processed successfully');

  } catch (error) {
    console.error('Failed to process payment:', error);
    throw new Error('Failed to process payment');
  }
};


const openCallback = () => {
    console.log('database open success');
}

const errorCallback = (err: any) => {
    console.log('Error in opening the database: ' + err);
}