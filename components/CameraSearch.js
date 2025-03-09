import {
    StyleSheet,
    View,
    TouchableOpacity,
} from "react-native";

import { CameraView } from "expo-camera";

import FontAwesome from "react-native-vector-icons/FontAwesome";

function CameraSearch({ takePicture, cameraRef }) {

    return (
        <CameraView style={styles.camera} ref={cameraRef}>
            <TouchableOpacity style={styles.snapButton} onPress={takePicture}>
                <View style={styles.cameraContainer}>
                    <FontAwesome name="camera" size={30} color="black" />
                </View>
            </TouchableOpacity>
        </CameraView>
    )
}

const styles = StyleSheet.create({
    camera: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
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
})

export default CameraSearch