/* import React, { useState } from "react";
import { Alert, StyleSheet, TextInput, View, Text, TouchableOpacity,Image,} from "react-native";
import { supabase } from "../lib/supabase-client";
import { Stack } from "expo-router";
import {Button} from 'react-native-paper'



async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert("Sign Up Error", error.message);
    setLoading(false);
  }

 
  


  <TouchableOpacity style={styles.button}>
  <TouchableOpacity
      disabled={loading}
      onPress={() => signUpWithEmail()}
      style={styles.buttonContainer}
    >
      <Text style={styles.buttonText}>Crée un compte</Text>
    </TouchableOpacity>
  </TouchableOpacity> 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#DEFDE0',
      
    },
    icon: {
      width: 300,
      height: 250,
      marginBottom: 30,
    },
    input: {
      width: '80%',
      padding: 15,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      backgroundColor: '#fff',
    },
    button: {
      width: '80%',
      padding: 15,
      backgroundColor: '#28A745',
      alignItems: 'center',
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    recoverPassword: {
      marginVertical: 20,
      color: '#000',
    },
    loginText: {
      color: '#000',
    },
  });*/