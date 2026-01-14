import React, { useState } from 'react';
import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  StatusBar,
  SafeAreaView,
  Alert,
  Platform
} from 'react-native';

const AdminLoginScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    motdepasse: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.motdepasse) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return false;
    }
    
    return true;
  };

  const handleLogin = async () => {
    if (validateForm()) {
     const res = await api.post("/api/login-admin",formData)
     console.log("res",res.data)

    await AsyncStorage.setItem("token", res.data.token);
    await AsyncStorage.setItem("user", JSON.stringify(res.data.user));

      Alert.alert("Succès", res.data.message);
      navigation.navigate('Admin');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFBE0" />
        
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>👨‍💼</Text>
          </View>
          <Text style={styles.title}>Connexion Administrateur</Text>
          <Text style={styles.subtitle}>Accès au tableau de bord</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>Identifiants admin</Text>
            <View style={styles.formDivider} />
          </View>

          <View style={styles.labelContainer}>
            <Text style={styles.label}>Email administrateur</Text>
            <Text style={styles.required}>*</Text>
          </View>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            placeholder="admin@services.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />

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

          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Se connecter</Text>
          </TouchableOpacity>

          <View style={styles.demoInfo}>
            <Text style={styles.demoTitle}>Informations de démo:</Text>
            <Text style={styles.demoText}>Email: admin@services.com</Text>
            <Text style={styles.demoText}>Mot de passe: admin123</Text>
          </View>

          <View style={styles.backContainer}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>← Retour à l'accueil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBE0',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FCDA05',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  logo: {
    fontSize: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222831',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  form: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  formHeader: {
    marginBottom: 30,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222831',
    marginBottom: 10,
  },
  formDivider: {
    width: 60,
    height: 4,
    backgroundColor: '#FCDA05',
    borderRadius: 2,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#222831',
    fontWeight: '500',
  },
  required: {
    fontSize: 16,
    color: '#FCDA05',
    marginLeft: 4,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    color: '#222831',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#FCDA05',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222831',
  },
  demoInfo: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222831',
    marginBottom: 8,
  },
  demoText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 3,
  },
  backContainer: {
    alignItems: 'center',
  },
  backButton: {
    padding: 15,
  },
  backButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
});

export default AdminLoginScreen;
