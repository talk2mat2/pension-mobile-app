import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Platform,
  Animated,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ImageBackground,
} from "react-native";
import * as helpers from "../../Helpers";
import {
  HeaderFour,
  HeaderTwo,
  ParaOne,
  HeaderThree,
} from "../../constant/fonts";
import UserContext from "../../contexts/UserContext";
import JarvisButton from "../../components/JarvisButton";
import { List } from "react-native-paper";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import OutcomeCard from "../../components/Outcome_Card";
import MyGradientBackground from "../../components/grdientBackGround";
import { myColorsLight, primary } from "../../constant/colors";
import OutcomeDatatable from "../../components/outcomeDataTable";
import RtOutcomeDatatable from "../../components/RtOutcomeDataTable";
import api from "../../api";

function RTExcellent({ navigation, route }) {
  const [showCard, setShowCard] = React.useState(false);
  const [scores, setScores] = React.useState(route.params?.result || 0);
  const [profile] = React.useState(route?.params?.profile || {});
  const [grossTarget, setGrossTarget] = React.useState(0);
  const ctx = useContext(UserContext);
  const [buttonBackground, setButtonBackground] = useState("#77f");
  const IntroPopper = new Animated.ValueXY({
    x: -Dimensions.get("window").width,
    y: 0,
  });
  const showCards = () => setShowCard(true);
  const popperAnimated = React.useRef(() => {
    Animated.spring(IntroPopper, {
      toValue: 0,
      duration: 1000,
      friction: 3,
      tension: 20,
      useNativeDriver: true,
    }).start(showCards);
  }).current;
  const hideCard = () => setShowCard(false);
  
  const _next = () => {
    navigation.navigate("CPStack");
  };
  const Calculate_logged_in_user_retirement = async () => {
    await api
      .Calculate_logged_in_user_retirement(ctx?.atk)
      .then((res) => {
        // console.log(res.data);
        //show gross target
        //  res?.data?.grossTarget && setGrossTarget(res?.data?.grossTarget);
        //we show netTarget
        res?.data?.netTarget && setGrossTarget(res?.data?.netTarget);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const _goBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    setTimeout(() => {
      popperAnimated();
      Calculate_logged_in_user_retirement();
    }, 1000);
  }, []);

  //   "data": {
  //     "netTarget": 24187,
  //     "grossTarget": 27483.75
  //   }
  // }
  React.useEffect(() => {}, []);
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

      <Animated.View
        style={{
          alignItems: "center",
          transform: [{ translateX: IntroPopper.x }],
        }}
      >
        <MaterialCommunityIcons
          name="party-popper"
          size={60}
          color={primary.subText}
        />
        <HeaderTwo
          style={{
            textAlign: "center",
          }}
        >
          Excellent
        </HeaderTwo>
        <ParaOne
          style={{
            textAlign: "center",
            marginTop: 5,
          }}
        >
          You have completed step 2. To achieve your{"\n"} desired retirement
          lifestyle in will need a {"\n"}monthly retirement income of
        </ParaOne>
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
        <HeaderThree
          style={{
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          £{grossTarget && grossTarget > 12 ? Math.ceil(grossTarget / 12) : 0}
        </HeaderThree>
        <HeaderFour style={{ textAlign: "center" }}>
          (£{grossTarget} Per Annum)
        </HeaderFour>
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
        <ParaOne
          style={{
            textAlign: "center",

            marginTop: 5,
          }}
        >
          You have also earned your second Javis Insights{"\n"}card on Saving &
          Investing
        </ParaOne>
      </View>
      <View style={styles.footerContainer}>
        {/* <View style={{ marginTop: 20 }}>
          <Text style={{ textAlign: "center" }}>
            Facts & Stats On Saving/Investing
          </Text>
        </View> */}
        <View
          style={{
            ...styles.hrView,
            width: "100%",
            alignSelf: "center",
            marginTop: 10,
            height: 2,
          }}
        />
        <View style={{ marginTop: 30 }}>
          {/* <Text
            style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}
          >
            Place holder for useful{"\n"}
            actionable stats and{"\n"} facts on saving and {"\n"}
            investing for the future
          </Text> */}
        </View>
      </View>
      <View style={styles.footerSection}>
        <ImageBackground
          source={require("../../assets/jr.png")}
          style={{
            height: 130,
            width: "100%",
            flex: 1,
            alignItems: "center",
            paddingVertical: 15,
          }}
          imageStyle={{ resizeMode: "repeat" }}
        >
          <ParaOne
            style={{
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            You’re just one steps away from completion. Next step{" "}
          </ParaOne>
          <JarvisButton
            bgcolor={primary.btn}
            play={_next}
            btn="Pensions & Savings"
            w={200}
          />
        </ImageBackground>
      </View>
      {showCard && (
        <OutcomeCard
          styles={{ backgroundColor: primary.subBase }}
          hideCards={hideCard}
        >
          <>
            <HeaderThree
              style={{ ...styles.textHead, color: primary.inputText }}
            >
              Yours Retirement Profile
            </HeaderThree>
            <View style={{ ...styles.hrView, marginVertical: 10 }} />

            <View>
              <RtOutcomeDatatable {...{ profile }} />
              <Text style={{ ...styles.textHead, textAlign: "left" }}>
                Current Retirement Fund
              </Text>
            </View>
            <View style={{ ...styles.hrView, marginVertical: 9 }} />
          </>
        </OutcomeCard>
      )}
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
  textHead: {
    textAlign: "center",
  },
  footerSection: {
    ...{ alignItems: "center", marginTop: "auto", height: 100 },
    borderTopColor: "#bbb",
    borderTopWidth: 2,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: primary.base,
    position: "absolute",
    bottom: 2,
    left: 0,
    right: 0,
    zIndex: 10,
    elevation: 10,
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
    backgroundColor: primary.base,
    height: 330,
    marginTop: "auto",
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
