import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RegisterButton from "../components/RegisterButton.js";

export default function SignUpScreen() {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.buttonContainer}>
        <RegisterButton
          title="Sign up"
          onPress={() => navigation.navigate("TabNavigator")}
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
  buttonContainer: {
    height: "10px",
    width: "80%",
  },
  button: {
    backgroundColor: "lightblue",
  },
});
