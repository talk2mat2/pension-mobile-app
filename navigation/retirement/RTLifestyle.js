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
import { AntDesign } from "@expo/vector-icons";

import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import * as helpers from "../../Helpers";
import UserContext from "../../contexts/UserContext";
import JarvisButton from "../../components/JarvisButton";
import { List } from "react-native-paper";
import BudgetOption from "../../components/BudgetOption";
import LIfestylecard from "../../components/LIfestylecard";
import { ProgressBar } from "react-native-paper";

function RTLifestyle({ navigation }) {
  const ctx = useContext(UserContext);
  const [buttonBackground, setButtonBackground] = useState("#77f");

  const _next = () => {
    navigation.navigate("RTExcellent");
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
        <ScrollView>
          <View style={{ marginTop: 25 }}>
            <Text
              style={{
                ...styles.subHeader,
                ...styles.textWhite,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Here’s your Retirement{"\n"} Lifestyle Profile.
            </Text>
            <Text
              style={{
                ...styles.subHeader,
                ...styles.textWhite,
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
            <LIfestylecard title="House" amount="£440" Icon="home">
              <AntDesign name="home" size={30} style={styles.textWhite} />
            </LIfestylecard>
            <LIfestylecard title="Food & Drink" Icon="home" amount="£440">
              <MaterialCommunityIcons
                name="food-fork-drink"
                size={30}
                style={styles.textCenter}
                style={styles.textWhite}
              />
            </LIfestylecard>
            <LIfestylecard title="Transport" amount="£440">
              <AntDesign name="car" size={30} style={styles.textWhite} />
            </LIfestylecard>
            <LIfestylecard
              title="Holiday
& Leisure"
              amount="£440"
            >
              <Fontisto
                name="holiday-village"
                size={30}
                style={styles.textWhite}
              />
            </LIfestylecard>
            <LIfestylecard
              title="Clothing
& Personal"
              amount="£440"
            >
              <Ionicons name="md-shirt" size={30} style={styles.textWhite} />
            </LIfestylecard>
            <LIfestylecard
              title="Helping
Others"
              amount="£440"
            >
              <FontAwesome5
                name="hands-helping"
                size={24}
                style={styles.textWhite}
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
              <Text style={{ ...styles.textWhite, fontSize: 17 }}>
                Total Monthly Budget
              </Text>
              <Text style={{ ...styles.textWhite, fontSize: 17 }}>£2779</Text>
            </View>

            <View
              style={{
                ...styles.hrView,
                width: "90%",
                alignSelf: "center",
                marginTop: 10,
              }}
            />
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <JarvisButton
                bgcolor={buttonBackground}
                play={_next}
                btn="Continue"
                w={200}
              />
            </View>
            <View style={{ marginTop: 30, width: "70%", alignSelf: "center" }}>
              <ProgressBar progress={1} color="#fff" />
              <Text
                style={{ textAlign: "center", color: "#fff", fontSize: 20 }}
              >
                2/2
              </Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
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
