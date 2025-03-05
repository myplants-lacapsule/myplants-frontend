import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function AddLocationScreen() {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.value);
  const userToken = user.token;

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleUpdate = async () => {
    if (!street || !city || !postalCode) {
      Alert.alert(
        "Erreur",
        "Veuillez renseigner l'adresse, la ville et le code postal."
      );
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
        Alert.alert("Succès", "Localisation mise à jour.", [
          {
            text: "OK",
            onPress: () => navigation.navigate("NewItemScreen"),
          },
        ]);
      } else {
        Alert.alert("Erreur", result.error);
      }
    } catch (error) {
      console.error("Error updating location:", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de la mise à jour.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Adresse"
        value={street}
        onChangeText={setStreet}
        style={styles.input}
      />
      <TextInput
        placeholder="Code postal"
        value={postalCode}
        onChangeText={setPostalCode}
        style={styles.input}
      />
      <TextInput
        placeholder="Ville"
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />

      <Button title="Valider" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    padding: 10,
  },
});
