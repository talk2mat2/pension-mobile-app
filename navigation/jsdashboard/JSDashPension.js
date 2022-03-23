import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MyGradientBackground from "../../components/grdientBackGround";
import { myColorsLight } from "../../constant/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const JSDashPension = () => {
  const [isfullScreen, setIsfullScreen] = React.useState(false);
  const togglrFullScreen = ()=>setIsfullScreen(!isfullScreen);
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
           Jarvis Pension
            </Text>
          </View>
        </View>
      </View>

      {/* <View style={{ marginTop: 40 }}>
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
      </View> */}
    
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          marginVertical: 20,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ fontWeight: "200", color: myColorsLight.lightGreyDim }}>
          Your Desired Retirement{"\n"}
          lifestyle monthly cost is :
        </Text>
        <Text style={styles.boldtxt}>£718,925</Text>
      </View>
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
});
export default JSDashPension;
