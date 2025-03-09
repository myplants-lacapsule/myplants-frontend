import React from "react";
import { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";

import ItemCard from "../components/ItemCard";
import ReturnButton from "../components/ReturnButton";

function UserItemsDetailsScreen() {
  const isFocused = useIsFocused();

  const userInStore = useSelector((state) => state.user.value);
  const [itemsForSale, setItemsForSale] = useState([]);
  const [isItemsForSale, setIsItemsForSale] = useState(false);

  useEffect(() => {
    getItemsByUser();
  }, []);

  useEffect(() => {
    setIsItemsForSale(false);
  }, [isFocused]);

  const getItemsByUser = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/items/byUser/${userInStore.token}`
      );

      const data = await response.json();

      if (data.result) {
        setItemsForSale(
          data.items.map((item, i) => (
            <ItemCard
              key={i}
              title={item.title}
              photo={item.photo}
              description={item.description}
            />
          ))
        );
      } else {
        setIsItemsForSale(true);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ReturnButton />
      <Text>UserItemsDetailsScreen</Text>
      {isItemsForSale ? <Text>No items to sell</Text> : itemsForSale}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});

export default UserItemsDetailsScreen;
