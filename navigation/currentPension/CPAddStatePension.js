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
import CPSwipper from "../../components/CPSwipper";
import CPDatatable from "../../components/CPDatatable";
import { myColorsLight } from "../../constant/colors";
import { LinearGradient } from "expo-linear-gradient";
import MyGradientBackground from "../../components/grdientBackGround";

function CPAddStatePension({ navigation }) {
  const ctx = useContext(UserContext);
  const [buttonBackground, setButtonBackground] = useState("#77f");

  const _next = () => {
    // navigation.navigate('');
  };
  const _goBack = () => {
    navigation.goBack();
  };
  return (
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
                Step 2 of 7
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
          <TouchableOpacity>
            <View style={styles.btnIdont}>
              <Text style={{ fontWeight: "900" }}>
                I don’t have a State Pension
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.footerContainer}>
          <CPDatatable />
        </View>
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
          <Text style={{ textAlign: "center", fontSize: 20 }}>2/2</Text>
        </View>
      </>
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
    height: 200,
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
    width: 200,
    alignItems: "center",
    shadowRadius: 2,
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