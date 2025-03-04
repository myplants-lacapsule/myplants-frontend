import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CustomButton from "../components/CustomButton";

export default function HomeScreen() {
	const userInStore = useSelector((state) => state.user.value);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.hello}>Bonjour, {userInStore.username} !</Text>
        <View style={styles.iconContainer}>
          <FontAwesome5
            style={styles.icon}
            name="bell"
            size={25}
            solid={true}
          />
          <FontAwesome5
            style={styles.icon}
            name="user-circle"
            size={40}
            solid={true}
          />
        </View>
      </View>
      <Text style={styles.title}>Mes plantes</Text>
      <CustomButton
        style={styles.text}
        iconName="plus-circle"
        text="Ajouter une plante"
      />
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
    padding: 20,
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
    width: 80,
    height: 45,
  },
  icon: {
    color: "#2D5334",
  },
  title: {
    color: "#2D5334",
    fontSize: 30,
    marginTop: 30,
    paddingLeft: 15,
    fontFamily: "Merriweather-Bold",
  },
  text: {
    fontSize: 25,
    fontFamily: "OpenSans-Regular",
  },
});
