import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";

export default function RegisterButton({ title, onPress, style, disabled, loading }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, disabled && styles.disableButton, style]} activeOpacity={0.8} disabled={disabled}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color="#F1F0E9" />
        </View>
      ) : (
        <Text style={styles.textButton}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
		width: "96%",
		margin: "2%",
		paddingVertical: 5,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5,
		backgroundColor: "#95AE7D",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5,
	},
	disabledButton: {
		opacity: 0.6,
		pointerEvents: "none",
	},
	textButton: {
		color: "#F1F0E9",
		height: 35,
		fontWeight: "600",
		fontSize: 16,
		textAlign: "center",
		lineHeight: 35,
		textAlignVertical: "center",
	},
  loaderContainer: {
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
});
