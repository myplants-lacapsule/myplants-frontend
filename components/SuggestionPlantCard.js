import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import RegisterButton from "./RegisterButton";

export default function SuggestionPlantCard({ plantsData, addPlantToBackend }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.topContainer}>
          <Image source={{ uri: plantsData.photo }} style={styles.image} />
          <View style={styles.textContainer}>
            <View style={styles.firstRow}>
              <Text style={styles.title}>{plantsData.name}</Text>
            </View>
            <Text style={styles.description}>{plantsData.description.length > 250 ? plantsData.description.slice(0, 250) + "..." : plantsData.description}</Text>
          </View>
        </View>
        <View style={styles.badges}>
          <View style={styles.wateringBadge}>
            <FontAwesome name="tint" size={25} color="white" />
            <Text style={styles.badgeText}>Every {plantsData.wateringFrequency} days</Text>
          </View>
          <View style={styles.toxicityBadge}>
            <FontAwesome name="fire" size={25} color="white" />
            <Text style={styles.badgeText}>{plantsData.toxicity}</Text>
          </View>
        </View>
      </View>
      <RegisterButton title={"Add to my inventory"} onPress={addPlantToBackend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 40,
    gap: 10,
  },
  card: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "96%",
    height: "330",
    paddingHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D0DDD0",
    backgroundColor: "white",
  },
  topContainer: {
    flexDirection: "row",
    width: "95%",
    height: "70%",
  },
  image: {
    width: "40%",
    height: "100%",
    borderRadius: 5,
  },
  textContainer: {
    width: "60%",
    height: "100%",
    gap: 5,
    padding: 10,
  },
  firstRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: "#2D5334",
    fontSize: 20,
		fontWeight: "bold",
  },
  badges: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 15,
		gap: 4,
  },
  wateringBadge: {
    flexDirection: "row",
		alignItems: "center",
    justifyContent: "space-around",
    width: "auto",
		gap: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
		backgroundColor: "#3674B5",
  },
  toxicityBadge: {
    flexDirection: "row",
		alignItems: "center",
    justifyContent: "space-around",
    width: "auto",
		gap: 4,
		paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
		backgroundColor: "#BC4749",
  },
  badgeText: {
    color: "#F1F0E9",
    fontFamily: "OpenSans-Regular",
  },
});
