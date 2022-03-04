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
import JarvisButton from "../components/JarvisButton";
import MyGradientBackground from "../components/grdientBackGround";
import { myColorsLight } from "../constant/colors";

function KYCCoverScreen({ navigation }) {
  const ctx = useContext(UserContext);
  const [buttonBackground, setButtonBackground] = useState("#77f");

  const _next = () => {
    navigation.navigate("KYCName");
  };

  return (
    <MyGradientBackground>
      <View style={{ alignItems: "center", marginTop: 80 }}>
        <Text style={[styles.loginText, { fontSize: 40 }]}>Jarvis</Text>
      </View>
      <View style={{ marginTop: 80, alignItems: "center" }}>
        <Text style={styles.subHeader}>Welcome to Jarvis</Text>
      </View>

      <View style={{ marginTop: 10, alignItems: "center",marginBottom:15 }}>
        <Text style={{ textAlign: "center",color:myColorsLight.lightGreyDim }}>
          To build your retirement profile{"\n"}, we would need to capture some
          {"\n"}
          information from you.
        </Text>
      </View>

      <View style={{ marginTop: 10 }}>
        <Text style={[{ fontWeight: "bold", alignSelf: "center" ,letterSpacing:0.6}]}>
          It would take just three steps:
        </Text>
      </View>

      <View style={{ paddingHorizontal: 40, marginTop: 10 ,marginBottom:100}}>
        <View style={styles.hrView}></View>

        <View style={styles.hrView}>
          <View style={{ marginLeft: 10, paddingVertical: 10 }}>
            <Text style={[{  marginLeft: 5, marginTop: 3,color:myColorsLight.lightGreyDark }]}>
              <Text>1</Text> Personal Information
            </Text>
          </View>
        </View>

        <View style={styles.hrView}>
          <View style={{ marginLeft: 10, paddingVertical: 10 }}>
          <Text style={[{  marginLeft: 5, marginTop: 3,color:myColorsLight.lightGreyDark }]}>
              <Text>2</Text> Your Retirement Lifestyle
            </Text>
          </View>
        </View>
        <View style={styles.hrView}>
          <View style={{ marginLeft: 10, paddingVertical: 10 }}>
          <Text style={[{  marginLeft: 5, marginTop: 3,color:myColorsLight.lightGreyDark }]}>
              <Text>3</Text> Pensions & Savings
            </Text>
          </View>
        </View>
      </View>

      <>
        <View style={{ width: "100%", marginTop: 10 ,position:'absolute',left:0,right:0,bottom:3,marginBottom:15}}>
          <View style={[styles.centerView, { marginTop: 60 }]}>
            <JarvisButton
              style={[styles.loginButton, { marginTop: 10 }]}
              bgcolor={myColorsLight.black}
              play={_next}
              btn="Let's begin"
              w='50%'
            />
          </View>
        </View>
      </>
    </MyGradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
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
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    //alignItems: "center",
    width: "100%",
  },
  textWhite: {
    color: "#fff",
  },
  subHeader: {
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  hrView: {
    width: "100%",
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",
  },
});

export default KYCCoverScreen;
