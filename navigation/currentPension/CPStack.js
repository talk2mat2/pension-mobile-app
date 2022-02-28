import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CpCoverScreen from "./CPCoverScreen";
import CPAddStatePension from "./CPAddStatePension";

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
      </>
    </Stack.Navigator>
  );
}

export default CPStack;
