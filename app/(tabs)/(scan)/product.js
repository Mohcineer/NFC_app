import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../../lib/supabase-client";
import { useLocalSearchParams, useGlobalSearchParams } from "expo-router";
import { showMessage } from "react-native-flash-message";
import Carousel from "react-native-snap-carousel";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";

export default ProductDetail = () => {
  const global = useGlobalSearchParams();
  console.log("Global params: " + JSON.stringify(global));
  const local = useLocalSearchParams();
  console.log("Local params: " + JSON.stringify(local));

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session.user);
    });
    loadProduct();
  }, []);

  async function loadProduct() {
    try {
      setLoading(true);
      console.log("Product ID : ---" + global.productId + "---");
      var { data, error, status } = await supabase
        .from("Shoes")
        .select("*")
        .eq("serial_number", global.productId);
      if (error && status !== 406) {
        throw error;
      }

      console.log("data : " + JSON.stringify(data));
      console.log("Error : " + JSON.stringify(error));
      if (data && data.length > 0) {
        setProduct(data[0]);
        await loadProductImages(data[0]);
        setLoading(false);
      } else {
        setProduct(null);
        setProductImages([]);
        setLoading(false);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des chaussures:",
        error.message
      );
      setProduct(null);
      setProductImages([]);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  async function loadProductImages(product) {
    var image1 = supabase.storage.from("images").getPublicUrl(product.image_1);
    console.log("Image 1: " + image1.data.publicUrl);
    var image2 = supabase.storage.from("images").getPublicUrl(product.image_2);
    console.log("Image 2: " + image2.data.publicUrl);
    var image3 = supabase.storage.from("images").getPublicUrl(product.image_3);
    console.log("Image 3: " + image3.data.publicUrl);
    var image4 = supabase.storage.from("images").getPublicUrl(product.image_4);
    console.log("Image 4: " + image4.data.publicUrl);
    setProductImages([
      image1.data.publicUrl,
      image2.data.publicUrl,
      image3.data.publicUrl,
      image4.data.publicUrl,
    ]);
  }

  function ImagesCarousel() {
    if (productImages.length > 0) {
      return (
        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          data={productImages}
          renderItem={_renderImage}
          callbackOffsetMarginsliderWidth={300}
          sliderWidth={400}
          itemWidth={400}
        />
      );
    }
    return (
      <Text
        style={{
          justifyContent: "center",
          textAlign: "center",
          marginTop: 300,
          fontSize: 30,
        }}
      >
        Chargement des images en cours ...
      </Text>
    );
  }

  _renderImage = ({ item, index }) => {
    const imageSource = { uri: item };
    console.log("ImageSource: " + JSON.stringify(imageSource));
    return (
      <Image style={{ width: 400, height: 400 }} source={imageSource}></Image>
    );
  };

  const saveHistory = async () => {
    try {
      const { data, error } = await supabase.from("History").insert({
        shoes_id: product.shoes_id,
        user_id: user.id,
      });
      if (error) {
        showMessage({
          message: "Erreur avec le produit enregistrés",
          duration: 3000,
          type: "danger",
        });
      } else {
        showMessage({
          message: "Produit enregistré avec succès",
          description: "Il est désormais disponible dans la page d'acceuil",
          duration: 3000,
          type: "success",
        });
        setButtonScanned(false);
      }
    } catch (err) {
      console.log("Erreur lors de l'enregistrement", erreur);
    }
  };
  if (loading) {
    return (
      <Text
        style={{
          justifyContent: "center",
          textAlign: "center",
          marginTop: 360,
          fontSize: 31,
        }}
      >
        Chargement ...
      </Text>
    );
  } else {
    if (product == null && !loading) {
      return (
        <Text
          style={{
            justifyContent: "center",
            textAlign: "center",
            marginTop: 360,
            fontSize: 31,
          }}
        >
          Produit non reconnu ...
        </Text>
      );
    }
    if (product != null && !loading) {
      return (
        <View style={styles.container}>
          <ScrollView>
            <View style={{ alignItems: "center", marginHorizontal: 30 }}>
              <ImagesCarousel></ImagesCarousel>
              <Text style={styles.name}>{product.title}</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>
            <View style={styles.addToCarContainer}>
              <Button
                style={styles.shareButton}
                onPress={() => router.replace("(scan)")}
              >
                <Text style={styles.shareButtonText}>Retour</Text>
              </Button>
              <Button style={styles.shareButton} onPress={() => saveHistory()}>
                <Text style={styles.shareButtonText}>Enregistrer</Text>
              </Button>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  productImg: {
    width: 200,
    height: 200,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "bold",
  },
  description: {
    color: "#696969",
  },
  contentSize: {
    justifyContent: "center",
    marginHorizontal: 30,
    flexDirection: "row",
    marginTop: 20,
  },

  shareButton: {
    width: 200,
    borderWidth: 2,
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 80,
    backgroundColor: "#a3b18a",
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  addToCarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
});
