import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Button
} from "react-native";

import { CameraView, Camera } from 'expo-camera';

import { useEffect, useState, useRef } from 'react';

import { useIsFocused } from '@react-navigation/native';

export default function SearchScreen() {

	const perenualKey = 'sk-BfUS67c5d3516107b8879';
	const plantidKey = 'yt5qbNhx3aSWTU3MI8ncS7YOhmOaNXBuDBjX8P6V06kEAfgFIa';

	const [showSuggestions, setShowSuggestions] = useState(false);
	const [showCamera, setShowCamera] = useState(false)
	const [plantsData, setPlantsData] = useState(null);

	const cameraRef = useRef(null);
	const isFocused = useIsFocused();
	const [hasPermission, setHasPermission] = useState(false); // état de la permission

	// obtenir la permission de la caméra au clic sur le bouton photo
	const getPermission = async () => {
		const status = await Camera.requestCameraPermissionsAsync();
		setHasPermission(status && status?.status === 'granted');
		setShowCamera(true) // set l'état pour afficher la caméra
	}

	// fonction pour la prise de photo
	const takePicture = async () => {
		try {
			const photo = await cameraRef.current?.takePictureAsync({ quality: 0.3 });
			if (photo) {
				sendPictureToBack(photo.uri);
			}
		} catch (error) {
			console.error("Error taking picture:", error);
		}

	};

	// fonction pour envoyer la photo vers le back
	const sendPictureToBack = async (photoUri) => {
		const formData = new FormData();
		formData.append('photoFromFront', {
			uri: photoUri,
			name: 'photo.jpg',
			type: 'image/jpeg',
		});

		try {
			const response = await fetch('http://192.168.100.151:3000/plants/upload', {
				method: 'POST',
				body: formData,
			})

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const responseFromCloudinary = await response.json()
			identificationPlantId(responseFromCloudinary.url)

		} catch (error) {
			console.error("Error taking picture:", error);
		}
	}

	const identificationPlantId = async (cloudinaryUrl) => {
		var myHeaders = new Headers();
		myHeaders.append("Api-Key", plantidKey);
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			"images": [
				cloudinaryUrl,
			],
			"similar_images": true
		});

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};

		try {
			const response = await fetch("https://plant.id/api/v3/identification", requestOptions)

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();

			const plantProbability = data.result.is_plant.probability
			const plantName = data.result.classification.suggestions[0].name
			console.log(plantName)

			if (plantProbability < 0.75 || !plantProbability) {
				console.log("probabilité trop basse");
			} else {
				setPlantsData({ name: 'Ficus', description: 'description de ma plante' });
				setShowCamera(false)
				setShowSuggestions(true)
			}
			// try {
			// 	const responsePerenual = await fetch(`https://perenual.com/api/v2/species-list?key=${perenualKey}&q=${plantName}`);
			// 	if (!responsePerenual.ok) {
			// 		throw new Error('La réponse du réseau n\'est pas correcte');
			// 	}

			// 	const dataIdPerenual = await responsePerenual.json();

			// 	const idPerenual = dataIdPerenual.data[0].id;

			// 	console.log(idPerenual)

			// 	if (idPerenual) {
			// 		setPlantsData({ name: 'Ficus', description: 'description de ma plante' });
			// 		setShowCamera(false)
			// 		setShowSuggestions(true)
			// 	}

			// if (idPerenual) {
			// 	try {
			// 		const fetchPerenualDetails = await fetch(`https://perenual.com/api/v2/species/details/${idPerenual}?key=${perenualKey}`);
			// 		if (!fetchPerenualDetails.ok) {
			// 			throw new Error('La réponse du réseau n\'est pas correcte');
			// 		}

			// 		const dataPerenual = await fetchPerenualDetails.json();
			// 		console.log(dataPerenual)

			// 		// Vérifiez que les données sont valides avant de les utiliser
			// 		if (dataPerenual) {
			// 			setPlantsData(dataPerenual);
			// 			setShowCamera(false)
			// 			setShowSuggestions(true)
			// 		} else {
			// 			console.error("Données invalides reçues de l'API Perenual");
			// 		}
			// 	} catch (error) {
			// 		console.error("Erreur lors de la récupération des détails de la plante :", error);
			// 	}
			// } else {
			// 	console.log("Aucun ID trouvé dans la réponse");
			// }
			// 		} catch (error) {
			// 			console.error("Erreur lors de la récupération des données de la plante :", error);
			// 		}
			// 	}

		} catch (error) {
			console.error("Error taking picture:", error);
		}

	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.containsearch}>
				<Button title="Search"></Button>
				<Button title="Photo" onPress={getPermission}></Button>
			</View>
			{(hasPermission === true || isFocused) && showCamera && <CameraView style={styles.camera} ref={(ref) => (cameraRef.current = ref)}><Button onPress={takePicture} title="prendre une photo"></Button></CameraView>}
			{/* {hasPermission === false || isFocused && <Text>Pas de permission</Text>} */}
			{showSuggestions && <View><Text>{plantsData.name}</Text><Text>{plantsData.description}</Text></View>}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	containsearch: {
		height: '20%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	camera: {
		width: '100%',
		height: '80%',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
});