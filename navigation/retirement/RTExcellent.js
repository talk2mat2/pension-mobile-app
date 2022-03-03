import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Platform,
  Animated,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from "react-native";
import * as helpers from "../../Helpers";
import UserContext from "../../contexts/UserContext";
import JarvisButton from "../../components/JarvisButton";
import { List } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MyGradientBackground from "../../components/grdientBackGround";
import { myColorsLight } from "../../constant/colors";

function RTExcellent({ navigation }) {
  const ctx = useContext(UserContext);
  const [buttonBackground, setButtonBackground] = useState("#77f");
  const IntroPopper = new Animated.ValueXY({
    x: -Dimensions.get("window").width,
    y: 0,
  });
  const popperAnimated = () => {
    Animated.spring(IntroPopper, {
      toValue:0,
      duration:1000,
      friction:3,
      tension:20,
      useNativeDriver:true
    }).start();
  };

  const _next = () => {
    navigation.navigate('CPStack');
  };
  const _goBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    setTimeout(() => {
      popperAnimated();
    }, 1000);
  }, []);

  return (
    <MyGradientBackground>
      <View
        style={{
          marginTop: 10,
          alignContent: "flex-start",
          flexDirection: "row",
          justifyContent: "center",
        }}
      ></View>

      <Animated.View style={{ alignItems: "center" , transform: [{translateX: IntroPopper.x}]}}>
        <MaterialCommunityIcons
          name="party-popper"
          size={60}
          color={myColorsLight.black}
        />
        <Text
          style={{
            ...styles.subHeader,

            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Excellent
        </Text>
        <Text
          style={{
            ...styles.subHeader,
            color: myColorsLight.lightGreyDark,
            textAlign: "center",
            fontSize: 17,
            marginTop: 5,
          }}
        >
          You have completed step 2. To achieve your{"\n"} desired retirement
          lifestyle in will need a {"\n"}monthly retirement income of
        </Text>
      </Animated.View>
      <View
        style={{
          ...styles.hrView,
          width: "90%",
          alignSelf: "center",
          marginTop: 30,
        }}
      />
      <View style={{ marginTop: 30 }}>
        <Text
          style={{
            ...styles.subHeader,

            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          £2779
        </Text>
        <Text style={{ textAlign: "center" }}>(£33,348 Per Annum)</Text>
      </View>
      <View
        style={{
          ...styles.hrView,
          width: "90%",
          alignSelf: "center",
          marginTop: 10,
        }}
      />
      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            ...styles.subHeader,
            color: myColorsLight.lightGreyDim,
            textAlign: "center",
            fontSize: 17,
            marginTop: 5,
          }}
        >
          You have also earned your second Javis Insights{"\n"}card on Saving &
          Investing
        </Text>
      </View>
      <View style={styles.footerContainer}>
        <View style={{ marginTop: 20 }}>
          <Text style={{ textAlign: "center" }}>
            Facts & Stats On Saving/Investing
          </Text>
        </View>
        <View
          style={{
            ...styles.hrView,
            width: "100%",
            alignSelf: "center",
            marginTop: 10,
            height: 2,
            backgroundColor: "grey",
          }}
        />
        <View style={{ marginTop: 30 }}>
          <Text
            style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}
          >
            Place holder for useful{"\n"}
            actionable stats and{"\n"} facts on saving and {"\n"}
            investing for the future
          </Text>
        </View>
        <View style={styles.footerSection}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 14,
              marginBottom: 8,
            }}
          >
            You’re just one steps away from completion. Next step{" "}
          </Text>
          <JarvisButton
            bgcolor={myColorsLight.black}
            play={_next}
            btn="Pensions & Savings"
            w={200}
          />
        </View>
      </View>
    </MyGradientBackground>
  );
}

const styles = StyleSheet.create({
  sum: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginTop: 10,
  },
  footerSection: {
    ...{ alignItems: "center", marginTop: "auto", height: 80 },
    borderTopColor: "#bbb",
    borderTopWidth: 2,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: myColorsLight.white,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",

    marginTop: 30,
    //justifyContent: 'center',
  },
  footerContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: myColorsLight.lighterGrey,
    height: 300,
    marginTop: 20,
    borderTopColor: "#bbb",
    borderLeftColor: "#bbb",
    borderRightColor: "#bbb",
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
  },
  cardsContainer: {
    marginTop: 17,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
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
    // justifyContent: "center",
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
    // marginTop: 10,
    // paddingBottom: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#bbb",
    height: 2,
    backgroundColor: "#bbb",
  },
});

export default RTExcellent;
