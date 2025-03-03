import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { login } from "../reducers/user";
import RegisterInput from "../components/RegisterInput.js";
import RegisterButton from "../components/RegisterButton.js";

export default function SignInScreen() {
  const dispatch = useDispatch();
	const navigation = useNavigation();

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const handleConnection = () => {
    fetch(`http://192.168.100.151:3000/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: signInEmail, password: signInPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ email: signInEmail, token: data.token }));
          setSignInEmail("");
          setSignInPassword("");
          navigation.navigate("TabNavigator");
        }
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.registerContainer}>
        <RegisterInput
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoComplete="email"
          value={signInEmail}
          onChangeText={setSignInEmail}
        />
        <RegisterInput
          placeholder="Password"
          secureTextEntry={true}
          textContentType="password"
          autoComplete="password"
          value={signInPassword}
          onChangeText={setSignInPassword}
        />
        <RegisterButton title="Sign in" onPress={handleConnection} />
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
  registerContainer: {
    width: "80%",
  },
});
