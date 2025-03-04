import { StyleSheet, Text, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.hello}>Bonjour,</Text>
				<Text style={styles.hello}>Pauline !</Text>d
        <View style={styles.iconContainer}>
          <FontAwesome5 style={styles.icon} name="bell" solid={true} />
          <FontAwesome5 style={styles.icon} name="user-circle" solid={true} />
        </View>
      </View>
      <Text style={styles.title}>Mes plantes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F0E9",
    alignItems: "center",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 20,
		backgroundColor: "pink",
		marginTop: '10%',
  },
  hello: {
    color: "#2D5334",
		fontSize: 30,
		fontFamily: "Merriweather",
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
		backgroundColor: "yellow",
  },
  icon: {
    size: 100,
    color: "#2D5334",
  },
	title: {
		color: "#2D5334",
		fontFamily: "Merriweather",
	},
});
