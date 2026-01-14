import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
  Alert
} from 'react-native';

const ServiceDetailScreen = ({ route, navigation }) => {
  // Récupérer les données du service depuis les paramètres de route
  const { service } = route.params || {};

  // Données du prestataire (exemple)
  const provider = {
    fullName: 'Jean Dupont',
    avatar: '👤',
    phone: '+33 6 12 34 56 78',
    email: 'jean.dupont@email.com',
    address: '123 Rue de la République, 75001 Paris',
    rating: 4.5
  };

  // Données complètes du service
  const serviceData = service || {
    title: 'Service de Nettoyage',
    description: 'Nettoyage professionnel et complet de votre espace de vie ou de bureau. Nous utilisons des produits écologiques et respectons vos normes d\'hygiène.',
    category: 'Ménage',
    price: '50€',
    location: 'Paris et région parisienne',
    image: '🧹',
    publishDate: '10/01/2026'
  };

  // Fonction pour afficher les étoiles de rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Text key={i} style={styles.star}>⭐</Text>);
    }
    
    if (hasHalfStar) {
      stars.push(<Text key="half" style={styles.star}>⭐</Text>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Text key={`empty${i}`} style={styles.emptyStar}>☆</Text>);
    }
    
    return stars;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFBE0" />
      
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        {/* Logo Drawer */}
       <TouchableOpacity 
                style={styles.menuButton}
                onPress={() => navigation.navigate('Menu')}
              >
                <Text style={styles.menuIcon}>☰</Text>
              </TouchableOpacity>

        {/* Titre au centre */}
        <Text style={styles.navTitle}>Détails du Service</Text>

        {/* Espace vide à droite pour équilibre */}
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Première partie du body */}
        <View style={styles.firstSection}>
          {/* Photo de profil à gauche */}
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatar}>{provider.avatar}</Text>
            </View>
          </View>

          {/* Infos à droite */}
          <View style={styles.infoSection}>
            <Text style={styles.fullName}>{provider.fullName}</Text>
            <Text style={styles.serviceType}>{serviceData.category}</Text>
            
            {/* Rating avec étoiles */}
            <View style={styles.ratingContainer}>
              {renderStars(provider.rating)}
              <Text style={styles.ratingText}> ({provider.rating})</Text>
            </View>
          </View>
        </View>

        {/* Séparateur */}
        <View style={styles.separator} />

        {/* Deuxième partie du body */}
        <View style={styles.secondSection}>
          {/* Infos du prestataire à gauche */}
          <View style={styles.providerInfo}>
            <Text style={styles.sectionTitle}>Informations du prestataire</Text>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>📞 Téléphone:</Text>
              <Text style={styles.infoValue}>{provider.phone}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>📧 Email:</Text>
              <Text style={styles.infoValue}>{provider.email}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>📍 Adresse:</Text>
              <Text style={styles.infoValue}>{provider.address}</Text>
            </View>
          </View>

          {/* Infos du service à droite */}
          <View style={styles.serviceInfo}>
            <Text style={styles.sectionTitle}>Détails du service</Text>
            
            <View style={styles.serviceImageContainer}>
              <Text style={styles.serviceImage}>{serviceData.image}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>📋 Titre:</Text>
              <Text style={styles.infoValue}>{serviceData.title}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>📝 Description:</Text>
              <Text style={styles.infoValue}>{serviceData.description}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>🏷️ Catégorie:</Text>
              <Text style={styles.infoValue}>{serviceData.category}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>💰 Prix:</Text>
              <Text style={styles.priceValue}>{serviceData.price}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>📍 Localisation:</Text>
              <Text style={styles.infoValue}>{serviceData.location}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>📅 Date de publication:</Text>
              <Text style={styles.infoValue}>{serviceData.publishDate}</Text>
            </View>
          </View>
        </View>

        {/* Bouton de contact */}
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contacter le prestataire</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  menuButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFFBE0',
  },
  menuIcon: {
    fontSize: 24,
    color: '#222831',
    fontWeight: 'bold',
  },
  navTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222831',
  },
  placeholder: {
    width: 44,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  profileSection: {
    marginRight: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FCDA05',
    justifyContent: 'center',
    alignItems: 'center',
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
  infoSection: {
    flex: 1,
    justifyContent: 'center',
  },
  fullName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222831',
    marginBottom: 5,
  },
  serviceType: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 16,
    color: '#FCDA05',
  },
  emptyStar: {
    fontSize: 16,
    color: '#DDD',
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
  },
  secondSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  providerInfo: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  serviceInfo: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222831',
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#FCDA05',
    paddingBottom: 5,
  },
  infoItem: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 14,
    color: '#222831',
    fontWeight: '500',
  },
  priceValue: {
    fontSize: 16,
    color: '#FCDA05',
    fontWeight: 'bold',
  },
  serviceImageContainer: {
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
  },
  serviceImage: {
    fontSize: 50,
  },
  contactButton: {
    backgroundColor: '#FCDA05',
    borderRadius: 15,
    padding: 18,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  contactButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222831',
  },
});

export default ServiceDetailScreen;
