// src/config/api.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Définis ton IP et port ici
const API_URL = "http://192.168.11.102:3001";

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");

  if (token) 
      config.headers.Authorization = `Bearer ${token}`;

  setTimeout(async () => {
   await AsyncStorage.removeItem("token")
  },600000)



  return config;


});

export default api;
