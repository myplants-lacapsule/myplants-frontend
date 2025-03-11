import React from "react";
import { Alert, Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import RegisterButton from "./RegisterButton";

import moment from 'moment'

export default function FullDetailsItemComponent({ itemDetails }) {
  const navigation = useNavigation();
  const currentUser = useSelector((state) => state.user.value);
  const isOwner = currentUser.token === itemDetails.createdBy.token;

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fonction pour mettre la 1ère lettre en minuscule
  const formatCondition = (condition) => {
    if (!condition) return "";
    return condition.charAt(0).toLowerCase() + condition.slice(1);
  };

  const handleContactSeller = async () => {
    setIsSubmitting(true);
    const subject = `Interest in your listing ${itemDetails.title}`;
    const body = `Hello ${itemDetails.createdBy.username}, I'm interested in your listing ${itemDetails.title}. Is it still available and if so, how could we proceed? Thank you!`;
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

  const handleDeleteItem = async () => {
    // Demander confirmation à l'utilisateur
    Alert.alert(
      "Confirmation",
      "Are you sure you want to remove this item from your inventory?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, remove",
          onPress: async () => {
            try {
              const itemToken = itemDetails.token;
              const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/items/deleteItem/${itemToken}`, {
                method: "DELETE",
              });
              const data = await response.json();
              if (data.result) {
                Alert.alert("Success", "The item has been removed.");
                navigation.goBack();
              } else {
                Alert.alert("Error", data.error || "Deletion failed.");
              }
            } catch (error) {
              Alert.alert("Error", "An error occurred while removing the item.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: itemDetails.photo[0] }} style={styles.image} />
        <Text style={styles.title}>{itemDetails.title}</Text>
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            {itemDetails.isGiven ? (
              <FontAwesome5 name="hands-helping" size={16} color="#F1F0E9" />
            ) : (
              <View style={styles.priceContainer}>
                <FontAwesome5 name="shopping-cart" size={16} color="#F1F0E9" />
              </View>
            )}
            <Text style={styles.badgeText}>{itemDetails.isGiven ? "Donation" : "Sale"}</Text>
          </View>
          <View style={styles.badge}>
            {itemDetails.isPlant ? <FontAwesome5 name="leaf" size={16} color="#F1F0E9" /> : <FontAwesome5 name="hammer" size={16} color="#F1F0E9" />}
            <Text style={styles.badgeText}>{itemDetails.isPlant ? "Plant" : "Accessory"}</Text>
          </View>
        </View>
        <Text style={styles.description}>{itemDetails.description}</Text>
        <View style={styles.fieldsContainer}>
          {itemDetails.price > 0 && <Text style={styles.field}>Price : {itemDetails.price} €</Text>}
          <Text style={styles.field}>Height : {itemDetails.height} cm</Text>
          <Text style={styles.field}>Condition : {formatCondition(itemDetails.condition)}</Text>
					<Text style={styles.date}>
            Listing posted on {createdAt}
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          
          {isOwner ? <RegisterButton title={"Remove from my inventory"} onPress={() => handleDeleteItem()} style={styles.removeButton} /> : <RegisterButton title="Contact the seller" onPress={() => handleContactSeller()} loading={isSubmitting} disabled={isSubmitting} />}
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
    flexGrow: 1,
    alignItems: "center",
    padding: 10,
    marginBottom: 15,
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
    paddingVertical: 20,
    fontSize: 24,
    fontFamily: "Merriweather-Bold",
  },
  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    marginVertical: 10,
  },
  badge: {
    width: 130,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: "#2D5334",
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
    color: "#2D5334",
    marginVertical: 5,
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
  },
  bottomContainer: {
    width: "96%",
    marginTop: "auto",
  },
  date: {
    marginVertical: 10,
    marginLeft: 3,
    color: "#2D5334",
    fontSize: 16,
    fontStyle: "italic",
  },
  removeButton: {
    backgroundColor: "#BC4749",
  },
});
