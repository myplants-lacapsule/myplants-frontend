import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/user.js"

import { useNavigation } from "@react-navigation/native";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import RegisterButton from "../components/RegisterButton.js";
import ReturnButton from "../components/ReturnButton.js";


export default function UserScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout())
    navigation.navigate("WelcomeScreen")
  }

  return (
    <SafeAreaView style={styles.container}>
      <ReturnButton destination={"Home"} />
      <View style={styles.componentsContainer}>
        <View style={styles.avatarContainer}>
          <FontAwesome5 name="user-ninja" size={150} color={"#2D5334"} solid={true} />
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
    height: "25%",
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
