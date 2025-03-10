import React, { useState }  from "react";
import { Text, SafeAreaView, ScrollView, StyleSheet, Image, Alert, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import RegisterButton from "./RegisterButton";

export default function FullDetailsPlantComponent() {
  console.log("plantDetails", plantDetails);

  const [isWatered, setIsWatered] = useState(plantDetails.isWatered)
  console.log(isWatered)



  const navigation = useNavigation();

  // Icônes pour les saisons
  const seasonIcons = {
    Spring: { label: "Spring", icon: "seedling", color: "#4CAF50" },
    Summer: { label: "Summer", icon: "sun", color: "#FFD700" },
    Fall: { label: "Autumn", icon: "leaf", color: "#D2691E" },
    Winter: { label: "Winter", icon: "snowflake", color: "#00BFFF" },
  };

  const currentSeason = seasonIcons[plantDetails.seasonality];

  // Icônes pour l'exposition au soleil
  const sunExposureIcons = {
    "part shade": { label: "Needs shade", icon: "cloud", color: "#808080" },
    "full sun": {
      label: "Needs exposure to the sun",
      icon: "sun",
      color: "#FFD700",
    },
    default: {
      label: "Needs exposure to light",
      icon: "cloud-sun",
      color: "#FFA500",
    },
  };

  const currentSunExposure = sunExposureIcons[plantDetails.sunExposure.toLowerCase()] || sunExposureIcons["default"];
  
  const deletePlant = async () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to remove your plant from your inventory? ",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Deletion canceled"),
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
              console.error("Error deleting a plant:", error);
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
      "Did you water the plant well? ",
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
                setIsWatered(true)
              } else {
                Alert.alert({ text: "Plant not removed" });
              }
            } catch (error) {
              console.error("Error deleting a plant:", error);
            }
          },
        },
      ],
      { cancelable: false }
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={{ uri: plantDetails.photo }} style={styles.image} />
        <Text style={styles.name}>{plantDetails.name}</Text>
        <ScrollView horizontal={true} style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Water every {plantDetails.wateringFrequency} days</Text>
            <FontAwesome name="tint" size={25} color="#00BFFF" />
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{plantDetails.sunExposure}</Text>
            <FontAwesome5 name={currentSunExposure.icon} size={20} color={currentSunExposure.color} style={{ marginRight: 5 }} />
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{plantDetails.cuisine === "the plant is edible" ? "is edible" : "is not edible"}</Text>
            <FontAwesome5 name={plantDetails.cuisine === "the plant is edible" ? "check" : "times"} size={20} color={plantDetails.cuisine === "the plant is edible" ? "#2D5334" : "#BC4749"} style={{ marginRight: 5 }} />
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{plantDetails.toxicity === "Non-toxic" ? "non-toxic" : "is toxic"}</Text>
            <FontAwesome5 name={plantDetails.toxicity === "Non-toxic" ? "check" : "times"} size={20} color={plantDetails.toxicity === "Non-toxic" ? "#2D5334" : "#BC4749"} style={{ marginRight: 5 }} />
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{plantDetails.seasonality}</Text>
            <FontAwesome5 name={currentSeason.icon} size={20} color={currentSeason.color} style={{ marginRight: 5 }} />
          </View>
        </ScrollView>
        {!isWatered && <TouchableOpacity style={styles.containBadgeIsWatered} onPress={updateLastWatering}>
          <View style={styles.badgeIsWatered}>
            <FontAwesome5 name="burn" size={20} color="white" />
            <Text style={styles.textBadge}>This plant needs water !</Text>
          </View>
        </TouchableOpacity>}
        <View style={styles.containerDescription}>
          <View style={styles.containerTitle}>
            <FontAwesome5 name="info-circle" size={20} color="#2D5334" />
            <Text style={styles.titleInformations}>Informations</Text>
          </View>
          <Text style={styles.description}>{plantDetails.description}</Text>
        </View>
        <RegisterButton title={"Delete from my inventory"} style={styles.button} onPress={deletePlant} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F0E9",
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
  badgeContainer: {
    marginLeft: 10,
    paddingVertical: 10,
  },
  badge: {
    width: 190,
    marginRight: 10,
    paddingVertical: 3,
    paddingHorizontal: 15,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#2D5334",
    backgroundColor: "#95AE7D",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#F1F0E9",
    fontFamily: "OpenSans-Regular",
    marginBottom: 5,
  },
  containBadgeIsWatered:{
    alignItems: "center",
  },
  badgeIsWatered: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#3674B5",
    maxWidth: "60%",
    flexDirection: "row",
    borderRadius: 16,
    marginBottom: 10,
    gap: 8,
  },
  textBadge: {
    color: "white",
  },
  containerDescription: {
    width: "85%",
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#95AE7D",
    borderRadius: 10,
    backgroundColor: "white",
    gap: 12,
    padding: 16,
  },
  containerTitle: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center"
  },
  titleInformations: {
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
