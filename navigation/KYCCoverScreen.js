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
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as AuthSession from "expo-auth-session";
const axios = require("axios");
import * as helpers from "../Helpers";
import UserContext from "../contexts/UserContext";
import { HeaderFour, HeaderTwo, ParaOne } from "../constant/fonts";
import { AntDesign } from "@expo/vector-icons";
import JarvisButton from "../components/JarvisButton";
import MyGradientBackground from "../components/grdientBackGround";
import { myColorsLight, primary } from "../constant/colors";
import api from "../api";
import JarvisLoader from "../components/JarvisLoader";

function KYCCoverScreen({ navigation }) {
  const ctx = useContext(UserContext);
  const [isLoading, setIsloading] = React.useState(true);
  const [buttonBackground, setButtonBackground] = useState("#77f");

  const _next = () => {
    navigation.navigate("KYCName");
  };
  const handleLogout = () => {
    //console.log(ctx)
    helpers.remove("pa_u");
    ctx?.setAtk(null);
    ctx?.setRtk(null);
    ctx?.setU(null);
    ctx?.setLoggedIn(false);
    // navigation.replace("logins");
  };
  const checkOnboardStatus = async () => {
    setIsloading(true);
    await api
      .Get_retirement_profiles_user(ctx?.atk)
      .then((resp) => {
        setIsloading(false);
        if (resp?.data == null) {
          //if the user is registered but has not created a retire-profile
          ctx.setOnboardingCompleted(false);
        }
        if (resp?.data?.attributes?.onboardingCompleted == true) {
          ctx.setOnboardingCompleted(true);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
        setIsloading(false);
        //log out if the token is invalid?
        handleLogout();
      });
  };

  React.useEffect(() => {
    checkOnboardStatus();
  }, []);
  return (
    <MyGradientBackground>
      {isLoading ? (
        <JarvisLoader color={primary.subText} />
      ) : (
        <>
          <View
            style={{
              alignItems: "flex-end",
              paddingHorizontal: 10,
              position: "absolute",
              top: 60,
              right: 0,
            }}
          >
            <TouchableOpacity onPress={handleLogout}>
              <View style={{ alignItems: "center" }}>
                <AntDesign name="logout" size={20} color={primary.text} />
                <Text style={{ color: primary.text, fontSize: 13 }}>
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* <View style={{ alignItems: "center", marginTop: 80 }}>
            <Text
              style={[styles.loginText, { fontSize: 40, color: primary.text }]}
            >
              Jarvis
            </Text>
          </View> */}
          <View
            style={{
              marginTop: 150,
              backgroundColor: primary.subText,
              height: 1,
              width: "85%",
              marginHorizontal: 25,
              alignSelf:'center'
            }}
          />
          <View style={{ alignItems: "center", marginTop: 30 }}>
            <HeaderTwo>Welcome to Jarvis</HeaderTwo>
            {/* <Text style={styles.subHeader}>Welcome to Jarvis</Text> */}
          </View>
          <View
            style={{ marginTop: 30, alignItems: "center", marginBottom: 30 }}
          >
            <ParaOne style={{ textAlign: "center" }}>
              To build your retirement profile we{"\n"} would need to capture
              some information
              {"\n"}
              from you.
            </ParaOne>
          </View>
          {/* <View
            style={{
              backgroundColor: primary.subText,
              height: 1,
              width: "100%",
            }}
          /> */}

          <View
            style={{
              borderTopWidth: 1,
              paddingTop: 30,
              borderTopColor: primary.subText,
              marginHorizontal: 57,
            }}
          >
            <HeaderFour style={{ letterSpacing: 0.6 }}>
              It would take just three steps:
            </HeaderFour>
          </View>

          <View
            style={{ paddingHorizontal: 40, marginTop: 10, marginBottom: 100 }}
          >
            <View style={styles.hrView}></View>

            <View style={styles.hrView}>
              <View style={{ marginLeft: 10, paddingVertical: 10 }}>
                <ParaOne
                  style={{
                    marginLeft: 5,
                    marginTop: 3,
                  }}
                >
                  <Text>1</Text>&nbsp;&nbsp; Personal Information
                </ParaOne>
              </View>
            </View>

            <View style={styles.hrView}>
              <View style={{ marginLeft: 10, paddingVertical: 10 }}>
                <ParaOne
                  style={{
                    marginLeft: 5,
                    marginTop: 3,
                  }}
                >
                  <Text>2</Text>&nbsp;&nbsp; Your Retirement Lifestyle
                </ParaOne>
              </View>
            </View>
            <View style={styles.hrView}>
              <View style={{ marginLeft: 10, paddingVertical: 10 }}>
                <ParaOne
                  style={{
                    marginLeft: 5,
                    marginTop: 3,
                  }}
                >
                  <Text>3</Text>&nbsp;&nbsp; Pensions & Savings
                </ParaOne>
              </View>
            </View>
          </View>
          <>
            <View
              style={{
                width: "100%",
                marginTop: 10,
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                marginBottom: 0,
              }}
            >
              <View style={[styles.centerView, { marginTop: 30 }]}>
                <ImageBackground
                  source={require("../assets/j2.png")}
                  style={{
                    height: 130,
                    width: "100%",
                    flex: 1,
                    alignItems: "center",
                    paddingVertical: 15,
                  }}
                  imageStyle={{ resizeMode: "repeat" }}
                >
                  <JarvisButton
                    style={{ ...styles.loginButton, marginTop: 10 }}
                    bgcolor={primary.btn}
                    play={_next}
                    btn="Let's begin"
                    w="50%"
                  />
                </ImageBackground>
              </View>
            </View>
          </>
        </>
      )}
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
    borderBottomColor: primary.subText,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: primary.subText,
  },
});

export default KYCCoverScreen;
