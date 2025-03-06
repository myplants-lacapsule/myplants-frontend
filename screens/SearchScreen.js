import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";

import { Camera } from "expo-camera";

import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { useIsFocused, useNavigation } from "@react-navigation/native";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import AddPlantButton from "../components/AddPlantButton";
import CameraSearch from '../components/CameraSearch'
import SearchBar from "../components/SearchBar";
import SuggestionPlantCard from '../components/SuggestionPlantCard'

export default function SearchScreen() {
  const perenualKey = "sk-yd0d67c8592057aad8972";
  const plantidKey = "pvThvN3lWpXcKxgeg4LL98pKkQMOQ6vTyGFj2ReUkYDrpHLVoN";

  const userInStore = useSelector((state) => state.user.value);

  const navigation = useNavigation();

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [plantsData, setPlantsData] = useState(null);
  const [inputResearch, setInputResearch] = useState("");

  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(false); // état de la permission

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
      setShowSuggestions(false)
      if (!showSuggestions) {
        setPlantsData(null)
      }
    }
  }, [isFocused, inputResearch, showSuggestions, plantsData]);

  // fonction pour la prise de photo
  const takePicture = async (cameraRef) => {
    try {
      const photo = await cameraRef.current?.takePictureAsync({ quality: 0.3 });
      if (photo) {
        sendPictureToBack(photo.uri);
      }
    } catch (error) {
      console.error("Error taking picture:", error);
    }
  };

  // fonction pour envoyer la photo vers le back
  const sendPictureToBack = async (photoUri) => {
    const formData = new FormData();
    formData.append("photoFromFront", {
      uri: photoUri,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/plants/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseFromCloudinary = await response.json();
      identificationPlantId(responseFromCloudinary.url);
    } catch (error) {
      console.error("Error taking picture:", error);
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

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const plantProbability = data.result.is_plant.probability;
      const plantName = data.result.classification.suggestions[0].name;

      if (plantProbability < 0.75 || !plantProbability) {
        alert("Plant not found, please try again");
      } else {
        await idenficationDetailsPlant(plantName, cloudinaryUrl)
      }
    } catch (error) {
      console.error("Error when taking the picture", error);
    }
  };

  // const identificationPlantIdByText = async (inputResearch) => {

  //   var myHeaders = new Headers();
  //   myHeaders.append("Api-Key", plantidKey);
  //   myHeaders.append("Content-Type", "application/json");

  //   var requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };

  //   try {
  //     const response = await fetch(
  //       `https://plant.id/api/v3/kb/plants/name_search?q=${inputResearch}`, requestOptions
  //     );
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();

  //     if (data.entities.length > 0) {
  //       const plantName = data.entities[0].entity_name;
  //       console.log(plantName)

  //       const plantData = {
  //         name: plantName,
  //         description: `Le ${plantName} est une plante d'intérieur populaire, appréciée pour ses feuilles brillantes et son aspect ornemental. Facile à entretenir, elle préfère une lumière vive et indirecte.`,
  //         wateringFrequency: "Tous les 2 jours",
  //         cuisine: "TEST",
  //         toxicity: "Aucune toxicité",
  //         seasonality: "Printemps",
  //         sunExposure: "A besoin d'être exposé au soleil",
  //         photo: "https://res.cloudinary.com/dxkpvwwnb/image/upload/v1741097480/gnrpwalmsqpavpdq5u32.jpg",
  //       }
  //       setShowSuggestions(true)
  //       setPlantsData(plantData);
  //       setInputResearch("");
  //     } else {
  //       alert("Plante non trouvée");
  //       setInputResearch("");
  //     }
  //   } catch (error) {
  //     console.error("There was a problem with the fetch operation:", error);
  //   }
  // };

  const idenficationDetailsPlant = async (plantName, cloudinaryUrl) => {
    try {
      //appel 2ème API pour récupérer l'id de la plante
      plantName = plantName.toLowerCase();
      const responsePerenual = await fetch(`https://perenual.com/api/v2/species-list?key=${perenualKey}&q=${plantName}`);
      if (!responsePerenual.ok) {
        alert('No plant found, please try again');
        setInputResearch("");
      }

      const dataPerenual = await responsePerenual.json();
      console.log(dataPerenual)

      // check si la plante est trouvée
      if (dataPerenual.data.length > 0) {
        const idPerenual = dataPerenual.data[0].id;

        // si l'id est trouvé, on récupère les détails de la plante
        if (idPerenual) {
          const fetchPerenualDetails = await fetch(`https://perenual.com/api/v2/species/details/${idPerenual}?key=${perenualKey}`);
          if (!fetchPerenualDetails.ok) {
            throw new Error('Invalid data received from Perenual API');
          }

          const dataPerenual = await fetchPerenualDetails.json();

          if (dataPerenual) {
            let plantDescription = dataPerenual.description;

            let plantWateringFrequency = dataPerenual.watering.toLowerCase();
            if (plantWateringFrequency === "average") {
              plantWateringFrequency = "Watering every 3 days";
            } else if (plantWateringFrequency === "frequent") {
              plantWateringFrequency = "Frequent watering";
            } else {
              plantWateringFrequency = "Not found";
            }

            const plantToxicityToHuman = dataPerenual.poisonous_to_humans;
            const plantToToxicityToPets = dataPerenual.poisonous_to_pets;
            let plantToxicity = '';
            if (plantToxicityToHuman && plantToToxicityToPets) {
              plantToxicity = "Toxic to humans and pets"
            } else if (plantToToxicityToPets && !plantToxicityToHuman) {
              plantToxicity = "Toxic to animals";
            } else if (!plantToToxicityToPets && plantToxicityToHuman) {
              plantToxicity = "Toxic to humans";
            } else {
              plantToxicity = "Non-toxic";
            }

            let plantSeasonality = dataPerenual.harvest_season;

            let plantSunExposure = dataPerenual.sunlight[0];
            let plantSun = ''
            if (plantSunExposure === "part shade") {
              plantSun = "Needs shade";
            } else if (plantSunExposure === "full sun") {
              plantSun = "Needs exposure to the sun";
            } else (
              plantSun = "Needs exposure to light"
            )

            const isCuisine = dataPerenual.cuisine;
            let plantCuisine = '';
            if (isCuisine) {
              plantCuisine = "The plant is edible";
            } else {
              plantCuisine = "The plant is not edible";
            }

            console.log(dataPerenual.default_image.regular_url)
            let plantPhotoApi = '';
            if (cloudinaryUrl === undefined) {
              plantPhotoApi = dataPerenual.default_image.regular_url;
            } else {
              plantPhotoApi = cloudinaryUrl;
            }

            setPlantsData({
              name: plantName,
              description: plantDescription,
              wateringFrequency: plantWateringFrequency,
              cuisine: plantCuisine,
              toxicity: plantToxicity,
              seasonality: plantSeasonality,
              sunExposure: plantSun,
              photo: plantPhotoApi,
            });
            setShowCamera(false)
            setShowSuggestions(true)
          } else {
          setInputResearch("");
          alert("Données invalides reçues de l'API Perenual");
          }

        } else {
        alert("Plant not found, please try again");
          setInputResearch("");
        }
      } else {
        alert("Plant not found, please try again");
        setInputResearch("");
      }
    } catch (error) {
      console.error("Error lors de la prise de la photo", error);
    }
  }

  const addPlantToBackend = async (plantsData) => {
    console.log("plantsdata dans addplanttoback", plantsData)
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/plants/newPlant/${userInStore.token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: plantsData.name,
            description: plantsData.description,
            wateringFrequency: plantsData.wateringFrequency,
            cuisine: plantsData.cuisine,
            toxicity: plantsData.toxicity,
            seasonality: plantsData.seasonality,
            sunExposure: plantsData.sunExposure,
            photo: plantsData.photo,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const newPlant = await response.json();
      console.log("newPlant ", newPlant);

      if (newPlant.result) {
        setShowSuggestions(false);
        setShowCamera(false);
        setPlantsData({});
        navigation.navigate("Home");
      } else {
        console.log(false);
      }
    } catch (error) {
      console.error("Problème de fetch", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!showCamera && !showSuggestions && (
        <View style={styles.containsearch}>
          <SearchBar inputResearch={inputResearch} setInputResearch={setInputResearch} onSearch={() => idenficationDetailsPlant(inputResearch)} />
          <TouchableOpacity style={styles.takePhoto} onPress={getPermission}>
            <FontAwesome name="camera" size={30} color="white" />
          </TouchableOpacity>
        </View>
      )}

      {(hasPermission === true || isFocused) && showCamera && (
        <CameraSearch takePicture={takePicture} />
      )}

      {showSuggestions && !showCamera && (
        <View>
          <SuggestionPlantCard plantsData={plantsData} />
          <TouchableOpacity style={styles.btn} onPress={() => addPlantToBackend(plantsData)}>
            <AddPlantButton />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F0E9",
  },
  containsearch: {
    height: "15%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
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
});
