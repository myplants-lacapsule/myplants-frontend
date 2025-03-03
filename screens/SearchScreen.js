import {
	StyleSheet,
	Text,
	View,
} from "react-native";

export default function SearchScreen() {
	return (
	<View style={styles.container}>
		<Text style={styles.title}>SearchScreen</Text>
	</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'orange',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
