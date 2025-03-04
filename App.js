import React, { useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import WelcomeScreen from "./screens/WelcomeScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import MapScreen from "./screens/MapScreen";
import NewItemScreen from "./screens/NewItemScreen";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";

const store = configureStore({
  reducer: { user },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";
          let IconComponent = FontAwesome;

          if (route.name === "Accueil") {
            iconName = "home";
          } else if (route.name === "Ajouter une plante") {
            iconName = "seedling";
            IconComponent = FontAwesome5;
          } else if (route.name === "Vente/don") {
            iconName = "map";
          }

          return <IconComponent name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: "#F1F0E9",
        tabBarInactiveTintColor: 'black',
        tabBarStyle: {
          backgroundColor: "#2D5334",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Ajouter une plante" component={SearchScreen} />
      <Tab.Screen name="Vente/don" component={MapScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Merriweather': require('./assets/fonts/Merriweather/Merriweather-Regular.ttf'),
      'Merriweather-Bold': require('./assets/fonts/Merriweather/Merriweather-Bold.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="NewItemScreen" component={NewItemScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}