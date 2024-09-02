import {SQLiteDatabase, enablePromise, openDatabase} from 'react-native-sqlite-storage';

const databaseName = 'lumiereDatabase.sqlite';

enablePromise(true);

export const getDBConnection = async() => {
    return await openDatabase(
        {name: `${databaseName}`, createFromLocation:`~${databaseName}`},
      openCallback,
      errorCallback,
    );
}

// export const createTableUsers = async( db: SQLiteDatabase ) => {
//     try{
//         const query = 'CREATE TABLE IF NOT EXISTS users(id VARCHAR(10) PRIMARY KEY, name VARCHAR(20), phone VARCHAR(20), password VARCHAR(20))';
//         await db.executeSql(query);
//       } catch (error) {
//         console.error(error);
//         throw Error('Failed to create table !!!');
//       }
// }

// export const createTableMenu = async( db: SQLiteDatabase ) => {
//     try{
//         const query = 'CREATE TABLE IF NOT EXISTS menu(id VARCHAR(10) PRIMARY KEY, name VARCHAR(20), category VARCHAR(20), type VARCHAR(10), description VARCHAR2(100), image VARCHAR2(50), price NUMERIC(10,2))';
//         await db.executeSql(query);
//       } catch (error) {
//         console.error(error);
//         throw Error('Failed to create table !!!');
//       }
// }

// export const createTableOrderHistory = async( db: SQLiteDatabase ) => {
//     try{
//         const query = 'CREATE TABLE IF NOT EXISTS orderHistory(id VARCHAR(10) PRIMARY KEY AUTOINCREMENT, userID VARCHAR(20), foodID VARCHAR(20), date VARCHAR(12), quantity VARCHAR(10))';
//         await db.executeSql(query);
//       } catch (error) {
//         console.error(error);
//         throw Error('Failed to create table !!!');
//       }
// }

// export const createTableCartItem = async( db: SQLiteDatabase ) => {
//     try{
//         const query = 'CREATE TABLE IF NOT EXISTS cartItem(id VARCHAR(10) PRIMARY KEY AUTOINCREMENT, userID VARCHAR(20), foodID VARCHAR(20), quantity VARCHAR(10))';
//         await db.executeSql(query);
//       } catch (error) {
//         console.error(error);
//         throw Error('Failed to create table !!!');
//       }
// }


export const getUsers = async( db: SQLiteDatabase ): Promise<any> => {
    try{
        const userData : any = [];
        const query = `SELECT * FROM users`;
        const results = await db.executeSql(query);
        results.forEach(result => {
            (result.rows.raw()).forEach(( item:any ) => {
                userData.push(item);
            })
          });
        return userData;
      } catch (error) {
        console.error(error);
        throw Error('Failed to get users !!!');
      }
}

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

export const getMenuData = async (db: SQLiteDatabase, category?: string): Promise<any> => {
  try {
    const menuData: any = [];
    const query = category ? `SELECT * FROM menu WHERE category=?` : `SELECT * FROM menu`;
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

    const query = `SELECT * FROM orderHistory JOIN menu ON orderHistory.foodID = menu.foodID WHERE userID = ?`;
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
        console.log("Missing user ID");
        throw new Error('User ID is required');
      }
  
      const query = `SELECT * FROM cartItem JOIN menu ON cartItem.foodID = menu.foodID WHERE userID = ?`;
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


  // havent try for the checkout function -- cathy
export const processPayment = async (db: SQLiteDatabase, userID: string): Promise<void> => {
  try {
    if (!userID) {
      console.log("Missing user ID");
      throw new Error('User ID is required');
    }

    // Step 1: Retrieve cart items
    const cartItems = await getCartItem(db, userID);
    
    if (cartItems.length === 0) {
      console.log("Cart is empty");
      throw new Error('Cart is empty');
    }

    // Generate a unique orderID (for simplicity, use timestamp or UUID)
    const orderID = Date.now().toString();

    // Get the current date (format as needed)
    const date = new Date().toISOString();

    // Step 2: Insert items into order history
    const insertOrderQuery = `INSERT INTO orderHistory (orderID, userID, foodID, date, quantity) VALUES (?, ?, ?, ?, ?)`;
    for (const item of cartItems) {
      await db.executeSql(insertOrderQuery, [orderID, userID, item.foodID, date, item.quantity]);
    }

    // Step 3: Delete items from cart
    const deleteCartQuery = `DELETE FROM cartItem WHERE userID = ?`;
    await db.executeSql(deleteCartQuery, [userID]);

    console.log("Payment processed successfully");

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