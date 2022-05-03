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
} from "react-native";
import * as helpers from "../Helpers";
import { JarvisSymbol } from "../assets/SVG/svj";
import UserContext from "../contexts/UserContext";
import { HeaderFour, HeaderTwo, ParaOne, HeaderThree } from "../constant/fonts";
import JarvisButton from "../components/JarvisButton";
import { List } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MyGradientBackground from "../components/grdientBackGround";
import { myColorsLight, primary } from "../constant/colors";
import OutcomeCard from "../components/Outcome_Card";

function RTExcellent({ navigation }) {
  const ctx = useContext(UserContext);
  const [buttonBackground, setButtonBackground] = useState("#77f");

  const _next = () => {
    navigation.navigate("RTStack");
  };
  const _goBack = () => {
    navigation.goBack();
  };
  return (
    <MyGradientBackground>
      <View
        style={{
          marginTop: 20,
          alignContent: "flex-start",
          flexDirection: "row",
          justifyContent: "center",
        }}
      ></View>

      <View style={{ alignItems: "center" }}>
        {/* <MaterialCommunityIcons
          name="party-popper"
          size={60}
          color={myColorsLight.black}
        /> */}
        {/* <Image
          style={{ height: 60, width: 60, marginBottom: 10 }}
          source={require("../assets/jarvisStar.png")}
        /> */}
        <JarvisSymbol style={{ marginBottom: 30 }} />
        <HeaderTwo>Well done!</HeaderTwo>

        <ParaOne style={{ textAlign: "center" }}>
          You have completed step 1 and have earned your{"\n"}
          first Javis Insights Card, which gives you{"\n"}
          regular updates and useful facts and{"\n"}
          information on Pension Planning. You can{"\n"}
          access it from your dashboard at anytime{"\n"}
        </ParaOne>
      </View>

      <View style={styles.footerContainer}>
        <View style={{ marginTop: 20 }}>
          <HeaderFour style={{ textAlign: "center" }}>
            Facts & Stats On Saving/Investing
          </HeaderFour>
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
          {/* <Text style={{ textAlign: "center", fontSize: 18 }}>
            Place holder for useful{"\n"}
            actionable stats and facts{"\n"}
            on retirement lifestyle {"\n"} and planning
          </Text> */}
        </View>
      </View>
      <View style={styles.footerSection}>
        <ImageBackground
          source={require("../assets/j2.png")}
          style={{
            height:130,
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
              // fontSize: 14,
              marginBottom: 8,
              // color: myColorsLight.lightGreyDark,
            }}
          >
            You’re just one steps away from completion. Next step{" "}
          </ParaOne>
          <JarvisButton
            bgcolor={primary.btn}
            play={_next}
            btn="Your Retirement Lifestyle"
            w={270}
          />
        </ImageBackground>
      </View>
      <OutcomeCard styles={{ backgroundColor: primary.subBase }}>
        <>
          <HeaderThree
            style={{ color: primary.inputText, textAlign: "center" }}
          >
            Personal Information
          </HeaderThree>
          
          <View>
            {/* <Text style={{ ...styles.textHead, textAlign: "left" }}>
              Personal Information
            </Text> */}
          </View>
          <View style={{ ...styles.hrView, marginVertical: 9 }} />
        </>
      </OutcomeCard>
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
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: primary.base,
    height: 350,
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
  textHead: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "800",
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

export default RTExcellent;

// import React, { useState, useEffect, useRef, useContext } from 'react';
// import { Platform, Animated, StyleSheet, View, Text, TextInput, Dimensions } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// const axios = require('axios');
// import * as helpers from '../Helpers';
// import UserContext from '../contexts/UserContext';
// import JarvisButton from '../components/JarvisButton';

// function KYCCompleteScreen({navigation}){
// 	const ctx = useContext(UserContext);
//     const [buttonBackground,setButtonBackground] = useState("#77f");

//     const _next = () => {
//        navigation.navigate('RTStack');
//     }

// 	return (
// 	   <View style={styles.container}>
// 		    <View style={styles.centerView}>
// 				<Text style={[styles.loginText,{ fontSize: 40}]}>Well done!</Text>
// 			</View>

// 		   <View style={[styles.centerView,{marginTop: 70, width: "70%"}]}>
// 		     <Text style={{textAlign: "center"}}>You have completed step 1 and have earned your first Jarvis Insights Card which gives you regular updates and useful facts and information on pension planning. You can access it from your dashboard at any time.</Text>
// 		   </View>

//            <View style={styles.hrView}>
//                <View style={styles.centerView, {paddingVertical: 5}}>
//                    <Text style={{fontWeight: "bold", alignSelf: "center"}}>Facts and stats on pension planning:</Text>
//                </View>
// 		   </View>

//            <View style={styles.hrView}>
//                <View style={styles.centerView,{paddingVertical: 10}}>
//                    <Text style={{fontWeight: "bold", marginLeft: 5}}>1. Useful information</Text>
//                </View>
// 		   </View>

//            <View style={styles.hrView}>
//                <View style={styles.centerView,{paddingVertical: 10}}>
//                    <Text style={{fontWeight: "bold", marginLeft: 5}}>2. Useful fact</Text>
//                </View>
// 		   </View>

//            <View style={styles.hrView}>
//                <View style={{paddingVertical: 10}}>
//                    <Text style={{fontWeight: "bold", marginLeft: 5}}>3. More useful information</Text>
//                </View>
// 		   </View>

//            <>
//            <View style={{width: "100%",marginTop: 10}}>
//             <Text>You're just  two stesp from completion. Click the button below to go to the next</Text>
//            <View style={[styles.centerView,{marginTop: 60}]}>
// 		   <JarvisButton
// 		        style={[styles.loginButton,{marginTop: 10}]}
//                 bgcolor={buttonBackground}
//                  play={_next}
//                  btn="Your retirement profile"
//             />
// 			</View>
//             </View>
//            </>

// 	   </View>
// 	);
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     marginTop: 30,
//     //justifyContent: 'center',
//   },
//   centerView: {
// 	  flexDirection: "row",
// 	  alignSelf: "center"
// 	},
//   loginButton: {
// 	 marginTop: 50,
// 	 marginLeft: 20

//   },
//   subHeader: {
//      fontSize: 30
//   },
//   hrView: {
//     width: "80%",
//     marginTop: 10,
//     paddingBottom: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#bbb"
//   }
// });

// export default KYCCompleteScreen;
