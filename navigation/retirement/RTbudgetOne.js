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
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as AuthSession from "expo-auth-session";
const axios = require("axios");
import * as helpers from "../../Helpers";
import UserContext from "../../contexts/UserContext";
import JarvisButton from "../../components/JarvisButton";
import { List, ProgressBar } from "react-native-paper";
import BudgetOption from "../../components/BudgetOption";

function RTbudgetOne({ navigation }) {
  const ctx = useContext(UserContext);
  const [buttonBackground, setButtonBackground] = useState("#77f");

  const _next = () => {
    navigation.navigate("RTLifestyle");
  };
  const _goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/cover.jpg")}
        resizeMode="cover"
        style={styles.imageBackground}
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
                color="#fff"
                size={40}
              />
            </Pressable>
          </View>

          <View>
            <View>
              <Text
                style={[
                  styles.loginText,
                  styles.textWhite,
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
                  styles.textWhite,
                  { fontSize: 15, textAlign: "center" },
                ]}
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
              ...styles.textWhite,
              textAlign: "center",
            }}
          >
            Select te budet level from te list {"\n"} below tat mates the
            lifestyle you{"\n"}
            wint live when you're retired
          </Text>
        </View>

        <View style={{ marginTop: 30, height: 350 }}>
          <ScrollView style={{ flex: 1 }}>
            <BudgetOption _next={_next} type="Mimimum" />
            <BudgetOption _next={_next} type="Moderate" />
            <BudgetOption _next={_next} type="Comfortable" />
            <View style={{ ...styles.hrView, marginTop: 1 }} />
          </ScrollView>
        </View>
        <View style={{ marginTop: 30, width: "70%", alignSelf: "center" }}>
          <ProgressBar progress={0.5} color="#fff" />
          <Text style={{ textAlign: "center", color: "#fff", fontSize: 20 }}>
            1/2
          </Text>
        </View>
      </ImageBackground>
    </View>
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
