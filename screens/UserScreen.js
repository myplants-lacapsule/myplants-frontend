import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { logout } from "../reducers/user.js";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import RegisterButton from "../components/RegisterButton";
import ReturnButton from "../components/ReturnButton";

export default function UserScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInStore = useSelector((state) => state.user.value);

  // Fonction déconnexion
  const logoutUser = () => {
    dispatch(logout());
    navigation.navigate("WelcomeScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ReturnButton destination={"Home"} />
      <View style={styles.componentsContainer}>
        <View style={styles.avatarContainer}>
          <FontAwesome5 name="user-ninja" size={120} color={"#2D5334"} solid={true} />
        </View>
        <View style={styles.usernameContainer}>
          <Text style={styles.username}>{userInStore.username}</Text>
        </View>
        <RegisterButton title="My items for sale" onPress={() => navigation.navigate("UserItemsDetailsScreen")} style={styles.button} />
        <RegisterButton title="Settings" style={styles.button} />
        <RegisterButton title="Log out" onPress={logoutUser} style={styles.button} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#F1F0E9",
  },
  componentsContainer: {
    height: "100%",
    width: "80%",
    alignSelf: "center",
  },
  avatarContainer: {
    height: "20%",
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
