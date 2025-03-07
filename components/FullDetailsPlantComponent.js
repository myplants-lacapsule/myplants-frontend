import React from "react";
import {
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import RegisterButton from "./RegisterButton";

export default function FullDetailsPlantComponent() {
  console.log("plantDetails", plantDetails);

  const navigation = useNavigation();

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
              const response = await fetch(
                `${process.env.EXPO_PUBLIC_API_URL}/plants/deletePlant/${plantDetails.token}`,
                {
                  method: "DELETE",
                  "Content-Type": "application/json",
                }
              );

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={{ uri: plantDetails.photo }} style={styles.image} />
        <Text style={styles.name}>{plantDetails.name}</Text>
        <ScrollView horizontal={true} style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{plantDetails.cuisine}</Text>
            <FontAwesome name="check" size={25} color="#F1F0E9" />
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{plantDetails.toxicity}</Text>
            <FontAwesome name="check" size={25} color="#F1F0E9" />
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{plantDetails.seasonality}</Text>
            <FontAwesome name="snowflake-o" size={25} color="#F1F0E9" />
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{plantDetails.sunExposure}</Text>
            <FontAwesome name="tint" size={25} color="#F1F0E9" />
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Water every {plantDetails.wateringFrequency} days</Text>
            <FontAwesome name="tint" size={25} color="#F1F0E9" />
          </View>
        </ScrollView>

        <Text style={styles.description}>{plantDetails.description}</Text>
        <RegisterButton
          title={"Delete from my inventory"}
          style={styles.button}
          onPress={deletePlant}
        />
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
    width: 100,
    marginRight: 10,
    paddingVertical: 8,
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
	description: {
    width: "85%",
    alignSelf: "center",
    padding: 10,
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
    borderWidth: 2,
    borderColor: "#95AE7D",
    borderRadius: 10,
    backgroundColor: "#F8F3D9",
  },
	button: {
		fontFamily: 'OpenSans-Regular',
		backgroundColor: "#BC4749",
	},
});
