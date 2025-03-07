import React from 'react'

import { Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'

import { useNavigation, useRoute } from '@react-navigation/native'

export default function FullDetailsItemComponent({ itemDetails }) {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: itemDetails.photo[0] }} style={styles.photo} />
        <Text style={styles.title}>{itemDetails.title}</Text>
        <Text style={styles.description}>{itemDetails.description}</Text>
        <Text>{itemDetails.isVente ? "Vente" : "Not Vente"}</Text>
        <Text>{itemDetails.isPlant ? "Plant" : "Not Plant"}</Text>
        <Text>{itemDetails.plantCondition}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F0E9',
  }
})