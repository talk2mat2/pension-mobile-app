// import 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  // StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import JSDasboard from "./navigation/jsdashboard/jsdashboardstack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NetInfo from "@react-native-community/netinfo";
import { navigationRef } from "./RootNavigation.js";
import FlashMessage, {
  showMessage,
  hideMessage,
} from "react-native-flash-message";
import * as WebBrowser from "expo-web-browser";
import AppIntroSlider from "react-native-app-intro-slider";
import { useFonts } from "expo-font";
import { Provider } from "react-native-paper";
import Env from "./env";
import * as Notifications from "expo-notifications";
import * as helpers from "./Helpers";
import { UserProvider } from "./contexts/UserContext";
import * as AuthSession from "expo-auth-session";

import AuthStack from "./navigation/AuthStack";
import AppTab from "./navigation/AppTab";
import MoreStack from "./navigation/MoreStack";
import InitScreen from "./navigation/InitScreen";

import SetupStack from "./navigation/SetupStack.js";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [showApp, setShowApp] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [u, setU] = useState(null);
  const [emailStart, setEmailStart] = useState();
  const [name, setName] = useState(null);
  const [atk, setAtk] = useState(null);
  const [rtk, setRtk] = useState(null);
  const [budgetData, setBudgetData] = React.useState([]);
  const [retireProfile, setRetireProfile] = React.useState({});
  const [pensionJars, setPensionJars] = React.useState([]);
  const [onboardingCompleted, setOnboardingCompleted] = React.useState(false);
  const [etk, setEtk] = useState("");
  const [hasDoneSetup, setHasDoneSetup] = useState(false);
  const [online, setOnline] = useState(false);
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  let s = null,
    nm = "",
    ntt = "";

  const { Auth0_Domain, Auth0_ClientID, Auth0_ClientSecret } = Env;
  const data = [
    {
      title: "Title 1",
      icon: "cash",
      copy: "This is the copy for the first slide",
      bg: "#59b2ab",
    },
    {
      title: "Title 2",
      icon: "cash-register",
      copy: "This is the copy for the second slide",
      bg: "#febe29",
    },
    {
      title: "Title 3",
      icon: "cash-multiple",
      copy: "This is the copy for the third slide",
      bg: "#22bcb5",
    },
  ];

  const _renderItem = (item) => {
    let ii = item.item;
    const webStyle = Platform.OS == "web" ? { height: "100%" } : null;

    return (
      <View style={[styles.slide, { backgroundColor: ii.bg }, webStyle]}>
        <MaterialCommunityIcons name={ii.icon} color="#fff" size={200} />
        <Text style={styles.title}>{ii.title}</Text>
        <Text style={styles.copy}>{ii.copy}</Text>
      </View>
    );
  };

  const _keyExtractor = (item) => item.title;

  const subscribeToNetworkChanges = NetInfo.addEventListener((state) => {
    s = state.isInternetReachable;
    if (s != online) {
      setOnline(s);
      if (!s) {
        (nm = "Your device is offline"), (ntt = "danger");
      }
    }
  });
  const handleLogout = () => {
    //console.log(ctx)
    helpers.remove("pa_u");
    setAtk(null);
    setRtk(null);
    setU(null);
    setLoggedIn(false);
    // navigation.replace("logins");
  };

  let ctx = {
    emailStart,
    setEmailStart,
    budgetData,
    setBudgetData,
    retireProfile,
    setRetireProfile,
    pensionJars,
    onboardingCompleted,
    setOnboardingCompleted,
    setPensionJars,
    loggedIn: loggedIn,
    setLoggedIn: setLoggedIn,
    etk: etk,
    setEtk: setEtk,
    atk: atk,
    setAtk: setAtk,
    rtk: rtk,
    setRtk: setRtk,
    u: u,
    setU: setU,
    online: online,
    setOnline: setOnline,
    hasDoneSetup: hasDoneSetup,
    setHasDoneSetup: setHasDoneSetup,
  };

  const [loaded] = useFonts({
    Organical: require("./assets/fonts/OrganicalPersonalUseBoldItalic-2O6xe.ttf"),
  });

  useEffect(() => {
    //  helpers.remove("pa_u");
    async function prepare() {
      try {
        //make any API calls you need to do here

        let rtk = await helpers.getValueFor("pa_rtk"),
          firstView = await helpers.getValueFor("pa_first_view");
        let uu = null,
          credentials = null;

        if (firstView && firstView == "false") setShowApp(true);

        try {
          // Retrieve the credentials
          uu = await helpers.getValueFor("pa_u");
          if (uu) {
            const userData = JSON.parse(uu);
            const status = userData?.included[0]?.onboardingCompleted;
            console.log(userData, status);
            setOnboardingCompleted(status);
            if (rtk != null && uu != null) {
              //get auth0 access token using refresh token
              let refreshTokenData = {
                grant_type: "refresh_token",
                client_id: Auth0_ClientID,
                refresh_token: rtk,
              };
              let url = `${Auth0_Domain}/oauth/token`;

              const req = new Request(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: helpers._urlEncode(refreshTokenData),
              });
              console.log(refreshTokenData);
              // let response2 = await fetch(req);
              await fetch(req)
                .then((res) => res.json())
                .then((dt) => {
                  if (dt?.error) {
                    console.log(dt);
                    // handleLogout();
                  } else {
                    console.log("dt from App.js: ", dt);
                    helpers.save("pa_atk", dt.access_token);
                    helpers.save("pa_rtk", dt.refresh_token);
                    setAtk(dt.access_token);
                    setU(JSON.parse(uu));
                  }
                })
                .catch((err) => {
                  console.log("error occured", err);
                });
            }
          } else {
            console.log("No credentials stored");
          }
        } catch (error) {
          console.log("An error occured:", error);
        }

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Maybe remove this in production..
        await new Promise((resolve) => setTimeout(resolve, 2000));

        try {
          // Unsubscribe to these updates:
          subscribeToNetworkChanges();
        } catch (e) {
          console.warn(e);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsAppReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (online) {
      helpers.registerForPushNotificationsAsync().then((token) => {
        //alert('About to get push token for push notification!');
        //alert(`etk in registerForPushNotificationsAsync: ${token}`);
      });

      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log("response: ", response);
        });

      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }
  }, [online]);

  //let irn = loggedIn ? "AppStack" : "AuthStack";
  let irn = "InitScreen";

  if (showApp) {
    return (
      <View style={{ flex: 1 }}>
        <UserProvider value={ctx}>
          <Provider>
            <NavigationContainer ref={navigationRef}>
              <Stack.Navigator
                initialRouteName={irn}
                activeColor="#f0edf6"
                inactiveColor="#3e2465"
                barStyle={{ backgroundColor: "#694fad" }}
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen
                  name="InitScreen"
                  component={InitScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                {loggedIn ? (
                  <>
                    <Stack.Screen
                      name="SetupStack"
                      component={onboardingCompleted ? JSDasboard : SetupStack}
                      options={{
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="AppTab"
                      component={AppTab}
                      options={{
                        tabBarLabel: "Jarvis",
                        tabBarIcon: ({ color }) => (
                          <MaterialCommunityIcons
                            name="view-dashboard"
                            color={color}
                            size={26}
                          />
                        ),
                      }}
                    />
                  </>
                ) : (
                  <Stack.Screen
                    name="AuthStack"
                    component={AuthStack}
                    options={{
                      tabBarLabel: "Login",
                      tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                          name="account"
                          color={color}
                          size={26}
                        />
                      ),
                    }}
                  />
                )}
              </Stack.Navigator>
            </NavigationContainer>
            <StatusBar style="auto" />
            <FlashMessage position="bottom" />
          </Provider>
        </UserProvider>
      </View>
    );
  } else {
    return (
      <>
        <View style={{ flex: 1 }}>
          <StatusBar translucent backgroundColor="transparent" />
          <AppIntroSlider
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
            bottomButton
            showSkipButton
            showPrevButton
            data={data}
            onDone={() => {
              setShowApp(true);
              helpers.save("pa_first_view", "false");
            }}
          />
        </View>
        <StatusBar style="auto" />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 96, // Add padding to offset large buttons and pagination in bottom of page
  },
  title: {
    fontSize: 22,
    color: "white",
    textAlign: "center",
    marginTop: 10,
  },
  copy: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginTop: 10,
  },
});
