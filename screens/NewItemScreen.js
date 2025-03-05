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
  ScrollView,
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
      Alert.alert(
        "Vous devez autoriser l'accès à la caméra pour prendre une photo."
      );
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
      Alert.alert(
        "Erreur",
        "Veuillez remplir tous les champs et prendre une photo."
      );
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
      `${EXPO_PUBLIC_API_URL}/items/newItem/` + userToken,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();
    console.log("result", result);

    if (result.result) {
      Alert.alert("Succès", "Votre article a été ajouté !");
      // Optionnel : réinitialiser le formulaire ou naviguer vers un autre écran
    } else {
      Alert.alert("Erreur", result.error);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.registerContainer}>
            <CustomButton
              onPress={takePhoto}
              text="Ajouter une photo"
              iconName="camera"
            />

            {/* Affichage de l'aperçu de l'image */}
            {imageUri && (
              <Image source={{ uri: imageUri }} style={styles.preview} />
            )}
            <ToggleButton
              value={isVente}
              onValueChange={(newValue) => setIsVente(newValue)}
              trueLabel="Vente"
              falseLabel="Don"
            />
            <RegisterInput
              placeholder="Titre"
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
                placeholder="Prix"
                value={price}
                onChangeText={setPrice}
                returnKeyType="next"
              />
            )}
            <RegisterInput
              placeholder="Hauteur"
              value={height}
              onChangeText={setHeight}
              returnKeyType="next"
            />
            <ToggleButton
              value={isPlant}
              onValueChange={(newValue) => setIsPlant(newValue)}
              trueLabel="Plante"
              falseLabel="Accessoires"
            />
            <RegisterInput
              placeholder="Etat"
              value={plantCondition}
              onChangeText={setPlantCondition}
              returnKeyType="next"
            />
            <RegisterButton
              title="Ajouter mon article "
              onPress={handleSubmit}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#F1F0E9",
  },
  container: {
    flex: 1,
    backgroundColor: "#F1F0E9",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "stretch",
    paddingVertical: 20,
    paddingHorizontal: 40,
  },

  registerContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 40,
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
