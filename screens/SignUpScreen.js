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
import { API_URL } from 'react-native-dotenv';
import RegisterInput from "../components/RegisterInput.js";
import RegisterButton from "../components/RegisterButton.js";

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
      setError("Nom d'utilisateur incorrect");
      return;
    }
    if (!signUpEmail || !validateEmail(signUpEmail)) {
      setError("Adresse email incorrecte");
      return;
    }
    if (!signUpPassword) {
      setError("Mot de passe incorrect");
      return;
    }
    if (signUpPassword.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    fetch(`${API_URL}/users/signup`, {
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
          dispatch(login({ username: signUpUsername, token: data.token }));
          setSignUpUsername("");
          setSignUpEmail("");
          setSignUpPassword("");
          setError("");
          navigation.navigate("TabNavigator");
        } else {
          setError("Une erreur est survenue");
        }
      })
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.registerContainer}>
        <RegisterInput
          placeholder="Nom d'utilisateur"
          value={signUpUsername}
          onChangeText={setSignUpUsername}
        />
        <RegisterInput
          placeholder="Adresse email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoComplete="email"
          value={signUpEmail}
          onChangeText={(text) => setSignUpEmail(text.toLowerCase())}
        />
        <RegisterInput
          placeholder="Mot de passe"
          textContentType="password"
          autoComplete="password"
          value={signUpPassword}
          onChangeText={setSignUpPassword}
          secureTextEntry={true}
        />
        <RegisterButton title="S'inscrire" onPress={handleRegister} />
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
		width: '80%',
		color: "red",
		marginLeft: 7,
    marginBottom: 10,
  },
});
