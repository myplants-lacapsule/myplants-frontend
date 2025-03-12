import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function SearchBar({ inputResearch, setInputResearch, onSearch }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onSearch(inputResearch)} style={styles.searchIcon}>
        <FontAwesome name="search" size={30} color="#2D5334" />
      </TouchableOpacity>
      <TextInput style={styles.inputText} placeholder="Enter plant name" onChangeText={(value) => setInputResearch(value)} value={inputResearch} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  searchIcon: {
		position: "absolute",
    left: 20,
    zIndex: 30,
  },
  inputText: {
    backgroundColor: "white",
    width: "250",
    height: "60",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderColor: "#2D5334",
    borderWidth: 2,
    paddingLeft: 60,
  },
});

export default SearchBar;
