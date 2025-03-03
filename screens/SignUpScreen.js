import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { login } from "../reducers/user";
import RegisterInput from "../components/RegisterInput.js";
import RegisterButton from "../components/RegisterButton.js";

export default function SignUpScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const handleRegister = () => {
    fetch("http://192.168.100.50:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signUpUsername,
				email: signUpEmail,
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
          placeholder="Username"
          value={signUpUsername}
          onChangeText={setSignUpUsername}
        />
        <RegisterInput
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoComplete="email"
          value={signUpEmail}
          onChangeText={setSignUpEmail}
        />
        <RegisterInput
          placeholder="Password"
          textContentType="password"
          autoComplete="password"
          value={signUpPassword}
          onChangeText={setSignUpPassword}
					secureTextEntry={true}
        />
        <RegisterButton title="Sign up" onPress={handleRegister} />
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
