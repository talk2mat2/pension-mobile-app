import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MyGradientBackground from "../../../components/grdientBackGround";
import { myColorsLight } from "../../../constant/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import DashHomeCards from "../../../components/dashHomeCards";
import { AntDesign } from "@expo/vector-icons";
import RTcardsAnimated from './RTcardsAnimated'
import JSCardsAnimated from ".././JScardsAnimated";
import CPDatatable from "../../../components/CPDatatable";
import FullScreenContext from "../../../contexts/fullScreenContext";
import UserContext from "../../../contexts/UserContext";

const RTDashboardMain = () => {
  const ctx = useContext(UserContext);
  const { openProfile } = useContext(FullScreenContext);
  return (
    <MyGradientBackground>
      <View
        style={{ marginTop: 15, alignItems: "flex-end", paddingHorizontal: 20 }}
      >
         <TouchableOpacity onPress={openProfile.bind(this, 1)}>
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
              Retirement Planning
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
          <View style={{ marginTop: 40 }}>
            <Text
              style={{
                ...styles.subHeader,
                textAlign: "center",
                fontSize: 16,
              }}
            >
              Current Pension Fund is
            </Text>
          </View>
          <View style={{ marginTop: 4 }}>
            <Text
              style={{
                ...styles.subHeader,
                textAlign: "center",
                fontSize: 40,
                fontWeight: "600",
              }}
            >
              £375,645
            </Text>
          </View>
          <View
            style={{
              ...styles.hrView,
              width: "90%",
              alignSelf: "center",
              marginTop: 25,
            }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 19,
              fontWeight: "700",
              marginVertical: 20,
            }}
          >
            Your Retirement Profile
          </Text>
          <View
            style={{
              ...styles.hrView,
              width: "90%",
              alignSelf: "center",
            }}
          />
          <View style={{ paddingHorizontal: 20, paddingTop: 40 }}>
            <CPDatatable profile={ctx?.u}/>
          </View>
        </ScrollView>
      </View>
      <RTcardsAnimated />
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
export default RTDashboardMain;
