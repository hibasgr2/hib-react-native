import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';

const CategoryDetailScreen = ({ route, navigation }) => {
  const { category } = route.params || {};

  const renderServiceCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate('ServiceDetail', {
          service: {
            id: item.id,
            title: item.title,
            description: `Service professionnel de ${item.title.toLowerCase()}`,
            price: item.price,
            rating: item.rating,
            image: category.icon,
            category: category.name,
            location: 'Paris et région',
            publishDate: '10/01/2026',
          },
        })
      }
    >
      {/* TOP */}
      <View style={styles.top}>
        <View style={styles.iconWrapper}>
          <Text style={styles.icon}>{category.icon}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.category}>{category.name}</Text>
        </View>

        <View style={styles.rating}>
          <Text style={styles.star}>⭐</Text>
          <Text style={styles.rate}>{item.rating}</Text>
        </View>
      </View>

      {/* BOTTOM */}
      <View style={styles.bottom}>
        <Text style={styles.price}>{item.price}</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Contacter</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFBE0" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerIcon}>{category?.icon}</Text>
          <Text style={styles.headerTitle}>{category?.name}</Text>
        </View>
      </View>

      {/* LIST */}
      <FlatList
        data={category?.services || []}
        renderItem={renderServiceCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.section}>
            {category?.services?.length || 0} services disponibles
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default CategoryDetailScreen;

// ===================== STYLES =====================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBE0',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FCDA05',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  backIcon: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222831',
  },

  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerIcon: {
    fontSize: 26,
    marginRight: 8,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222831',
  },

  section: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#393E46',
    marginBottom: 16,
  },

  list: {
    padding: 16,
    paddingBottom: 30,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },

  top: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  iconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FCDA05',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  icon: {
    fontSize: 26,
  },

  info: {
    flex: 1,
  },

  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222831',
  },

  category: {
    fontSize: 13,
    color: '#393E46',
    marginTop: 2,
  },

  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  star: {
    fontSize: 14,
    marginRight: 4,
  },

  rate: {
    fontSize: 14,
    color: '#393E46',
    fontWeight: 'bold',
  },

  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FCDA05',
  },

  button: {
    backgroundColor: '#222831',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },

  buttonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FCDA05',
  },
});
