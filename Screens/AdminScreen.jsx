import React , { useState, useEffect }from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  FlatList
} from 'react-native';

const AdminScreen = ({ navigation }) => {
  // Données des statistiques
  const stats = {
    totalRequests: 45,
    pendingRequests: 12,
    totalProviders: 28,
    totalClients: 156,
    completedServices: 234,
    revenue: '12,450€'
  };

  // Données des demandes de services
  const serviceRequests = [
    {
      id: '1',
      clientName: 'Marie Dupont',
      clientAvatar: '👩‍💼',
      serviceTitle: 'Service de Nettoyage',
      category: 'Ménage',
      price: '50€',
      date: '13/01/2026',
      status: 'pending',
      urgency: 'normal',
      description: 'Nettoyage complet appartement 2 pièces'
    },
    {
      id: '2',
      clientName: 'Jean Martin',
      clientAvatar: '👨‍💼',
      serviceTitle: 'Réparation Électrique',
      category: 'Bricolage',
      price: '80€',
      date: '13/01/2026',
      status: 'pending',
      urgency: 'high',
      description: 'Installation luminaire dans salon'
    },
    {
      id: '3',
      clientName: 'Sophie Bernard',
      clientAvatar: '👩‍💻',
      serviceTitle: 'Jardinage',
      category: 'Jardinage',
      price: '45€',
      date: '12/01/2026',
      status: 'approved',
      urgency: 'normal',
      description: 'Tonte pelouse et taille haies'
    },
    {
      id: '4',
      clientName: 'Pierre Durand',
      clientAvatar: '👨‍🔧',
      serviceTitle: 'Déménagement',
      category: 'Transport',
      price: '120€',
      date: '12/01/2026',
      status: 'rejected',
      urgency: 'high',
      description: 'Transport meubles studio vers appartement'
    },
    {
      id: '5',
      clientName: 'Claire Petit',
      clientAvatar: '👩‍🎨',
      serviceTitle: 'Peinture',
      category: 'Bricolage',
      price: '65€',
      date: '11/01/2026',
      status: 'pending',
      urgency: 'normal',
      description: 'Peinture mur chambre 15m²'
    }
  ];

  const renderStatCard = ({ title, value, icon, color }) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  const renderRequestItem = ({ item }) => (
    <View style={styles.requestCard}>
      {/* Header */}
      <View style={styles.requestHeader}>
        <View style={styles.clientInfo}>
          <Text style={styles.clientAvatar}>{item.clientAvatar}</Text>
          <View style={styles.clientDetails}>
            <Text style={styles.clientName}>{item.clientName}</Text>
            <Text style={styles.requestDate}>{item.date}</Text>
          </View>
        </View>
        
        <View style={styles.requestStatus}>
          <View style={[
            styles.statusBadge,
            item.status === 'pending' ? styles.pendingStatus :
            item.status === 'approved' ? styles.approvedStatus :
            styles.rejectedStatus
          ]}>
            <Text style={[
              styles.statusText,
              item.status === 'pending' ? styles.pendingText :
              item.status === 'approved' ? styles.approvedText :
              styles.rejectedText
            ]}>
              {item.status === 'pending' ? 'En attente' :
               item.status === 'approved' ? 'Approuvé' : 'Rejeté'}
            </Text>
          </View>
          
          {item.urgency === 'high' && (
            <View style={styles.urgencyBadge}>
              <Text style={styles.urgencyText}>Urgent</Text>
            </View>
          )}
        </View>
      </View>

      {/* Service Info */}
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceTitle}>{item.serviceTitle}</Text>
        <Text style={styles.serviceCategory}>{item.category}</Text>
        <Text style={styles.serviceDescription}>{item.description}</Text>
        <Text style={styles.servicePrice}>{item.price}</Text>
      </View>

      {/* Actions */}
      {item.status === 'pending' && (
        <View style={styles.requestActions}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.rejectButton]}
            onPress={() => handleRejectRequest(item.id)}
          >
            <Text style={styles.rejectButtonText}>Rejeter</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.approveButton]}
            onPress={() => handleApproveRequest(item.id)}
          >
            <Text style={styles.approveButtonText}>Approuver</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const handleApproveRequest = (requestId) => {
    // Logique pour approuver la demande
    console.log('Approuver demande:', requestId);
  };

  const handleRejectRequest = (requestId) => {
    // Logique pour rejeter la demande
    console.log('Rejeter demande:', requestId);
  };

  const [token,setToken]= useState(null)
  const [user,setUser] = useState(null);

  const getConnectedUser = async (setToken) => {
    const userString = await AsyncStorage.getItem("user");
    const tk = await AsyncStorage.getItem("token");
  
    if (!tk || !userString) {
      Alert.alert("Valeur null")
      return null;
    }
  
    // const decoded = jwtDecode(tk);
    
    // if (decoded.exp * 1000 < Date.now()) {
    //   // Token expiré → logout automatique
    //   await AsyncStorage.removeItem("token");
    //   await AsyncStorage.removeItem("user");
    //   setToken(null);
    //   navigation.replace("Login");
    //   return null
    // }
    
    setToken(tk);
    console.log(token)
  
    return JSON.parse(userString);
  };
  
  
   useEffect(() => {
      getConnectedUser(setToken).then((u) => {
        setUser(u);
        console.log(user.properties.nomComplet)
      });
    }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      setToken(null);
      setUser(null)
      console.log("Déconnecté avec succès!");
      
      navigation.replace("AdminLogin");
    } catch (err) {
      console.log("Erreur logout:", err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFBE0" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tableau de Bord {user.properties.nomComplet} </Text>
        <Text style={styles.headerSubtitle}>Gestion des demandes de services</Text>

        <TouchableOpacity 
                  style={styles.bottomBarItem}
                  onPress={handleLogout}
                >
                  <Text style={styles.bottomBarIcon}>⚙️</Text>
                  <Text style={styles.bottomBarText}>logout</Text>
                </TouchableOpacity>
      </View>


      <ScrollView style={styles.body} contentContainerStyle={styles.scrollContent}>
        {/* Statistics Section */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Statistiques générales</Text>
          
          <View style={styles.statsGrid}>
            {renderStatCard({
              title: 'Total demandes',
              value: stats.totalRequests,
              icon: '📋',
              color: '#FCDA05'
            })}
            {renderStatCard({
              title: 'En attente',
              value: stats.pendingRequests,
              icon: '⏳',
              color: '#FF6B6B'
            })}
            {renderStatCard({
              title: 'Fournisseurs',
              value: stats.totalProviders,
              icon: '👥',
              color: '#4ECDC4'
            })}
            {renderStatCard({
              title: 'Clients',
              value: stats.totalClients,
              icon: '👤',
              color: '#45B7D1'
            })}
            {renderStatCard({
              title: 'Services complétés',
              value: stats.completedServices,
              icon: '✅',
              color: '#96CEB4'
            })}
            {renderStatCard({
              title: 'Revenus',
              value: stats.revenue,
              icon: '💰',
              color: '#FECA57'
            })}
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterSection}>
          <TouchableOpacity style={[styles.filterTab, styles.activeFilter]}>
            <Text style={styles.activeFilterText}>En attente ({stats.pendingRequests})</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterTab}>
            <Text style={styles.filterText}>Approuvées</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterTab}>
            <Text style={styles.filterText}>Rejetées</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterTab}>
            <Text style={styles.filterText}>Toutes</Text>
          </TouchableOpacity>
        </View>

        {/* Requests List */}
        <View style={styles.requestsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Demandes de services</Text>
            <TouchableOpacity style={styles.refreshButton}>
              <Text style={styles.refreshText}>🔄 Actualiser</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={serviceRequests}
            renderItem={renderRequestItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.requestsList}
          />
        </View>
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
    backgroundColor: '#FFFBE0',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222831',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  body: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  statsSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
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
  refreshButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  refreshText: {
    fontSize: 14,
    color: '#222831',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222831',
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
  },
  filterSection: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeFilter: {
    backgroundColor: '#FCDA05',
  },
  filterText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  activeFilterText: {
    fontSize: 12,
    color: '#222831',
    fontWeight: 'bold',
  },
  requestsSection: {
    marginBottom: 20,
  },
  requestsList: {
    paddingBottom: 20,
  },
  requestCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  clientAvatar: {
    fontSize: 32,
    marginRight: 12,
  },
  clientDetails: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222831',
    marginBottom: 2,
  },
  requestDate: {
    fontSize: 12,
    color: '#666',
  },
  requestStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 5,
  },
  pendingStatus: {
    backgroundColor: '#FFF3CD',
  },
  approvedStatus: {
    backgroundColor: '#D4EDDA',
  },
  rejectedStatus: {
    backgroundColor: '#F8D7DA',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  pendingText: {
    color: '#856404',
  },
  approvedText: {
    color: '#155724',
  },
  rejectedText: {
    color: '#721C24',
  },
  urgencyBadge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  urgencyText: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: 'bold',
  },
  serviceInfo: {
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222831',
    marginBottom: 5,
  },
  serviceCategory: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#222831',
    marginBottom: 8,
    lineHeight: 20,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FCDA05',
  },
  requestActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  rejectButton: {
    backgroundColor: '#F8D7DA',
    borderWidth: 1,
    borderColor: '#F5C6CB',
  },
  approveButton: {
    backgroundColor: '#D4EDDA',
    borderWidth: 1,
    borderColor: '#C3E6CB',
  },
  rejectButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#721C24',
  },
  approveButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#155724',
  },
});

export default AdminScreen;
