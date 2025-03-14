import React from "react";
import { Text, SafeAreaView, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ItemCard from "../components/ItemCard";
import ReturnButton from "../components/ReturnButton";

export default function UserItemsDetailsScreen() {
  const isFocused = useIsFocused();
  const userInStore = useSelector((state) => state.user.value);
  const [isLoading, setIsLoading] = useState(true);

  const [itemsForSale, setItemsForSale] = useState([]);
  const [isItemsForSale, setIsItemsForSale] = useState(false);

  const noItems = <Text style={styles.noCardMessage}> You don't have any items for sale yet. Add one! </Text>;

  // Si le focus sur l'écran, on récupère les articles en vente de l'utilisateur
  useEffect(() => {
    if (isFocused) {
      getItemsByUser();
    }
  }, [isFocused]);

  // Fonction pour récupérer les articles en vente de l'utilisateur
  const getItemsByUser = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/items/byUser/${userInStore.token}`);

      const data = await response.json();

      if (data.result) {
        setItemsForSale(data.items);
        setIsItemsForSale(true);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setIsLoading(false)
    }
  };

  // Vérification si l'utilisateur possède des articles en vente
  const hasItems = itemsForSale.length > 0 && isItemsForSale;

  // Affichage de la liste d'articles
  const userItems = hasItems && itemsForSale.map((data, i) => <ItemCard key={i} {...data} />);

  return (
    <SafeAreaView style={styles.container}>
      <ReturnButton title="My items for sale" />
      <ScrollView style={styles.cardContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#2D5334" />
        ) : hasItems ? (
          userItems
        ) : (
          noItems
        )}</ScrollView>
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
