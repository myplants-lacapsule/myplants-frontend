import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function CustomButton({ onPress, text, iconName }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.iconContainer}>
        <FontAwesome name={iconName} size={30} color="#F1F0E9" />
      </View>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2D5334",
    paddingVertical: 10,
    borderRadius: 25,
    marginVertical: 5,
    width: "50%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  buttonText: {
    color: "#F1F0E9",
    fontSize: 14,
  },
});
