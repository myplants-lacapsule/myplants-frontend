import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function ItemCard({ photo, title, description, price, height, isGiven, isPlant, condition, createdAt, createdBy, token, closeModal }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        if (closeModal) {
          closeModal();
        }
        navigation.navigate("FullDetailsItem", {
          itemDetails: {
            photo,
            title,
            description,
            price,
            height,
            isGiven,
            isPlant,
            condition,
            createdAt,
            createdBy,
            token,
          },
        });
      }}
    >
      <View style={styles.container}>
        <View style={styles.cardContent}>
          <View style={styles.photoContainer}>
            <Image source={{ uri: photo[0] }} style={styles.photo} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{title}</Text>
            <View style={styles.badge}>
              {isGiven ? <FontAwesome5 name="hands-helping" size={16} color="#2D5334" style={{ marginRight: 5 }} /> : <FontAwesome5 name="shopping-cart" size={16} color="#2D5334" style={{ marginRight: 5 }} />}
              <Text style={styles.badgeText}>{isGiven ? "Donation" : "Sale"}</Text>
            </View>
            <View style={styles.badge}>
              {isPlant ? <FontAwesome5 name="leaf" size={16} color="#2D5334" style={{ marginRight: 5 }} /> : <FontAwesome5 name="hammer" size={16} color="#2D5334" style={{ marginRight: 5 }} />}
              <Text style={styles.badgeText}>{isPlant ? "Plant" : "Accessory"}</Text>
            </View>
            {!isGiven && (
              <View style={styles.badge}>
                <FontAwesome5 name="euro-sign" size={16} color="#2D5334" style={{ marginRight: 5 }} />
                <Text style={styles.badgeText}>{price}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: "white",
    height: 160,
    margin: 10,
    borderRadius: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#D0DDD0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardContent: {
    flexDirection: "row",
    flex: 1,
    padding: 7,
    alignItems: "center",
  },
  photoContainer: {
    width: "35%",
    borderRadius: 5,
  },
  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  infoContainer: {
    width: "65%",
    paddingLeft: 10,
  },
  name: {
    color: "#2D5334",
    fontSize: 16,
    fontFamily: "Merriweather-Bold",
    marginBottom: 10,
  },
  description: {
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
    flexWrap: "wrap",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  badgeText: {
    color: "#2D5334",
    fontFamily: "OpenSans-Regular",
  },
});
