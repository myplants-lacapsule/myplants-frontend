import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import moment from "moment";

export default function PlantCard(props) {
  const navigation = useNavigation();

  // Tronquer la description à 120 caractères
  const truncatedDescription = props.description.length > 120 ? props.description.substring(0, 120) + "..." : props.description;

  // Ajout de moment pour récupérer la date du dernier arrosage
  const date = moment(props.lastWatering)
  const lastWatered = moment(date).format('MMMM Do YYYY');

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("FullDetailsPlant", { plantDetails: props })}>
        <View style={styles.photoContainer}>
          <Image source={{ uri: props.photo }} style={styles.photo} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.description}>{truncatedDescription}</Text>
          <View style={styles.lastWatered}>
            <View style={[styles.badge, !props.isWatered ? styles.notWatered : styles.watered]}>
              {!props.isWatered ? <FontAwesome5 name="tint" size={16} color="#F1F0E9" /> : <FontAwesome5 name="tint-slash" size={16} color="#F1F0E9" />}
              <Text style={styles.textBadge}>
                {lastWatered}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: "white",
    height: 160,
    padding: 7,
    margin: 5,
    borderRadius: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#D0DDD0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  photoContainer: {
		width: "35%",
    borderRadius: 5,
  },
  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  infoContainer: {
    width: "65%",
    paddingLeft: 10,
    justifyContent: "space-evenly",
  },
  name: {
    color: "#2D5334",
    fontSize: 16,
    fontFamily: "Merriweather-Bold",
  },
  description: {
		flexWrap: "wrap",
    fontFamily: "OpenSans-Regular",
  },
  lastWatered: {
    width: "65%",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
		height: 25,
    gap: 6,
    marginVertical: 5,
		borderRadius: 25,
  },
  watered: {
    backgroundColor: "#95AE7D",
  },
  notWatered: {
    backgroundColor: "#BC4749",
  },
  textBadge: {
    fontSize: 11,
    color: "#F1F0E9",
  },
});
