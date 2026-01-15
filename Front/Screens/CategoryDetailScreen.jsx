import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  SafeAreaView, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  Image,
  RefreshControl,
  Animated,
  Dimensions,
  Platform
} from 'react-native';
import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 16;

const CategoryDetailScreen = ({ route, navigation }) => {
  const { categoryName } = route.params;

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState(null);
  const [showAllServices, setShowAllServices] = useState(false);
  
  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await api.get("/api/filtre-service", { 
        params: { category: categoryName.trim() } 
      });
      setServices(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement:", err);
    }
  };

  const fetchUser = async () => {
    try {
      const userParse = JSON.parse(await AsyncStorage.getItem('user'));
      const tk = await AsyncStorage.getItem("token");
      if (tk && userParse) {
        setUser(userParse);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchServices(), fetchUser()]);
      setLoading(false);
    };
    loadData();
  }, [categoryName]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchServices();
    setRefreshing(false);
  };

  // Filtrage des services
  const filteredServices = showAllServices 
    ? services.filter(service => service.statut === true)
    : services.filter(service => 
        service.statut === true && 
        service.localisation === user?.localisation
      );

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return '#4CAF50';
    if (rating >= 4.0) return '#8BC34A';
    if (rating >= 3.5) return '#FFC107';
    if (rating >= 3.0) return '#FF9800';
    return '#F44336';
  };

  const renderService = ({ item, index }) => {
    const cardAnimation = {
      opacity: fadeAnim,
      transform: [{
        translateY: fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0]
        })
      }]
    };

    const isLocal = item.localisation === user?.localisation;
    const rating = item.provider?.rating || 4.2; // Exemple de notation

    return (
      <Animated.View style={[styles.cardContainer, cardAnimation]}>
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('ServiceDetail', { service: item })}
        >
          {/* Header avec badge local et favoris */}
          <View style={styles.cardHeader}>
            {isLocal && (
              <View style={styles.localBadge}>
                <Ionicons name="location" size={12} color="#FFF" />
                <Text style={styles.localBadgeText}>LOCAL</Text>
              </View>
            )}
          </View>

          {/* Image du service (à remplacer par l'URL réelle) */}
          <View style={styles.imagePlaceholder}>
            <MaterialIcons name="design-services" size={60} color="#FFAA33" />
          </View>

          {/* Contenu principal */}
          <View style={styles.cardContent}>
            <View style={styles.row}>
              <Text style={styles.title} numberOfLines={2}>{item.titre}</Text>
              <View style={styles.priceTag}>
                <Text style={styles.price}>{item.prix}€</Text>
                <Text style={styles.priceUnit}>/service</Text>
              </View>
            </View>


            {/* Infos provider et localisation */}
            <View style={styles.infoRow}>
              <View style={styles.providerInfo}>
                <Ionicons name="person-circle" size={16} color="#666" />
                <Text style={styles.providerName}>
                  {item.provider?.nomComplet || 'Provider'}
                </Text>
              </View>
              <View style={styles.locationInfo}>
                <Ionicons name="location-outline" size={14} color="#666" />
                <Text style={styles.locationText}>{item.localisation}</Text>
              </View>
            </View>

            {/* Tags/catégories */}
            <View style={styles.tagsContainer}>
              {item.category && (
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{item.category}</Text>
                </View>
              )}
              {item.delivery && (
                <View style={[styles.tag, styles.deliveryTag]}>
                  <Ionicons name="time" size={12} color="#4CAF50" />
                  <Text style={[styles.tagText, styles.deliveryText]}>
                    Livraison rapide
                  </Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFAA33" />
        <Text style={styles.loadingText}>Chargement des services...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header personnalisé */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {categoryName}
        </Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowAllServices(!showAllServices)}
        >
          <Ionicons 
            name={showAllServices ? "filter" : "filter-outline"} 
            size={24} 
            color="#FFAA33" 
          />
        </TouchableOpacity>
      </View>

      {/* Info filtre */}
      <View style={styles.filterInfo}>
        <Text style={styles.filterInfoText}>
          {showAllServices 
            ? "Tous les services" 
            : `Services dans : ${user?.localisation || 'votre région'}`}
        </Text>
        <Text style={styles.resultCount}>
          {filteredServices.length} service{filteredServices.length > 1 ? 's' : ''}
        </Text>
      </View>

      {/* Liste des services */}
      {filteredServices.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="search-outline" size={80} color="#E0E0E0" />
          <Text style={styles.emptyTitle}>Aucun service trouvé</Text>
          <Text style={styles.emptySubtitle}>
            {showAllServices 
              ? "Aucun service disponible pour cette catégorie"
              : "Aucun service disponible dans votre localisation"}
          </Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={onRefresh}
          >
            <Text style={styles.retryButtonText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredServices}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderService}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#FFAA33']}
              tintColor="#FFAA33"
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <Text style={styles.listHeader}>
              Services recommandés pour vous
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default CategoryDetailScreen;
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFDF2', // fond très clair
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFDF2',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF176',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6 },
      android: { elevation: 3 },
    }),
  },
  backButton: { padding: 6 },
  headerTitle: { flex: 1, fontSize: 17, fontWeight: '700', color: '#4A4F57', textAlign: 'center', marginHorizontal: 12 },
  filterButton: { padding: 6 },

  filterInfo: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    backgroundColor: '#FFFDF2', 
  },
  filterInfoText: { fontSize: 12, color: '#333A44', fontWeight: '500' },
  resultCount: { fontSize: 12, color: '#FFF176', fontWeight: '600' },

  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFDF2' },
  loadingText: { marginTop: 10, fontSize: 15, color: '#333A44', fontWeight: '500' },

  listContent: { padding: 12, paddingBottom: 24 },
  listHeader: { fontSize: 16, fontWeight: '700', color: '#4A4F57', marginBottom: 12, marginLeft: 8 },

  cardContainer: { marginBottom: 10 },
  card: {
    backgroundColor: '#FFFDF2',
    borderRadius: 14, // plus petite
    overflow: 'hidden',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 },
      android: { elevation: 3 },
    }),
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, paddingTop: 8, paddingBottom: 5 },

  localBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF176', paddingVertical: 2, paddingHorizontal: 6, borderRadius: 8 },
  localBadgeText: { color: '#333A44', fontSize: 9, fontWeight: '700', marginLeft: 3, letterSpacing: 0.5 },

  imagePlaceholder: { height: 120, backgroundColor: '#FFF8C4', justifyContent: 'center', alignItems: 'center' },

  cardContent: { padding: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  title: { fontSize: 15, fontWeight: '700', color: '#4A4F57', flex: 1, marginRight: 6 },

  priceTag: { backgroundColor: '#FFF176', paddingVertical: 3, paddingHorizontal: 8, borderRadius: 12, alignItems: 'center' },
  price: { fontWeight: '800', color: '#333A44', fontSize: 15, lineHeight: 18 },
  priceUnit: { fontSize: 9, color: '#4A4F57', fontWeight: '500' },

  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  providerInfo: { flexDirection: 'row', alignItems: 'center' },
  providerName: { fontSize: 12, color: '#4A4F57', marginLeft: 4, fontWeight: '500' },
  locationInfo: { flexDirection: 'row', alignItems: 'center' },
  locationText: { fontSize: 11, color: '#333A44', marginLeft: 3 },

  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  tag: { backgroundColor: '#FFF8C4', paddingVertical: 2, paddingHorizontal: 6, borderRadius: 10, marginRight: 6, marginBottom: 4, flexDirection: 'row', alignItems: 'center' },
  tagText: { fontSize: 9, color: '#333A44', fontWeight: '500' },
  deliveryTag: { backgroundColor: '#FFFDE7' },
  deliveryText: { color: '#4CAF50', marginLeft: 3 },

  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#4A4F57', marginTop: 14, marginBottom: 5 },
  emptySubtitle: { fontSize: 13, color: '#333A44', textAlign: 'center', lineHeight: 18, marginBottom: 18 },
  retryButton: { backgroundColor: '#FFF176', paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20 },
  retryButtonText: { color: '#333A44', fontSize: 14, fontWeight: '600' },
});

