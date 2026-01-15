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

  const accueil = [
    { name: 'Accueil', icon: '🏠' },
  ];

  // ✅ Catégories (backend / logique métier)
  const categories = [
    { name: "Réparation et d'Entretien", icon: '🔧' },
    { name: 'Soins de la Personne', icon: '💆' },
    { name: "Restauration et d'Alimentation", icon: '🍽️' },
    { name: 'Conduite et de Livraison', icon: '🚚' },
    { name: "Nettoyage et d'Hygiène", icon: '🧹' },
    { name: 'Garde et de Surveillance', icon: '🛡️' },
    { name: 'Commerce et de Vente', icon: '🛒' },
    { name: "Loisirs et d'Accueil", icon: '🎉' },
    { name: 'Santé de Base', icon: '🩺' },
    { name: 'Artisanaux et de Création', icon: '🎨' },
  ];

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

        <Text style={styles.headerTitle}>Menu</Text>
      </View>

      {/* MENU LIST */}
      <ScrollView contentContainerStyle={styles.content}>
        {accueil.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate('ClientHome')}
          >
            <View style={styles.left}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>{item.icon}</Text>
              </View>

              <View>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.description}>Page d'Acceuil</Text>
              </View>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}

        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() =>
              navigation.navigate('CategoryDetail', {
                categoryName: item.name,
              })

            }
          >
            <View style={styles.left}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>{item.icon}</Text>
              </View>

              <View>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.description}>
                  Voir les services disponibles
                </Text>
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

/* 🔒 STYLES IDENTIQUES (inchangés) */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBE0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
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
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 20,
    marginBottom: 14,
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
  },
  description: {
    fontSize: 13,
    color: '#393E46',
  },
  arrow: {
    fontSize: 26,
    fontWeight: 'bold',
  },
});