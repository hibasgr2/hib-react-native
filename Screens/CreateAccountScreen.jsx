import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import api from "../api";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

const CreateAccountScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    nomComplet: '',
    email: '',
    telephone: '',
    motdepasse: '',
    localisation: '',
    CIN:''
  });
const [open, setOpen] = useState(false);
const [selectedId, setSelectedId] = useState(null); 
const [villes, setVilles] = useState([]);

// useEffect(() => {
//   axios.get("http://192.168.11.102:3000/api/villes")
//     .then(res => {
//       // Transformer les données pour le dropdown
//       const villesFormatted = res.data.map(ville => ({
//         label: ville.nom, // Remplacez par le champ approprié
//         value: ville.id, // Remplacez par l'identifiant
//       }));
//       setVilles(villesFormatted);
//       console.log(villes)
//     })
//     .catch(error => console.error('Erreur chargement villes:', error));
// }, []);

  useEffect(() => {
    const fetchVilles = async () => {
      try {
        const res = await axios.get("http://192.168.11.102:3001/api/villes");
        
       
        const formatted =  res.data.map((v) => ({
          label: v.ville,
          value: v.id,
          
        }));
       
        setVilles(formatted);
      

      } catch (err) {
        console.log("Erreur chargement villes", err.message);
      }
    };

    fetchVilles();
  }, []);


  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    
    if (!formData.nomComplet || !formData.email || !formData.motdepasse || !formData.localisation || !formData.CIN || !formData.telephone) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return false;
    }
    console.log("ville",formData.localisation)
   
    if (formData.motdepasse.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }
    return true;
  };

  const handleCreateAccount = () => {
    if (validateForm()) {
      console.log(formData)
       api.post('/api/signup-client/',formData).then(test =>{
        Alert.alert('Succès', 'Compte créé avec succès!');
        navigation.replace("Login")
              console.log('Account data:', formData);
       })
    }
  };



  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFBE0" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>👤</Text>
          </View>
          <Text style={styles.title}>Création de Compte</Text>
          <Text style={styles.subtitle}>Rejoignez notre communauté</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>Informations personnelles</Text>
            <View style={styles.formDivider} />
          </View>

          <View style={styles.inputRow}>
            <View style={styles.halfInput}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Nom Complet</Text>
                <Text style={styles.required}>*</Text>
              </View>
              <TextInput
                style={styles.input}
                value={formData.nomComplet}
                onChangeText={(value) => handleInputChange('nomComplet', value)}
                placeholder="Nom Complet"
                placeholderTextColor="#999"
              />
            </View>
            
          </View>

          <View style={styles.labelContainer}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.required}>*</Text>
          </View>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            placeholder="votre@email.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Téléphone</Text>
          <TextInput
            style={styles.input}
            value={formData.telephone}
            onChangeText={(value) => handleInputChange('telephone', value)}
            placeholder="+33 6 12 34 56 78"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />

           <Text style={styles.label}>CIN</Text>
          <TextInput
            style={styles.input}
            value={formData.CIN}
            onChangeText={(value) => handleInputChange('CIN', value)}
            placeholder="Votre CIN"
            placeholderTextColor="#999"
          />

          <View style={styles.labelContainer}>
            <Text style={styles.label}>Localisation</Text>
            <Text style={styles.required}>*</Text>
          </View>
          {/* <TextInput
            style={styles.input}
            value={formData.localisation}
            onChangeText={(value) => handleInputChange('localisation', value)}
            placeholder="Localisation"
            placeholderTextColor="#999"
          /> */}

         {/* <DropDownPicker
          open={open}
          value={formData.localisation} 
          items={villes}
          setOpen={setOpen}
          setValue={(callback) => {
            const selectedLabel = callback(formData.localisation);
            handleInputChange("localisation", selectedLabel);
          }}
          setItems={setVilles}
          placeholder="Choisir une ville"
          searchable
          listMode="MODAL"
        /> */}
        <DropDownPicker
        open={open}
        value={selectedId}  // id sélectionné (pour le bouton)
        items={villes}
        setOpen={setOpen}
        setValue={(fn) => {
          
          const newId = fn(selectedId);
           
          setSelectedId(newId);
          
          
          const villeNom = villes.find((v) => v.value === newId)?.label || "";
          
          handleInputChange("localisation", villeNom);
        }}
        setItems={setVilles}
        placeholder="Choisir une ville"
        searchable
        listMode="MODAL"
      />

          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>Sécurité du compte</Text>
            <View style={styles.formDivider} />
          </View>

          <View style={styles.labelContainer}>
            <Text style={styles.label}>Mot de passe</Text>
            <Text style={styles.required}>*</Text>
          </View>
          <TextInput
            style={styles.input}
            value={formData.motdepasse}
            onChangeText={(value) => handleInputChange('motdepasse', value)}
            placeholder="••••••••"
            placeholderTextColor="#999"
            secureTextEntry
          />
           <Text style={styles.passwordHint}>Le mot de passe doit contenir au moins 6 caractères</Text>


        
          <TouchableOpacity 
            style={styles.createButton} 
            onPress={handleCreateAccount}
            activeOpacity={0.9}
          >
            <Text style={styles.createButtonText} >Créer mon compte</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Vous avez déjà un compte ?</Text>
            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={() => navigation?.navigate('Login')}
            >
              <Text style={styles.loginButtonText}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBE0',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
    backgroundColor: '#FFFBE0',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FCDA05',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#222831',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  logo: {
    fontSize: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222831',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#393E46',
    opacity: 0.8,
  },
  form: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 40,
    shadowColor: '#222831',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  formHeader: {
    marginBottom: 25,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222831',
    marginBottom: 10,
  },
  formDivider: {
    height: 3,
    width: 40,
    backgroundColor: '#FCDA05',
    borderRadius: 2,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  halfInput: {
    width: '48%',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222831',
  },
  required: {
    color: '#FCDA05',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#FFFBE0',
    borderWidth: 2,
    borderColor: '#FFFBE0',
    borderRadius: 15,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 16,
    color: '#222831',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  passwordHint: {
    fontSize: 13,
    color: '#393E46',
    opacity: 0.7,
    marginTop: -15,
    marginBottom: 25,
    fontStyle: 'italic',
  },
  createButton: {
    backgroundColor: '#FCDA05',
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
    shadowColor: '#222831',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#FCDA05',
  },
  createButtonText: {
    color: '#222831',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#FFFBE0',
  },
  dividerText: {
    color: '#393E46',
    marginHorizontal: 15,
    fontSize: 14,
    opacity: 0.7,
  },
  loginContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    color: '#393E46',
    fontSize: 16,
    marginBottom: 12,
  },
  loginButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderWidth: 2,
    borderColor: '#FCDA05',
  },
  loginButtonText: {
    color: '#222831',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreateAccountScreen;

