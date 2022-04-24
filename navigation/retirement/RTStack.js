import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RTCoverScreen from "./RTCoverScreen";
import RTbudgetOne from "./RTbudgetOne";
import RTLifestyle from "./RTLifestyle";
import RTExcellent from "./RTExcellent";

// import HeaderBar from "../../components/HeaderBar.js";

const Stack = createStackNavigator();

function RTCStack() {
  return (
    <Stack.Navigator
      initialRouteName="RTCover"
      screenOptions={{
        headerShown: false,
      }}
    >
      <>
        <Stack.Screen name="RTCover" component={RTCoverScreen} />
        <Stack.Screen name="RTbudgetOne" component={RTbudgetOne} />
        <Stack.Screen name="RTLifestyle" component={RTLifestyle} />
        <Stack.Screen name="RTExcellent" component={RTExcellent} />
      </>
    </Stack.Navigator>
  );
}

export default RTCStack;
