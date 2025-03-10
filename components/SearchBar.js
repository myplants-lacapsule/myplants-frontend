import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function SearchBar({ inputResearch, setInputResearch, onSearch }) {
  return (
    <View style={styles.containTextSearch}>
      <TouchableOpacity onPress={() => onSearch(inputResearch)} style={styles.searchicon}>
        <FontAwesome name="search" size={30} color="#2D5334" />
      </TouchableOpacity>
      <TextInput style={styles.textInputResearch} placeholder="Enter plant name" onChangeText={(value) => setInputResearch(value)} value={inputResearch} />
    </View>
  );
}

const styles = StyleSheet.create({
  containTextSearch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  searchicon: {
    left: 20,
    zIndex: 30,
    position: "absolute",
  },
  textInputResearch: {
    backgroundColor: "#FBFBFB",
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
