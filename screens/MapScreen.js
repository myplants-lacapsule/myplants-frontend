import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function MapScreen() {
  const navigation = useNavigation();

  const [currentPosition, setCurrentPosition] = useState(null);

	useEffect(() => {
			(async () => {
				const result = await Location.requestForegroundPermissionsAsync();
				const status = result?.status;
	
				if (status === 'granted') {
					Location.watchPositionAsync({ distanceInterval: 10 },
						(location) => {
							setCurrentPosition(location.coords);
						});
				}
			})();
		}, []);
	

  const handlePress = () => {
    navigation.navigate("NewItemScreen");
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 46.603354,
          longitude: 1.888334,
          latitudeDelta: 5,
          longitudeDelta: 15,
        }}
      />
			{currentPosition && <Marker coordinate={currentPosition} pinColor="#fecb2d" />}
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
    width: 50,
    height: 50,
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
