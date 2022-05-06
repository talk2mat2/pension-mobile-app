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
import {
  HeaderFour,
  HeaderTwo,
  ParaOne,
  HeaderThree,
} from "../../constant/fonts";
import * as helpers from "../../Helpers";
import { useDispatch } from "react-redux";
import UserContext from "../../contexts/UserContext";
import JarvisButton from "../../components/JarvisButton";
import { List, ProgressBar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import OutcomeCard from "../../components/Outcome_Card";
import PanableCard from "../../components/pannableCard";

import CPSwipper from "../../components/CPSwipper";
import CPDatatable from "../../components/CPDatatable";
import { myColorsLight, primary } from "../../constant/colors";
import { LinearGradient } from "expo-linear-gradient";

import MyGradientBackground from "../../components/grdientBackGround";
import api from "../../api";
import {
  cleanSpousepension,
  cleanStatepension,
  updateSpousepension,
  updateStatepension,
} from "../../redux/slices/jarslice";
import StatePenContext from "../../contexts/satePenContext";

function CPAddStatePension({ navigation }) {
  const [statePension, setStatePensionData] = React.useState("");
  const [spouseGender, setSpouseGender] = React.useState("");
  const [spouseName, setSpouseName] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [retireProfile, setRetireProfile] = React.useState({});
  const [startScroll, setStartScroll] = React.useState(false);
  const [spouseStatePension, setSpouseStatePensionData] = React.useState("");
  const [iDontHhaveState, setIdontHaveState] = React.useState(null);
  const ctx = useContext(UserContext);
  const dispatch = useDispatch();
  const createStatePensionJar = async () => {
    const jarData = {
      type: "jar",
      attributes: {
        name: "Jar 1",
        jarType: "income",
        jarSubType: "state",
        isSpouse: false,
        incomeAmount: statePension,
        currentValue: 0.0,
        regContributionAmount: 0.0,
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
        currentValue: 0.0,
        regContributionAmount: 0.0,
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
      dispatch(updateStatepension(jarData));
      //will move the api call to rt query
    } else {
      dispatch(cleanStatepension());
    }
    if (spouseStatePension) {
      dispatch(updateSpousepension(spouseData));
    } else {
      dispatch(cleanSpousepension());
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
      .Get_retirements_profile_user(ctx?.atk)
      .then((res) => {
        setRetireProfile(res?.data);
        ctx.setRetireProfile(res?.data);
        console.log(res?.data);
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
        startScroll,
        setStartScroll,
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
                  color={primary.text}
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
                <HeaderFour
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                  }}
                >
                  Current Pensions & Savings
                </HeaderFour>
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
            <HeaderThree
              style={{
                textAlign: "center",
                fontSize: 28,
              }}
            >
              Add State Pensions
            </HeaderThree>
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
                bgcolor={primary.btn}
                play={_next}
                btn={handleTextbtn()}
                w={300}
                btnStyle={{ fontSize: 17 }}
              />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  if (!retireProfile?.attributes?.spouseName) {
                    navigation.navigate("CPAddPersonalPension");
                  } else {
                    setIdontHaveState(false);
                    setStartScroll(true);
                  }
                }}
              >
                <View style={styles.btnIdont}>
                  <ParaOne
                    style={{ fontWeight: "900", color: primary.baseText }}
                  >
                    I don’t have a State Pension
                  </ParaOne>
                </View>
              </TouchableOpacity>
            )}
          </View>
          {/* <View style={styles.footerContainer}>
            <CPDatatable />
          </View> */}
          <PanableCard styles={{ height: "29%", marginTop: "auto" }}>
            <CPDatatable
              style={{ backgroundColor: primary.subBase }}
              profile={ctx?.u}
            />
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
                color={primary.text}
                style={{ height: 7 }}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  color: primary.text,
                }}
              >
                1/4
              </Text>
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
    backgroundColor: primary.subBase,
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
