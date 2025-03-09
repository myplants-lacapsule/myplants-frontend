import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import RegisterInput from "../components/RegisterInput.js";
import RegisterButton from "../components/RegisterButton.js";

export default function AddLocationScreen() {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.value);
  const userToken = user.token;

  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

  const handleUpdate = async () => {
    if (!street || !city || !postalCode) {
      Alert.alert("Error", "Please enter address, city and zip code.");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/users/updateLocation`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: userToken,
            street,
            city,
            postalCode,
          }),
        }
      );
      const result = await response.json();
      if (result.result) {
        Alert.alert("Success", "Your address is updated", [
          {
            text: "OK",
            onPress: () => navigation.navigate("NewItemScreen"),
          },
        ]);
      } else {
        Alert.alert("Error", result.error);
      }
    } catch (error) {
      console.error("Error updating location:", error);
      Alert.alert("Error", "An error occurred during the update.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Please enter your address</Text>
      <View style={styles.registerContainer}>
        <RegisterInput
          placeholder="Address"
          value={street}
          onChangeText={setStreet}
        />
        <RegisterInput
          placeholder="ZIP code"
          value={postalCode}
          onChangeText={setPostalCode}
        />
        <RegisterInput placeholder="City" value={city} onChangeText={setCity} />

        <RegisterButton title="Submit" onPress={handleUpdate} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F0E9",
    alignItems: "center",
    justifyContent: "center",
  },
  registerContainer: {
    width: "80%",
  },
  title: {
    color: "#2D5334",
    fontSize: 18,
    fontFamily: "OpenSans-Regular",
    paddingBottom: 10,
  },
});
