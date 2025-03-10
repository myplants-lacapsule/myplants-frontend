import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import { useNavigation } from "@react-navigation/native";

import ReturnButton from "../components/ReturnButton"
import Notifications from "../components/Notifications"

export default function NotificationScreen({ route }) {
  const navigation = useNavigation();

  const { unwateredPlant } = route.params;

  const notificationsUnwateredPlant = unwateredPlant.length > 0 && unwateredPlant.map((data, i) => {
    return <Notifications key={i} name={data.name} lastWatering={Date(data.lastWatered)} />
  })

  return (
    <SafeAreaView style={styles.container}>
      <ReturnButton title={"Notifications"}/>
      {notificationsUnwateredPlant ? <View style={styles.containerNotifications}>{notificationsUnwateredPlant}</View> : <Text style={styles.noNotificationsMessage}>No notifications.</Text>}
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 40,
  },
  noNotificationsMessage: {
    color: "#2D5334",
    fontSize: 14,
    fontFamily: "Merriweather",
    alignSelf: "center",
    marginTop: "50%",
  },
});
