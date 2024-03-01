import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "react-native-paper";
import { router } from "expo-router";
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();
// Pre-step, call this before any NFC operations
NfcManager.start();

/* replace this data by element scanned from nfc manager */

const ScanScreen = () => {
  const [isScanned, setIsScanned] = useState(false);
  async function scanNfc() {
    try {
      setIsScanned(true);
      const isSupported = await NfcManager.isSupported();
      console.warn("Is supported: " + isSupported);
      const isEnabled = await NfcManager.isEnabled();
      console.warn("Is enabled: " + isEnabled);

      // register for the NFC tag with NDEF in it
      const foundTech = await NfcManager.requestTechnology([
        NfcTech.Ndef,
        NfcTech.NfcA,
        NfcTech.NfcB,
        NfcTech.NfcF,
        NfcTech.NfcV,
        NfcTech.IsoDep,
        NfcTech.MifareClassic,
        NfcTech.MifareUltralight,
        NfcTech.MifareIOS,
        NfcTech.Iso15693IOS,
        NfcTech.FelicaIOS,
        NfcTech.NdefFormatable,
      ]);
      console.warn("NfcTech : " + foundTech);
      // the resolved tag object will contain ndefMessage property
      const tag = await NfcManager.getTag();
      console.warn(
        "Ndefs payload :",
        String.fromCharCode.apply(null, tag.ndefMessage[0].payload)
      );
      console.warn(
        "Ndefs payload - Data extract :",
        String.fromCharCode
          .apply(null, tag.ndefMessage[0].payload.slice(5))
          .replaceAll("\u0000", "")
      );

      var dataScanned = String.fromCharCode
        .apply(null, tag.ndefMessage[0].payload.slice(5))
        .replaceAll("\u0000", "");
      console.log("Extracted product Id : " + dataScanned);
      return router.push({
        pathname: "/(tabs)/(scan)/product",
        params: { productId: dataScanned },
      });
    } catch (ex) {
      console.warn("Oops!", ex);
      setIsScanned(false);
      NfcManager.cancelTechnologyRequest();
    } finally {
      // stop the nfc scanning
      setIsScanned(false);
      NfcManager.cancelTechnologyRequest();
    }
  }

  return (
    <View style={styles.text}>
      <Image
        source={require("../../../assets/icon.png")}
        style={styles.image}
      />
      {!isScanned ? (
        <Text
          style={{
            justifyContent: "center",
            textAlign: "center",
            fontSize: 19,
            fontWeight: "bold",
          }}
        >
          Merci de scannez votre article, si il n'apparait pas c'est qu'il
          n'existe pas
        </Text>
      ) : (
        <Text
          style={{
            justifyContent: "center",
            textAlign: "center",
            fontSize: 19,
            fontWeight: "bold",
          }}
        >
          Prêt à scanner! Veuillez rapprocher votre mobile du produit...
        </Text>
      )}

      {!isScanned ? (
        <Button
          style={styles.btnScanned}
          onPress={() => scanNfc()}
          textColor="white"
        >
          Scannez le NFC
        </Button>
      ) : (
        <Button
          style={styles.cancelBtn}
          onPress={() => {
            setIsScanned(false);
            NfcManager.cancelTechnologyRequest();
          }}
          textColor="white"
        >
          Annulez
        </Button>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  btnScanned: {
    width: 180,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#a3b18a",
    bottom: -60,
  },
  cancelBtn: {
    width: 180,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "red",
    bottom: -60,
  },
  text: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 80,
    justifyContent: "flex-start",
    paddingTop: 95,
  },
  image: {
    marginEnd: 5,
    margin: 10,
    width: 500,
    height: 300,
    resizeMode: "contain",
  },
});

export default ScanScreen;
