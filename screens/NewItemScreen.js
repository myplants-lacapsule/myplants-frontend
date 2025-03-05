import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Switch,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  SafeAreaView,
} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { login } from "../reducers/user.js";
import RegisterButton from "../components/RegisterButton.js";
import RegisterInput from "../components/RegisterInput.js";
import ToggleButton from "../components/ToggleButton.js";
import CustomButton from "../components/CustomButton.js";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ReturnButton from "../components/ReturnButton.js";

export default function NewItemScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [height, setHeight] = useState("");
  const [isVente, setIsVente] = useState(true);
  const [isPlant, setIsPlant] = useState(true);
  const [plantCondition, setPlantCondition] = useState("");
  const [imageUri, setImageUri] = useState(null);

  const user = useSelector((state) => state.user.value);
  const userToken = user.token;

  console.log("title:", title);
  console.log("description:", description);
  console.log("price:", price);
  console.log("height:", height);
  console.log("isVente:", isVente);
  console.log("isPlant:", isPlant);
  console.log("plantCondition:", plantCondition);
  console.log("imageUri:", imageUri);

  useEffect(() => {
    console.log("imageUri updated:", imageUri);
  }, [imageUri]);

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
    // Vérification des champs obligatoires
    if (!title || !description || (isVente && !price) || !height || !imageUri) {
      Alert.alert("Error", "Please fill in all fields and take a picture.");
      return;
    }
    // Création de l'objet FormData

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("height", height);
    formData.append("isVente", isVente);
    formData.append("isPlant", isPlant);
    formData.append("plantCondition", plantCondition);

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
      Alert.alert("Success", "Your item has been added!");
      // Optionnel : réinitialiser le formulaire ou naviguer vers un autre écran
    } else {
      Alert.alert("Error", result.error);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <ReturnButton />
          <View style={styles.pictureContainer}>
            <Text style={styles.picture}>Picture</Text>
          </View>
          {/* Affichage de l'aperçu de l'image */}
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.preview} />
          )}
					        <View style={styles.registerContainer}></View>
					<CustomButton
            onPress={takePhoto}
            text="Add a picture"
            iconName="camera"
          />
					<View style={styles.toggleContainer}>
            <Text style={styles.plantChoice}>Donation</Text>
            <ToggleButton
              value={isVente}
              onValueChange={(newValue) => setIsVente(newValue)}
            />
            <Text style={styles.accessoryChoice}>Sale</Text>
          </View>
          
          <RegisterInput
            placeholder="Title"
            autoCapitalize="none"
            keyboardType="email-address"
            value={title}
            onChangeText={setTitle}
            returnKeyType="next"
          />
          <RegisterInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            returnKeyType="next"
          />
          {isVente && (
            <RegisterInput
              placeholder="Price"
              value={price}
              onChangeText={setPrice}
              returnKeyType="next"
            />
          )}
          <RegisterInput
            placeholder="Height"
            value={height}
            onChangeText={setHeight}
            returnKeyType="next"
          />
          <View style={styles.toggleContainer}>
            <Text style={styles.plantChoice}>Plant</Text>
            <ToggleButton
              value={isPlant}
              onValueChange={(newValue) => setIsPlant(newValue)}
            />
            <Text style={styles.accessoryChoice}>Accessory</Text>
          </View>
          <RegisterInput
            placeholder="Plant condition"
            value={plantCondition}
            onChangeText={setPlantCondition}
            returnKeyType="next"
          />
          <RegisterButton title="Add my item" onPress={handleSubmit} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F1F0E9",
  },
  container: {
    justifyContent: "center",
    backgroundColor: "pink",
  },
	pictureContainer: {
		height: 200,
		width: 200,
		backgroundColor: "lightgreen",
	},
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    marginRight: 10,
    fontSize: 16,
  },
  preview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: "center",
    backgroundColor: "red",
    marginBottom: 30,
  },
});
