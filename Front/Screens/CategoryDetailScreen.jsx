// CategoryDetailScreen.jsx
import React, { useEffect, useState } from 'react';
import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";


import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';


const CategoryDetailScreen = ({ route, navigation }) => {
  const { categoryName } = route.params;
  console.log("cat",categoryName)

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user,setUser] = useState(null);
  const [token, setToken] = useState(null);
  
  

  useEffect(() => {
  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/filtre-service", {
        params: { category: categoryName.trim() },
      });
      setServices(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchServices(); 

}, [categoryName]);


  useEffect(() => {
    const fetchuser= async () => {
      try {
        const userparse = JSON.parse(await AsyncStorage.getItem('user'));
        const tk = await AsyncStorage.getItem("token");

        if (!tk || !userparse) {
          //navigation.replace("Login");
          return null;
        }
         
        setToken(tk);
        setUser(userparse)
        

      } catch (err) {
        console.error(err);
      } 
    };

    fetchuser();
  }, []);

  useEffect(() => {
  if (user) {
    console.log("User mis à jour :", user);
  }
}, [user]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  const filteredServices = services.filter(service =>
  service.statut === true && service.localisation === user?.localisation
);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={filteredServices}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('ServiceDetail', { service: item })
            }
          >
            <Text style={styles.title}>{item.titre}</Text>
            <Text style={styles.price}>{item.prix} €</Text>
            <Text style={styles.location}>{item.localisation}</Text>
            <Text style={styles.provider}>
              Prestataire: { item.nomComplet }
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default CategoryDetailScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 15,
    marginBottom: 14,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    color: '#FCDA05',
    fontWeight: 'bold',
    marginTop: 4,
  },
  location: {
    color: '#666',
    marginTop: 4,
  },
  provider: {
    color: '#222',
    fontSize: 12,
    marginTop: 4,
  },
});