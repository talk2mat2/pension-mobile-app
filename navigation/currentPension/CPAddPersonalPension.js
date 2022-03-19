import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Platform,
  Animated,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from "react-native";
import * as helpers from "../../Helpers";
import UserContext from "../../contexts/UserContext";
import JarvisButton from "../../components/JarvisButton";
import { List, ProgressBar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CPPersonSwipper from "../../components/CPPersonSwipper";
import CPDatatable from "../../components/CPDatatable";
import { myColorsLight } from "../../constant/colors";
import { LinearGradient } from "expo-linear-gradient";
import PersonalPenContext from "../../contexts/personalContext";
import MyGradientBackground from "../../components/grdientBackGround";
import PanableCard from "../../components/pannableCard";

function CPAddPersonalPension({ navigation }) {
  const [iDontHhaveState, setIdontHaveState] = React.useState(null);
  const [providerJars, setProviderJars] = React.useState([
    {
      id: 18934,
      provider: "",
      currentValue: "",
      regularContribution: "",
      contributeBasics: "",
      monthlyContribution: "",
      spousePension: "no",
    },
  ]);
  const isValidJars = () => {
    let isvalid = false;

    const isExist = providerJars.find(
      (item) => item.currentValue !== "" && item.currentValue !== ""
    );
    // providerJars.map((item) => {
    //   if (item.currentValue !== "" && item.currentValue !== "") {
    //     return isvalid = true;
    //   } else {
    //     isvalid = false;
    //   }
    // });
    if (isExist) {
      isvalid = true;
    }
    return isvalid;
  };
  const AddJars = () => {
    const newJar = {
      id: Math.floor(Math.random() * 100),
      provider: "",
      currentValue: "",
      regularContribution: "",
      contributeBasics: "",
      monthlyContribution: "",
      spousePension: "no",
    };
    setProviderJars([...providerJars, newJar]);
  };

  const updateJars = (index, newJarData) => {
    const newProviderJars = providerJars.slice();
    newProviderJars[index] = newJarData;
    setProviderJars(newProviderJars);
  };
  const cleanJars = (index, newJarData) => {
    const newJar = {
      id: Math.floor(Math.random() * 100),
      provider: "",
      currentValue: "",
      regularContribution: "",
      contributeBasics: "",
      monthlyContribution: "",
      spousePension: "no",
    };
    const newProviderJars = providerJars.slice();
    newProviderJars[index] = newJar;
    setProviderJars(newProviderJars);
  };
  const [person1, setPerson1] = React.useState({
    provider: "",
    currentValue: "",
    regularContribution: "",
    contributeBasics: "",
    monthlyContribution: "",
    spousePension: "no",
  });
  const [person2, setPerson2] = React.useState({
    provider: "",
    currentValue: "",
    regularContribution: "",
    contributeBasics: "",
    monthlyContribution: "",
    spousePension: "no",
  });

  const ctx = useContext(UserContext);

  const submitFilledJars = () => {
    const jarsTosbumit = [];
    for (let i = 0; i < providerJars.length; i++) {
      if (
        providerJars[i].provider !== "" &&
        providerJars[i].currentValue !== ""
      ) {
        jarsTosbumit.push(providerJars[i]);
        console.log("not empty");
      }
    }
    console.log(jarsTosbumit);
  };

  const _next = () => {
    return submitFilledJars();
    navigation.navigate("DefinedBenefit");
  };
  const _goBack = () => {
    navigation.goBack();
  };

  const checkPersonPensions = () => {
    if (providerJars.length > 0) {
      const isExist = providerJars.filter(
        (item) => item.currentValue !== "" && item.currentValue !== ""
      );
      return `Continue with ${isExist.length} DC pensions`;
    } else {
      return `Continue`;
    }
  };
  return (
    <PersonalPenContext.Provider
      value={{
        person2,
        setPerson2,
        person1,
        setPerson1,
        providerJars,
        setProviderJars,
        AddJars,
        cleanJars,
        updateJars,
      }}
    >
      <MyGradientBackground>
        <>
          <View
            style={{
              marginTop: 30,
              alignContent: "flex-start",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View style={{ position: "absolute", left: 10 }}>
              <Pressable onPress={_goBack}>
                <MaterialCommunityIcons
                  name="chevron-left-circle-outline"
                  color={myColorsLight.lightGreyDark}
                  size={40}
                />
              </Pressable>
            </View>

            <View>
              <View>
                {/* <Text
                  style={[
                    styles.loginText,
                    ,
                    { fontSize: 20, textAlign: "center" },
                  ]}
                >
                  Step 2 of 4
                </Text> */}
              </View>
              <View>
                <Text
                  style={[
                    styles.loginText,
                    ,
                    { fontSize: 15, textAlign: "center", fontWeight: "bold" },
                  ]}
                >
                  Current Pensions & Savings
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              ...styles.hrView,
              width: "90%",
              alignSelf: "center",
              marginTop: 25,
            }}
          />
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                ...styles.subHeader,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Personal Pensions
            </Text>
          </View>
          <View
            style={{
              ...styles.hrView,
              width: "90%",
              alignSelf: "center",
              marginTop: 10,
            }}
          />
          <View style={{ marginTop: 30 }}>
            <CPPersonSwipper />
          </View>
          <Text style={{ textAlign: "center", marginVertical: 7 }}>
            Swipe to add more pensions
          </Text>
          <View style={{ marginTop: 7, alignItems: "center" }}>
            {iDontHhaveState === true || isValidJars() === true ? (
              <JarvisButton
                bgcolor={myColorsLight.black}
                play={_next}
                btn={checkPersonPensions()}
                w={210}
              />
            ) : (
              <TouchableOpacity onPress={() => setIdontHaveState(true)}>
                <View style={styles.btnIdont}>
                  <Text style={{ fontWeight: "900" }}>
                    I don’t have any Personal Pensions
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          <PanableCard styles={{ height: "29%" }}>
            <CPDatatable />
          </PanableCard>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 8,
              elevation: 8,
            }}
          >
            <View
              style={{
                marginTop: 30,
                width: "50%",
                alignSelf: "center",
                marginBottom: 20,
              }}
            >
              <ProgressBar
                progress={0.5}
                color={myColorsLight.lightGreyDark}
                style={{ height: 7 }}
              />
              <Text style={{ textAlign: "center", fontSize: 20 }}>2/4</Text>
            </View>
          </View>
        </>
      </MyGradientBackground>
    </PersonalPenContext.Provider>
  );
}

const styles = StyleSheet.create({
  sum: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginTop: 10,
  },
  background: {
    height: 100,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    right: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",

    marginTop: 30,
    //justifyContent: 'center',
  },
  containerStyle: {
    height: "90%",
    width: "80%",
    padding: 20,
    paddingTop: 20,
    backgroundColor: "white",
    marginHorizontal: 25,
    borderRadius: 10,
    justifyContent: "flex-start",
  },
  footerContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    // backgroundColor: "#f1f3f2",
    height: "24%",
    marginTop: "auto",
    borderTopColor: myColorsLight.lightGreyDark,
    borderLeftColor: myColorsLight.lightGreyDark,
    borderRightColor: myColorsLight.lightGreyDark,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    paddingTop: 20,
    paddingHorizontal: 20,
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
  btnIdont: {
    padding: 3,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: myColorsLight.lightGreyDark,
    backgroundColor: myColorsLight.lighterGrey,
    minWidth: 200,
    alignItems: "center",
    shadowRadius: 2,
    paddingHorizontal: 10,
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
    fontSize: 22,
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

export default CPAddPersonalPension;
