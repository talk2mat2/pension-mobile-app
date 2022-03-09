import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { myColorsLight } from "../../constant/colors";
import Dasboard from "./dashboard";
import Jars from "./jars";
import arvisPension from "./jarvisPension";
import Contribution from "./contribution";

export default function DashboardStack() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Dashboard") {
            iconName = focused ? "circle" : "circle-o";
          } else if (route.name === "Jars") {
            iconName = focused ? "circle" : "circle-o";
          } else if (route.name === "Jarvis Pension") {
            iconName = focused ? "circle" : "circle-o";
          } else if (route.name === "Contribute") {
            iconName = focused ? "circle" : "circle-o";
          }

          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: myColorsLight.lightGrey,
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        options={{ headerShown: false, tabBarLabelStyle: { fontSize: 14 } }}
        name="Dashboard"
        component={Dasboard}
      />
      <Tab.Screen
        options={{ headerShown: false, tabBarLabelStyle: { fontSize: 14 } }}
        name="Jars"
        component={Jars}
      />
      <Tab.Screen
        options={{ headerShown: false, tabBarLabelStyle: { fontSize: 14 } }}
        name="Jarvis Pension"
        component={arvisPension}
      />
      <Tab.Screen
        options={{ headerShown: false, tabBarLabelStyle: { fontSize: 14 } }}
        name="Contribute"
        component={Contribution}
      />
    </Tab.Navigator>
  );
}
