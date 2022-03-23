import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { myColorsLight } from "../constant/colors";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

import JarvisLoader from "../components/JarvisLoader";
import DashCenterBtn from "../components/dashCenterBtn";
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("screen");
const JSDashboardnav = ({ mounted, setMounted }) => {
  //  iconName = focused ? "circle" : "circle-o";
  const [focused, setFocused] = React.useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity onPress={() => setMounted(1)}>
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
                name={mounted === 1 ? "circle" : "circle-o"}
                size={30}
                color={myColorsLight.lightGreyDark}
              />
            </View>
            <Text>Dashboard</Text>
          </View>
        </TouchableOpacity>
      </View>
      <DashCenterBtn />
      <View style={styles.right}>
        <TouchableOpacity onPress={() => setMounted(2)}>
          <View
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome
              name={mounted === 2 ? "circle" : "circle-o"}
              size={25}
              color={myColorsLight.lightGreyDark}
            />
            <Text>Jarvis Pension</Text>
          </View>
        </TouchableOpacity>
      </View>
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
    alignSelf: "center",

    backgroundColor: "orange",
  },
  container: {
    height: 79,
    backgroundColor: myColorsLight.lightGrey,
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  right: {
    width: "40%",
    backgroundColor: myColorsLight.white,
    borderWidth: 1,
    borderLeftColor: myColorsLight.white,
  },
  left: {
    width: "40%",
    borderRightColor: myColorsLight.white,
    borderWidth: 1,
    backgroundColor: myColorsLight.white,
  },
});
export default JSDashboardnav;
