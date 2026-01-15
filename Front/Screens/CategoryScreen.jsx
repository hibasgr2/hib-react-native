import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const CategoryScreen = ({ navigation }) => {

  // ================== DATA ==================
  const categories = [
    {
      id: '1',
      name: 'Ménage',
      icon: '🧹',
      services: [
        { id: '1-1', title: 'Nettoyage complet', price: '50€', rating: 4.5 },
        { id: '1-2', title: 'Nettoyage vitres', price: '30€', rating: 4.3 },
        { id: '1-3', title: 'Grand ménage', price: '80€', rating: 4.7 },
      ],
    },
    {
      id: '2',
      name: 'Bricolage',
      icon: '🔧',
      services: [
        { id: '2-1', title: 'Réparation électrique', price: '70€', rating: 4.8 },
        { id: '2-2', title: 'Plomberie', price: '60€', rating: 4.6 },
        { id: '2-3', title: 'Petites réparations', price: '40€', rating: 4.4 },
      ],
    },
    {
      id: '3',
      name: 'Jardinage',
      icon: '🌿',
      services: [
        { id: '3-1', title: 'Tonte de pelouse', price: '45€', rating: 4.5 },
        { id: '3-2', title: 'Taille de haies', price: '55€', rating: 4.7 },
        { id: '3-3', title: 'Aménagement jardin', price: '120€', rating: 4.9 },
      ],
    },
    {
      id: '4',
      name: 'Éducation',
      icon: '📚',
      services: [
        { id: '4-1', title: 'Soutien scolaire', price: '25€/h', rating: 4.8 },
        { id: '4-2', title: 'Cours de musique', price: '30€/h', rating: 4.6 },
        { id: '4-3', title: 'Langues étrangères', price: '35€/h', rating: 4.7 },
      ],
    },
    {
      id: '5',
      name: 'Transport',
      icon: '📦',
      services: [
        { id: '5-1', title: 'Déménagement', price: '100€', rating: 4.4 },
        { id: '5-2', title: 'Livraison', price: '20€', rating: 4.3 },
        { id: '5-3', title: 'Transport meubles', price: '60€', rating: 4.5 },
      ],
    },
    {
      id: '6',
      name: 'Beauté',
      icon: '💅',
      services: [
        { id: '6-1', title: 'Coiffure', price: '40€', rating: 4.7 },
        { id: '6-2', title: 'Soins du visage', price: '50€', rating: 4.8 },
        { id: '6-3', title: 'Manucure', price: '30€', rating: 4.5 },
      ],
    },
  ];

  // ================== RENDER CATEGORY ==================
  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate('CategoryDetail', { category: item })
      }
    >
      <View style={styles.cardHeader}>
        <Text style={styles.icon}>{item.icon}</Text>
        <View>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>
            {item.services.length} services disponibles
          </Text>
        </View>
      </View>

      {item.services.slice(0, 2).map(service => (
        <View key={service.id} style={styles.serviceRow}>
          <Text style={styles.serviceTitle}>{service.title}</Text>
          <Text style={styles.servicePrice}>{service.price}</Text>
        </View>
      ))}

      <View style={styles.footer}>
        <Text style={styles.seeMore}>Voir plus →</Text>
      </View>
    </TouchableOpacity>
  );

  // ================== UI ==================
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFBE0" barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('Menu')}
        >
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.headerTitle}>Catégories</Text>
          <Text style={styles.headerSubtitle}>
            Trouvez le service qu'il vous faut
          </Text>
        </View>
      </View>

      {/* LIST */}
      <FlatList
        data={categories}
        keyExtractor={item => item.id}
        renderItem={renderCategory}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default CategoryScreen;

// ================== STYLES ==================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBE0',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFBE0',
  },

  menuButton: {
    marginRight: 16,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#FCDA05',
  },

  menuIcon: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222831',
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222831',
  },

  headerSubtitle: {
    fontSize: 14,
    color: '#393E46',
  },

  list: {
    padding: 16,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 5,
    borderLeftColor: '#FCDA05',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  icon: {
    fontSize: 34,
    marginRight: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222831',
  },

  subtitle: {
    fontSize: 13,
    color: '#393E46',
  },

  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },

  serviceTitle: {
    fontSize: 14,
    color: '#393E46',
  },

  servicePrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FCDA05',
  },

  footer: {
    marginTop: 10,
    alignItems: 'flex-end',
  },

  seeMore: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222831',
  },
});
