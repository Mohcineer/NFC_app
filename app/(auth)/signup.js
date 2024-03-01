import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { supabase } from "../../lib/supabase-client";
import { showMessage } from "react-native-flash-message";
import { router } from "expo-router";

export default function RegisterScreen() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert("Sign Up Error", error.message);
    if (!error) {
      showMessage({
        message: "Inscription réussie",
        description:
          "Vous avez reçu un email, veuillez le confirmez et vous connecter",
        duration: 3000,
        type: "success",
      });
      router.push("/(auth)/login");
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Votre Email"
        placeholderTextColor="#adb5bd"
        style={styles.input}
        label="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        autoCapitalize={"none"}
      />
      <TextInput
        style={styles.input}
        label="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="Votre mot de passe"
        placeholderTextColor="#adb5bd"
        autoCapitalize={"none"}
      />

      <TouchableOpacity style={styles.button} onPress={() => signUpWithEmail()}>
        <TouchableOpacity disabled={loading} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Crée un compte</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <View style={{ position: "absolute", bottom: 0, marginBottom: 50 }}>
        <Text style={styles.loginText}>Vous dispoez d'un compte ? </Text>
        <TouchableOpacity
          style={styles.subtextAccount}
          onPress={() => router.push("/(auth)/login")}
        >
          <Text style={{ textDecorationLine: "underline" }}>
            Connectez-vous en cliquant ici
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DEFDE0",
  },
  icon: {
    width: 300,
    height: 250,
    marginBottom: 30,
  },
  input: {
    width: "80%",
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  button: {
    width: "80%",
    padding: 15,
    backgroundColor: "#28A745",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  recoverPassword: {
    marginVertical: 20,
    color: "#000",
  },
  loginText: {
    color: "#000",
  },
});
