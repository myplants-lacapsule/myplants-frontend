import { ActivityIndicator, Alert, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import ItemCard from "../components/ItemCard";

export default function MapScreen() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();
  const user = useSelector((state) => state.user.value);
  const userToken = user.token;

  const [itemsData, setItemsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pinsLoading, setPinsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false)
  const [initialRegion, setInitialRegion] = useState({
    latitude: 46.603354,
    longitude: 1.888334,
    latitudeDelta: 5,
    longitudeDelta: 15,
  });
  const [uniquePin, setUniquePin] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);

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

      // Mise à jour en temps réel de la position de l'utilisateur
      Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
        setCurrentPosition(location.coords);
      });
    })();
  }, []);

  // Appeler fetchItems une fois que le composant MapScreen est chargé
  // ou
  // Rafraîchir la carte si on revient depuis NewItemScreen avec refresh: true

  useEffect(() => {
    if (isFocused || route.params?.refresh) {
      fetchItems();
    }
  }, [isFocused, route.params]);

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPin(null);
  };

  // Fonction pour récupérer toutes les annonces depuis le backend
  const fetchItems = async () => {
    try {
      setPinsLoading(true);
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/items/allItems`);
      const data = await response.json();
      if (data.result && data.items && data.items.length > 0) {
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
        // S'il n'y a aucun article, on s'assure que uniquePin reste un tableau vide
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
    finally {
      setPinsLoading(false);
    }
  };

  // Affichage de la modale lorsque l'utilisateur appuie sur un marqueur
  const handleMarkerPress = async (pinToken) => {
    setSelectedPin(pinToken); // Mise à jour de l'état du marker sélectionné

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/items/byUser/${pinToken}`);
      const data = await response.json();
      if (data.result) {
        setItemsData(data.items);
        setModalVisible(true);
      }
    } catch (error) {
      Alert.alert("Erreur", "Impossible de récupérer les annonces de cet utilisateur.");
    }
  };

  // Articles à afficher dans la modale
  const userItems = itemsData.map((data, i) => <ItemCard key={i} {...data} closeModal={closeModal} />);

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
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/getUserLocation/${userToken}`);
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
        <Text style={styles.loadingText}>Loading... please wait</Text>
      </View>
    );
  }
  const markers = uniquePin.map((pin, i) => (
    <Marker
      key={`${pin.token}-${selectedPin === pin.token ? "selected" : "default"}`}
      token={pin.token}
      coordinate={{
        latitude: pin.lat,
        longitude: pin.long,
      }}
      pinColor="blue"
      onPress={() => {
        handleMarkerPress(pin.token);
      }}
      calloutEnabled={false}
      tracksViewChanges={false}
    />
  ))

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1, justifyContent: "flex-end" }} initialRegion={initialRegion} onLayout={() => setMapLoaded(true)}>
        {currentPosition && <Marker coordinate={currentPosition} pinColor="red" />}
        {markers}
      </MapView>
      {pinsLoading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="#2D5334" />
        </View>
      )}

      {mapLoaded && (
        <View style={styles.containBtn}>
          <TouchableOpacity style={styles.bottomBtn} onPress={fetchItems}>
            <FontAwesome5 name="sync-alt" size={20} color="#F1F0E9" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.myItemsForSaleButton} onPress={() => navigation.navigate("UserItemsDetailsScreen")}>
            <Text style={styles.myItemsFosSaleButtonText}>My items for sale</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBtn} onPress={handleAddPress}>
            <FontAwesome5 name="plus" size={20} solid={true} color="white" />
          </TouchableOpacity>
        </View>
      )}
      
      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <SafeAreaView style={styles.modal}>
            <FontAwesome5 name="times-circle" size={25} solid={true} style={styles.closeButton} onPress={closeModal} />
            <ScrollView showsVerticalScrollIndicator={true} style={styles.cardContainer}>
              {userItems}
            </ScrollView>
          </SafeAreaView>
        </View>
      </Modal>
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
    color: "#2D5334",
    fontSize: 18,
    fontFamily: "OpenSans-Regular",
  },
  modalContainer: {
    flex: 1,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    position: "relative",
    maxHeight: "50%",
    minHeight: 100,
    width: "90%",
    padding: 5,
    paddingBottom: 15,
    marginVertical: 110,
    borderRadius: 15,
    backgroundColor: "white",
  },
  closeButton: {
    color: "#2D5334",
    marginLeft: "auto",
  },
  cardContainer: {
    marginTop: 10,
  },
  loaderOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10, // s'assure que l'indicateur est au-dessus de la MapView
    backgroundColor: "rgba(255,255,255,0.6)", // pour atténuer la vue en dessous
  },
  containBtn: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "15%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
  bottomBtn: {
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2D5334",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  myItemsForSaleButton: {
    width: 170,
    height: 40,
    borderRadius: 35,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#2D5334",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  myItemsFosSaleButtonText: {
    color: "#F1F0E9",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
