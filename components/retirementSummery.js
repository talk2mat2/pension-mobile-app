import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { myColorsLight } from "../constant/colors";
import { AntDesign } from "@expo/vector-icons";
import LIfestylecard from "./LIfestylecardb";
const RetirementSummery = () => {
  const { lifestyleData, setLifeStyleData } = React.useState({});
  return (
    <View>
      <ScrollView>
        <View style={{ marginVertical: 10, padding: 10 }}>
          <Text>
            Here is the profile for the lifestyle you want to live when you are
            retired click on the categories to adjust your monthly budget
          </Text>
          <View style={{ ...styles.hrView, marginVertical: 10 }} />
        </View>
        <View style={styles.cardsContainer}>
          <LIfestylecard
            {...{ lifestyleData, setLifeStyleData }}
            title="House"
            amount={`£${lifestyleData?.House}`}
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
            amount={`£${lifestyleData?.["Food & drink"]}`}
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
            amount={`£${lifestyleData?.Transport}`}
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
            amount={`£${lifestyleData?.["Holidays & Leisure"]}`}
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
            amount={`£${lifestyleData?.["Clothing & Personal"]}`}
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
            amount={`£${lifestyleData?.["Helping Others"]}`}
          >
            <FontAwesome5
              name="hands-helping"
              step
              size={24}
              color={myColorsLight.lightGreyDim}
            />
          </LIfestylecard>
        </View>
        <View style={styles.sum}>
          <Text style={{ fontSize: 17 }}>Total Monthly Budget</Text>
          <Text style={{ fontSize: 17 }}>2500</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sum: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginTop: 10,
    marginBottom:30
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
export default RetirementSummery;
