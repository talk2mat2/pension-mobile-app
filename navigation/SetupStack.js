import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import KYCStack from "./KYCStack.js";
import RTCStack from "../navigation/retirement/RTStack";
 import DashboardStack from '../navigation/dashboard/dashboardStack'

// import HeaderBar from "../components/HeaderBar.js";
 import CPStack from "./currentPension/CPStack.js";
 import JSDasboard from './jsdashboard/jsdashboardstack'

const Stack = createStackNavigator();

function SetupStack() {
  return (
    <Stack.Navigator initialRouteName="CPStack">
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
      <Stack.Screen
        name="CPStack"
        options={{ headerShown: false }}
        component={CPStack}
      />
      {/* <Stack.Screen
        name="DashboardStack"
        options={{ headerShown: false }}
        component={DashboardStack}
      /> */}
      <Stack.Screen
        name="DashboardStack"
        options={{ headerShown: false }}
        component={JSDasboard}
      />
    </Stack.Navigator>
  );
}

export default SetupStack;
