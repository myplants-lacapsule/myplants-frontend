import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function Facts() {
  const [fact, setFact] = useState({});
  // console.log("fact", fact);

  useEffect(() => {
    getFact();
  }, []);

  const getFact = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/facts`);

      const data = await response.json();

      if (!data.result) {
        Alert.alert("No fact found", "Please try again");
      }

      setFact(data.data);

    } catch (error) {
      console.error("Error fetching facts:", error);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.topContainer}>
        <FontAwesome5 name="lightbulb" size={20} color="#2D5334" solid/>
        <Text style={styles.funFact}>Fun Fact</Text>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>{fact.title}</Text>
        <Text style={styles.description}>{fact.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: "auto",
    padding: 15,
    marginTop: 150,
    marginHorizontal: "5%",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#95AE7D",
    backgroundColor: "white",
  },
  topContainer: {
    flexDirection: "row",
    gap: 6,
  },
  funFact: {
    color: "#2D5334",
    marginBottom: 8,
    fontSize: 18,
    fontFamily: "Merriweather-Bold",
  },
  bottomContainer: {
    flexDirection: "column",
  },
	title: {
		color: "#2D5334",
    fontSize: 18,
    fontFamily: "OpenSans-Bold",
	},
	description: {
    fontFamily: "OpenSans-regular",
	},
});
