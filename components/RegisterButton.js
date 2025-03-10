import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function RegisterButton({ title, onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]} activeOpacity={0.8}>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  textButton: {
    color: "#F1F0E9",
    height: 35,
    fontWeight: "600",
    fontSize: 16,
  },
});
