import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import KYCStack from "./KYCStack.js";
import RTCStack from '../navigation/retirement/RTStack'


import HeaderBar from "../components/HeaderBar.js";

const Stack = createStackNavigator();

function SetupStack() {
  return (
    <Stack.Navigator initialRouteName="RTStack">
      <Stack.Screen
        name="KYC"
        options={{ headerShown: false }}
        component={KYCStack}
      />
      <Stack.Screen
        name="RTStack"
        options={{ headerShown: false }}
        component={RTCStack}
      />
    </Stack.Navigator>
  );
}

export default SetupStack;
