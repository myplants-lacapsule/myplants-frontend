import React from 'react'

import { View, Text, StyleSheet } from 'react-native'

export default function Notifications(props) {

    return (
        <View style={styles.notifications}>
            <Text>Your plant {props.name} needs water ! The last watering was : {""}
                {new Date(props.lastWatering).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
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
        borderBottomWidth: 1,
        borderColor: "#F8F3D9",
        borderRadius: 8,
        // alignItems: "center",
    }
})
