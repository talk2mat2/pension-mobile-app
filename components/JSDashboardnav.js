import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { myColorsLight } from "../constant/colors";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Circle, Svg } from "react-native-svg";
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("screen");
const JSDashboardnav = () => {
  //  iconName = focused ? "circle" : "circle-o";
  const [focused, setFocused] = React.useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity>
          <View
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View>
              <FontAwesome
                name={focused ? "circle" : "circle-o"}
                size={30}
                color={myColorsLight.lightGreyDark}
              />
            </View>
            <Text>Dashboard</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.right}>
        <TouchableOpacity>
          <View
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome
              name={focused ? "circle" : "circle-o"}
              size={25}
              color={myColorsLight.lightGreyDark}
            />
            <Text>Jarvis Pension</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.circle}>
        <Svg height="80" width="80">
          <Circle cx="30" cy="30" r="30" fill="pink" />
        </Svg>
      </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  circle: {
    position: "absolute",
    width: 60,
    height: 60,
    zIndex: 6,
    elevation: 6,
    alignSelf:'center',
   
    backgroundColor: "orange",
  },
  container: {
    height: 80,
    backgroundColor: myColorsLight.lightGrey,
    marginTop: "auto",
    flexDirection: "row",
  },
  right: {
    width: "50%",
    backgroundColor: myColorsLight.white,
    borderWidth: 1,
  },
  left: {
    width: "50%",
    width: "50%",

    borderWidth: 1,
    backgroundColor: myColorsLight.white,
  },
});
export default JSDashboardnav;
