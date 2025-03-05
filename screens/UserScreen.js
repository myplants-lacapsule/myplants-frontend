import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function UserScreen() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.jpg")} style={styles.avatar} />
      <Text>UserScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F0E9",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 50,
  },
});
