import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import RegisterButton from "../components/RegisterButton.js";
import ReturnButton from "../components/ReturnButton.js";

export default function UserScreen() {
  const navigation = useNavigation();
  const userInStore = useSelector((state) => state.user.value);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ReturnButton destination={"Home"} />
      <View style={styles.componentsContainer}>
        <View style={styles.avatarContainer}>
          <FontAwesome5
            name="user-ninja"
            size={150}
            color={"#2D5334"}
            solid={true}
          />
        </View>
        <View style={styles.usernameContainer}>
          <Text style={styles.username}>{userInStore.username}</Text>
        </View>
        <RegisterButton
          title="My items for sale"
          onPress={() => navigation.navigate("UserItemsDetailsScreen")}
          style={styles.button}
        />
        <RegisterButton title="Settings" style={styles.button} />
        <RegisterButton
          title="Log out"
          onPress={() => navigation.navigate("WelcomeScreen")}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    backgroundColor: "#F1F0E9",
  },
  componentsContainer: {
    height: "100%",
    width: "80%",
    flexDirection: "column",
    paddingTop: 60,
  },
  avatarContainer: {
    height: "30%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  usernameContainer: {
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    color: "#2D5334",
    fontSize: 30,
    fontFamily: "Merriweather",
  },
});
