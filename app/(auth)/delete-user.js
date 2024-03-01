import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { supabase } from '../../lib/supabase-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DeleteUser() {
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function deleteaccount(){
        setIsLoading(true);
        try {
            const userId = await AsyncStorage.getItem('userId');
            console.log('User ID:', userId);
            if (!userId) {
                throw new Error('Aucun utilisateur connecté.');
            }
            
            
            const { error } = await supabase.from('users').delete().eq('id', userId);
    
            if (error){
                throw new Error('Erreur de suppression.');
            }
            await AsyncStorage.removeItem('userId');
            setSuccessMessage('Compte supprimé');
        } catch (error) {
            setError(error.message);
        }finally {
            setIsLoading(false);
          }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vous souhaitez supprimer votre compte ?</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      {successMessage && <Text style={styles.success}>{successMessage}</Text>}
      <Button title="Supprimer mon compte" onPress={deleteaccount} disabled={isLoading} />
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