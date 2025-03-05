import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { login } from "../reducers/user";
import { EXPO_PUBLIC_API_URL } from "react-native-dotenv";
import RegisterInput from "../components/RegisterInput.js";
import RegisterButton from "../components/RegisterButton.js";

export default function SignInScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [error, setError] = useState("");

  const handleConnection = () => {
    if (!signInEmail) {
      setError("Adresse email incorrecte");
      return;
    }
    if (!signInPassword) {
      setError("Mot de passe incorrect");
      return;
    }

    fetch(`${EXPO_PUBLIC_API_URL}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: signInEmail, password: signInPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ username: data.username, token: data.token }));
          setSignInEmail("");
          setSignInPassword("");
          setError("");
          navigation.navigate("TabNavigator");
        } else {
          setError("Cet utilisateur n'existe pas");
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
          placeholder="Adresse email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoComplete="email"
          value={signInEmail}
          onChangeText={setSignInEmail}
        />
        <RegisterInput
          placeholder="Mot de passe"
          secureTextEntry={true}
          textContentType="password"
          autoComplete="password"
          value={signInPassword}
          onChangeText={setSignInPassword}
        />
        <RegisterButton title="Se connecter" onPress={handleConnection} />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
  errorText: {
    width: "80%",
    color: "red",
    marginLeft: 7,
    marginBottom: 10,
  },
});
