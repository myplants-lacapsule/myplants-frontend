import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text } from "react-native";

export default function SignUpScreen({ navigation }) {
	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<Text style={styles.title}>SignUpScreen</Text>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "lightyellow",
	},
});
