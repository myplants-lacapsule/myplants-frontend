import { KeyboardAvoidingView, Platform, StyleSheet, View, Text } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { login } from "../reducers/user";

import RegisterInput from "../components/RegisterInput.js";
import RegisterButton from "../components/RegisterButton.js";
import ReturnButton from "../components/ReturnButton.js";

export default function SignUpScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(String(email).toLowerCase());
  };

  const handleRegister = () => {
    if (!signUpUsername) {
      setError("Empty username");
      return;
    }
    if (!signUpEmail || !validateEmail(signUpEmail)) {
      setError("Incorrect email address");
      return;
    }
    if (!signUpPassword) {
      setError("Empty password");
      return;
    }
    if (signUpPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signUpUsername,
        email: signUpEmail.toLowerCase(),
        password: signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ username: data.username, token: data.token }));
          setSignUpUsername("");
          setSignUpEmail("");
          setSignUpPassword("");
          setError("");
          navigation.navigate("TabNavigator");
        } else {
          setError("An error has occurred.");
        }
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ReturnButton />
      <View style={styles.registerContainer}>
        <RegisterInput placeholder="Username" value={signUpUsername} onChangeText={setSignUpUsername} />
        <RegisterInput placeholder="Email address" autoCapitalize="none" keyboardType="email-address" textContentType="emailAddress" autoComplete="email" value={signUpEmail} onChangeText={(text) => setSignUpEmail(text.toLowerCase())} />
        <RegisterInput placeholder="Password" textContentType="password" autoComplete="password" value={signUpPassword} onChangeText={setSignUpPassword} secureTextEntry={true} />
        <RegisterButton title="Sign up" onPress={handleRegister} />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F0E9",
  },
  registerContainer: {
    width: "80%",
    alignSelf: "center",
    marginTop: 220,
  },
  errorText: {
    width: "80%",
    color: "red",
    marginLeft: 7,
    marginBottom: 10,
  },
});
