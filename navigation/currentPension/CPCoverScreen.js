import React, { useState, useEffect, useRef, useContext } from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import * as AuthSession from "expo-auth-session";
const axios = require("axios");
// import * as helpers from "../../Helpers";
import {
  HeaderFour,
  HeaderTwo,
  ParaOne,
  HeaderThree,
} from "../../constant/fonts";
import UserContext from "../../contexts/UserContext";
import JarvisButton from "../../components/JarvisButton";
import MyGradientBackground from "../../components/grdientBackGround";
import { myColorsLight, primary } from "../../constant/colors";
import api from "../../api";

function CpCoverScreen({ navigation }) {
  const ctx = useContext(UserContext);
  const [buttonBackground, setButtonBackground] = useState("#77f");

  const _next = () => {
    navigation.navigate("CPAddStatePension");
  };

  return (
    <MyGradientBackground>
      <ImageBackground
        source={require(".././../assets/jj.png")}
        style={{ height: "100%", width: "100%", flex: 1 }}
        imageStyle={{
          resizeMode: "repeat",
          overflow: "visible",
          backfaceVisibility: "visible",
          flex: 1,
        }}
      >
        <View style={{ marginTop: '40%' }}>
          <HeaderTwo style={{ textAlign: "center" }}>
            Planning your{"\n"}
            retirement now is{"\n"}
            the best thing you{"\n"}
            can do for your{"\n"}
            future self.
          </HeaderTwo>
        </View>
        <View style={{ marginTop: 30 }}>
          <ParaOne style={styles.midsubHeader}>
            Now that we have your desired{"\n"}
            retirement lifestyle lets start{"\n"}
            building your retirement fund.{"\n"}
          </ParaOne>
        </View>

        {/* <>
        <View style={{ width: "100%", marginTop: 7 }}>
          <View style={{ ...styles.centerView, marginTop: 30 }}>
            <JarvisButton
              style={{ marginTop: 90 }}
              bgcolor={myColorsLight.black}
              play={_next}
              btn="Continue"
              w="50%"
            />
          </View>
        </View>
      </> */}
        <>
          <View style={{ width: "100%", marginTop: 'auto', alignItems: "center",marginBottom:'30%' }}>
            <View style={{ marginTop: '5%' }}>
              <JarvisButton
                style={{  }}
                bgcolor={primary.btn}
                play={_next}
                btn="Continue"
                w={200}
              />
            </View>
          </View>
        </>
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
  midsubHeader: {
    textAlign: "center",

    letterSpacing: 1.4,
  },
  textCenter: {
    textAlign: "center",
  },
  centerView: {
    alignItems: "center",
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
    fontSize: 30,
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

export default CpCoverScreen;
