import React from "react";
import { Platform, Dimensions } from "react-native";
import { myColorsLight } from "../constant/colors";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const MyGradientBackground = ({ children }) => {

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={[myColorsLight.lightGreyDim, "transparent"]}
        style={styles.background}
      />
      {children}
    </View>
  );
};
const WebPadding = () => {
  if (Platform.OS === "web") {
    const width = Dimensions.get("window").width;
    if (width < 750) {
      return 0;
    } else {
      return 400;
    }
  }
  return 0;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop:20,
    paddingHorizontal: WebPadding(),
    // marginTop: 30,
    //justifyContent: 'center',
  },
  background: {
    height: 100,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    right: 0,
  },
});
export default MyGradientBackground;
