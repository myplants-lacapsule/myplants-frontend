import React from "react";
import { Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ItemCard from "../components/ItemCard";
import ReturnButton from "../components/ReturnButton";

export default function UserItemsDetailsScreen() {
  const isFocused = useIsFocused();
  const userInStore = useSelector((state) => state.user.value);

  const [itemsForSale, setItemsForSale] = useState([]);
  const [isItemsForSale, setIsItemsForSale] = useState(true);

  useEffect(() => {
    getItemsByUser();
  }, []);

  useEffect(() => {
    setIsItemsForSale(true);
  }, [isFocused]);

  const getItemsByUser = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/items/byUser/${userInStore.token}`);

      const data = await response.json();

      if (data && data.items) {
        setItemsForSale(data.items);
        setIsItemsForSale(true);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const hasItems = itemsForSale.length > 0 && isItemsForSale;

  const userItems = hasItems ? itemsForSale.map((data, i) => <ItemCard key={i} {...data} />) : <Text style={styles.noCardMessage}> You don't have any items for sale yet. Add one! </Text>;

  return (
    <SafeAreaView style={styles.container}>
      <ReturnButton title="My items for sale"/>
      <ScrollView style={styles.cardContainer}>{userItems}</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		paddingTop: 40,
    backgroundColor: "#F1F0E9",
  },
  noCardMessage: {
    color: "#2D5334",
    fontSize: 14,
    fontFamily: "Merriweather",
    alignSelf: "center",
    marginTop: "50%",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    alignSelf: "center",
  },
});
