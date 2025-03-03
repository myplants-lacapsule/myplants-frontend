import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text } from "react-native";

export default function WelcomeScreen({ navigation }) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>WelcomeScreen</Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
  },
});
