import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image
} from 'react-native';

const ProfileScreen = ({ navigation }) => {
  // Données du client (exemple)
  const clientData = {
    fullName: 'Marie Dupont',
    email: 'marie.dupont@email.com',
    phone: '+33 6 12 34 56 78',
    address: '123 Avenue des Champs-Élysées, 75008 Paris',
    memberSince: '15 janvier 2025',
    totalServices: 12,
    rating: 4.8,
    avatar: '👩‍💼'
  };

  // Services du client
  const clientServices = [
    {
      id: '1',
      title: 'Service de Nettoyage',
      category: 'Ménage',
      price: '50€',
      date: '08/01/2026',
      status: 'Terminé',
      rating: 5
    },
    {
      id: '2',
      title: 'Jardinage',
      category: 'Jardinage',
      price: '45€',
      date: '05/01/2026',
      status: 'En cours',
      rating: null
    },
    {
      id: '3',
      title: 'Réparation Électrique',
      category: 'Bricolage',
      price: '70€',
      date: '02/01/2026',
      status: 'Terminé',
      rating: 4
    }
  ];

  const renderServiceItem = ({ item }) => (
    <View style={styles.serviceItem}>
      <View style={styles.serviceHeader}>
        <Text style={styles.serviceTitle}>{item.title}</Text>
        <View style={[styles.statusBadge, item.status === 'Terminé' ? styles.completedStatus : styles.ongoingStatus]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.serviceDetails}>
        <Text style={styles.serviceCategory}>{item.category}</Text>
        <Text style={styles.servicePrice}>{item.price}</Text>
        <Text style={styles.serviceDate}>{item.date}</Text>
      </View>
      
      {item.rating && (
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingLabel}>Note:</Text>
          <View style={styles.stars}>
            {[...Array(5)].map((_, index) => (
              <Text key={index} style={index < item.rating ? styles.star : styles.emptyStar}>
                ⭐
              </Text>
            ))}
          </View>
        </View>
      )}
    </View>
  );

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
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.scrollContent}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatar}>{clientData.avatar}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.fullName}>{clientData.fullName}</Text>
              <Text style={styles.memberSince}>Membre depuis {clientData.memberSince}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.star}>⭐</Text>
                <Text style={styles.ratingText}>{clientData.rating}</Text>
                <Text style={styles.ratingCount}>(12 services)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Informations de contact</Text>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>📧 Email:</Text>
            <Text style={styles.infoValue}>{clientData.email}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>📞 Téléphone:</Text>
            <Text style={styles.infoValue}>{clientData.phone}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>📍 Adresse:</Text>
            <Text style={styles.infoValue}>{clientData.address}</Text>
          </View>
        </View>

        {/* Statistics */}


        {/* Recent Services */}
        <View style={styles.servicesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Services récents</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MyServices')}>
              <Text style={styles.seeAll}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          
          {clientServices.map((service) => (
            <View key={service.id} style={styles.serviceItem}>
              <View style={styles.serviceHeader}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <View style={[styles.statusBadge, service.status === 'Terminé' ? styles.completedStatus : styles.ongoingStatus]}>
                  <Text style={styles.statusText}>{service.status}</Text>
                </View>
              </View>
              
              <View style={styles.serviceDetails}>
                <Text style={styles.serviceCategory}>{service.category}</Text>
                <Text style={styles.servicePrice}>{service.price}</Text>
                <Text style={styles.serviceDate}>{service.date}</Text>
              </View>
              
              {service.rating && (
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingLabel}>Note:</Text>
                  <View style={styles.stars}>
                    {[...Array(5)].map((_, index) => (
                      <Text key={index} style={index < service.rating ? styles.star : styles.emptyStar}>
                        ⭐
                      </Text>
                    ))}
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Add Service Button */}
        {/* <TouchableOpacity 
          style={styles.addServiceButton}
          onPress={() => navigation.navigate('AddService')}
        >
          <Text style={styles.addServiceIcon}>+</Text>
          <Text style={styles.addServiceText}>Ajouter un service</Text>
        </TouchableOpacity>
      </ScrollView> */}

        <TouchableOpacity 
          style={styles.addServiceButton}
          onPress={() => navigation.navigate('AddService', {
            clientId: '4:795d82e6-5f6f-42af-83e3-7be6c87a5cd2:0', // Remplacer par l'ID réel
            clientName: clientData.fullName
          })}
        >
          <Text style={styles.addServiceIcon}>+</Text>
          <Text style={styles.addServiceText}>Ajouter un service</Text>
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
});

export default ProfileScreen;
