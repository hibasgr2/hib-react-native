import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from "../api";


import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator
} from 'react-native';

const ServiceDetailScreen = ({ route, navigation }) => {

  // 🔹 ID du service envoyé depuis l'écran précédent
  const { service } = route.params;
  const serviceId = service.id;

  // 🔹 States
  const [serviceData, setServiceData] = useState(null);
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Charger les détails depuis le backend
 useEffect(() => {
  api.get(`/api/services/${serviceId}`)
    .then(response => {
      setServiceData(response.data.service);
      setProvider(response.data.user);
      setLoading(false);
    })
    .catch(error => {
      console.error(error);
      Alert.alert("Erreur", "Impossible de charger les détails du service");
      setLoading(false);
    });
}, []);


  // ⏳ Loader
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#FCDA05" style={{ marginTop: 50 }} />
      </SafeAreaView>
    );
  }

  // ❌ Service introuvable
  if (!serviceData || !provider) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: 'center', marginTop: 50 }}>
          Service introuvable
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFBE0" />

      {/* 🔝 NAV BAR */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.menuIcon}>←</Text>
        </TouchableOpacity>

        <Text style={styles.navTitle}>Détails du service</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* 👤 PRESTATAIRE */}
        <View style={styles.firstSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>👤</Text>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.fullName}>{provider.nomComplet}</Text>
            <Text style={styles.serviceType}>{serviceData.categorie}</Text>
            <Text style={styles.location}>{provider.localisation}</Text>
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

        {/* 📞 CONTACT */}
        <View style={styles.providerInfo}>
          <Text style={styles.sectionTitle}>Contacter le prestataire</Text>

          <Info label="📞 Téléphone" value={provider.telephone} />
          <Info label="📧 Email" value={provider.email} />
        </View>

         {/* � BOUTONS D'ACTION */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.likeButton}>
            <Text style={styles.likeIcon}>❤️</Text>
            <Text style={styles.likeText}>J'aime</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.commentButton} onPress={() => navigation.navigate('Comments', { serviceId: serviceData.id, serviceTitle: serviceData.titre })}>
            <Text style={styles.commentIcon}>💬</Text>
            <Text style={styles.commentText}>Commenter</Text>
          </TouchableOpacity>
        </View>


      </ScrollView>
    </SafeAreaView>
  );
};

// 🔹 Composant réutilisable
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
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    elevation: 3,
  },
  menuButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFFBE0',
  },
  menuIcon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  navTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    padding: 20,
  },
  firstSection: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FCDA05',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  avatar: {
    fontSize: 40,
  },
  infoSection: {
    justifyContent: 'center',
  },
  fullName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  serviceType: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  location: {
    fontSize: 13,
    color: '#888',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDD',
    marginVertical: 20,
  },
  serviceInfo: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  providerInfo: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#FCDA05',
    paddingBottom: 5,
  },
  infoItem: {
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FCDA05',
  },
  contactButton: {
    backgroundColor: '#FCDA05',
    borderRadius: 15,
    padding: 18,
    alignItems: 'center',
    elevation: 3,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  // 👍 BOUTONS D'ACTION
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    elevation: 3,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3F3',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  likeIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  likeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  commentIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  commentText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976D2',
  },
});


export default ServiceDetailScreen;