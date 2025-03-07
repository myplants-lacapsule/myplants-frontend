import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ItemCard({photo, title, description, price, height, isGiven, isPlant, plantCondition, createdAt, closeModal} ) {
  const navigation = useNavigation();
  const truncatedDescription =
    description.length > 120
      ? description.substring(0, 120) + "..."
      : description;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        closeModal();
        navigation.navigate("FullDetailsItem", {
          itemDetails: {
            photo,
            title,
            description,
            price,
            height,
            isGiven,
            isPlant,
            plantCondition,
            createdAt,
          },
        });
      }}
    >
      <View style={styles.container}>
        <View style={styles.cardContent}>
          <View style={styles.photoContainer}>
            <Image source={{ uri: photo[0] }} style={styles.photo} />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{title}</Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{truncatedDescription}</Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.isGiven}>
                {isGiven ? "Donation" : "Sale"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
  cardContent: {
    flexDirection: "row",
    flex: 1,
    padding: 7,
    alignItems: "center",
  },
  photoContainer: {
    borderRadius: 5,
    width: "35%",
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
