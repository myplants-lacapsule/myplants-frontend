import React from 'react'

import { View, StyleSheet, Image, Text } from 'react-native'

import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function SuggestionPlantCard({ plantsData }) {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.card}>
                <Image source={{ uri: plantsData.photo }} style={styles.image} />
                <View style={styles.containText}>
                    <View style={styles.firstrow}>
                        <Text style={styles.title}>{plantsData.name}</Text>
                    </View>
                    <Text style={styles.description}>{plantsData.description}</Text>
                </View>
            </View>
            <View style={styles.badges}>
                <View style={styles.badgeWatering}>
                    <FontAwesome name="tint" size={25} color="white" />
                    <Text style={styles.textBadges}>
                        {plantsData.wateringFrequency}
                    </Text>
                </View>
                <View style={styles.badgeToxicity}>
                    <FontAwesome name="bath" size={25} color="white" />
                    <Text style={styles.textBadges}>{plantsData.toxicity}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flexWrap: "wrap",
        justifyContent: "center",
        padding: 10,
        gap: 10,
    },
    card: {
        flexDirection: "row",
        width: "100%",
        height: "auto",
        backgroundColor: "#FBFBFB",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        borderColor: "#D0DDD0",
    },
    image: {
        width: "40%",
        height: "95%",
        padding: 5,
        borderRadius: 10,
    },
    containText: {
        width: "50%",
        height: "100%",
        justifyContent: "center",
        gap: 5,
        padding: 10,
    },
    firstrow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title: {
        fontWeight: "bold",
        color: "#2D5334",
        fontSize: 20,
    },
    description: {},
    badges: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
    },
    badgeWatering: {
        backgroundColor: "#3674B5",
        borderRadius: 80,
        padding: 8,
        width: "45%",
        justifyContent: "center",
        alignItems: "center",
    },
    badgeToxicity: {
        backgroundColor: "#BC4749",
        borderRadius: 80,
        padding: 8,
        width: "45%",
        justifyContent: "center",
        alignItems: "center",
    },
    textBadges: {
        color: "white",
    },
})