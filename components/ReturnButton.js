import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ReturnButton({ destination, title }) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (destination !== undefined) {
      navigation.navigate(destination);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <FontAwesome name="arrow-left" size={24} color="#2D5334" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    width: 50,
    height: 50,
    padding: 10,
    paddingLeft: 20,
    alignSelf: "flex-start",
  },
  title: {
    color: "#2D5334",
    fontSize: 26,
    paddingLeft: 25,
    fontFamily: "Merriweather-Bold",
  },
});
