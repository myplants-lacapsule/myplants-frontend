import React from 'react'

import { Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import RegisterButton from './RegisterButton'

export default function FullDetailsPlantComponent() {

  console.log("plantDetails", plantDetails)

  const navigation = useNavigation();

  const deletePlant = async () => {

    Alert.alert(
      "Confirmation",
      "Are you sure to delete your plant from your inventory ?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Deletion canceled"),
          style: "cancel",
        },
        {
          text: "Yes, delete",
          onPress: async () => {
            try {
              const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/plants/deletePlant/${plantDetails.token}`, {
                method: "DELETE",
                'Content-Type': 'application/json',
              })

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const result = await response.json()

              if (result.result) {
                navigation.navigate("Home");
              } else {
                Alert.alert({text: "Plant not deleted"})
              }

            } catch (error) {
              console.error('Error deleting a plant:', error);
              res.status(500).json({ result: false, error: 'Internal Server Error' });
            }
          },
        }
      ],
      { cancelable: false }
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={{ uri: plantDetails.photo }} style={{ "width": "100", "height": "100" }} />
        <Text>{plantDetails.name}</Text>
        <Text>{plantDetails.description}</Text>
        <Text>{plantDetails.cuisine}</Text>
        <Text>{plantDetails.seasonality}</Text>
        <Text>{plantDetails.sunExposure}</Text>
        <Text>{plantDetails.toxicity}</Text>
        <Text>{plantDetails.wateringFrequency}</Text>
        <RegisterButton title={"Delete from my inventory"} style={{"backgroundColor" : "#BC4749"}} onPress={deletePlant}/>
        <TouchableOpacity onPress={() => deletePlant()}>
          <Text>Delete from my inventory</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F0E9',
  }
})