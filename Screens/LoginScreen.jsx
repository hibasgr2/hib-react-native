// import axios from 'axios';
import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';

const LoginScreen = ({ navigation }) => {
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
  
    if (!validateForm()) return;

    //console.log("Form data:", formData);
    try {
        //const res = await axios.post("http://192.168.11.102:3001/api/login-user", formData);
        const res = await api.post("/api/login-user",formData)
        //console.log("res:", res.data);
    
   
        //const res = await api.post("/api/login-user",formData)

    Alert.alert("Succès", res.data.message);

    await AsyncStorage.setItem("token", res.data.token);
    await AsyncStorage.setItem("user", JSON.stringify(res.data.user));

    Alert.alert("Succes",res.data.message);

    navigation.replace("ClientHome");
} catch (err) {
        console.log("Erreur:", err.message);
    }
  
  }



  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFBE0" />
      
      <View style={styles.header}>
        <View style={styles.adminContainer}>
          <TouchableOpacity 
            style={styles.adminButton} 
            onPress={() => navigation.navigate('AdminLogin')}
          >
            <Text style={styles.adminButtonText}>👨‍💼 Accès Administrateur</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.loginContainer}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>🔐</Text>
          </View>
        </View>
        <Text style={styles.title}>Connexion</Text>
        <Text style={styles.subtitle}>Bienvenue de retour</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.formHeader}>
          <Text style={styles.formTitle}>Accéder à votre compte</Text>
          <View style={styles.formDivider} />
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

        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPassword}>Mot de passe oublié?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Se connecter</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Pas encore de compte ?</Text>
          <TouchableOpacity 
            style={styles.signupButton} 
            onPress={() => navigation?.navigate('CreateAccount')}
          >
            <Text style={styles.signupButtonText}>Créer un compte</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBE0',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
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
    fontSize: 32,
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
    shadowColor: '#222831',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 25,
  },
  forgotPassword: {
    color: '#FCDA05',
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
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
  loginButtonText: {
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
  signupContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  signupText: {
    color: '#393E46',
    fontSize: 16,
    marginBottom: 12,
  },
  signupButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderWidth: 2,
    borderColor: '#FCDA05',
  },
  signupButtonText: {
    color: '#222831',
    fontSize: 16,
    fontWeight: '600',
  },
  adminContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  adminButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#222831',
  },
  adminButtonText: {
    color: '#222831',
    fontSize: 14,
    fontWeight: '600',
  },
  loginContainer: {
    alignItems: 'center',
  },
});

export default LoginScreen;
