import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function PlantCard({ photo, name, description = "" }) {
  const truncatedDescription =
    description.length > 120
      ? description.substring(0, 120) + "..."
      : description;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.photoContainer}>
          <Image source={{ uri: photo }} style={styles.photo} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{name}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{truncatedDescription}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: "#FBFBFB",
    height: 150,
    padding: 7,
    margin: 5,
    borderRadius: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#D0DDD0",
  },
  photoContainer: {
    borderRadius: 5,
    width: "35%",
    backgroundColor: "pink",
  },
  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  infoContainer: {
    width: "65%",
    paddingLeft: 10,
  },
  name: {
    color: "#2D5334",
    fontSize: 16,
    fontFamily: "Merriweather-Bold",
  },
  descriptionContainer: {},
  description: {
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
    flexWrap: "wrap",
  },
});