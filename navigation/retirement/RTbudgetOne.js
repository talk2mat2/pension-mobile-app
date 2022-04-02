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

import * as helpers from "../../Helpers";
import UserContext from "../../contexts/UserContext";
import JarvisButton from "../../components/JarvisButton";
import { List, ProgressBar } from "react-native-paper";
import BudgetOption from "../../components/BudgetOption";
import MyGradientBackground from "../../components/grdientBackGround";
import { myColorsLight } from "../../constant/colors";
import Api from "../../api";
import JarvisLoading from "../../components/JarvisLoading";

function RTbudgetOne({ navigation }) {
  const ctx = useContext(UserContext);
  const [buttonBackground, setButtonBackground] = useState("#77f");
  const [comfortable, setComfortable] = React.useState([]);
  const [moderate, setModerate] = React.useState([]);
  const [minimum, setMinimum] = React.useState([]);
  const [pageData, setPageData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [focused, setFocused] = React.useState("");

  const _next = (selectedData) => {
    navigation.navigate("RTLifestyle", { selectedData: selectedData });
  };
  const _goBack = () => {
    navigation.goBack();
  };

  const Get_retirement_expe_categories = async () => {
    setLoading(true);
    Api.Get_retirement_expe_catego(
      ctx?.atk,
      ctx?.u?.included[0]?.retireWithSpouse,
      ctx?.u?.included[0]?.insideLondon
    )
      .then((data) => {
        setLoading(false);
        setPageData(data?.data);
        ctx.setBudgetData(data?.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        if (err?.errors[0].details) {
          Alert.alert("server says", err?.errors[0].details);
        } else {
          Alert.alert("An error occured, try again");
        }
      });
  };
  React.useEffect(() => {
    Get_retirement_expe_categories();
  }, []);

  // React.useEffect(()=>{console.log('min',minimum)},[minimum])

  const comfortableData = (arr) => {
    if (arr.length > 0) {
      let response = {};
      arr.map((item) => {
        response[item?.attributes?.name] = item?.attributes?.comfortable?.value;
      });
      return response;
    }
  };
  const moderateData = (arr) => {
    if (arr.length > 0) {
      let response = {};
      arr.map((item) => {
        response[item?.attributes?.name] = item?.attributes?.moderate?.value;
      });
      return response;
    }
  };
  const minimumData = (arr) => {
    if (arr.length > 0) {
      let response = {};
      arr.map((item) => {
        response[item?.attributes?.name] = item?.attributes?.minimum?.value;
      });
      return response;
    }
  };

  const minimumOverview = (arr) => {
    if (arr.length > 0) {
      let response = {};
      arr.map((item) => {
        response["Total (Gross)"] = item?.attributes?.minimum?.description;
      });
      return response;
    }
  };

  const moderateOverview = (arr) => {
    if (arr.length > 0) {
      let response = {};
      arr.map((item) => {
        response["Total (Gross)"] = item?.attributes?.moderate?.description;
      });
      return response;
    }
  };
  const comfortableOverview = (arr) => {
    if (arr.length > 0) {
      let response = {};
      arr.map((item) => {
        response["Total (Gross)"] = item?.attributes?.comfortable?.description;
      });
      return response;
    }
  };
  return (
    <MyGradientBackground>
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
              style={{ ...styles.loginText, fontSize: 20, textAlign: "center" }}
            >
              Your Retirement Lifestyle
            </Text>
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
      <View style={{ marginTop: 25 }}>
        <Text
          style={{
            ...styles.subHeader,

            textAlign: "center",
          }}
        >
          Select the budget level from the list{"\n"}
          below that matches the lifestyle you{"\n"}
          want live when you’re retired
        </Text>
      </View>
      <View style={{ marginTop: 30, height: 350 }}>
        <ScrollView style={{ flex: 1 }}>
          {loading && (
            <JarvisLoading
              color={myColorsLight.lightGreyDark}
              text="Please wait"
            />
          )}
          {pageData.length > 0 && (
            <>
              <BudgetOption
                budetData={minimumData(pageData)}
                _next={_next}
                type="Mimimum"
                {...{ focused, setFocused }}
                desccription={minimumOverview(pageData)}
              />
              <BudgetOption
                budetData={moderateData(pageData)}
                _next={_next}
                {...{ focused, setFocused }}
                type="Moderate"
                desccription={moderateOverview(pageData)}
              />
              <BudgetOption
                budetData={comfortableData(pageData)}
                _next={_next}
                type="Comfortable"
                {...{ focused, setFocused }}
                desccription={comfortableOverview(pageData)}
              />
            </>
          )}
          <View style={{ ...styles.hrView, marginTop: 1 }} />
        </ScrollView>
      </View>
      {/* <View style={{ marginTop: 50, width: "50%", alignSelf: "center",paddingTop:35 }}>
     
      </View> */}
      <View
        style={{
          width: "100%",
          marginTop: 10,
          position: "absolute",
          left: 0,
          riht: 0,
          bottom: 0,
        }}
      >
        <View
          style={{
            marginTop: 40,
            width: "50%",
            alignSelf: "center",
            paddingBottom: 20,
          }}
        >
          <ProgressBar
            progress={0.5}
            color={myColorsLight.lightGreyDark}
            style={{ height: 7 }}
          />
          <Text style={{ textAlign: "center", fontSize: 20 }}>1/2</Text>
        </View>
      </View>
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

export default RTbudgetOne;
