import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ReturnButton({ destination }) {
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
      <View>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <FontAwesome name="arrow-left" size={24} color="#2D5334" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    flexDirection: 'row',
		paddingTop: 20,
  },
  button: {
    width: 50,
    height: 50,
    padding: 10,
		paddingLeft: 20,
    alignSelf: "flex-start",
  },
});
