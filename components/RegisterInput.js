import { StyleSheet, TextInput, View } from "react-native";

export default function RegisterInput({ placeholder, onChangeText, value, style, secureTextEntry }) {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
				value={value}
        onChangeText={onChangeText}
        style={[styles.input, style]}
				secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
		height: 45,
		width: '96%',
		margin: '2%',
		paddingTop: 10,
		paddingLeft: 5,
    borderWidth: 1,
		borderRadius: 5,
		borderColor: '#65924B',
    backgroundColor: "#F1F0E9",
  },
});
