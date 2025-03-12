import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import moment from "moment";

import { useNavigation } from "@react-navigation/native";

import FontAwesome from "react-native-vector-icons/FontAwesome";


export default function Notifications(props) {

  // Utilisation de moment pour afficher la date du dernier arrosage
  const date = moment(props.lastWatering);
  const lastWatered = moment(date).format("MMMM Do YYYY");

  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("FullDetailsPlant", { plantDetails: props })} >
      <View style={styles.contentContainer}>
        <FontAwesome name="exclamation-triangle" size={30} color="#BC4749" />
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Your plant <Text style={styles.boldText}>{props.name}</Text> needs water !
          </Text>
          <Text style={styles.text}>
            The last watering was on: <Text style={styles.boldText}>{lastWatered}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 80,
    padding: 13,
    margin: 3,
    justifyContent: "center",
    backgroundColor: 'white',
  },
  text: {
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
  },
  boldText: {
    fontFamily: "OpenSans-Bold",
    color: "#2D5334",
    fontSize: 16,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  }
});
