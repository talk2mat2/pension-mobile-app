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
  ImageBackground,
  Pressable,
  Alert,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as AuthSession from "expo-auth-session";
import { AntDesign } from "@expo/vector-icons";

import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import * as helpers from "../../Helpers";
import UserContext from "../../contexts/UserContext";
import JarvisButton from "../../components/JarvisButton";
import JarvisLoader from "../../components/JarvisLoader";
import { List } from "react-native-paper";
import Api from "../../api";
import BudgetOption from "../../components/BudgetOption";
import LIfestylecard from "../../components/LIfestylecard";
import { ProgressBar } from "react-native-paper";
import MyGradientBackground from "../../components/grdientBackGround";
import { myColorsLight } from "../../constant/colors";

function RTLifestyle({ route, navigation }) {
  const { selectedData } = route.params;
  const [sum, setSum] = React.useState(0);
  const [lifestyleData, setLifeStyleData] = React.useState({
    ...(selectedData || ""),
  });
  const [isLoading, setIsloading] = React.useState(false);
  const ctx = useContext(UserContext);
  const [buttonBackground, setButtonBackground] = useState("#77f");

  const _updateUser = async () => {
    let u = ctx?.u;
    const expenses = [
      {
        plsaCostCategoryId: 2,
        plsaCostCategoryName: "House",
        amount: lifestyleData?.House,
      },
      {
        plsaCostCategoryId: 3,
        plsaCostCategoryName: "Food & drink",
        amount: lifestyleData?.["Food & drink"],
      },
      {
        plsaCostCategoryId: 4,
        plsaCostCategoryName: "Transport",
        amount: lifestyleData?.Transport,
      },
      {
        plsaCostCategoryId: 5,
        plsaCostCategoryName: "Holidays & Leisure",
        amount: lifestyleData?.["Holidays & Leisure"],
      },
      {
        plsaCostCategoryId: 6,
        plsaCostCategoryName: "Clothing and Personal",
        amount: lifestyleData?.["Clothing & Personal"],
      },
      {
        plsaCostCategoryId: 7,
        plsaCostCategoryName: "Helping Others",
        amount: lifestyleData?.["Helping Others"],
      },
    ];
    u.included[0].expenses = [];
    ctx.setU(u);
    helpers.save("pa_u", JSON.stringify(u));
    const {
      dateOfBirth,
      employmentStatus,
      gender,
      isSingle,
      maritalStatus,
      onboardingCompleted,
      retirementAge,
      retirementDate,
      spouseDateOfBirth,
      spouseGender,
      spouseName,
      spouseRetirementAge,
      spouseRetirementDate,
    } = ctx?.u?.included[0];
    const attribs = {
      dateOfBirth,
      employmentStatus,
      gender,
      isSingle,
      maritalStatus,
      onboardingCompleted,
      retirementAge,
      retirementDate,
      spouseDateOfBirth,
      spouseGender: spouseGender || "Female",
      spouseName,
      spouseRetirementAge,
      spouseRetirementDate,
    };
    // Object.keys(attribs).forEach(
    //   (k) => attribs[k] == null && delete attribs[k]
    // );
    //remove null value
    Object.keys(attribs).forEach((item) => {
      if (attribs[item] == null) {
        attribs[item] = "";
      }
    });
    const newData = {
      type: "retirementProfile",
      attributes: {
        ...attribs,
        expenses: [
          {
            plsaCostCategoryId: 2,
            plsaCostCategoryName: "House",
            amount: lifestyleData?.House,
          },
          {
            plsaCostCategoryId: 3,
            plsaCostCategoryName: "Food & drink",
            amount: lifestyleData?.["Food & drink"],
          },
          {
            plsaCostCategoryId: 4,
            plsaCostCategoryName: "Transport",
            amount: lifestyleData?.Transport,
          },
          {
            plsaCostCategoryId: 5,
            plsaCostCategoryName: "Holidays & Leisure",
            amount: lifestyleData?.["Holidays & Leisure"],
          },
          {
            plsaCostCategoryId: 6,
            plsaCostCategoryName: "Clothing and Personal",
            amount: lifestyleData?.["Clothing & Personal"],
          },
          {
            plsaCostCategoryId: 7,
            plsaCostCategoryName: "Helping Others",
            amount: lifestyleData?.["Helping Others"],
          },
        ],
      },
    };

    setIsloading(true);
    // console.log(JSON.stringify(newData));
    await Api.Update_retirement_profile(ctx?.u?.id, ctx?.atk, { data: newData })
      .then((res) => {
        setIsloading(false);
        navigation.navigate("RTExcellent", {
          result: lifestyleData?.["Total (Gross)"],
          profile: res?.data,
        });
      })
      .catch((err) => {
        console.log("err is", err);
        setIsloading(false);
        if (err?.errors?.[0]?.details) {
          Alert.alert(
            "An error orcured, try again. server says:",
            err?.errors?.[0]?.details
          );
        } else {
          Alert.alert("An error orcured, try again");
        }
      });
  };
  const _next = () => {
    _updateUser();
  };
  const _goBack = () => {
    navigation.goBack();
  };
  React.useEffect(() => {
    if (lifestyleData) {
      const objKeys = Object.values(lifestyleData);
      const sums = objKeys
        .filter(
          (xx) =>
            xx !== lifestyleData["Total"] &&
            xx !== lifestyleData["Total (Gross)"]
        )
        .map((xxx) => xxx / 12)
        .reduce((a, b) => a + b, 0);
      setSum(sums);
    }
  }, [lifestyleData]);
  return (
    <MyGradientBackground>
      {isLoading && <JarvisLoader />}
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
              color="#fff"
              size={40}
            />
          </Pressable>
        </View>

        <View>
          <View>
            <Text
              style={{ ...styles.loginText, fontSize: 20, textAlign: "center" }}
            >
              Your Retirement Lifestyle
            </Text>
          </View>
          <View>
            {/* <Text
              style={[styles.loginText, { fontSize: 15, textAlign: "center" }]}
            >
             
            </Text> */}
          </View>
        </View>
      </View>
      <View
        style={{
          ...styles.hrView,
          width: "90%",
          alignSelf: "center",
          marginTop: 30,
        }}
      />
      <ScrollView style={{ marginBottom: 120 }}>
        <View style={{ marginTop: 25 }}>
          <Text
            style={{
              ...styles.subHeader,

              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Here’s your Retirement{"\n"} Lifestyle Profile.
          </Text>
          <Text
            style={{
              ...styles.subHeader,

              textAlign: "center",
              fontSize: 17,
              marginTop: 5,
            }}
          >
            Click on the categories to adjust {"\n"}
            your monthly budget
          </Text>
        </View>
        <View
          style={{
            ...styles.hrView,
            width: "90%",
            alignSelf: "center",
            marginTop: 30,
          }}
        />

        <View style={styles.cardsContainer}>
          <LIfestylecard
            {...{ lifestyleData, setLifeStyleData }}
            title="House"
            amount={`${lifestyleData?.House}`}
            Icon="home"
          >
            <AntDesign
              name="home"
              size={30}
              color={myColorsLight.lightGreyDim}
            />
          </LIfestylecard>
          <LIfestylecard
            {...{ lifestyleData, setLifeStyleData }}
            title="Food & drink"
            Icon="home"
            amount={`${lifestyleData?.["Food & drink"]}`}
          >
            <MaterialCommunityIcons
              name="food-fork-drink"
              size={30}
              color={myColorsLight.lightGreyDim}
            />
          </LIfestylecard>
          <LIfestylecard
            {...{ lifestyleData, setLifeStyleData }}
            title="Transport"
            amount={`${lifestyleData?.Transport}`}
          >
            <AntDesign
              name="car"
              size={30}
              color={myColorsLight.lightGreyDim}
            />
          </LIfestylecard>
          <LIfestylecard
            {...{ lifestyleData, setLifeStyleData }}
            title="Holidays & Leisure"
            amount={`${lifestyleData?.["Holidays & Leisure"]}`}
          >
            <Fontisto
              name="holiday-village"
              size={30}
              color={myColorsLight.lightGreyDim}
            />
          </LIfestylecard>
          <LIfestylecard
            {...{ lifestyleData, setLifeStyleData }}
            title="Clothing & Personal"
            amount={`${lifestyleData?.["Clothing & Personal"]}`}
          >
            <Ionicons
              name="md-shirt"
              size={30}
              color={myColorsLight.lightGreyDim}
            />
          </LIfestylecard>
          <LIfestylecard
            {...{ lifestyleData, setLifeStyleData }}
            title="Helping Others"
            amount={`${lifestyleData?.["Helping Others"]}`}
          >
            <FontAwesome5
              name="hands-helping"
              step
              size={24}
              color={myColorsLight.lightGreyDim}
            />
          </LIfestylecard>
        </View>
        <View style={{ marginBottom: 50 }}>
          <View
            style={{
              ...styles.hrView,
              width: "90%",
              alignSelf: "center",
              marginTop: 30,
            }}
          />
          <View style={styles.sum}>
            <Text style={{ fontSize: 17 }}>Total Monthly Budget</Text>
            <Text style={{ fontSize: 17 }}>{`£${
              sum ? Math.ceil(sum) : 0
            }`}</Text>
          </View>

          <View
            style={{
              ...styles.hrView,
              width: "90%",
              alignSelf: "center",
              marginTop: 10,
            }}
          />
        </View>
      </ScrollView>
      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <JarvisButton
            bgcolor={myColorsLight.black}
            play={_next}
            btn="Continue"
            w={200}
            disabled={isLoading}
          />
        </View>
        <View
          style={{
            marginTop: 40,
            width: "50%",
            alignSelf: "center",
            paddingBottom: 16,
          }}
        >
          <ProgressBar
            progress={1}
            color={myColorsLight.lightGreyDark}
            style={{ height: 7 }}
          />
          <Text style={{ textAlign: "center", fontSize: 20 }}>2/2</Text>
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
  progress: {
    width: "70%",
    textAlign: "center",
    marginTop: 20,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",

    marginTop: 30,
    //justifyContent: 'center',
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

export default RTLifestyle;
