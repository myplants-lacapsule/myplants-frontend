import { ActivityIndicator, Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera } from "expo-camera";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import CameraSearch from "../components/CameraSearch";
import SearchBar from "../components/SearchBar";
import ReturnButton from "../components/ReturnButton.js";
import SuggestionPlantCard from "../components/SuggestionPlantCard";

export default function SearchScreen() {
  const perenualKey = "sk-RB2z67cecb13330dc9059";
  const plantidKey = "MPTt3cQB5Z8PlOmOhGC3XBagUam7WtPUfCJ66Q9e4p0YdSvOAS";

  const userInStore = useSelector((state) => state.user.value);

  const navigation = useNavigation();

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [plantsData, setPlantsData] = useState(null);
  const [inputResearch, setInputResearch] = useState("");
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(false); // état de la permission

  const cameraRef = useRef(null);

  // obtenir la permission de la caméra au clic sur le bouton photo
  const getPermission = async () => {
    const status = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status && status?.status === "granted");
    setShowCamera(true); // set l'état pour afficher la caméra
  };

  useEffect(() => {
    if (!isFocused) {
      setShowCamera(false);
      setInputResearch("");
      setShowSuggestions(false);
      setLoading(false)
      if (!showSuggestions) {
        setPlantsData(null);
      }
    }
  }, [isFocused, showSuggestions]);

  // fonction pour la prise de photo
  const takePicture = async () => {
    try {
      setLoading(true)
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.3 });
      // console.log(photo)
      if (photo && photo.uri) {
        sendPictureToBack(photo.uri);
      } else {
        Alert.alert("Photo not found", "Please retry");
      }
    } catch (error) {
      console.error("Error taking picture:", error);
    }
  };

  // fonction pour envoyer la photo vers le back
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
        Alert.alert("Error sending the photo", "Please retry");
      }

      const responseFromCloudinary = await response.json();
      // console.log("responseFromCloudinary", responseFromCloudinary)

      if (responseFromCloudinary.url) {
        identificationPlantId(responseFromCloudinary.url);
      } else {
        Alert.alert("Error", "Please retry");
      }
    } catch (error) {
      console.error("Error sending picture:", error);
    }
  };

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
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // console.log("data from reponse identification", data)
      const plantProbability = data.result.is_plant.probability;
      const plantName = data.result.classification.suggestions[0].name;

      if (plantProbability < 0.75 || !plantProbability) {
        Alert.alert("Plant not found", "Please try again");
      } else {
        await idenficationDetailsPlant(plantName, cloudinaryUrl);
      }
    } catch (error) {
      console.error("Error when taking the picture", error);
    } finally {
      setLoading(false)
    }
  };

  const idenficationDetailsPlant = async (plantName, cloudinaryUrl) => {
    try {
      //appel 2ème API pour récupérer l'id de la plante
      
      setLoading(true) // passage du loading à true
      const responsePerenual = await fetch(`https://perenual.com/api/v2/species-list?key=${perenualKey}&q=${plantName}`);
      // console.log("responsePerenual ", responsePerenual)

      if (!responsePerenual.ok) {
        setInputResearch("");
        throw new Error("No plant found, please try again");
      }

      const dataPerenual = await responsePerenual.json();
      // console.log("dataPerenual", dataPerenual)

      // check si la plante est trouvée
      if (dataPerenual.total === 0) {
        setInputResearch("");
        Alert.alert("Plant not found", "Please try again");
        return;
      }

      const idPerenual = dataPerenual.data[0].id;

      if (idPerenual >= 3000) {
        Alert.alert("ID de plante trop élevé", "On paie pas le premium alors cherche une autre plante");
        return;
      }
      // console.log(idPerenual)

      // si l'id est trouvé, on récupère les détails de la plante
      if (idPerenual) {

        const fetchPerenualDetails = await fetch(`https://perenual.com/api/v2/species/details/${idPerenual}?key=${perenualKey}`);
        if (!fetchPerenualDetails.ok) {
          throw new Error("Invalid data received from Perenual API");
        }
        const rateLimitRemaining = fetchPerenualDetails.headers.get("x-ratelimit-remaining");
        console.log("IDperenual remaining :", rateLimitRemaining);

        const data = await fetchPerenualDetails.json();
        const { description, watering, poisonous_to_humans, poisonous_to_pets, flowering_season, sunlight, cuisine } = data;

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

        const plantSeasonality = flowering_season === null ? "Fall" : plantSeasonality.toLowerCase() === "winter" ? "Winter" : plantSeasonality.toLowerCase() === "spring" ? "Spring" : plantSeasonality.toLowerCase() === "summer" ? "Summer" : "Fall";

        const plantSunExposure = sunlight[0].toLowerCase() === "part shade" ? "Needs shade" : sunlight[0] === "full-sun" ? "Needs exposure to the sun" : "Needs exposure to light";

        const plantCuisine = cuisine ? "Is edible" : "Is not edible";

        const plantPhotoApi = cloudinaryUrl ?? data.default_image.regular_url;

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
      console.error("Plant not found", error);
      Alert.alert("Error", "An error occurred while fetching plant details.");
    } finally {
      setLoading(false)
    }
  };

  const addPlantToBackend = async (plantsData) => {
    try {
      setLoading(true)
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/plants/newPlant/${userInStore.token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plantsData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const newPlant = await response.json();

      if (newPlant.result) {
        setShowSuggestions(false);
        setShowCamera(false);
        setPlantsData({});
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", "Please retry");
      }
    } catch (error) {
      console.error("Error adding plant to backend", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!showCamera && !showSuggestions && (
        <View>
          <ReturnButton title="Search for a plant" />
          <View style={styles.containsearch}>
            <SearchBar inputResearch={inputResearch} setInputResearch={setInputResearch} onSearch={() => idenficationDetailsPlant(inputResearch)} />
            <TouchableOpacity style={styles.takePhoto} onPress={getPermission}>
              <FontAwesome name="camera" size={30} color="white" />
            </TouchableOpacity>
          </View>
          {loading && <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2D5334" />
            <Text style={styles.loadingText}>Loading plant... please wait</Text>
          </View>}
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
    paddingTop: 40,
    backgroundColor: "#F1F0E9",
  },
  containsearch: {
    height: "15%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 40,
  },
  takePhoto: {
    backgroundColor: "#2D5334",
    width: 90,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cameraContainer: {
    height: 100,
    width: 100,
    borderRadius: "100%",
    borderColor: "red",
    backgroundColor: "#F8F3D9",
    justifyContent: "center",
    alignItems: "center",
  },
  snapButton: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "30",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 150,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: "OpenSans-Regular",
    color: "#2D5334",
  },
});
