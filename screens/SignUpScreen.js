import { KeyboardAvoidingView, Platform, StyleSheet, View, Text } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { login } from "../reducers/user";

import RegisterInput from "../components/RegisterInput";
import RegisterButton from "../components/RegisterButton";
import ReturnButton from "../components/ReturnButton";

export default function SignUpScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [error, setError] = useState("");

  // Fonction pour valider le format d'une adresse e-mail
  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(String(email).toLowerCase());
  };

  // Fonction pour gérer l'inscription de l'utilisateur
  const handleRegister = async () => {
    try {
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
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: signUpUsername,
          email: signUpEmail.toLowerCase(),
          password: signUpPassword,
        }),
      });
      const data = await response.json();

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
    } catch (error) {
      console.error("Error signing up", error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ReturnButton />
      <View style={styles.registerContainer}>
        <RegisterInput title="Username" placeholder="Username" autoCapitalize="none" value={signUpUsername} onChangeText={setSignUpUsername} />
        <RegisterInput title="Email address" placeholder="Email address" autoCapitalize="none" keyboardType="email-address" textContentType="emailAddress" autoComplete="email" value={signUpEmail} onChangeText={(text) => setSignUpEmail(text.toLowerCase())} />
        <RegisterInput title="Password" placeholder="Password" textContentType="password" autoComplete="password" value={signUpPassword} onChangeText={setSignUpPassword} secureTextEntry={true} />
        <RegisterButton title="Sign up" onPress={handleRegister} />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#F1F0E9",
  },
  registerContainer: {
    width: "80%",
    alignSelf: "center",
    marginTop: 140,
  },
  errorText: {
    width: "80%",
    color: "red",
    marginLeft: 7,
    marginBottom: 10,
  },
});
