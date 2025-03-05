import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import RegisterButton from "../components/RegisterButton.js";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image style={styles.image} source={require("../assets/logo.jpg")} />
      <View style={styles.buttonContainer}>
        <RegisterButton
          title="Sign in"
          onPress={() => navigation.navigate("SignIn")}
        />
        <RegisterButton
          title="Sign up"
          onPress={() => navigation.navigate("SignUp")}
        />
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
    marginBottom: 55,
  },
  buttonContainer: {
    height: "10px",
    width: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#F1F0E9",
  },
});
