import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeTokenLocally = async (token: string) => {
  try {
    await AsyncStorage.setItem("authToken", token);
  } catch (e) {
    console.error("Error storing auth token:", e);
  }
};

export const getTokenLocally = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    return token;
  } catch (e) {
    console.error("Error getting auth token:", e);
    return null;
  }
};

export const removeTokenLocally = async () => {
  try {
    await AsyncStorage.removeItem("authToken");
  } catch (e) {
    console.error("Error removing auth token:", e);
  }
};
