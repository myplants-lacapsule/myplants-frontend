import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import FullDetailsItemComponent from "../components/FullDetailsItemComponent";
import ReturnButton from "../components/ReturnButton";

export default function FullDetailsItem({ route }) {
  const { itemDetails } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ReturnButton />
      <FullDetailsItemComponent itemDetails={itemDetails} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F0E9",
  },
});
