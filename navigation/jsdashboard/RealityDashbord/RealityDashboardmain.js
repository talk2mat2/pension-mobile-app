import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MyGradientBackground from "../../../components/grdientBackGround";
import { myColorsLight } from "../../../constant/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import JarDoughnut from "../../../components/doughnut";
import DashHomeCards from "../../../components/dashHomeCards";
import { AntDesign } from "@expo/vector-icons";
import RealitycardsAnimated from "./RealityCardsAnimated";
// import JSCardsAnimated from "../JScardsAnimated";
import CPDatatable from "../../../components/CPDatatable";

const RealityDashboardMain = () => {
  return (
    <MyGradientBackground>
      <View
        style={{ marginTop: 15, alignItems: "flex-end", paddingHorizontal: 20 }}
      >
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="account-details"
            size={40}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 5,
          alignContent: "flex-start",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
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
            <Text
              style={[
                styles.loginText,
                ,
                { fontSize: 30, textAlign: "center", fontWeight: "bold" },
              ]}
            >
              Reality Check
            </Text>
          </View>
          <View
            style={{ marginTop: 10, alignItems: "center", marginBottom: 15 }}
          >
            <Text
              style={{
                textAlign: "center",
                color: myColorsLight.lightGreyDim,
                fontSize: 13,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              {"\n"}
              arcu erat, imperdiet et, porttitor at sem. Curabitur arcu erat,
            </Text>
          </View>
        </View>
      </View>

      <View style={{ height: "90%", paddingBottom: 100 }}>
        <ScrollView>
          <View style={{ marginTop: 20 }}>
            <JarDoughnut />
          </View>
        </ScrollView>
      </View>
      <RealitycardsAnimated />
    </MyGradientBackground>
  );
};

const styles = StyleSheet.create({
  hrView: {
    width: "100%",
    // marginTop: 10,
    // paddingBottom: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#bbb",
    height: 2,
    backgroundColor: "#bbb",
  },
  subHeader: {
    fontSize: 22,
    textAlign: "center",
  },
  boldtxt: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardsContainer: {
    marginTop: 17,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 90,
  },
});
export default RealityDashboardMain;
