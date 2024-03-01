import React, { useState, useEffect } from "react";
import { Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../../../components/Themed";
import productSave from "../../../data/productSave.json";
import { Avatar, Button, Card, List } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { router } from "expo-router";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../../lib/supabase-client";

export default function HistoryScreen() {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      loadHistory(session.user);
    });
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  async function loadHistory(currentUser) {
    try {
      console.log("Loading history for user: ", JSON.stringify(currentUser));
      setLoading(true);
      var { data, error, status } = await supabase
        .from("History")
        .select(
          `"history_id",
          "user_id",
          "created_at",
          Shoes(*)`
        )
        .eq("user_id", currentUser.id);
      if (error && status !== 406) {
        throw error;
      }

      console.log("data : " + JSON.stringify(data));
      console.log("Error : " + JSON.stringify(error));
      if (data && data.length > 0) {
        setHistory(data);
        setLoading(false);
      } else {
        setHistory(null);
        setLoading(false);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des chaussures:",
        error.message
      );
      setHistory(null);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function displayProduct(productToDisplay) {
    return router.push({
      pathname: "/(tabs)/(history)/product",
      params: { productId: productToDisplay },
    });
  }

  async function deleteHistory(historyId) {
    const { error } = await supabase
      .from("History")
      .delete()
      .eq("history_id", historyId);

    supabase.auth.getSession().then(({ data: { session } }) => {
      loadHistory(session.user);
    });
  }

  if (history == null || history.length == 0) {
    return (
      <Text
        style={{
          justifyContent: "center",
          textAlign: "center",
          marginTop: 300,
          fontSize: 30,
        }}
      >
        La liste des favoris est vide. Vous pouvez ajouter des nouveaux produits
        à vos favoris après le scan ...
      </Text>
    );
  }

  if (history != null && history.length > 0) {
    return (
      <View style={styles.container}>
        <FlatList
          data={history}
          keyExtractor={(item) => item.history_id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            var productImage = supabase.storage
              .from("images")
              .getPublicUrl(item.Shoes.image_1);
            var imageSource = { uri: productImage.data.publicUrl };
            console.log("Image source: " + imageSource);
            return (
              <TouchableOpacity
                onPress={() => displayProduct(item.Shoes.serial_number)}
              >
                <Card style={styles.containerCard}>
                  <View style={{ flexDirection: "row" }}>
                    <Card.Cover
                      source={imageSource}
                      style={{
                        width: 150,
                        height: 150,
                        alignSelf: "left",
                        borderRadius: 0,
                        marginTop: 20,
                        marginBottom: 20,
                        marginLeft: 15,
                      }}
                    />
                    <View
                      style={{
                        flex: 1,
                        marginLeft: 20,
                        justifyContent: "center",
                      }}
                    >
                      <Card.Content>
                        <Text
                          style={{ color: "#494949", fontWeight: "bold" }}
                          variant="titleLarge"
                        >
                          {item.Shoes.title}
                        </Text>
                        <Text
                          style={{
                            color: "#494949",
                            marginTop: 20,
                            fontWeight: "bold",
                          }}
                          variant="titleLarge"
                        >
                          Crée le :{" "}
                          <Text
                            style={{ color: "#494949", fontWeight: "normal" }}
                          >
                            {formatDate(item.created_at)}
                          </Text>
                        </Text>
                      </Card.Content>
                      <Card.Actions>
                        <Button
                          style={styles.btns}
                          onPress={() => deleteHistory(item.history_id)}
                        >
                          <Icon name="trash" size={22} color="#bf0603" />
                        </Button>
                      </Card.Actions>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#dad7cd",
  },
  title: {
    fontSize: 10,
    fontWeight: "bold",
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 50 / 3,
  },

  containerCard: {
    marginBottom: 7,
    alignContent: "center",
    margin: 10,
  },
  grandTitre: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#8215A8",
  },

  btns: {
    backgroundColor: "#dad7cd",
    borderWidth: 1,
    borderColor: "transparent",
    marginEnd: 5,
    borderRadius: 50,
    marginTop: 20,
    marginRight: 45,
  },
});
