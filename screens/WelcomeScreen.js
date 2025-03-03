import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
	View
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthenticationButton from '../components/AuthenticationButton.js';

export default function WelcomeScreen() {
	const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image style={styles.image} source={require("../assets/favicon.png")} />
      <View style={styles.buttonContainer}>
        <AuthenticationButton 
				title='Sign in'
				onPress={() => navigation.navigate('SignIn')}
				/>
				<AuthenticationButton
				title='Sign up'
				onPress={() => navigation.navigate('SignUp')}/>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {},
	buttonContainer: {
		width: "80%",
	},
});
