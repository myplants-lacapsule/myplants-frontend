import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import FullDetailsPlantComponent from "../components/FullDetailsPlantComponent";
import ReturnButton from "../components/ReturnButton";

export default function FullDetailsPlant(props) {
  plantDetails = props.route.params.plantDetails;

  return (
    <SafeAreaView style={styles.container}>
      <ReturnButton />
      <FullDetailsPlantComponent plantDetails={plantDetails} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		paddingTop: 40,
    backgroundColor: "#F1F0E9",
  },
});
