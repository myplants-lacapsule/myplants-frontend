import { KeyboardAvoidingView, Platform, StyleSheet, View, Text } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { login } from "../reducers/user";

import RegisterInput from "../components/RegisterInput";
import RegisterButton from "../components/RegisterButton";
import ReturnButton from "../components/ReturnButton";

export default function SignInScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [error, setError] = useState("");

  // Fonction pour gérer la connexion de l'utilisateur
  const handleConnection = async () => {
    try {
      if (!signInEmail) {
        setError("Incorrect email address");
        return;
      }
      if (!signInPassword) {
        setError("Incorrect password");
        return;
      }
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signInEmail, password: signInPassword }),
      });
      const data = await response.json();

      if (data.result) {
        dispatch(login({ username: data.username, token: data.token }));
        setSignInEmail("");
        setSignInPassword("");
        setError("");
        navigation.navigate("TabNavigator");
      } else {
        setError("This user does not exist");
      }
    } catch (error) {
      console.error("Error signing in", error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ReturnButton />
      <View style={styles.registerContainer}>
        <RegisterInput title="Email address" placeholder="Email address" autoCapitalize="none" keyboardType="email-address" textContentType="emailAddress" autoComplete="email" value={signInEmail} onChangeText={setSignInEmail} />
        <RegisterInput title="Password" placeholder="Password" secureTextEntry={true} textContentType="password" autoComplete="password" value={signInPassword} onChangeText={setSignInPassword} />
        <RegisterButton title="Sign in" onPress={handleConnection} />
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
