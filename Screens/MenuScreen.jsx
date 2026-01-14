import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const MenuScreen = ({ navigation }) => {

  // ===================== MENU DATA =====================
  const menuItems = [
    {
      title: 'Accueil',
      icon: '🏠',
      screen: 'ClientHome',
      description: 'Page principale',
    },
    {
      title: 'Catégories',
      icon: '📂',
      screen: 'Categories',
      description: 'Toutes les catégories',
    },
    {
      title: 'Ménage',
      icon: '🧹',
      screen: 'CategoryDetail',
      params: { category: { id: '1', name: 'Ménage', icon: '🧹' } },
      description: 'Services de nettoyage',
    },
    {
      title: 'Bricolage',
      icon: '🔧',
      screen: 'CategoryDetail',
      params: { category: { id: '2', name: 'Bricolage', icon: '🔧' } },
      description: 'Réparations et installations',
    },
    {
      title: 'Jardinage',
      icon: '🌿',
      screen: 'CategoryDetail',
      params: { category: { id: '3', name: 'Jardinage', icon: '🌿' } },
      description: 'Entretien espaces verts',
    },
    {
      title: 'Éducation',
      icon: '📚',
      screen: 'CategoryDetail',
      params: { category: { id: '4', name: 'Éducation', icon: '📚' } },
      description: 'Cours et soutien',
    },
    {
      title: 'Transport',
      icon: '📦',
      screen: 'CategoryDetail',
      params: { category: { id: '5', name: 'Transport', icon: '📦' } },
      description: 'Livraison et déménagement',
    },
    {
      title: 'Beauté',
      icon: '💅',
      screen: 'CategoryDetail',
      params: { category: { id: '6', name: 'Beauté', icon: '💅' } },
      description: 'Soins et bien-être',
    },
  ];

  // ===================== HANDLER =====================
  const handlePress = (item) => {
    if (item.params) {
      navigation.navigate(item.screen, item.params);
    } else {
      navigation.navigate(item.screen);
    }
  };

  // ===================== UI =====================
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFBE0" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Menu</Text>
      </View>

      {/* MENU LIST */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => handlePress(item)}
          >
            <View style={styles.left}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>{item.icon}</Text>
              </View>

              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenuScreen;

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
    paddingVertical: 16,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FCDA05',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  backIcon: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222831',
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222831',
  },

  content: {
    padding: 16,
    paddingBottom: 30,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 20,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
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

  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222831',
  },

  description: {
    fontSize: 13,
    color: '#393E46',
    marginTop: 2,
  },

  arrow: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#393E46',
  },
});
