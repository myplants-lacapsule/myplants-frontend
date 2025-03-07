import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function UserScreen() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.jpg")} style={styles.avatar} />
      <Text>UserScreen</Text>
      <View>
        <TouchableOpacity>
          <Text>Parameters</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("UserItemsDetailsScreen")}>
          <Text>My plants for sale</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F0E9",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 50,
  },
});
