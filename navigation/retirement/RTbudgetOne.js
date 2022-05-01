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
  Image,
  Alert,
} from "react-native";
import {
  HeaderFour,
  HeaderTwo,
  ParaOne,
  HeaderThree,
} from "../../constant/fonts";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as AuthSession from "expo-auth-session";

import * as helpers from "../../Helpers";
import UserContext from "../../contexts/UserContext";
import JarvisButton from "../../components/JarvisButton";
import { List, ProgressBar } from "react-native-paper";
import BudgetOption from "../../components/BudgetOption";
import MyGradientBackground from "../../components/grdientBackGround";
import { myColorsLight, primary } from "../../constant/colors";
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
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 3,
          elevation: 5,
          paddingTop:20
        }}
      >
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
                color={primary.subText}
                size={40}
              />
            </Pressable>
          </View>

          <View>
            <View>
              <HeaderFour
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Your Retirement Lifestyle
              </HeaderFour>
            </View>
          </View>
        </View>
        <View
          style={{
            ...styles.hrView,
            width: "90%",
            alignSelf: "center",
            marginTop: 60,
          }}
        />
        <View style={{ marginTop: 60 }}>
          <HeaderThree
            style={{
              ...styles.subHeader,

              textAlign: "center",
            }}
          >
            Select the budget level from the list{"\n"}
            below that matches the lifestyle you{"\n"}
            want live when you’re retired
          </HeaderThree>
        </View>
        <View style={{ marginTop: 15, minHeight: 300 }}>
          <View style={{ flex: 1 }}>
            {loading && (
              <View
                style={{
                  position: "absolute",
                  zIndex: 8,
                  elevation: 8,
                  left: 0,
                  right: 0,
                }}
              >
                <JarvisLoading color={primary.subText} text="Please wait" />
              </View>
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
            {/* <View style={{ ...styles.hrView, marginTop: 1 }} /> */}
          </View>
        </View>
      </View>
      <View
        style={{
       
          width: "100%",
          height: '38%',
          marginTop: "auto",
        }}
      >
          <ImageBackground
          source={require("../../assets/jarv3.png")}
          style={{
            height:'140%',
            width: "100%",
            overflow:'hidden',
            flex: 1,
            alignItems: "center",
            paddingVertical: 15,
          }}
          imageStyle={{ resizeMode: "repeat" ,flex:1,overflow:"hidden"}}
        ></ImageBackground>
        {/* <Image
          style={{ flex: 1, width: undefined, height: undefined,aspectRatio:2/3 }}
          source={require("../../assets/jr.png")}
          resizeMode="repeat" 
        /> */}
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
            color={primary.subText}
            style={{ height: 7 }}
          />
          <Text
            style={{
              color: primary.subText,
              textAlign: "center",
              fontSize: 20,
            }}
          >
            1/2
          </Text>
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
    // fontSize: 22,
    textAlign: "center",
  },
  hrView: {
    width: "100%",
    // marginTop: 10,
    // paddingBottom: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#bbb",
    height: 1,
    backgroundColor: "#bbb",
  },
});

export default RTbudgetOne;
