import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native";
import { CameraView } from "expo-camera";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function CameraSearch({ takePicture, cameraRef, showCamera, setShowCamera, loading }) {
  return (
    <CameraView style={styles.camera} ref={cameraRef}>
      <TouchableOpacity style={styles.returnButtonContainer} onPress={() => setShowCamera(false)}>
        <FontAwesome name="close" size={24} color="white" />
      </TouchableOpacity>
      {loading && (
        <View style={styles.loaderWrapper}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
      <TouchableOpacity style={styles.snapButton} onPress={takePicture}>
        <View style={styles.cameraContainer}>
          <FontAwesome name="camera" size={30} color="black" />
        </View>
      </TouchableOpacity>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    height: "100%",
    justifyContent: "space-between",
  },
  returnButtonContainer: {
    height: "10%",
    padding: 10,
    paddingLeft: 20,
    justifyContent: "center",
  },
  snapButton: {
    marginBottom: "30",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraContainer: {
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100%",
    borderColor: "red",
    backgroundColor: "#F8F3D9",
  },
  loaderWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
