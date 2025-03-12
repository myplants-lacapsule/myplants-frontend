import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

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
    alignItems: "center",
    flexDirection: "row",
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
});

export default ToggleButton;
