import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthenticationButton from '../components/AuthenticationButton.js';

export default function SignInScreen() {
	const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <AuthenticationButton 
							title='Sign in'
							onPress={() => navigation.navigate('SignIn')}
							/>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
	button: {
    backgroundColor: "lightblue",
  },
});
