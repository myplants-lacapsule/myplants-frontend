import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import CustomButton from "../components/CustomButton";
import PlantCard from "../components/PlantCard";

export default function HomeScreen() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const userInStore = useSelector((state) => state.user.value);

  const [plantsData, setPlantsData] = useState([]);
  const [noPlantData, setNoPlantData] = useState(false);

  useEffect(() => {
    fetchPlants();
    setNoPlantData(false);
  }, [isFocused]);

  const fetchPlants = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/plants/${userInStore.token}`);

      const data = await response.json();

      if (data && data.data) {
        setPlantsData(data.data);
        setNoPlantData(false);
      }
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  };

  const hasPlants = plantsData.length > 0 && !noPlantData;

  const userPlants = hasPlants ? plantsData.map((data, i) => <PlantCard key={i} {...data} />) : <Text style={styles.noCardMessage}> You don't have any plants yet. Add one! </Text>;

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.hello}>Hello, {userInStore.username} !</Text>
        <View style={styles.iconContainer}>
          <FontAwesome5 style={styles.icon} name="bell" size={25} solid={true} onPress={() => navigation.navigate("NotificationScreen")} />
          <FontAwesome5 style={styles.icon} name="user-circle" size={40} solid={true} onPress={() => navigation.navigate("UserScreen")} />
        </View>
      </View>
      <Text style={styles.myplants}>My plants</Text>
      <View style={styles.buttonContainer}>
        <CustomButton iconName="plus-circle" text="Add a plant" onPress={() => navigation.navigate("Add a plant")} style={styles.buttonText} />
      </View>
      <ScrollView style={styles.cardContainer}>{userPlants}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F0E9",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 15,
    marginTop: "10%",
  },
  hello: {
    color: "#2D5334",
    fontSize: 24,
    fontFamily: "Merriweather",
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 5,
    width: 80,
    height: 45,
  },
  icon: {
    color: "#2D5334",
  },
  myplants: {
    color: "#2D5334",
    fontSize: 30,
    marginTop: 5,
    paddingLeft: 15,
    fontFamily: "Merriweather-Bold",
  },
  buttonContainer: {
    marginVertical: 15,
  },
  buttonText: {
    fontSize: 25,
    fontFamily: "OpenSans-Regular",
  },
  noCardMessage: {
    color: "#2D5334",
    fontSize: 14,
    fontFamily: "Merriweather",
    alignSelf: "center",
    marginTop: "50%",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    width: "97%",
    alignSelf: "center",
  },
});
