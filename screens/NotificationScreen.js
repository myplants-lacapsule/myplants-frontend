import React from "react";
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";

import ReturnButton from "../components/ReturnButton";
import Notifications from "../components/Notifications";

export default function NotificationScreen({ route }) {
  const { unwateredPlant } = route.params;

  // Affichage des notifications pour chaque plante non arrosée
  const notificationsUnwateredPlant =
    unwateredPlant.length > 0 && unwateredPlant.map((data, i) => {
      return <Notifications key={i} {...data} />;
    });

  return (
    <SafeAreaView style={styles.container}>
      <ReturnButton title={"Notifications"} />
      {notificationsUnwateredPlant ? <ScrollView style={styles.containerNotifications}>{notificationsUnwateredPlant}</ScrollView> : <Text style={styles.noNotificationsMessage}>No notifications.</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#F1F0E9",
  },
  containerNotifications: {
    width: "100%",
    marginTop: 40,
  },
  noNotificationsMessage: {
    color: "#2D5334",
    marginTop: "50%",
    alignSelf: "center",
    fontFamily: "Merriweather",
  },
});
