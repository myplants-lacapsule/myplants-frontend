import { ActivityIndicator, Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera } from "expo-camera";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import CameraSearch from "../components/CameraSearch";
import SearchBar from "../components/SearchBar";
import ReturnButton from "../components/ReturnButton";
import SuggestionPlantCard from "../components/SuggestionPlantCard";
import Facts from "../components/Facts";

export default function SearchScreen() {
  // Clés API pour la reconnaissance et la recherche de plantes
  const perenualKey = "sk-Ilcc67d2fb1e16a919137";
  const plantidKey = "T2LrJMPADWmtW0HvyWVLSz42OQz5OgXtZO1Ep8pqvjHWLiNqjX";

  const userInStore = useSelector((state) => state.user.value);
  const navigation = useNavigation();
  const cameraRef = useRef(null);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [plantsData, setPlantsData] = useState(null);
  const [inputResearch, setInputResearch] = useState("");
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(false);

  // Fonction pour demander l'autorisation d'accès à la caméra
  const getPermission = async () => {
    const status = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status && status?.status === "granted");
    setShowCamera(true);
  };

  useEffect(() => {
    // Réinitialisation des états lorsque l'écran perd le focus
    if (!isFocused) {
      setShowCamera(false);
      setInputResearch("");
      setShowSuggestions(false);
      setLoading(false);
      if (!showSuggestions) {
        setPlantsData(null);
      }
    }
  }, [isFocused, showSuggestions]);

  // Fonction pour capturer une photo avec la caméra
  const takePicture = async () => {
    try {
      setLoading(true);
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.3 });
      // console.log(photo)
      if (photo && photo.uri) {
        sendPictureToBack(photo.uri);
      } else {
        Alert.alert("An error occurred while taking the picture", "Please try again");
      }
    } catch (error) {
      // console.error("Error taking picture:", error);
      Alert.alert("An error occurred while taking the picture", "Please try again");
    }
  };

  // Fonction pour envoyer la photo au backend
  const sendPictureToBack = async (photoUri) => {
    try {
      const formData = new FormData();
      formData.append("photoFromFront", {
        uri: photoUri,
        name: "photo.jpg",
        type: "image/jpeg",
      });

      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/plants/upload`, {
        method: "POST",
        body: formData,
      });

      // console.log("response from plants/upload", response)

      if (!response.ok) {
        // throw new Error("Network response was not ok");
        Alert.alert("A network error occurred", "Please try again");
      }

      const responseFromCloudinary = await response.json();
      // console.log("responseFromCloudinary", responseFromCloudinary)

      if (responseFromCloudinary.url) {
        identificationPlantId(responseFromCloudinary.url);
      } else {
        Alert.alert("An error occurred while taking the picture", "Please try again");
      }
    } catch (error) {
      // console.error("Error sending picture:", error);
      Alert.alert("An error occurred while taking the picture", "Please try again");
    }
  };

  // Fonction pour identifier la plante en envoyant l'image à l'API de reconnaissance
  const identificationPlantId = async (cloudinaryUrl) => {
    var myHeaders = new Headers();
    myHeaders.append("Api-Key", plantidKey);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      images: [cloudinaryUrl],
      similar_images: true,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch("https://plant.id/api/v3/identification", requestOptions);
      // console.log("reponse from identificaiton", response)

      if (!response.ok) {
        throw new Error("Network response invalid");
      }

      const data = await response.json();
      // console.log("data from reponse identification", data)
      const plantProbability = data.result.is_plant.probability;
      const plantName = data.result.classification.suggestions[0].name;

      // Vérification de la fiabilité de l'identification
      if (plantProbability < 0.75 || !plantProbability) {
        Alert.alert("The plant you are looking for is not in our database", "Please try another.");
      } else {
        await idenficationDetailsPlant(plantName, cloudinaryUrl);
      }
    } catch (error) {
      // console.error("Error taking picture", error);
      Alert.alert("An error occurred while taking the picture", "Please try again")
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour récupérer les détails de la plante via une seconde API
  const idenficationDetailsPlant = async (plantName, cloudinaryUrl) => {
    try {
      setLoading(true);
      const responsePerenual = await fetch(`https://perenual.com/api/v2/species-list?key=${perenualKey}&q=${plantName}`);
      // console.log("responsePerenual ", responsePerenual)

      if (!responsePerenual.ok) {
        setInputResearch("");
        throw new Error("No plant found, please try again");
      }

      const dataPerenual = await responsePerenual.json();
      // console.log("dataPerenual", dataPerenual)

      // console.log(dataPerenual)

      // Vérification si la plante est bien référencée
      if (dataPerenual.total === 0) {
        console.error("Id de plante trop élevé", error);
        setInputResearch("");
        Alert.alert("The plant you are looking for is not in our database", "Please try another");
        return;
      }

      // console.log(idPerenual)

      // Vérification si l'id de la plante < 3000 car l'api en free propose seulement 3000 ID
      const idPerenual = dataPerenual.data[0].id;
      if (idPerenual >= 3000) {
        setInputResearch("");
        Alert.alert("Pas dans la liste", "Please try another");
        return;
      }

      // Récupération des détails de la plante
      if (idPerenual) {
        const fetchPerenualDetails = await fetch(`https://perenual.com/api/v2/species/details/${idPerenual}?key=${perenualKey}`);
        if (!fetchPerenualDetails.ok) {
          throw new Error("Invalid data received from Perenual API");
        }
        const rateLimitRemaining = fetchPerenualDetails.headers.get("x-ratelimit-remaining");
        console.log("IDperenual remaining :", rateLimitRemaining);

        const data = await fetchPerenualDetails.json();
        const { description, watering, poisonous_to_humans, poisonous_to_pets, flowering_season, sunlight, cuisine, harvest_season } = data;

        let plantWateringFrequency = watering.toLowerCase();
        if (plantWateringFrequency === "frequent") {
          plantWateringFrequency = 2;
        } else if (plantWateringFrequency === "average") {
          plantWateringFrequency = 4;
        } else if (plantWateringFrequency === "minimum") {
          plantWateringFrequency = 6;
        } else {
          plantWateringFrequency = 7;
        }

        const plantToxicity = poisonous_to_humans && poisonous_to_pets ? "Toxic to humans and pets" : poisonous_to_pets ? "Toxic to animals" : poisonous_to_humans ? "Toxic to humans" : "Non-toxic";

        const plantSeasonality = (flowering_season || harvest_season) ? (flowering_season ? flowering_season : harvest_season) : "Fall";

        const plantSunExposure = sunlight[0].toLowerCase() === "part shade" ? "Needs shade" : sunlight[0] === "full-sun" ? "Needs exposure to the sun" : "Needs exposure to light";

        const plantCuisine = cuisine ? "Is edible" : "Is not edible";

        const plantPhotoApi = cloudinaryUrl ? cloudinaryUrl : (data.default_image.regular_url ? data.default_image.regular_url : data.default_image.original_url);

        setPlantsData({
          name: plantName,
          description: description,
          wateringFrequency: plantWateringFrequency,
          cuisine: plantCuisine,
          toxicity: plantToxicity,
          seasonality: plantSeasonality,
          sunExposure: plantSunExposure,
          photo: plantPhotoApi,
        });
        setShowCamera(false);
        setShowSuggestions(true);
      } else {
        setInputResearch("");
        Alert.alert("Plant not found", "Please try again");
      }
    } catch (error) {
      // console.error("Plant not found", error);
      Alert.alert("Error", "An error occurred while fetching plant details.");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour enregistrer la plante dans le backend (dans l'inventaire de l'utilisateur)
  const addPlantToBackend = async (plantsData) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/plants/newPlant/${userInStore.token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plantsData),
      });
      if (!response.ok) {
        throw new Error("Network response invalid");
      }
      const newPlant = await response.json();

      if (newPlant.result) {
        setShowSuggestions(false);
        setShowCamera(false);
        setPlantsData({});
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", "Please try again");
      }
    } catch (error) {
      // console.error("Error adding plant to backend", error);
      Alert.alert("Error", "An error occurred while saving plant, please retry.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!showCamera && !showSuggestions && (
        <View>
          <ReturnButton title="Search for a plant" />
          <View style={styles.searchContainer}>
            <SearchBar inputResearch={inputResearch} setInputResearch={setInputResearch} onSearch={() => idenficationDetailsPlant(inputResearch)} />
            <TouchableOpacity style={styles.takePhoto} onPress={getPermission}>
              <FontAwesome name="camera" size={30} color="white" />
            </TouchableOpacity>
          </View>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#2D5334" />
              <Text style={styles.loadingText}>Loading... please wait</Text>
            </View>
          ) : (
            <Facts />
          )}
        </View>
      )}
      {(hasPermission === true || isFocused) && showCamera && <CameraSearch loading={loading} takePicture={takePicture} cameraRef={cameraRef} setShowCamera={setShowCamera} showCamera={showCamera} />}
      {showSuggestions && !showCamera && !loading && (
        <View>
          <SuggestionPlantCard plantsData={plantsData} addPlantToBackend={() => addPlantToBackend(plantsData)} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#F1F0E9",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "15%",
    marginTop: 20,
  },
  takePhoto: {
    width: 90,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2D5334",
  },
  loadingContainer: {
    marginTop: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#2D5334",
    fontSize: 18,
    fontFamily: "OpenSans-Regular",
  },
});
