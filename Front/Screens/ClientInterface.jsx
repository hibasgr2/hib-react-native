import React, { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from 'react-native';
import api from "../api";

import jwtDecode from "jwt-decode";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Alert
} from 'react-native';

const ClientScreen = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
  api.get("/api/services")
    .then(response => {
      setServices(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error(error);
      Alert.alert("Erreur", "Impossible de charger les services");
      setLoading(false);
    });
}, []);

  const [user,setUser] = useState(null);
  const [token, setToken] = useState(null);

  const handleServicePress = (service) => {
    navigation.navigate('ServiceDetail', { service });
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleFavoritesPress = () => {
    Alert.alert('Favoris', 'Vos services favoris');
  };

  const handleSettingsPress = () => {
    Alert.alert('Paramètres', 'Paramètres de l\'application');
  };

//   const getConnectedUser = async () => {
//   const userString = await AsyncStorage.getItem("user");
//   const tk = await AsyncStorage.getItem("token");
//   setToken(tk);
//   console.log("Token",token)
//   if (userString) {
//     return JSON.parse(userString);
//   }
//   return null;
// };

// const getConnectedUser = async (setToken) => {
//   // const userString = await AsyncStorage.getItem("user");
//   const userparse = JSON.parse(await AsyncStorage.getItem('user'));
 
//   const tk = await AsyncStorage.getItem("token");

//   if (!tk || !userString) {
//      navigation.replace("Login");
//     return null;
//   }

//   setToken(tk);

//   return userparse;
// };

//   useEffect(() => {
//   if (user) {
//     console.log("User mis à jour :", user);
//   }
// }, [user]);


//  useEffect(() => {
//     getConnectedUser(setToken).then((u) => {
//       setUser(u);
//       console.log(token)
//     });
//   }, []);

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

//   const handleLogout = async () => {
//   try {
//     await AsyncStorage.removeItem("token");
//     console.log("Déconnecté avec succès!");
//      navigation.replace("Login");
//   } catch (err) {
//     console.log("Erreur logout:", err.message);
//   }
// };

const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    
    console.log("Déconnecté avec succès!");
    
    navigation.replace("Login");
  } catch (err) {
    console.log("Erreur logout:", err.message);
  }
};



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFBE0" />
      
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Menu')}
        >
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        
        <Text style={styles.navTitle}>Services</Text>
        
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={handleProfilePress}
        >
          <View style={styles.profileIcon}>
            <Text style={styles.profileIconText}>👤</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Body - Services Grid */}
      {/* <ScrollView style={styles.body} contentContainerStyle={styles.servicesContainer}>

        <View style={{ padding: 20 }}>
        {user ? (
          <Text style={{ fontSize: 20 }}>
            Bienvenue {user.properties.email}
            token {token}
          </Text>
        ) : (
          <Text>Chargement...</Text>
        )}
      </View>

        <Text style={styles.sectionTitle}>Nos Services</Text>
        
        <View style={styles.grid}>
          {services.map((service) => (
            <TouchableOpacity 
              key={service.id}
              style={styles.serviceCard}
              onPress={() => handleServicePress(service)}
            >
              <View style={styles.serviceIconContainer}>
                <Text style={styles.serviceIcon}>{service.icon}</Text>
              </View>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.servicePrice}>{service.price}</Text>
              <Text style={styles.serviceDescription}>{service.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView> */}

       <ScrollView style={styles.body} contentContainerStyle={styles.servicesContainer}>

        <Text style={styles.sectionTitle}>Nos Services</Text>

        {/* ⏳ Loader */}
        {loading && (
           <ActivityIndicator size="large" color="#FCDA05" />
        )}

        {/* ❌ Aucun service */}
        {!loading && services.length === 0 && (
          <Text style={styles.emptyText}>
            Aucun service disponible pour le moment
          </Text>
        )}

        {/* ✅ Liste des services */}
        <View style={styles.grid}>
          {services.map((service) => (
            <TouchableOpacity 
              key={service.id}
              style={styles.serviceCard}
              onPress={() => handleServicePress(service)}
            >
              <View style={styles.serviceIconContainer}>
                <Text style={styles.serviceIcon}>🛠️</Text>
              </View>

              <Text style={styles.serviceName}>
                {service.titre}
              </Text>

              <Text style={styles.servicePrice}>
                {service.prix} €
              </Text>

              <Text style={styles.serviceDescription}>
                {service.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.bottomBarItem}
          onPress={handleFavoritesPress}
        >
          <Text style={styles.bottomBarIcon}>❤️</Text>
          <Text style={styles.bottomBarText}>Favoris</Text>
        </TouchableOpacity>
        
        <View style={styles.bottomBarDivider} />
        
        <TouchableOpacity 
          style={styles.bottomBarItem}
          onPress={handleLogout}
        >
          <Text style={styles.bottomBarIcon}>⚙️</Text>
          <Text style={styles.bottomBarText}>logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBE0',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFBE0',
    borderBottomWidth: 1,
    borderBottomColor: '#FCDA05',
    shadowColor: '#222831',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FCDA05',
  },
  menuIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222831',
  },
  navTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222831',
  },
  profileButton: {
    padding: 5,
  },
  profileIcon: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#FCDA05',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  profileIconText: {
    fontSize: 18,
  },
  body: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  servicesContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222831',
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#FFFBE0',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#222831',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#FCDA05',
  },
  serviceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FCDA05',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  serviceIcon: {
    fontSize: 24,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222831',
    marginBottom: 5,
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FCDA05',
    marginBottom: 5,
  },
  serviceDescription: {
    fontSize: 12,
    color: '#393E46',
    textAlign: 'center',
    opacity: 0.8,
  },
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderTopWidth: 2,
    borderTopColor: '#FCDA05',
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#222831',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomBarItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  bottomBarIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  bottomBarText: {
    fontSize: 12,
    color: '#393E46',
    fontWeight: '600',
  },
  bottomBarDivider: {
    width: 1,
    backgroundColor: '#FCDA05',
    marginHorizontal: 10,
  },
});

export default ClientScreen;
