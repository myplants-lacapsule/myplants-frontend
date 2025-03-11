import React from 'react'

import { Text } from 'react-native'

import { useEffect, useState } from 'react'

export default function Facts() {

    const [fact, setFact] = useState({})
    console.log("fact", fact)

    useEffect(() => {
        getFact();
    }, [])

    const getFact = async () => {
        try{
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/facts`)

            const data = await response.json()

            if (!data.result){
                Alert.alert("No fact found", "Please try again")
            }

            setFact(data.data)

        } catch (error){

        }
    }

  return (
    <Text>{fact.title}{fact.description}</Text>
  )
}
