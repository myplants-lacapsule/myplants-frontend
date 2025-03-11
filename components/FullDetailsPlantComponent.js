import React, { useState } from "react";
import { Alert, Image, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import RegisterButton from "./RegisterButton";

export default function FullDetailsPlantComponent() {
  const navigation = useNavigation();

  const [isWatered, setIsWatered] = useState(plantDetails.isWatered);

  // Icônes pour les saisons
  const seasonIcons = {
    Spring: { label: "Spring", icon: "seedling", color: "#F1F0E9" },
    Summer: { label: "Summer", icon: "sun", color: "#F1F0E9" },
    Fall: { label: "Autumn", icon: "leaf", color: "#F1F0E9" },
    Winter: { label: "Winter", icon: "snowflake", color: "#F1F0E9" },
  };

  const currentSeason = seasonIcons[plantDetails.seasonality];

  // Icônes pour l'exposition au soleil
  const sunExposureIcons = {
    "part shade": { label: "Needs shade", icon: "cloud", color: "#F1F0E9" },
    "full sun": {
      label: "Needs exposure to the sun",
      icon: "sun",
      color: "#F1F0E9",
    },
    default: {
      label: "Needs exposure to light",
      icon: "cloud-sun",
      color: "#F1F0E9",
    },
  };

  const currentSunExposure = sunExposureIcons[plantDetails.sunExposure.toLowerCase()] || sunExposureIcons["default"];

  const handleDeletePlant = async () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to remove this plant from your inventory? ",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, remove",
          onPress: async () => {
            try {
              const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/plants/deletePlant/${plantDetails.token}`, {
                method: "DELETE",
                "Content-Type": "application/json",
              });

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const result = await response.json();

              if (result.result) {
                navigation.navigate("Home");
              } else {
                Alert.alert({ text: "Plant not removed" });
              }
            } catch (error) {
              console.error("Error", "An error occurred while removing the plant.");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const updateLastWatering = () => {
    Alert.alert(
      "Confirmation",
      "Did you water the plant today? ",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/plants/updateLastWatering/${plantDetails.token}`, {
                method: "PUT",
                "Content-Type": "application/json",
              });

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const result = await response.json();

              if (result.result) {
                setIsWatered(true);
              } else {
                Alert.alert({ text: "Plant not watered" });
              }
            } catch (error) {
              console.error("Error watering a plant:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={true}>
        <Image source={{ uri: plantDetails.photo }} style={styles.image} />
        <Text style={styles.name}>{plantDetails.name}</Text>
        {!isWatered && (
          <TouchableOpacity style={styles.isWateredBadgeContainer} onPress={updateLastWatering}>
            <View style={styles.isWateredBadge}>
              <FontAwesome name="tint" size={25} color="#F1F0E9" />
              <Text style={styles.isWateredBadgeText}>This plant needs water !</Text>
            </View>
          </TouchableOpacity>
        )}
        <ScrollView showsVerticalScrollIndicator={true} horizontal={true} style={styles.badgeContainer}>
          <View style={styles.seasonalityBadge}>
            <FontAwesome5 name={currentSeason.icon} size={20} color={currentSeason.color} />
            <Text style={styles.badgeText}>{plantDetails.seasonality}</Text>
          </View>
          <View style={styles.cuisineBadge}>
            <FontAwesome5 name={plantDetails.cuisine === "the plant is edible" ? "check" : "times"} size={20} color="#F1F0E9" />
            <Text style={styles.badgeText}>{plantDetails.cuisine === "the plant is edible" ? "is edible" : "is not edible"}</Text>
          </View>
          <View style={styles.toxicityBadge}>
            <FontAwesome5 name={plantDetails.toxicity === "Non-toxic" ? "check" : "times"} size={20} color="#F1F0E9" />
            <Text style={styles.badgeText}>{plantDetails.toxicity === "Non-toxic" ? "non-toxic" : "is toxic"}</Text>
          </View>
          <View style={styles.sunExposureBadge}>
            <FontAwesome5 name={currentSunExposure.icon} size={20} color={currentSunExposure.color} />
            <Text style={styles.badgeText}>{plantDetails.sunExposure}</Text>
          </View>
          <View style={styles.wateringFrequencyBadge}>
            <FontAwesome name="tint" size={20} color="#F1F0E9" />
            <Text style={styles.badgeText}>Water every {plantDetails.wateringFrequency} days</Text>
          </View>
        </ScrollView>
        <View style={styles.descriptionContainer}>
          <View style={styles.titleContainer}>
            <FontAwesome5 name="info-circle" size={20} color="#2D5334" />
            <Text style={styles.title}>Informations</Text>
          </View>
          <Text style={styles.description}>{plantDetails.description}</Text>
        </View>
        <RegisterButton title={"Remove from my inventory"} style={styles.button} onPress={handleDeletePlant} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 10,
    alignSelf: "center",
  },
  name: {
    color: "#2D5334",
    alignSelf: "center",
    paddingVertical: 10,
    fontSize: 24,
    fontFamily: "Merriweather-Bold",
  },
  isWateredBadgeContainer: {
    alignItems: "center",
  },
  isWateredBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    gap: 8,
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: "#4C9ED9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
  isWateredBadgeText: {
    color: "#F1F0E9",
    fontFamily: "OpenSans-Bold",
  },
  badgeContainer: {
    marginLeft: 10,
    paddingVertical: 10,
  },
  seasonalityBadge: {
    width: "auto",
    gap: 6,
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9C9A7E",
  },
  cuisineBadge: {
    width: "auto",
    gap: 6,
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#95AE7D",
  },
  toxicityBadge: {
    width: "auto",
    gap: 6,
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#BC4749",
  },
  sunExposureBadge: {
    width: "auto",
    gap: 6,
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D0A14B",
  },
  wateringFrequencyBadge: {
    width: "auto",
    gap: 6,
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3674B5",
  },
  badgeText: {
    color: "#F1F0E9",
    fontFamily: "OpenSans-Regular",
  },
  descriptionContainer: {
    width: "85%",
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#95AE7D",
    borderRadius: 10,
    backgroundColor: "white",
    gap: 12,
    padding: 16,
    marginTop: 10,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  title: {
    color: "#2D5334",
    fontSize: 16,
    fontFamily: "Merriweather-Bold",
  },
  description: {
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
  },
  button: {
    fontFamily: "OpenSans-Regular",
    backgroundColor: "#BC4749",
  },
});
