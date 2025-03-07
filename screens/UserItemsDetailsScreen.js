import React from 'react'

import { useEffect, useState } from 'react';

import { Text, SafeAreaView, StyleSheet } from 'react-native'

import { useSelector } from 'react-redux'

import ItemCard from '../components/ItemCard';

function UserItemsDetailsScreen() {

    const userInStore = useSelector((state) => state.user.value);
    const [itemsForSale, setItemsForSale] = useState([]);
    console.log("itemsforSale", itemsForSale)

    useEffect(() => {
        getItemsByUser();
    }, [])

    const getItemsByUser = async () => {

        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/items/byUser/${userInStore.token}`)

            const data = await response.json();
            console.log("data", data.items.length)

            if (data.result) {
                setItemsForSale(data.items.map((item, i) => (
                    <ItemCard key={i} title={item.title} photo={item.photo[0]} description={item.description} />
                )));
            } else {
                console.log(data.result);
            }
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>UserItemsDetailsScreen</Text>
            {itemsForSale}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
    }
})

export default UserItemsDetailsScreen