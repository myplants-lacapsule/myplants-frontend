import { KeyboardAvoidingView, Platform, StyleSheet, View, Switch, Text} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { login } from "../reducers/user.js";
import RegisterButton from "../components/RegisterButton.js";
import RegisterInput from "../components/RegisterInput.js";
import ToggleButton from "../components/ToggleButton.js";
import PlantConditionPicker from "../components/PlantConditionPicker";

export default function NewItemScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [height, setHeight] = useState("");
  const [isVente, setIsVente] = useState(true);
  const [isPlant, setIsPlant] = useState(true);
  const [plantCondition, setPlantCondition] = useState(true);


  const handleConnection = () => {
    fetch("http://192.168.43.241:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: signInEmail, password: signInPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ email: signInEmail, token: data.token }));
          setSignInEmail("");
          setSignInPassword("");
		  navigation.navigate("TabNavigator");
        }
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.registerContainer}>
        <ToggleButton
          value={isVente}
          onValueChange={(newValue) => setIsVente(newValue)}
          trueLabel="Vente"
          falseLabel="Don"
        />
        <RegisterInput
          placeholder="Titre"
          autoCapitalize="none"
          keyboardType="email-address"
          value={title}
          onChangeText={setTitle}
          returnKeyType="next"
        />
        <RegisterInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          returnKeyType="next"
        />
        {isVente && (
          <RegisterInput
            placeholder="Prix"
            value={price}
            onChangeText={setPrice}
            returnKeyType="next"
          />
        )}
        <RegisterInput
          placeholder="Hauteur"
          value={height}
          onChangeText={setHeight}
          returnKeyType="next"
        />

        <ToggleButton
          value={isPlant}
          onValueChange={(newValue) => setIsPlant(newValue)}
          trueLabel="Plante"
          falseLabel="Accessoires"
        />

        <PlantConditionPicker
          selectedCondition={plantCondition}
          onConditionChange={setPlantCondition}
        />

        <RegisterButton
          title="Ajouter mon article "
          onPress={handleConnection}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F0E9",
    alignItems: "center",
    justifyContent: "center",
  },
  registerContainer: {
    width: "80%",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  label: {
    marginRight: 10,
    fontSize: 16,
  },
});
