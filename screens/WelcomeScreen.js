import { Image, KeyboardAvoidingView, Platform, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RegisterButton from "../components/RegisterButton";

import { useEffect } from "react";

import { useSelector } from "react-redux";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const userInStore = useSelector((state) => state.user.value);

  // check si l'user est déjà connecté, si oui redirection vers HomeScreen
  useEffect(() => {
    if (userInStore.token !== null){
      navigation.navigate("TabNavigator", { screen: "Home" })
    }
  }, [])

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Image style={styles.image} source={require("../assets/logo.jpg")} />
      <Text style={styles.title}><Text style={styles.ttitle}>my</Text>Plants</Text>
      <View style={styles.buttonContainer}>
        <RegisterButton title="Sign in" onPress={() => navigation.navigate("SignInScreen")} />
        <RegisterButton title="Sign up" onPress={() => navigation.navigate("SignUpScreen")} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F0E9",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    margin: 10,
    width: 150,
    height: 150,
    borderRadius: 15,
  },
  buttonContainer: {
    height: "10px",
    width: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#F1F0E9",
  },
  title:{
    color: "#95AE7D",
    fontFamily: "Merriweather-Bold",
    fontSize: 40,
    paddingBottom: 40,
  },
  ttitle:{
    fontFamily: "Merriweather-Black",
    fontSize: 35,
  }
});
