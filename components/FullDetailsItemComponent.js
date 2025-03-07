import React from 'react'

import { Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity, Alert, View } from 'react-native'

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function FullDetailsItemComponent({ itemDetails }) {

  console.log("Photo URL:", itemDetails.photo);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: itemDetails.photo[0] }} style={styles.photo} />
        <Text style={styles.title}>{itemDetails.title}</Text>
        <Text style={styles.description}>{itemDetails.description}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {itemDetails.isGiven ? (
            <View>
              <FontAwesome5 name="hands-helping" size={16} color="#000" />
              <Text style={{ marginLeft: 5 }}>Donation</Text>
            </View>
          ) : (
            <View>
              <FontAwesome5 name="shopping-cart" size={16} color="#000" />
              <Text style={{ marginLeft: 5 }}>Sale</Text>
            </View>
          )}
        </View>
        <Text>{itemDetails.isPlant ? "Plant" : "Accessories"}</Text>
        <Text>{itemDetails.plantCondition}</Text>
        {!itemDetails.isGiven && <Text>{itemDetails.price}€</Text>}
        <Text>{itemDetails.height}cm</Text>
        <Text>
          {new Date(itemDetails.createdAt).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F0E9',
  },
  photo: {
    width: '80%',
    height: 300,
  },
})