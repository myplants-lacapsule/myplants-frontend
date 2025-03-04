import { KeyboardAvoidingView, Platform, StyleSheet, View, Switch, Text} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { login } from "../reducers/user.js";
import RegisterButton from "../components/RegisterButton.js";
import RegisterInput from "../components/RegisterInput.js";

export default function NewItemScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const handleConnection = () => {
    fetch("http://192.168.43.241:3000/users/signin", {
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
          placeholder="Title"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoComplete="email"
          value={signInEmail}
          onChangeText={setSignInEmail}
          returnKeyType="next"
        />
        <RegisterInput
          placeholder="Description"
          textContentType="password"
          autoComplete="password"
          value={signInPassword}
          onChangeText={setSignInPassword}
          returnKeyType="done"
        />
        <RegisterInput
          placeholder="Price"
          textContentType="password"
          autoComplete="password"
          value={signInPassword}
          onChangeText={setSignInPassword}
          returnKeyType="done"
        />
        <RegisterInput
          placeholder="Height"
          textContentType="password"
          autoComplete="password"
          value={signInPassword}
          onChangeText={setSignInPassword}
          returnKeyType="done"
        />
        {/*  <View style={styles.toggleContainer}>
          <Text style={styles.label}>{isVente ? "Vente" : "Don"}</Text>
          <Switch onValueChange={toggleSwitch} value={isVente} />
        </View> */}

        <RegisterButton
          title="Ajouter mon article "
          onPress={handleConnection}
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
  registerContainer: {
    width: "80%",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  label: {
    marginRight: 10,
    fontSize: 16,
  },
});
