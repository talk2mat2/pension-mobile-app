import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CpCoverScreen from "./CPCoverScreen";
import CPAddStatePension from "./CPAddStatePension";
import CPAddPersonalPension from "./CPAddPersonalPension";
import DefinedStateBenefit from "./Defined_Benefit_Pension";
import OtherPension from "./OtherPension";
import CPCongrat from "./CPCongrat";

// import HeaderBar from "../../components/HeaderBar.js";

const Stack = createStackNavigator();

function CPStack() {
  return (
    <Stack.Navigator
      initialRouteName="CPCover"
      screenOptions={{
        headerShown: false,
      }}
    >
      <>
        <Stack.Screen name="CPCover" component={CpCoverScreen} />
        <Stack.Screen name="CPAddStatePension" component={CPAddStatePension} />
        <Stack.Screen
          name="CPAddPersonalPension"
          component={CPAddPersonalPension}
        />
        <Stack.Screen name="DefinedBenefit" component={DefinedStateBenefit} />
        <Stack.Screen name="OtherPension" component={OtherPension} />
        <Stack.Screen name="CPCongrat" component={CPCongrat} />
      </>
    </Stack.Navigator>
  );
}

export default CPStack;
