import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Text,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Switch,
} from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import RegisterButton from "../components/RegisterButton.js";
import RegisterInput from "../components/RegisterInput.js";
import ReturnButton from "../components/ReturnButton.js";
import CustomButton from "../components/CustomButton.js";

import * as ImagePicker from "expo-image-picker";

export default function NewItemScreen() {
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [height, setHeight] = useState("");
  const [isGiven, setIsGiven] = useState(false);
  const [isPlant, setIsPlant] = useState(false);
  const [condition, setCondition] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = useSelector((state) => state.user.value);
  const userToken = user.token;

  useEffect(() => {}, [imageUri]);

  // Fonction pour prendre une photo avec la caméra
  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("You must authorize access to the camera to take a picture.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.3,
    });
    console.log("Result from ImagePicker:", result);
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Fonction pour envoyer les données du formulaire
  const handleSubmit = async () => {
    if (isSubmitting) return; // Empêche un double clic sur le bouton

    // Vérification des champs obligatoires
    if (
      !title ||
      !description ||
      (!isGiven && !price) ||
      !height ||
      !imageUri ||
      !condition
    ) {
      Alert.alert("Error", "Please fill in all fields and take a picture.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Création de l'objet FormData
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("height", height);
      formData.append("isGiven", isGiven);
      formData.append("isPlant", isPlant);
      formData.append("condition", condition);

      //Ajout de la photo au FormData
      formData.append("photoFromFront", {
        uri: imageUri,
        name: "photo.jpg",
        type: "image/jpeg",
      });

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/items/newItem/` + userToken,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();

      if (result.result) {
        Alert.alert("Success", "Your item has been added.", [
          { onPress: () => navigation.navigate("Sale/donation") },
        ]);
      } else {
        Alert.alert("Erreur", result.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      Alert.alert("Erreur", "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ReturnButton destination={"Sale/donation"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.bigContainer}>
            {imageUri && (
              <View style={styles.pictureContainer}>
                <Image source={{ uri: imageUri }} style={styles.preview} />
              </View>
            )}
            <View style={styles.registerContainer}>
              <CustomButton
                onPress={takePhoto}
                text="Add a picture"
                iconName="camera"
              />
              <View style={styles.toggleContainer}>
                <Text style={styles.label}>Sale</Text>

                <Switch
                  trackColor={{ false: "#2D5334", true: "#2D5334" }}
                  thumbColor={"#95AE7D"}
                  ios_backgroundColor="#2D5334"
                  value={isGiven}
                  onValueChange={(newValue) => setIsGiven(newValue)}
                  style={styles.customSwitch}
                />
                <Text style={styles.label}>Donation</Text>
              </View>
              <RegisterInput
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
                returnKeyType="next"
                style={{ width: "85%", alignSelf: "center" }}
              />
              <RegisterInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                returnKeyType="next"
                style={{ width: "85%", alignSelf: "center" }}
              />
              {!isGiven && (
                <RegisterInput
                  placeholder="Price (in euros)"
                  value={price}
                  onChangeText={setPrice}
                  returnKeyType="next"
                  style={{ width: "85%", alignSelf: "center" }}
                />
              )}
              <RegisterInput
                placeholder="Height (in cm)"
                value={height}
                onChangeText={setHeight}
                returnKeyType="next"
                style={{ width: "85%", alignSelf: "center" }}
              />
              <View style={styles.toggleContainer}>
                <Text style={styles.label}>Accessory</Text>
                <Switch
                  trackColor={{ false: "#2D5334", true: "#2D5334" }}
                  thumbColor={"#95AE7D"}
                  ios_backgroundColor="#2D5334"
                  value={isPlant}
                  onValueChange={(newValue) => setIsPlant(newValue)}
                />
                <Text style={styles.label}>Plant</Text>
              </View>
              <RegisterInput
                placeholder={
                  isPlant ? "Plant condition" : "Accessory condition"
                }
                value={condition}
                onChangeText={setCondition}
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
                style={{ width: "85%", alignSelf: "center" }}
              />
              <RegisterButton
                title="Add my item"
                onPress={handleSubmit}
                disabled={isSubmitting}
                loading={isSubmitting}
                style={{ marginTop: 40, width: "85%", alignSelf: "center" }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#F1F0E9",
  },
  bigContainer: {
    flex: 1,
    justifyContent: "center",
  },
  pictureContainer: {
    height: 200,
    width: "100%",
    alignItems: "center",
  },
  preview: {
    height: 200,
    width: 200,
    borderRadius: 10,
    alignSelf: "center",
  },
  registerContainer: {
    height: "70%",
    width: "100%",
    paddingTop: 5,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingLeft: 8,
  },
  label: {
    color: "#2D5334",
    paddingHorizontal: 10,
    fontFamily: "OpenSans-Regular",
  },
});
