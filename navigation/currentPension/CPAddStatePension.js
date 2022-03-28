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
  Alert,
} from "react-native";
import * as helpers from "../../Helpers";
import UserContext from "../../contexts/UserContext";
import JarvisButton from "../../components/JarvisButton";
import { List, ProgressBar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import OutcomeCard from "../../components/Outcome_Card";
import PanableCard from "../../components/pannableCard";

import CPSwipper from "../../components/CPSwipper";
import CPDatatable from "../../components/CPDatatable";
import { myColorsLight } from "../../constant/colors";
import { LinearGradient } from "expo-linear-gradient";

import MyGradientBackground from "../../components/grdientBackGround";
import api from "../../api";
import StatePenContext from "../../contexts/satePenContext";

function CPAddStatePension({ navigation }) {
  const [statePension, setStatePensionData] = React.useState("");
  const [spouseGender, setSpouseGender] = React.useState("");
  const [spouseName, setSpouseName] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [retireProfile, setRetireProfile] = React.useState({});
  const [spouseStatePension, setSpouseStatePensionData] = React.useState("");
  const [iDontHhaveState, setIdontHaveState] = React.useState(null);
  const ctx = useContext(UserContext);

  const createStatePensionJar = async () => {
    const jarData = {
      type: "jar",
      attributes: {
        name: "Jar 1",
        jarType: "income",
        jarSubType: "state",
        isSpouse: false,
        incomeAmount: statePension,
        currentValue: 2.0,
        regContributionAmount: 1.0,
        incomeAmountStartDate: "",
        secclExternalProviderId: "",
        externalProviderRef: "",
        secclTransferLinkId: "",
        regContributionTaxBasis: "gross",
        regContributionFrequency: "monthly",
        transferAddress: {},
      },
    };
    const spouseData = {
      type: "jar",
      attributes: {
        name: "Jar 1",
        jarType: "income",
        jarSubType: "state",
        isSpouse: true,
        incomeAmount: spouseStatePension,
        currentValue: 2.0,
        regContributionAmount: 1.0,
        incomeAmountStartDate: "",
        secclExternalProviderId: "",
        externalProviderRef: "",
        secclTransferLinkId: "",
        regContributionTaxBasis: "gross",
        regContributionFrequency: "monthly",
        transferAddress: {},
      },
    };
    if (statePension) {
      await api
        .create_Jar(ctx?.atk, jarData)
        .then((res) => {
          console.log("jar created");
        })
        .catch((err) => console.log(err));
    }
    if (spouseStatePension) {
      await api
        .create_Jar(ctx?.atk, spouseData)
        .then((res) => {
          console.log("jar created");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const setStatePension = (data) => {
    helpers.save("statepension", JSON.stringify(data));
    setStatePensionData(data);
  };
  const setSpouseStatePension = (data) => {
    helpers.save("spouseStte", JSON.stringify(data));
    setSpouseStatePensionData(data);
  };
  React.useEffect(async () => {
    const statepensions = await helpers.getValueFor("statepension");
    if (statepensions) {
      setStatePensionData(JSON.parse(statepensions));
    }
    const spouseStte = await helpers.getValueFor("spouseStte");
    if (spouseStte) {
      setSpouseStatePensionData(JSON.parse(spouseStte));
    }
  }, []);

  const _next = () => {
    Promise.resolve(createStatePensionJar())
      .then(() => {
        navigation.navigate("CPAddPersonalPension");
      })
      .catch((err) => {
        // console.log(err)
        navigation.navigate("CPAddPersonalPension");
      });
  };
  const _goBack = () => {
    navigation.goBack();
  };
  const CreateJar = async () => {
    await api
      .create_Jar(ctx?.atk)
      .then((res) => {})
      .catch((err) => {});
  };
  const Get_retirement_profile_user = async () => {
    await api
      .Get_retirement_profile_user(ctx?.atk, ctx?.u?.id)
      .then((res) => {
        setRetireProfile(res?.data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert(
          "Network error, unable to retrieve your retirement profile"
        );
        return err;
      });
  };

  React.useEffect(() => {
    Get_retirement_profile_user();
  }, []);

  const handleTextbtn = () => {
    if (!statePension && !spouseStatePension) {
      return "Continue without state pensions";
    }
    if (!spouseStatePension) {
      return "Continue with just my state pension";
    }
    if (!statePension && spouseStatePension) {
      return "Continue with only partner's state pension";
    } else {
      return "Continue";
    }
  };
  return (
    <StatePenContext.Provider
      value={{
        statePension,
        setStatePension,
        spouseGender,
        setSpouseGender,
        spouseStatePension,
        setSpouseStatePension,
        setGender,
        retireProfile,
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
                  Step 1 of 4
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
              Add State Pensions
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
            <CPSwipper />
          </View>
          <View style={{ marginTop: 7, alignItems: "center" }}>
            {iDontHhaveState === false ||
            statePension.length > 0 ||
            spouseStatePension.length > 0 ? (
              <JarvisButton
                bgcolor={myColorsLight.black}
                play={_next}
                btn={handleTextbtn()}
                w={200}
              />
            ) : (
              <TouchableOpacity onPress={() => setIdontHaveState(false)}>
                <View style={styles.btnIdont}>
                  <Text style={{ fontWeight: "900" }}>
                    I don’t have a State Pension
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          {/* <View style={styles.footerContainer}>
            <CPDatatable />
          </View> */}
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
                progress={0.3}
                color={myColorsLight.lightGreyDark}
                style={{ height: 7 }}
              />
              <Text style={{ textAlign: "center", fontSize: 20 }}>1/4</Text>
            </View>
          </View>
        </>
      </MyGradientBackground>
    </StatePenContext.Provider>
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
    height: "29%",
    marginTop: "auto",
    borderTopColor: myColorsLight.lightGreyDark,
    borderLeftColor: myColorsLight.lightGreyDark,
    borderRightColor: myColorsLight.lightGreyDark,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    paddingTop: 20,
    paddingHorizontal: 20,
    marginBottom: 100,
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

export default CPAddStatePension;
