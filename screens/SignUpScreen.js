import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthenticationButton from "../components/AuthenticationButton.js";

export default function SignUpScreen() {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <AuthenticationButton
        title="Sign up"
        onPress={() => navigation.navigate("TabNavigator")}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightyellow",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "lightblue",
  },
});
