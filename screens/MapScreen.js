import React from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
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
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#2D5334",
    width: 70, 
    height: 70, 
    borderRadius: 35, 
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
});
