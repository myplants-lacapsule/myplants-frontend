import React from "react";
import { Text, SafeAreaView, ScrollView, StyleSheet, Image, View, Linking } from "react-native";
import { useState } from "react";
import RegisterButton from "./RegisterButton";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import moment from "moment"

export default function FullDetailsItemComponent({ itemDetails }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fonction pour mettre la 1ère lettre en minuscule
  const formatCondition = (condition) => {
    if (!condition) return "";
    return condition.charAt(0).toLowerCase() + condition.slice(1);
  };

  const handleContactSeller = async () => {
    setIsSubmitting(true);
    const subject = `Interest in your listing ${itemDetails.title}`;
    const body = `Hello ${itemDetails.createdBy.username} , I'm interested in your listing ${itemDetails.title}. Is it still available and if so how could we proceed? Thank you!`;
    const mailtoURL = `mailto:${itemDetails.createdBy.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    try {
      await Linking.openURL(mailtoURL);
    } catch (err) {
      console.error("An error occurred", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  //moment pour formater la date
  const date = moment(itemDetails.createdAt)
  const createdAt = date.format("MMMM Do YYYY")

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: itemDetails.photo[0] }} style={styles.image} />
        <Text style={styles.title}>{itemDetails.title}</Text>
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            {itemDetails.isGiven ? (
              <FontAwesome5 name="hands-helping" size={16} color="#2D5334" />
            ) : (
              <View style={styles.priceContainer}>
                <FontAwesome5 name="euro-sign" size={16} color="#2D5334" style={{ marginRight: 5 }} />
                <Text style={styles.priceText}>{itemDetails.price}</Text>
              </View>
            )}
            <Text style={styles.badgeText}>{itemDetails.isGiven ? "Donation" : "Sale"}</Text>
          </View>
          <View style={styles.badge}>
            {itemDetails.isPlant ? <FontAwesome5 name="leaf" size={16} color="#2D5334" /> : <FontAwesome5 name="hammer" size={16} color="#2D5334" />}
            <Text style={styles.badgeText}>{itemDetails.isPlant ? "Plant" : "Accessory"}</Text>
          </View>
        </View>
        <Text style={styles.description}>{itemDetails.description}</Text>
        <View style={styles.fieldsContainer}>
          <Text style={styles.field}>Height : {itemDetails.height} cm</Text>
          <Text style={styles.field}>Condition : {formatCondition(itemDetails.condition)}</Text>
          <RegisterButton title="Contact seller" onPress={() => handleContactSeller()} style={{ marginTop: 40 }} loading={isSubmitting} disabled={isSubmitting} />
          <Text style={styles.dateField}>
            Listing posted on {createdAt}
          </Text>
        </View>
        <RegisterButton title={"Remove from my inventory"} style={styles.removeButton} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F0E9",
  },
  content: {
    alignItems: "center",
    padding: 10,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 10,
    alignSelf: "center",
  },
  title: {
    color: "#2D5334",
    alignSelf: "center",
    paddingVertical: 10,
    fontSize: 24,
    fontFamily: "Merriweather-Bold",
  },
  badgeContainer: {
    marginLeft: 10,
    paddingVertical: 10,
  },
  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "85%",
    marginVertical: 10,
  },
  badge: {
    width: 130,
    marginRight: 10,
    paddingVertical: 4,
    paddingHorizontal: 15,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#2D5334",
    backgroundColor: "#95AE7D",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  badgeText: {
    color: "#F1F0E9",
    fontFamily: "OpenSans-Regular",
    fontWeight: "bold",
  },
  description: {
    width: "85%",
    alignSelf: "center",
    padding: 10,
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
    borderWidth: 1,
    borderColor: "#95AE7D",
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 15,
    marginBottom: 15,
  },
  fieldsContainer: {
    width: "85%",
    alignItems: "flex-start",
  },
  field: {
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
    color: "#2D5334",
    marginVertical: 5,
  },
  dateField: {
    fontStyle: "italic",
    fontSize: 16,
    color: "#2D5334",
    marginVertical: 5,
    marginTop: 10,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceText: {
    color: "#2D5334",
    fontSize: 16,
    fontFamily: "OpenSans-Bold",
  },
  removeButton: {
    fontFamily: "OpenSans-Regular",
    backgroundColor: "#BC4749",
  },
});
