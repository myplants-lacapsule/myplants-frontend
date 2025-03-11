import React from "react";
import { StyleSheet, Text, View } from "react-native";
import moment from "moment";

export default function Notifications(props) {
  // Utilisation de moment pour afficher la date du dernier arrosage
  const date = moment(props.lastWatering);
  const lastWatered = moment(date).format("MMMM Do YYYY");

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Your plant <Text style={styles.boldText}>{props.name}</Text> needs water !
      </Text>
      <Text style={styles.text}>
        The last watering was on: <Text style={styles.boldText}>{lastWatered}</Text>
      </Text>
    </View>
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
});
