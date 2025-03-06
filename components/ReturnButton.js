import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ReturnButton() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <FontAwesome name="arrow-left" size={24} color="#2D5334" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignSelf: "flex-start",
		backgroundColor: 'lightblue'
  },
});
