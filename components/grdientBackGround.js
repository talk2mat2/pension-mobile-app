import React from "react";
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    marginTop: 30,
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
