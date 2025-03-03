import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function AuthenticationButton({ title, onPress, style }) {
  return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, style]}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>{title}</Text>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
	button: {
		width: '100%',
    backgroundColor: "#95AE7D",
  },
});
