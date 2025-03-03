import React from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from "react-native";
import MapView from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

export default function MapScreen() {
   const navigation = useNavigation();

   const handlePress = () => {
     navigation.navigate("NewItemScreen");
   };



	return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }} />
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#2D5334",
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
