// Screens/AddServiceScreen.jsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

import api from "../api";

const AddServiceScreen = ({ navigation, route }) => {
  const [serviceData, setServiceData] = useState({
    titre: '',
    description: '',
    categorie: '',
    prix: '',
    localisation: route.params.userloca,
    imageUrls: [],
    statut: false,
    userId: route.params.userid,          
    nomComplet:route.params.usernom
  });

  const [demande, setDemande] = useState(false);
  const [loading, setLoading] = useState(false);

  const categories = ['Réparation et d\'Entretien', 
    'Soins de la Personne',
    'Restauration et d\'Alimentation',
    'Conduite et de Livraison', 
    'Nettoyage et d\'Hygiène',
    'Garde et de Surveillance', 
    'Commerce et de Vente', 
    'Artisanaux et de Création', 
    'Santé de Base', 
    "Loisirs et d'Accueil"];
  
  const handleInputChange = (field, value) => {
    setServiceData({
      ...serviceData,
      [field]: value
    });
  };

  const handleAddImageUrl = () => {
    if (serviceData.imageUrls.length < 3) {
      setServiceData({
        ...serviceData,
        imageUrls: [...serviceData.imageUrls, '']
      });
    }
  };

  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...serviceData.imageUrls];
    newImageUrls[index] = value;
    setServiceData({
      ...serviceData,
      imageUrls: newImageUrls
    });
  };

  const validateForm = () => {
    const errors = [];
    
    if (!serviceData.titre.trim()) {
      errors.push('Veuillez saisir un titre');
    }
    if (!serviceData.description.trim()) {
      errors.push('Veuillez saisir une description');
    }
    if (!serviceData.categorie) {
      errors.push('Veuillez sélectionner une catégorie');
    }
    if (!serviceData.prix || isNaN(parseFloat(serviceData.prix))) {
      errors.push('Veuillez saisir un prix valide');
    }

    if (errors.length > 0) {
      Alert.alert('Erreur de validation', errors.join('\n'));
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await api.post("/api/add-service", serviceData);
      console.log("Service créé:", response.data);
      Alert.alert("Succès", "Service ajouté avec succès");
      setDemande(true);
    } catch (error) {
      console.error('Erreur:', error);
      Alert.alert('Erreur', 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFBE0" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajouter un Service</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        {!demande ? (
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Formulaire */}
            <View style={styles.formContainer}>
              {/* Titre */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Titre du service *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Nettoyage complet"
                  value={serviceData.titre}
                  onChangeText={(text) => handleInputChange('titre', text)}
                  editable={!loading}
                />
              </View>

              {/* Catégorie */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Catégorie *</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
                  <View style={styles.categoriesContainer}>
                    {categories.map((category) => (
                      <TouchableOpacity
                        key={category}
                        style={[
                          styles.categoryButton,
                          serviceData.categorie === category && styles.categoryButtonSelected
                        ]}
                        onPress={() => handleInputChange('categorie', category)}
                        disabled={loading}
                      >
                        <Text style={[
                          styles.categoryText,
                          serviceData.categorie === category && styles.categoryTextSelected
                        ]}>
                          {category}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>

              {/* Description */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Description *</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Décrivez votre service en détails..."
                  value={serviceData.description}
                  onChangeText={(text) => handleInputChange('description', text)}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  editable={!loading}
                />
              </View>

              {/* Prix */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Prix (DH) *</Text>
                <View style={styles.priceContainer}>
                  <TextInput
                    style={[styles.input, styles.priceInput]}
                    placeholder="50"
                    value={serviceData.prix}
                    onChangeText={(text) => handleInputChange('prix', text)}
                    keyboardType="numeric"
                    editable={!loading}
                  />
                  <Text style={styles.currency}>DH</Text>
                </View>
              </View>

              {/* Bouton de soumission */}
              <TouchableOpacity 
                style={[styles.submitButton, loading && styles.submitButtonDisabled]}
                onPress={handleSubmit}
                disabled={loading}
              >
                <Text style={styles.submitButtonText}>
                  {loading ? 'En cours...' : 'Publier le Service'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <View style={styles.successContainer}>
            {/* Icône de succès */}
            <View style={styles.successIconContainer}>
              <View style={styles.successIconCircle}>
                <Text style={styles.successIcon}>✓</Text>
              </View>
            </View>

            {/* Titre principal */}
            <Text style={styles.successTitle}>Demande Enregistrée !</Text>

            {/* Message de confirmation */}
            <View style={styles.messageContainer}>
              <Text style={styles.successMessage}>
                Votre service a été soumis avec succès et sera examiné par notre équipe.
              </Text>
              <Text style={styles.successSubMessage}>
                Vous recevrez une notification une fois votre demande approuvée.
              </Text>
            </View>

            {/* Détails de la demande */}
            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Titre :</Text>
                <Text style={styles.detailValue}>{serviceData.titre}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Catégorie :</Text>
                <Text style={styles.detailValue}>{serviceData.categorie}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Prix :</Text>
                <Text style={styles.detailValue}>{serviceData.prix} DH</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Statut :</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>En attente de validation</Text>
                </View>
              </View>
            </View>

            {/* Bouton de retour */}
            <TouchableOpacity 
              style={styles.homeButton}
              onPress={handleBackToHome}
            >
              <Text style={styles.homeButtonText}>Retour à l'accueil</Text>
            </TouchableOpacity>

            {/* Note informative */}
            <View style={styles.infoBox}>
              <Text style={styles.infoIcon}>ℹ️</Text>
              <Text style={styles.infoText}>
                Temps de traitement estimé : 24-48 heures
              </Text>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  keyboardAvoid: {
    flex: 1,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  formContainer: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  formGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222831',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  textArea: {
    height: 120,
  },
  categoriesScroll: {
    marginHorizontal: -5,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  categoryButtonSelected: {
    backgroundColor: '#FCDA05',
    borderColor: '#FCDA05',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  categoryTextSelected: {
    color: '#222831',
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceInput: {
    flex: 1,
    marginRight: 10,
  },
  currency: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222831',
  },
  submitButton: {
    backgroundColor: '#FCDA05',
    borderRadius: 15,
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222831',
  },
  // Styles pour la section de succès
  successContainer: {
    flex: 1,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIconContainer: {
    marginBottom: 25,
  },
  successIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  successIcon: {
    fontSize: 50,
    color: 'white',
    fontWeight: 'bold',
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222831',
    marginBottom: 20,
    textAlign: 'center',
  },
  messageContainer: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  successMessage: {
    fontSize: 18,
    color: '#222831',
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 24,
  },
  successSubMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  detailsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    color: '#222831',
    fontWeight: '500',
  },
  statusBadge: {
    backgroundColor: '#FFF3CD',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#856404',
    fontSize: 14,
    fontWeight: '600',
  },
  homeButton: {
    backgroundColor: '#FCDA05',
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 40,
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  homeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222831',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F4FD',
    padding: 15,
    borderRadius: 12,
    width: '100%',
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#0C5460',
    flex: 1,
  },
});

export default AddServiceScreen;