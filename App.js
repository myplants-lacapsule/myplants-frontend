import React, { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import WelcomeScreen from "./screens/WelcomeScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import MapScreen from "./screens/MapScreen";
import NotificationScreen from "./screens/NotificationScreen";
import UserScreen from "./screens/UserScreen";
import NewItemScreen from "./screens/NewItemScreen";
import AddLocationScreen from "./screens/AddLocationScreen";
import FullDetailsPlant from "./screens/FullDetailsPlant";
import UserItemsDetailsScreen from "./screens/UserItemsDetailsScreen";
import FullDetailsItem from "./screens/FullDetailsItem";

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
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = "";
          let IconComponent = FontAwesome;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Add a plant") {
            iconName = "seedling";
            IconComponent = FontAwesome5;
          } else if (route.name === "Sale/donation") {
            iconName = "map";
          }

          return (
            <IconComponent
              name={iconName}
              size={size}
              color={color}
              style={{ opacity: focused ? 1 : 0.5 }}
            />
          );
        },
        tabBarLabel: ({ focused, color }) => (
          <Text
            style={[styles.tabBarLabel, { color, opacity: focused ? 1 : 0.5 }]}
          >
            {route.name}
          </Text>
        ),
        tabBarActiveTintColor: "#F1F0E9",
        tabBarInactiveTintColor: "#F1F0E9",
        tabBarStyle: {
          backgroundColor: "#2D5334",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Add a plant" component={SearchScreen} />
      <Tab.Screen name="Sale/donation" component={MapScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFontsAndHideSplashScreen = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Merriweather: require("./assets/fonts/Merriweather/Merriweather-Regular.ttf"),
          "Merriweather-Bold": require("./assets/fonts/Merriweather/Merriweather-Bold.ttf"),
          "OpenSans-Regular": require("./assets/fonts/Open_Sans/OpenSans-Regular.ttf"),
          "OpenSans-Bold": require("./assets/fonts/Open_Sans/OpenSans-Bold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      }
    };

    loadFontsAndHideSplashScreen();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen
            name="NotificationScreen"
            component={NotificationScreen}
          />
          <Stack.Screen name="UserScreen" component={UserScreen} />
          <Stack.Screen name="NewItemScreen" component={NewItemScreen} />
          <Stack.Screen name="AddLocationScreen" component={AddLocationScreen} />
          <Stack.Screen name="FullDetailsPlant" component={FullDetailsPlant} />
          <Stack.Screen name="UserItemsDetailsScreen" component={UserItemsDetailsScreen}/>
          <Stack.Screen name="FullDetailsItem" component={FullDetailsItem} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontFamily: "OpenSans-Regular",
    fontSize: 12,
  },
});
