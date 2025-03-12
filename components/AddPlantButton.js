import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function AddPlantButton() {
  return (
    <View style={styles.button}>
      <FontAwesome name="check" size={32} color={"white"} />
      <Text style={styles.textButton}>Add to my inventory</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 24,
    borderRadius: 5,
    backgroundColor: "#95AE7D",
  },
  textButton: {
    color: "#F1F0E9",
    fontSize: 16,
    fontWeight: "600",
  },
});
