import {
	StyleSheet,
	Text,
	View,
} from "react-native";

export default function MapScreen() {
	return (
	<View style={styles.container}>
		<Text style={styles.title}>MapScreen</Text>
	</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'purple',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
