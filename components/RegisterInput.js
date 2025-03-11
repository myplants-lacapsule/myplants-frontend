import { StyleSheet, Text, TextInput, View } from "react-native";

export default function RegisterInput({ title, placeholder, onChangeText, value, style, secureTextEntry, ...otherProps }) {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <TextInput style={[styles.input, style]} placeholder={placeholder} value={value} onChangeText={onChangeText} secureTextEntry={secureTextEntry} {...otherProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#2D5334",
    fontFamily: "OpenSans-Regular",
    paddingLeft: 7,
  },
  input: {
    height: 45,
    width: "96%",
    margin: "2%",
    paddingTop: 10,
    paddingLeft: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#65924B",
    backgroundColor: "white",
  },
});
