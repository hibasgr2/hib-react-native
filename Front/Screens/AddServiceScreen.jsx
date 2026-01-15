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
    userId: route.params.userid,           // 🔥 ID unique
    nomComplet:route.params.usernom
  });

  const [demande,setDemande]= useState(false)

  

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
 

      //axios.post('http://192.168.11.105:3001/api/add-service/', serviceData).then(test => setapi(test.data))
       //api.post("/api/add-service", serviceData);
       const response = await api.post("/api/add-service", serviceData)
        console.log("Service créé:", response.data);
        Alert.alert("Succès", "Service ajouté avec succès");
        setDemande(true)
        Alert.alert("Succès", "Demande sera traite");
        

    } catch (error) {
      console.error('Erreur:', error);
      Alert.alert('Erreur', 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFBE0" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
           onPress={() => navigation.goBack()
            
          }
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
              <Text style={styles.label}>Prix (€) *</Text>
              <View style={styles.priceContainer}>
                <TextInput
                  style={[styles.input, styles.priceInput]}
                  placeholder="50"
                  value={serviceData.prix}
                  onChangeText={(text) => handleInputChange('prix', text)}
                  keyboardType="numeric"
                  editable={!loading}
                />
                <Text style={styles.currency}>€</Text>
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
          
        </ScrollView>): 
         <Text style={styles.headerTitle}>Mon Profil</Text>}

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
  imagesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  addImageText: {
    color: '#FCDA05',
    fontSize: 14,
    fontWeight: '600',
  },
  imageUrlContainer: {
    marginBottom: 10,
  },
  imageInput: {
    marginBottom: 0,
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
});

export default AddServiceScreen;