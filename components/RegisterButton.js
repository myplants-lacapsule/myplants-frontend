import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";

export default function RegisterButton({ title, onPress, style, disabled, loading }) {
  return (
    <TouchableOpacity 
    onPress={onPress} 
    style={[styles.button, disabled && styles.disableButton, style]} 
    activeOpacity={0.8}
    disabled={disabled}>
      {loading? (
        <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" color="#F1F0E9" />
        </View>) : (
      <Text style={styles.textButton}>{title}</Text>)}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "96%",
    margin: "2%",
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#95AE7D",
  },
  disabledButton: {
    opacity: 0.6,
  },
  textButton: {
    color: "#F1F0E9",
    height: 35,
    fontWeight: "600",
    fontSize: 16,
    textAlignVertical: "center",
    lineHeight: 35, // assure que le texte occupe toute la hauteur
  },
  loaderContainer: {
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
});
