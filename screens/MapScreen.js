import {
  ActivityIndicator,
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import ItemCard from "../components/ItemCard";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function MapScreen() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.value);
  const userToken = user.token;

  const [itemsData, setItemsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 46.603354,
    longitude: 1.888334,
    latitudeDelta: 5,
    longitudeDelta: 15,
  });
  const [uniquePin, setUniquePin] = useState([]);

  // Récupération de la position actuelle de l'utilisateur
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setCurrentPosition(location.coords);
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setLoading(false);

      Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
        setCurrentPosition(location.coords);
      });
    })();
  }, []);

  // Appeler fetchItems une fois que le composant MapScreen est chargé
  useEffect(() => {
    if (!isFocused) {
      setUniquePin([]);
    }
    fetchItems();
  }, [isFocused]);

  // Fonction pour récupérer toutes les annonces depuis le backend
  const fetchItems = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/items/allItems`
      );
      const data = await response.json();
      if (data.result) {
        // Regrouper les annonces par utilisateur pour n'afficher qu'un seul marker par user
        const pinsMap = {};
        data.items.forEach((item) => {
          const userData = item.createdBy;
          const userId = userData.token;
          // On ajoute le marker si ce user n'est pas déjà dans pinsMap
          if (!pinsMap[userId]) {
            pinsMap[userId] = {
              lat: userData.address.lat,
              long: userData.address.long,
              token: userData.token,
            };
          }
        });
        setUniquePin(Object.values(pinsMap));
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Affichage de la modale lorsque l'utilisateur appuie sur un marqueur
  const handleMarkerPress = async (userToken) => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/items/byUser/${userToken}`
      );
      const data = await response.json();
      if (data.result) {
        setItemsData(data.items);
        setModalVisible(true);
      }
    } catch (error) {
      Alert.alert(
        "Erreur",
        "Impossible de récupérer les annonces de cet utilisateur."
      );
    }
  };

  // Articles à afficher dans la modale
  const userItems = itemsData.map((data, i) => (
    <ItemCard key={i} {...data} />
  ));

  // Fonction déclenchée lorsque l'utilisateur appuie sur le bouton "+"
  const handleAddPress = async () => {
    const locationData = await checkUserLocation();

    if (!locationData || !locationData.latitude || !locationData.longitude) {
      // Pas de coordonnées => Demander à l'utilisateur de renseigner son adresse
      navigation.navigate("AddLocationScreen");
    } else {
      // Coordonnées existantes => Aller directement au formulaire d'ajout d'article
      navigation.navigate("NewItemScreen");
    }
  };

  // Fonction qui vérifie si l'utilisateur a déjà des coordonnées enregistrées
  const checkUserLocation = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/users/getUserLocation/${userToken}`
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error checking location", error);
      return null;
    }
  };

  // Affichage d'un écran de chargement si les données ne sont pas encore chargées
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2D5334" />
        <Text style={styles.loadingText}>Loading ...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }} initialRegion={initialRegion}>
        {currentPosition && (
          <Marker coordinate={currentPosition} pinColor="red" />
        )}
        {uniquePin.map((pin, i) => (
          <Marker
            key={i}
            token={pin.token}
            coordinate={{
              latitude: pin.lat,
              longitude: pin.long,
            }}
            pinColor="blue"
            onPress={() => handleMarkerPress(pin.token)}
          />
        ))}
      </MapView>

      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <SafeAreaView style={styles.modal}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <FontAwesome5
                style={styles.closeButtonIcon}
                name="times-circle"
                size={25}
                solid={true}
              />
            </TouchableOpacity>
            <ScrollView style={styles.cardContainer}>{userItems}</ScrollView>
          </SafeAreaView>
        </View>
      </Modal>

      <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F0E9",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: "OpenSans-Regular",
    color: "#2D5334",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    position: "relative",
    width: "80%",
    padding: 20,
    borderRadius: 15,
    backgroundColor: "white",
    marginVertical: 110,
  },
  photoContainer: {
    borderRadius: 5,
    width: "35%",
  },
  infoContainer: {
    backgroundColor: "lightblue",
  },
  nameContainer: { backgroundColor: "lightgreen" },
  descriptionContainer: {},
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonIcon: {},
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#2D5334",
    width: 50,
    height: 50,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
  addButtonText: {
    color: "#FBFBFB",
    fontWeight: "bold",
    fontSize: 30,
  },
  cardContainer: {
    marginTop: 40,
  },
});
