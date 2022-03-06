import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CpCoverScreen from "./CPCoverScreen";
import CPAddStatePension from "./CPAddStatePension";
import CPAddPersonalPension from "./CPAddPersonalPension";

import HeaderBar from "../../components/HeaderBar.js";

const Stack = createStackNavigator();

function CPStack() {
  return (
    <Stack.Navigator
      initialRouteName="KYCCover"
      screenOptions={{
        headerShown: false,
      }}
    >
      <>
        <Stack.Screen name="CPCover" component={CpCoverScreen} />
        <Stack.Screen name="CPAddStatePension" component={CPAddStatePension} />
        <Stack.Screen name="CPAddPersonalPension" component={CPAddPersonalPension} />
      </>
    </Stack.Navigator>
  );
}

export default CPStack;
