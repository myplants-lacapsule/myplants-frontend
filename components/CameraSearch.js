import { StyleSheet, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { CameraView } from "expo-camera";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function CameraSearch({ takePicture, cameraRef, showCamera, setShowCamera, loading }) {

  return (
    <CameraView style={styles.camera} ref={cameraRef}>
      <TouchableOpacity style={styles.containerReturnButton} onPress={() => setShowCamera(false)}>
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
    height: "100%",
    justifyContent: "space-between",
  },
  containerReturnButton: {
    height: "10%",
    justifyContent: "center",
    padding: 10,
    paddingLeft: 20,
  },
  snapButton: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "30",
  },
  cameraContainer: {
    height: 100,
    width: 100,
    borderRadius: "100%",
    borderColor: "red",
    backgroundColor: "#F8F3D9",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CameraSearch;
