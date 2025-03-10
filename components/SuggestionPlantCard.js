import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import RegisterButton from "./RegisterButton";

export default function SuggestionPlantCard({ plantsData, addPlantToBackend }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.topContainer}>
          <Image source={{ uri: plantsData.photo }} style={styles.image} />
          <View style={styles.containText}>
            <View style={styles.firstrow}>
              <Text style={styles.title}>{plantsData.name}</Text>
            </View>
            <Text style={styles.description}>{plantsData.description.length > 250 ? plantsData.description.slice(0, 250) + "..." : plantsData.description}</Text>
          </View>
        </View>
        <View style={styles.badges}>
          <View style={styles.badgeWatering}>
            <FontAwesome name="tint" size={25} color="white" />
            <Text style={styles.textBadges}>Every {plantsData.wateringFrequency} days</Text>
          </View>
          <View style={styles.badgeToxicity}>
            <FontAwesome name="fire" size={25} color="white" />
            <Text style={styles.textBadges}>{plantsData.toxicity}</Text>
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
    height: '330',
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
  containText: {
    width: "60%",
    height: "100%",
    gap: 5,
    padding: 10,
  },
  firstrow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    color: "#2D5334",
    fontSize: 20,
  },
  badges: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 15,
  },
  badgeWatering: {
    flexDirection: "row",
    backgroundColor: "#3674B5",
    borderRadius: 80,
    padding: 4,
    width: "45%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  badgeToxicity: {
    flexDirection: "row",
    backgroundColor: "#BC4749",
    borderRadius: 80,
    padding: 4,
    width: "45%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  textBadges: {
    color: "white",
  },
});
