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
  const perenualKey = "sk-BfUS67c5d3516107b8879";
  const plantidKey = "pvThvN3lWpXcKxgeg4LL98pKkQMOQ6vTyGFj2ReUkYDrpHLVoN";

  const userInStore = useSelector((state) => state.user.value);

  const navigation = useNavigation();

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [plantsData, setPlantsData] = useState({});
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
    }
  }, [isFocused, inputResearch]);

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
      const response = await fetch(
        "https://plant.id/api/v3/identification",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const plantProbability = data.result.is_plant.probability;
      const plantName = data.result.classification.suggestions[0].name;

      if (plantProbability < 0.75 || !plantProbability) {
        alert("Aucune plante trouvée, veuillez recommencer la photo");
      } else {
        setPlantsData({
          name: plantName,
          description:
            "Le ficus est une plante d'intérieur populaire, appréciée pour ses feuilles brillantes et son aspect ornemental. Facile à entretenir, elle préfère une lumière vive et indirecte.",
          wateringFrequency: "Tous les 2 jours",
          problems: "Aucun problème",
          toxicity: "Aucune toxicité",
          seasonality: "Printemps",
          sunExposure: "A besoin d'être exposé au soleil",
          photo: cloudinaryUrl,
        });
        setShowCamera(false);
        setShowSuggestions(true);
      }
      // try {
      // 	const responsePerenual = await fetch(`https://perenual.com/api/v2/species-list?key=${perenualKey}&q=${plantName}`);
      // 	if (!responsePerenual.ok) {
      // 		throw new Error('La réponse du réseau n\'est pas correcte');
      // 	}

      // 	const dataIdPerenual = await responsePerenual.json();

      // 	const idPerenual = dataIdPerenual.data[0].id;

      // 	console.log(idPerenual)

      // 	if (idPerenual) {
      // 		setPlantsData({ name: 'Ficus', description: 'description de ma plante' });
      // 		setShowCamera(false)
      // 		setShowSuggestions(true)
      // 	}

      // if (idPerenual) {
      // 	try {
      // 		const fetchPerenualDetails = await fetch(`https://perenual.com/api/v2/species/details/${idPerenual}?key=${perenualKey}`);
      // 		if (!fetchPerenualDetails.ok) {
      // 			throw new Error('La réponse du réseau n\'est pas correcte');
      // 		}

      // 		const dataPerenual = await fetchPerenualDetails.json();
      // 		console.log(dataPerenual)

      // 		// Vérifiez que les données sont valides avant de les utiliser
      // 		if (dataPerenual) {
      // 			setPlantsData(dataPerenual);
      // 			setShowCamera(false)
      // 			setShowSuggestions(true)
      // 		} else {
      // 			console.error("Données invalides reçues de l'API Perenual");
      // 		}
      // 	} catch (error) {
      // 		console.error("Erreur lors de la récupération des détails de la plante :", error);
      // 	}
      // } else {
      // 	console.log("Aucun ID trouvé dans la réponse");
      // }
      // 		} catch (error) {
      // 			console.error("Erreur lors de la récupération des données de la plante :", error);
      // 		}
      // 	}
    } catch (error) {
      console.error("Error lors de la prise de la photo", error);
    }
  };

  const identificationPlantIdByText = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Api-Key", plantidKey);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://plant.id/api/v3/kb/plants/name_search?q=${inputResearch}`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.entities.length > 0) {
        const plantName = data.entities[0].entity_name;
        setPlantsData({
          name: plantName,
          description:
            "Le ficus est une plante d'intérieur populaire, appréciée pour ses feuilles brillantes et son aspect ornemental. Facile à entretenir, elle préfère une lumière vive et indirecte.",
          wateringFrequency: "Tous les 2 jours",
          problems: "TEST",
          toxicity: "Aucune toxicité",
          seasonality: "Printemps",
          sunExposure: "A besoin d'être exposé au soleil",
          photo:
            "https://res.cloudinary.com/dxkpvwwnb/image/upload/v1741097480/gnrpwalmsqpavpdq5u32.jpg",
        });

        setInputResearch("");
        await addPlantToBackend(plantsData);
      } else {
        alert("Plante non trouvée");
        setInputResearch("");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const addPlantToBackend = async (plantsData) => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/plants/newPlant/${userInStore.token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: plantsData.name,
            description: plantsData.description,
            wateringFrequency: plantsData.wateringFrequency,
            problems: plantsData.problems,
            toxicity: plantsData.toxicity,
            seasonality: plantsData.seasonality,
            sunExposure: plantsData.sunExposure,
            photo: plantsData.photo,
          }),
        }
      );
      console.log("plantsdata dans la fonction back", plantsData);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const newPlant = await response.json();
      console.log("newPlant ", newPlant);

      if (newPlant.result) {
        setShowSuggestions(false);
        setShowCamera(false);
        setPlantsData({});
        navigation.navigate("Accueil");
      } else {
        console.log(false);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!showCamera && !showSuggestions && (
        <View style={styles.containsearch}>
          <SearchBar inputResearch={inputResearch}
            setInputResearch={setInputResearch}
            onSearch={identificationPlantIdByText} />
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
          < SuggestionPlantCard plantsData={plantsData}/>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => addPlantToBackend(plantsData)}>
            <AddPlantButton />
          </TouchableOpacity>
        </View>
      )
      }
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
