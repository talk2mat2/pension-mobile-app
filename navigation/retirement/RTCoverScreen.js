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
  Image,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as AuthSession from "expo-auth-session";
const axios = require("axios");
import {
  HeaderFour,
  HeaderTwo,
  ParaOne,
  HeaderThree,
} from "../../constant/fonts";
import * as helpers from "../../Helpers";
import UserContext from "../../contexts/UserContext";
import JarvisButton from "../../components/JarvisButton";
import MyGradientBackground from "../../components/grdientBackGround";
import { myColorsLight, primary } from "../../constant/colors";

function RTCoverScreen({ navigation }) {
  const ctx = useContext(UserContext);
  const [buttonBackground, setButtonBackground] = useState("#77f");

  const _next = () => {
    navigation.navigate("RTbudgetOne");
  };

  return (
    <MyGradientBackground>
      <ImageBackground
        source={require("../../assets/jj.png")}
        style={{ height: "100%", width: "100%", flex: 1 }}
        imageStyle={{
          resizeMode: "repeat",
          overflow: "visible",
          backfaceVisibility: "visible",
          flex: 1
        }}
      >
        <View style={{ marginTop: 160, alignItems: "center" }}>
          <HeaderTwo style={styles.subHeader}>
            To Enjoy Your {"\n"}Retirement Lifestyle{"\n"} it is important to{" "}
            {"\n"}
            know what monthly {"\n"} income you will need {"\n"}for your pension
          </HeaderTwo>
        </View>

        <>
          <View style={{ width: "100%", marginTop: 20, alignItems: "center" }}>
            <View style={{ marginTop: 60 }}>
              <JarvisButton
                style={{ marginTop: 90 }}
                bgcolor={primary.btn}
                play={_next}
                btn="Continue"
                w={150}
              />
            </View>
          </View>
        </>
        {/* <View style={{ width: "100%", height: "45%", marginTop: "auto" }}>
        <Image
          style={{ flex: 1, width: undefined, height: undefined }}
          source={require("../../assets/jr.png")}
          resizeMode="repeat"
        />
      </View> */}
      </ImageBackground>
    </MyGradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    marginTop: 30,
    //justifyContent: 'center',
  },
  textCenter: {
    textAlign: "center",
  },
  centerView: {
    flexDirection: "row",
    alignSelf: "center",
  },
  continueButton: {
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
    // fontSize: 30,
    textAlign: "center",
  },
  hrView: {
    width: "100%",
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",
  },
});

export default RTCoverScreen;
