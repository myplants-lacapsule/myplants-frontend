import React from 'react'

import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

import FontAwesome from "react-native-vector-icons/FontAwesome";

function AddPlantButton() {
    return (
<<<<<<< HEAD
        <View style={styles.btn}>
            <FontAwesome name="check" size={32} color={'white'} />
            <Text style={styles.textbtn}>Ajouter à mon inventaire</Text>
        </View>
=======
        <View style={styles.btn}><FontAwesome name="check" size={32} color={'white'} /><Text style={styles.textbtn}>Add to my inventory</Text></View>
>>>>>>> 1a9a584d2a7c99a32cda4fa12124a58972c1726d
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