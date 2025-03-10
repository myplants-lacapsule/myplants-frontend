import React from "react";
import { Text, SafeAreaView, ScrollView, StyleSheet, Image, View, Linking } from "react-native";
import { useState } from "react";
import RegisterButton from "./RegisterButton";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function FullDetailsItemComponent({ itemDetails }) {

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fonction pour mettre la 1ère lettre en minuscule
  const formatCondition = (condition) => {
    if (!condition) return "";
    return condition.charAt(0).toLowerCase() + condition.slice(1);
  };

  const handleContactSeller = async() => {
    setIsSubmitting(true); 
    const subject = `Interest in your listing ${itemDetails.title}`;
    const body = `Hello ${itemDetails.createdBy.username} , I'm interested in your listing ${itemDetails.title}. Is it still available and if yes how could we proceed? Thanks!`;
    const mailtoURL = `mailto:${itemDetails.createdBy.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
  try{
  await Linking.openURL(mailtoURL);}
  catch(err) {
    console.error("An error occurred", err)}
  finally {setIsSubmitting(false)};
};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: itemDetails.photo[0] }} style={styles.image} />
        <Text style={styles.title}>{itemDetails.title}</Text>
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {itemDetails.isGiven ? "Donation" : "Sale"}
            </Text>

            {itemDetails.isGiven ? (
              <FontAwesome5 name="hands-helping" size={16} color="#2D5334" />
            ) : (
              <View style={styles.priceContainer}>
                <FontAwesome5
                  name="euro-sign"
                  size={16}
                  color="#2D5334"
                  style={{ marginRight: 5 }}
                />
                <Text style={styles.priceText}>{itemDetails.price}</Text>
              </View>
            )}
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {itemDetails.isPlant ? "Plant" : "Accessory"}
            </Text>

            {itemDetails.isPlant ? (
              <FontAwesome5 name="leaf" size={16} color="#2D5334" />
            ) : (
              <FontAwesome5 name="hammer" size={16} color="#2D5334" />
            )}
          </View>
        </View>

        <Text style={styles.description}>{itemDetails.description}</Text>
        <View style={styles.fieldsContainer}>
          <Text style={styles.field}>Height : {itemDetails.height} cm</Text>
          <Text style={styles.field}>
            Condition : {formatCondition(itemDetails.condition)}
          </Text>

          <RegisterButton
            title="Contact seller"
            onPress={() => handleContactSeller()}
            style={{ marginTop: 40 }}
            loading={isSubmitting}
            disabled={isSubmitting}
          />
          <Text style={styles.dateField}>
            Listing posted on {""}
            {new Date(itemDetails.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Text>
        </View>
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
  badge: {
    width: 120,
    marginRight: 10,
    paddingVertical: 4,
    paddingHorizontal: 15,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#2D5334",
    backgroundColor: "#95AE7D",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  badgeText: {
    color: "#2D5334",
    fontFamily: "OpenSans-Regular",
    marginBottom: 10,
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
  field: {
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
    color: "#2D5334",
    marginVertical: 5,
  },
  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "85%",
    marginVertical: 10,
  },
  fieldsContainer: {
    width: "85%",
    alignItems: "flex-start",
    marginVertical: 10,
  },
  dateField: {
    fontStyle: "italic",
    fontSize: 16,
    color: "#2D5334",
    marginVertical: 5,
    marginTop: 50,
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
});
