import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Button
} from "react-native";

import { CameraView, Camera } from 'expo-camera';

import { useEffect, useState } from 'react';

export default function SearchScreen() {

	const [hasPermission, setHasPermission] = useState(false);
	console.log(hasPermission);

	useEffect(() => {
		(async () => {
			const result = await Camera.requestCameraPermissionsAsync();
			setHasPermission(result && result?.status === 'granted');
		})();
	}, []);

	if (!hasPermission) {
		return <View />;
	}

	return (
		<SafeAreaView style={styles.container}>
			<Button title="Search"></Button>
			<Button title="Photo"></Button>
			<Text style={styles.title}>SearchScreen</Text>
		</SafeAreaView>
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
