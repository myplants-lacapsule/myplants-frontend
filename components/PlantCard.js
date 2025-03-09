import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function PlantCard(props) {
  const navigation = useNavigation();

  const truncatedDescription =
    props.description.length > 120
      ? props.description.substring(0, 120) + "..."
      : props.description;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("FullDetailsPlant", { plantDetails: props })
        }
      >
        <View style={styles.photoContainer}>
          <Image source={{ uri: props.photo }} style={styles.photo} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.plantInfoContainer}>
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.description}>{truncatedDescription}</Text>
          </View>
          <View style={styles.lastWatered}>
            <View
              style={[
                styles.badge,
                !props.isWatered ? styles.notWatered : styles.watered,
              ]}
            >
              {!props.isWatered ? (
                <FontAwesome5 name="tint" size={16} color="#F1F0E9" />
              ) : (
                <FontAwesome5 name="tint-slash" size={16} color="#F1F0E9" />
              )}
              <Text style={styles.textBadge}>
                {""}
                {new Date(props.lastWatering).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: "#FBFBFB",
    height: 150,
    padding: 7,
    margin: 5,
    borderRadius: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#D0DDD0",
  },
  photoContainer: {
    borderRadius: 5,
    width: "35%",
    backgroundColor: "pink",
  },
  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  infoContainer: {
    width: "65%",
    paddingLeft: 10,
    justifyContent: "space-evenly",
  },
  name: {
    color: "#2D5334",
    fontSize: 16,
    fontFamily: "Merriweather-Bold",
  },
  description: {
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
    flexWrap: "wrap",
  },
  lastWatered: {
    width: "60%",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 24,
    height: 25,
  },
  watered: {
    backgroundColor: "#95AE7D",
  },
  notWatered: {
    backgroundColor: "#BC4749",
  },
  textBadge: {
    fontSize: 11,
    color: "white",
  },
});
