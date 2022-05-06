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
import {
  HeaderFour,
  HeaderTwo,
  ParaOne,
  HeaderThree,
} from "../../constant/fonts";
import * as helpers from "../../Helpers";
import UserContext from "../../contexts/UserContext";
import JarvisButton from "../../components/JarvisButton";
import { List } from "react-native-paper";
import Api from "../../api";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import OutcomeCard from "../../components/Outcome_Card";
import MyGradientBackground from "../../components/grdientBackGround";
import { myColorsLight, primary } from "../../constant/colors";
import OutcomeDatatable from "../../components/outcomeDataTable";

function CPCongrat({ navigation, route }) {
  const [showCard, setShowCard] = React.useState(true);
  const [scores, setScores] = React.useState(route.params?.result || 0);
  const ctx = useContext(UserContext);
  const [buttonBackground, setButtonBackground] = useState("#77f");
  const IntroPopper = new Animated.ValueXY({
    x: -Dimensions.get("window").width,
    y: 0,
  });
  const popperAnimated = React.useRef(() => {
    Animated.spring(IntroPopper, {
      toValue: 0,
      duration: 1000,
      friction: 3,
      tension: 20,
      useNativeDriver: true,
    }).start();
  }).current;
  const hideCard = () => setShowCard(false);

  const _next = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "DashboardStack" }],
    });
  };

  // const _updateUser = () => {
  //   //Update the frontend: context and async storage
  //   let u = ctx?.u;
  //   u.included[0].onboardingCompleted == true;
  //   ctx.setU(u);
  //   helpers.save("pa_u", JSON.stringify(u));
  // };
  // const completeOnboarding = async () => {
  //   _updateUser();
  //   const newData = {
  //     data: {
  //       type: "retirementProfile",
  //       attributes: {
  //         onboardingCompleted: true,
  //       },
  //     },
  //   };
  //   await Api.Update_retirement_profile(
  //     ctx?.retireProfile?.id,
  //     ctx?.atk,
  //     newData
  //   )
  //     .then((res) => {
  //       // console.log("done", res);
  //       ctx.setRetireProfile(res?.data);
  //     })
  //     .catch((err) => {
  //       // console.log("undone",err);
  //     });
  // };
  // const updateUsersMe = async () => {
  //   const usersAttrib = {
  //     firstName: ctx?.u?.attributes?.fname,
  //     lastName: ctx?.u?.attributes?.lname,
  //     title: ctx?.u?.attributes?.title,
  //     name: ctx?.u?.attributes?.name,
  //   };

  //   const usersData = {
  //     data: {
  //       type: "user",
  //       attributes: {
  //         ...usersAttrib,
  //         onboardingCompleted: true,
  //       },
  //     },
  //   };
  //   await Api.update_user_profile(usersData, ctx?.atk)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {});
  // };
  const _goBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    setTimeout(() => {
      popperAnimated();
    }, 1000);
  }, []);

  // React.useEffect(() => {
  //   // sync usersprofile with backend
  //   // updateUsersMe();
  //   completeOnboarding();
  // }, []);
  //   "data": {
  //     "netTarget": 24187,
  //     "grossTarget": 27483.75
  //   }
  // }

  return (
    <MyGradientBackground>
      <View
        style={{
          marginTop: 40,
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
          size={80}
          color={primary.text}
        />
        <HeaderTwo
          style={{
            ...styles.subHeader,
            marginTop: 16,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Congratulations
        </HeaderTwo>
        <ParaOne
          style={{
            textAlign: "center",
            fontSize: 17,
            marginTop: 20,
          }}
        >
          Your retirement profile is now compete
        </ParaOne>
      </Animated.View>

      <View style={{ marginTop: 30 }}></View>
      <View
        style={{
          ...styles.hrView,
          width: "90%",
          alignSelf: "center",
          marginTop: 10,
        }}
      />

      {/* <View style={styles.footerContainer}> */}
      {/* <View>
          <Text style={{ textAlign: "center" }}>
            Facts & Stats On Saving/Investing
          </Text>
        </View> */}
      {/* <View
          style={{
            ...styles.hrView,
            width: "100%",
            alignSelf: "center",
            marginTop: 10,
            height: 2,
            backgroundColor: "grey",
          }}
        /> */}
      {/* <View style={{ marginTop: 30 }}>
          <Text
            style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}
          >
            Place holder for useful{"\n"}
            actionable stats and{"\n"} facts on saving and {"\n"}
            investing for the future
          </Text>
        </View> */}

      {/* </View> */}

      {showCard && (
        <OutcomeCard
          styles={{ backgroundColor: primary.subBase }}
          hideCards={hideCard}
        >
          <>
            <HeaderThree style={styles.textHead}>
              Your Current Pensions & Savings Data
            </HeaderThree>
            <View style={{ ...styles.hrView, marginVertical: 10 }} />

            <View>
              <OutcomeDatatable />
            </View>
            {/* <View style={{ ...styles.hrView, marginVertical: 9 }} /> */}
          </>
        </OutcomeCard>
      )}
      <View style={styles.footerSection}>
        <ImageBackground
          source={require("../../assets/jr.png")}
          style={{
            height: 200,
            width: "100%",
            flex: 1,
            alignItems: "center",
            paddingVertical: 30,
          }}
          imageStyle={{ resizeMode: "repeat" }}
        >
          <JarvisButton
            bgcolor={primary.btn}
            play={_next}
            btn="Go to My Dasboard"
            w={200}
          />
        </ImageBackground>
      </View>
    </MyGradientBackground>
  );
}

const styles = StyleSheet.create({
  textHead: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "800",
    color: primary.baseText,
  },
  sum: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginTop: 10,
  },
  footerSection: {
    //  alignItems: "center", marginTop: "auto", height: 100 },
    // borderTopColor: "#bbb",
    // borderTopWidth: 2,
    // paddingTop: 30,
    // paddingBottom: 10,
    // backgroundColor: primary.base,
    // position: "absolute",
    // bottom: 10,
    // left: 0,
    // right: 0,
    // zIndex: 8,
    // elevation: 8,
    marginTop: "auto",
    height: 130,
    borderTopColor: "#bbb",
    borderTopWidth: 2,
    // paddingTop: 15,
    // paddingBottom: 15,
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
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20,

    height: "40%",
    marginTop: "auto",
    // borderTopColor: "#bbb",
    // borderLeftColor: "#bbb",
    // borderRightColor: "#bbb",
    // borderTopWidth: 2,
    // borderRightWidth: 2,
    // borderLeftWidth: 2,
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    zIndex: 8,
    elevation: 8,
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
    height: 2,
    backgroundColor: "#bbb",
  },
});

export default CPCongrat;
