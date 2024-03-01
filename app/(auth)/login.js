import React, { useState } from "react";
import { Alert, StyleSheet, TextInput, View, Text, TouchableOpacity,Image,} from "react-native";
import { supabase } from "../../lib/supabase-client";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from "expo-router";
import { router } from "expo-router";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
//se connecter
  async function signInWithEmail() {
    setLoading(true);
    const { user, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert("Sign In Error", error.message);
      setLoading(false);
      return;
    }
    // Stocker l'ID de l'utilisateur dans le stockage local
    await AsyncStorage.setItem('userId', user.id);
    console.log('User ID:', user.id);
    setLoading(false);
  }
  
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/icon.png')} style={styles.icon} />
      <TextInput 
        placeholder="Votre Email"
        placeholderTextColor="#adb5bd" 
         style={styles.input}
         label="Email"
         onChangeText={(text) => setEmail(text)}
         value={email}
         autoCapitalize={"none"} />
      <TextInput   style={styles.input}
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Votre mot de passe"
          placeholderTextColor="#adb5bd"
          autoCapitalize={"none"}/>
      <View style={styles.connection}>
      <TouchableOpacity
          disabled={loading}
          onPress={() => signInWithEmail()}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.loginText}>Vous ne disposez pas </Text>
      <Text style={styles.loginText}>encore d’un compte ?  </Text>
      <TouchableOpacity style={styles.subtextAccount} onPress={() => router.push('/(auth)/signup')}>
        <Text style={{textDecorationLine: 'underline'}}>Créez un compte en cliquant ici </Text>
      </TouchableOpacity>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7e1d7',
  },
  icon: {
    width: 300,
    height: 250,
    marginBottom: 50,
  },
  input: {
   width: '75%',  
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#e5e5e5',
    marginTop: 10,
    marginBottom: 10,
    
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#ADADAD',
    margin: 2,
  },
  subtextAccount: {
    marginTop: 30,
  },
  connection: {
    width: 200,
    borderWidth: 0,
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: '#a3b18a',
    marginTop: 40,

  },
});