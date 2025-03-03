import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";


export default function PlantConditionPicker() {
  const [condition, setCondition] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>État :</Text>
      <Picker
        selectedValue={condition}
        onValueChange={(itemValue, itemIndex) => setCondition(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Très bon état" value="tresBon" />
        <Picker.Item label="Bon état" value="bon" />
        <Picker.Item label="Satisfaisant" value="satisfaisant" />
        <Picker.Item label="Mauvais état" value="mauvais" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
  },
  picker: {
    backgroundColor: "#F1F0E9",
    width: "100%",
    height: "30%",
  },
});
