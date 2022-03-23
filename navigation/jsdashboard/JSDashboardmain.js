import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MyGradientBackground from "../../components/grdientBackGround";
import { myColorsLight } from "../../constant/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import DashHomeCards from "../../components/dashHomeCards";
import { AntDesign } from "@expo/vector-icons";
import JSCardsAnimated from "./JScardsAnimated";

const JSDashboardMain = () => {
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
              Life Plan
            </Text>
          </View>
        </View>
      </View>

      <View style={{ height: '90%' ,paddingBottom:100}}>
        <ScrollView>
          <View style={{ marginTop: 40 }}>
            <Text
              style={{
                ...styles.subHeader,
                textAlign: "center",
                fontSize: 16,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur{"\n"}
              adipiscing elit. Curabitur arcu erat,{"\n"}
              imperdiet et, porttitor at sem. Curabitur arcu
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
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              marginVertical: 20,
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{ fontWeight: "200", color: myColorsLight.lightGreyDim }}
            >
              Your Desired Retirement{"\n"}
              lifestyle monthly cost is :
            </Text>
            <Text style={styles.boldtxt}>£2,779</Text>
          </View>
          <View
            style={{
              ...styles.hrView,
              width: "90%",
              alignSelf: "center",
              marginTop: 25,
            }}
          />
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              marginVertical: 20,
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{ fontWeight: "200", color: myColorsLight.lightGreyDim }}
            >
              Your Desired Retirement{"\n"}
              lifestyle monthly cost is :
            </Text>
            <Text style={styles.boldtxt}>£718,925</Text>
          </View>
          <View
            style={{
              ...styles.hrView,
              width: "90%",
              alignSelf: "center",
              marginTop: 25,
            }}
          />
          <View style={styles.cardsContainer}>
            <DashHomeCards>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "100",
                  color: myColorsLight.lightGreyDark,
                }}
              >
                Your{"\n"}
                Retirement Age
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 25,
                  fontWeight: "bold",
                  marginTop: 6,
                }}
              >
                65
              </Text>
            </DashHomeCards>
            <DashHomeCards>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "100",
                  color: myColorsLight.lightGreyDark,
                }}
              >
                Retiring{"\n"}
                With Spouse
              </Text>
              <AntDesign
                style={{ marginTop: 6 }}
                name="check"
                size={30}
                color={myColorsLight.black}
              />
            </DashHomeCards>
            <DashHomeCards>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "100",
                  color: myColorsLight.lightGreyDark,
                }}
              >
                Retiring{"\n"}
                In London
              </Text>
              <AntDesign
                style={{ marginTop: 6 }}
                name="check"
                size={30}
                color={myColorsLight.black}
              />
            </DashHomeCards>
          </View>
        </ScrollView>
      </View>
      <JSCardsAnimated />
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
    marginBottom:90
  },
});
export default JSDashboardMain;
