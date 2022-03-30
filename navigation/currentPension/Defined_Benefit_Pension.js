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
import DefinedPenContext from "../../contexts/definedPenContext";
import * as helpers from "../../Helpers";
import UserContext from "../../contexts/UserContext";
import JarvisButton from "../../components/JarvisButton";
import { List, ProgressBar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DefinedSwipper from "../../components/DefinedBenSwipper";
import CPDatatable from "../../components/CPDatatable";
import { myColorsLight } from "../../constant/colors";
import { LinearGradient } from "expo-linear-gradient";
import MyGradientBackground from "../../components/grdientBackGround";
import api from "../../api";
import PanableCard from "../../components/pannableCard";

function DefinedStateBenefit({ navigation }) {
  const [iDontHhaveState, setIdontHaveState] = React.useState(null);
  const ctx = useContext(UserContext);
  const [buttonBackground, setButtonBackground] = useState("#77f");
  const [benefitJars, setBenefitJar] = React.useState([
    {
      id: 18934,
      pensionName: "",
      annualIncome: "",
      provider: "",
      name: "",
      spousePension: "no",
      jarType: "income",
      jarSubType: "external",
      incomeAmount: "",
      isSpouse: false,
    },
  ]);
  const AddJars = () => {
    const newJar = {
      id: Math.floor(Math.random() * 100),
      pensionName: "",
      annualIncome: "",
      provider: "",
      name: "",
      spousePension: "no",
      jarType: "income",
      jarSubType: "external",
      incomeAmount: "",
      isSpouse: false,
    };
    setBenefitJars([...benefitJars, newJar]);
  };
  const cleanJars = (index) => {
    if (benefitJars.length > 1) {
      const newbenefitJar = benefitJars.filter((item, i) => i !== index);
      setBenefitJars(newbenefitJar);
    } else {
      const newJar = {
        id: Math.floor(Math.random() * 100),
        pensionName: "",
        annualIncome: "",
        provider: "",
        name: "",
        spousePension: "no",
        jarType: "income",
        jarSubType: "external",
        incomeAmount: "",
        isSpouse: false,
      };
      const newBenefitJars = benefitJars.slice();
      newBenefitJars[index] = newJar;
      setBenefitJars(newBenefitJars);
    }
  };
  const updateJars = (index, newJarData) => {
    const newBenefitJars = benefitJars.slice();
    newBenefitJars[index] = newJarData;

    setBenefitJars(newBenefitJars);
  };
  const isValidJars = () => {
    let isvalid = false;

    const isExist = benefitJars.find(
      (item) => item.name !== "" && item.annualIncome !== ""
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
  const setBenefitJars = (data) => {
    helpers.save("benefitJar", JSON.stringify(data));
    setBenefitJar(data);
  };
  React.useEffect(async () => {
    const persistDta = await helpers.getValueFor("benefitJar");
    if (persistDta) {
      setBenefitJar(JSON.parse(persistDta));
    }
  }, []);
  const submitFilledJars = async () => {
    //iterate and make api call per jar
    const isExist = benefitJars.filter(
      (item) => item.name !== "" && item.incomeAmoun !== ""
    );

    for (let i = 0; i < isExist.length; i++) {
      const jarData = {
        type: "jar",
        attributes: { ...isExist[i] },
      };
      await api
        .create_Jar(ctx?.atk, jarData)
        .then((res) => {
          console.log("jar created");
        })
        .catch((err) => console.log(err));
    }
  };

  const _next = () => {
    const isExist = benefitJars.filter(
      (item) => item.name !== "" && item.incomeAmoun !== ""
    );
    if (isExist.length > 0) {
      return Promise.resolve(submitFilledJars()).then(() => {
        navigation.navigate("OtherPension");
      });
    } else {
      return navigation.navigate("OtherPension");
    }
  };
  const checkBenefitPensions = () => {
    const isExist = benefitJars.filter(
      (item) => item.name !== "" && item.incomeAmoun !== ""
    );
    if (isExist.length > 0) {
      return `Continue with ${isExist.length} DB pensions`;
    } else {
      return `Continue without DB pensions`;
    }
  };

  const [person1, setPerson1] = React.useState({
    pensionName: "",
    annualIncome: "",
    spousePension: "",
  });
  const [person2, setPerson2] = React.useState({
    pensionName: "",
    annualIncome: "",
    spousePension: "",
  });

  const _goBack = () => {
    navigation.goBack();
  };
  return (
    <DefinedPenContext.Provider
      value={{
        person1,
        setPerson1,
        person2,
        setPerson2,
        benefitJars,
        setBenefitJars,
        updateJars,
        cleanJars,
        AddJars,
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
                <Text
                  style={[
                    styles.loginText,
                    ,
                    { fontSize: 20, textAlign: "center" },
                  ]}
                >
                  Step 3 of 4
                </Text>
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
              Defined Benefit Pensions
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
            <DefinedSwipper />
          </View>
          <View style={{ marginTop: 7, alignItems: "center" }}>
            {iDontHhaveState === false || isValidJars() === true ? (
              <JarvisButton
                bgcolor={myColorsLight.black}
                play={_next}
                btn={checkBenefitPensions()}
                w={200}
              />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  if (isValidJars() === false) {
                    navigation.navigate("OtherPension");
                  } else {
                    setIdontHaveState(false);
                  }
                }}
              >
                <View style={styles.btnIdont}>
                  <Text style={{ fontWeight: "900" }}>
                    I don’t have any Defined Benefit Pensions
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
                progress={0.7}
                color={myColorsLight.lightGreyDark}
                style={{ height: 7 }}
              />
              <Text style={{ textAlign: "center", fontSize: 20 }}>3/4</Text>
            </View>
          </View>
        </>
      </MyGradientBackground>
    </DefinedPenContext.Provider>
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
    height: "25%",
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

export default DefinedStateBenefit;
