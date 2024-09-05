import AsyncStorage from '@react-native-async-storage/async-storage';

// Save session data
export const saveSession = async (userId: string, userName: string, userPhone: string) => {
    try {
      await AsyncStorage.setItem('@user_id', userId);
      await AsyncStorage.setItem('@user_name', userName);
      await AsyncStorage.setItem('@user_phone', userPhone);

      console.log('Session saved successfully');
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  };

// Retrieve session data
export const getSession = async () => {
    try {
        const userId = await AsyncStorage.getItem('@user_id');
        const userName = await AsyncStorage.getItem('@user_name');
        const userPhone = await AsyncStorage.getItem('@user_phone');

        return {userId, userName, userPhone};
    } catch (error) {
        console.error('Failed to retrieve session:', error);
        return null;
    }
};

// Clear session data
export const clearSession = async () => {
    try {
        await AsyncStorage.removeItem('@user_id');
        await AsyncStorage.removeItem('@user_name');
        await AsyncStorage.removeItem('@user_phone');
    } catch (error) {
        console.error('Failed to clear session:', error);
    }
};

