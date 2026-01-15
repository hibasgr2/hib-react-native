// CategoryDetailScreen.jsx
import React, { useEffect, useState } from 'react';
import api from "../api";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';



const CategoryDetailScreen = ({ route, navigation }) => {
  const { categoryName } = route.params;

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get(
          "/api/filtre-service",
          {
            params: {
              category: categoryName.trim().toLowerCase(),
            },
          }
        );
        setServices(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={services}
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
              Prestataire: {item.provider ? item.provider.nomComplet : 'Non défini'}
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