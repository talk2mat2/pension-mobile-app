import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Platform,
  Animated,
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  ImageBackground,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as AuthSession from "expo-auth-session";
const axios = require("axios");
import * as helpers from "../Helpers";
import UserContext from "../contexts/UserContext";

function InitScreen({ navigation }) {
  const ctx = useContext(UserContext);
  const [buttonBackground, setButtonBackground] = useState("#77f");

  const _next = async () => {
    let uu = null,
      hds = false;
    try {
      // Retrieve the credentials
      uu = await helpers.getValueFor("pa_u");
      if (uu) {
        let hasDoneSetup = await helpers.getValueFor("pa_setup");
        ctx.setLoggedIn(true);
        if (hasDoneSetup && hasDoneSetup != null && hasDoneSetup == "yes") {
          ctx.setHasDoneSetup(true);
          navigation.navigate("AppTab");
        } else {
          //TODO: check the current level in the onboarding journey...
          //... and navigate to the appropriat screen
          navigation.replace("SetupStack");
        }
      } else {
        // console.log("Navigating to AuthStack");
        navigation.navigate("AuthStack");
      }
    } catch (e) {
      console.log("Error occured in InitScreen: ", e);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      _next();
    }, 3000);
  }, [ctx?.u]);

  return (
    <View style={[styles.container]}>
      <Text style={{ textAlign: "center", fontSize: 40, fontWeight: "bold" }}>
        Jarvis
      </Text>
      {/* <View style={styles.centerView}>
		  	 <Text style={[styles.initText,styles.textWhite,{ fontSize: 40}]}>Helping people</Text>
			</View>
		   <View style={[styles.centerView,{marginTop: 80}]}>
             <Text style={[styles.initText,styles.textWhite,{marginTop: 10, fontSize: 40}]}>prepare better</Text>
		   </View>
           <View style={[styles.centaerView,{marginTop: 80}]}>
             <Text style={[styles.initText,styles.textWhite,{marginTop: 10, fontSize: 40}]}>for retirement</Text>
		   </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    //justifyContent: 'center',
  },
  centerView: {
    flexDirection: "row",
    alignSelf: "center",
  },
  loginButton: {
    marginTop: 50,
    marginLeft: 20,
  },
  initText: {
    fontFamily: "Organical",
  },
  textWhite: {
    color: "#fff",
  },
  subHeader: {
    fontSize: 30,
  },
  hrView: {
    width: "100%",
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",
  },
});

export default InitScreen;
