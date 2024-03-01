import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { supabase } from '../../lib/supabase-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UpdateUser() {
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  async function handleChangeEmail(newEmail){
    try {
      const userId = await AsyncStorage.getItem('userId');
            if (!userId) {
                throw new Error('Aucun utilisateur connecté.');
            }


      const { error } = await supabase.from('users').update({ email: newEmail }).eq('id', userId);
  
      if (error){
        throw error;
      }
  
      setSuccessMessage('Adresse e-mail mise à jour avec succès.');
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier votre Adresse E-mail</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      {successMessage && <Text style={styles.success}>{successMessage}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Nouvelle adresse e-mail"
        value={newEmail}
        onChangeText={(text) => setNewEmail(text)}
      />
      <Button title="Enregistrer" onPress={handleChangeEmail} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '80%',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  success: {
    color: 'green',
    marginBottom: 10,
  },
});