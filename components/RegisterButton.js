import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function RegisterButton({ title, onPress, style }) {
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
    width: "96%",
    margin: "2%",
    paddingTop: 10,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#95AE7D",
  },
  textButton: {
    color: "#F1F0E9",
    height: 35,
    fontWeight: "600",
    fontSize: 16,
  },
});
