import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native";
import { CameraView } from "expo-camera";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function CameraSearch({ takePicture, cameraRef, showCamera, setShowCamera, loading }) {
  return (
    <CameraView style={styles.camera} ref={cameraRef}>
      <TouchableOpacity style={styles.returnButtonContainer} onPress={() => setShowCamera(false)}>
        <FontAwesome name="close" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.snapButton}>
        {loading ? (
          <View style={styles.cameraContainer}>
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          <TouchableOpacity onPress={takePicture}>
            <View style={styles.cameraContainer}>
              <FontAwesome name="camera" size={30} color="black" />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  returnButtonContainer: {
		position: 'absolute',
    height: "10%",
		marginTop: 20,
		marginLeft: 20,
  },
  cameraContainer: {
    height: 80,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#F1F0E9",
  },
  loaderWrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  snapButton: {
    position: "absolute",
		alignSelf: "center",
    bottom: 80,
  },
});
