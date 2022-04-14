import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import KYCStack from "./KYCStack.js";
import RTCStack from "../navigation/retirement/RTStack";
import DashboardStack from "../navigation/dashboard/dashboardStack";

// import HeaderBar from "../components/HeaderBar.js";
import CPStack from "./currentPension/CPStack.js";
import JSDasboard from "./jsdashboard/jsdashboardstack";
import UserContext from "../contexts/UserContext.js";

const Stack = createStackNavigator();

function SetupStack() {
  const ctx = useContext(UserContext);
  React.useEffect(() => {
    console.log(ctx?.u?.included[0]?.onboardingCompleted);
  }, []);
  return (
    <Stack.Navigator initialRouteName="KYC">
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
