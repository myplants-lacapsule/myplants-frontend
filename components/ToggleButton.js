import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

const ToggleButton = ({ value, onValueChange, trueLabel, falseLabel }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{value ? trueLabel : falseLabel}</Text>
      <Switch onValueChange={onValueChange} value={value} trackColor={{ false: "#2D5334", true: "#2D5334" }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Affiche l'étiquette et le switch sur la même ligne
    alignItems: "center",
  },
  label: {
    marginRight: 10,
    fontSize: 16,
  },
});

export default ToggleButton;
