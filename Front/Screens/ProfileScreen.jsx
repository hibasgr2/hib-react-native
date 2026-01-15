import React, { useState, useEffect } from 'react';
import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Switch,
  Image
} from 'react-native';

const ProfileScreen = ({ navigation  }) => {
  // Données du client (exemple)
 const [user,setUser] = useState({});
 const [token,setToken] = useState(null);
 const [serviceData,setServiceData] = useState(null);
 const [showAddService, setShowAddService] = useState(false);
 const [loading, setLoading] = useState(true);


 


  useEffect(() => {
    const fetchuser= async () => {
      try {
        const userparse = JSON.parse(await AsyncStorage.getItem('user'));
        const tk = await AsyncStorage.getItem("token");

        if (!tk || !userparse) {
          navigation.replace("Login");
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


useEffect(() => {
  const fetchService = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/servicebyuserId/${user.id}`);
      console.log(response.data)
      setServiceData(response.data);

    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Impossible de charger les détails du service");
    } finally {
      setLoading(false);
    }
  };

  fetchService(); 
}, [user.id]); 

 if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#FCDA05" style={{ marginTop: 50 }} />
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFBE0" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mon Profil</Text>
        <View style={styles.placeholder} />
         <View style={styles.toggleContainer}>
          <Text style={styles.toggleText}>Mode fournisseur</Text>
          <Switch
            value={showAddService}
            onValueChange={setShowAddService}
          />
        </View>

      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.scrollContent}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatar}></Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.fullName}>{user.nomComplet}</Text>
              <Text style={styles.memberSince}>Membre depuis {user.dateInscription}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.star}>⭐</Text>
                <Text style={styles.ratingText}>{user.rating}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Informations de contact</Text>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>📧 Email:</Text>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>📞 Téléphone:</Text>
            <Text style={styles.infoValue}>{user.telephone}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>📍 Adresse:</Text>
            <Text style={styles.infoValue}>{user.localisation}</Text>
          </View>
        </View>

        <View style={styles.separator} />
        
                {/* 🛠️ SERVICE */}
                <View style={styles.serviceInfo}>
                  <Text style={styles.sectionTitle}>Détails du service</Text>
        
                  <Info label="📋 Titre" value={serviceData.titre} />
                  <Info label="📝 Description" value={serviceData.description} />
                  <Info label="🏷️ Catégorie" value={serviceData.categorie} />
                  <Info label="📍 Localisation" value={serviceData.localisation} />
                  <Info label="💰 Prix" value={`${serviceData.prix} €`} highlight />
                  <Info
                    label="📅 Publié le"
                    value={new Date(serviceData.datePublication).toLocaleDateString()}
                  />
                </View>

        {/* Add Service Button */}


        {showAddService && (
        <TouchableOpacity 
          style={styles.addServiceButton}
          onPress={() => navigation.navigate('AddService', {
            userid: user.id, 
            usernom: user.nomComplet,
            userloca: user.localisation
            
          })}
        >
          <Text style={styles.addServiceIcon}>+</Text>
          <Text style={styles.addServiceText}>Ajouter un service</Text>
        </TouchableOpacity>
        )}
      </ScrollView>

     
    </SafeAreaView>
  );
};

const Info = ({ label, value, highlight }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={highlight ? styles.priceValue : styles.infoValue}>
      {value}
    </Text>
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBE0',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginRight: 15,
  },
  backIcon: {
    fontSize: 24,
    color: '#222831',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222831',
    flex: 1,
  },
  placeholder: {
    width: 44,
  },
  body: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FCDA05',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    borderWidth: 3,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  avatar: {
    fontSize: 40,
  },
  profileInfo: {
    flex: 1,
  },
  fullName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222831',
    marginBottom: 5,
  },
  memberSince: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 16,
    marginRight: 5,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222831',
    marginRight: 5,
  },
  ratingCount: {
    fontSize: 14,
    color: '#666',
  },
  infoSection: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222831',
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAll: {
    fontSize: 14,
    color: '#FCDA05',
    fontWeight: 'bold',
  },
  infoItem: {
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    color: '#222831',
    fontWeight: '500',
  },
  statsSection: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FCDA05',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  servicesSection: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  serviceItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222831',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedStatus: {
    backgroundColor: '#E8F5E8',
  },
  ongoingStatus: {
    backgroundColor: '#FFF3CD',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  completedStatus: {
    color: '#28A745',
  },
  ongoingStatus: {
    color: '#856404',
  },
  serviceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  serviceCategory: {
    fontSize: 14,
    color: '#666',
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FCDA05',
  },
  serviceDate: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 10,
  },
  stars: {
    flexDirection: 'row',
  },
  emptyStar: {
    fontSize: 14,
    color: '#DDD',
  },
  addServiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCDA05',
    borderRadius: 15,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  addServiceIcon: {
    fontSize: 24,
    color: '#222831',
    marginRight: 10,
    fontWeight: 'bold',
  },
  addServiceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222831',
  },
  toggleContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginVertical: 10,
},


});

export default ProfileScreen;
