import { Stack, router } from "expo-router";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { supabase } from "../../lib/supabase-client";
import { useEffect, useState } from "react";
import { Avatar, Button, List, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function Profil() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
      } else {
        Alert.alert("Error Accessing User");
      }
    });
  }, []);

  const doLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error Signing Out User", error.message);
    } else {
      console.log("user logged out");
      router.push("/(auth)/login");
    }
  };

  return (
    <View style={styles.container}>
      <Avatar.Text
        size={130}
        label={"S.S"}
        style={styles.avatar}
        labelStyle={styles.titleItem}
      />
      <Text style={styles.textCenter}>
        {user ? user.email : "Nom de l'utilisateur"}
      </Text>
      <View style={styles.draw} />
      <View style={{ alignSelf: "center", marginTop: 40 }}>
        <List.Item
          title="Modifier mes informations"
          titleStyle={styles.titleItem}
          left={(props) => (
            <List.Icon {...props} icon="file-cog-outline" color={"#a3b18a"} />
          )}
          right={(props) => <List.Icon {...props} icon="arrow-right" />}
          style={styles.listItem}
          onPress={() => router.push("/(auth)/update-user")}
        />
        <List.Item
          title="Modifier mon mot de passe"
          titleStyle={styles.titleItem}
          left={(props) => (
            <List.Icon {...props} icon="account-cog" color={"#a3b18a"} />
          )}
          right={(props) => <List.Icon {...props} icon="arrow-right" />}
          style={styles.listItem}
          onPress={() => router.push("/user/update-password")}
        />
        <List.Item
          title="Confidentalité et sécurité"
          titleStyle={styles.titleItem}
          left={(props) => (
            <List.Icon
              {...props}
              icon="account-lock-outline"
              color={"#a3b18a"}
            />
          )}
          right={(props) => <List.Icon {...props} icon="arrow-right" />}
          style={styles.listItem}
          onPress={() => router.push("/(auth)/delete-user")}
        />
      </View>
      <View style={styles.blockBottom}>
        <Button
          icon="logout"
          style={styles.logout}
          mode="contained"
          labelStyle={{ fontSize: 17 }}
          onPress={doLogout}
        >
          Se déconnecter
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blockBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 10,
    alignItems: "center",
  },
  draw: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
    marginTop: 30,
    width: "50%",
    alignSelf: "center",
    marginBottom: 10,
  },
  textCenter: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#a3b18a",
    fontSize: 30,
  },
  avatar: {
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 10,
    backgroundColor: "#dad7cd",
  },
  listItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 200,
    width: "90%",
    alignSelf: "center",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15.0,
    marginTop: 25,
    elevation: 24,
  },
  titleItem: {},
  logout: {
    width: 200,
    borderWidth: 2,
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 80,
    backgroundColor: "#a3b18a",
  },
});
