import React from 'react'

import { Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'

export default function FullDetailsPlantComponent() {

  console.log("plantDetails", plantDetails.name)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text>{plantDetails.name}</Text>
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