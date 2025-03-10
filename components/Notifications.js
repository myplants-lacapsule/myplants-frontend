import React from 'react'

import { View, Text, StyleSheet } from 'react-native'

export default function Notifications(props) {

    return (
        <View style={styles.notifications}>
            <Text style={styles.text}>Your plant <Text style={styles.textbold}>{props.name}</Text> needs water !</Text>
                <Text style={styles.text}>The last watering was : <Text style={styles.textbold}>
                    {""}{new Date(props.lastWatering).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
                </Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    notifications: {
        justifyContent: "center",
        backgroundColor: "white",
        width: "90%",
        height: 80,
        padding: 10,
        borderBottomWidth: 2,
        borderColor: "#F8F3D9",
        borderRadius: 8,
        // alignItems: "center",
    },
    text: {
        fontFamily: "OpenSans-Regular",
        fontSize: 15,
    },
    textbold: {
        fontFamily: "OpenSans-Bold",
        color: "#2D5334",
        fontSize: 16,
    }
})
