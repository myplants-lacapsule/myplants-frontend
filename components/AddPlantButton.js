import React from 'react'

import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

import FontAwesome from "react-native-vector-icons/FontAwesome";

function AddPlantButton() {
    return (
        <View style={styles.btn}><FontAwesome name="check" size={32} color={'white'} /><Text style={styles.textbtn}>Ajouter à mon inventaire</Text></View>
    )
}

const styles = StyleSheet.create({
    btn: {
        width: '100%',
        borderRadius: 5,
        backgroundColor: "#95AE7D",
        padding: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textbtn: {
        color: '#F1F0E9',
        fontWeight: '600',
        fontSize: 16,
    }
})

export default AddPlantButton