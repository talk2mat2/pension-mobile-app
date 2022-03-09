import React from "react";
import { myColorsLight } from "../constant/colors";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const DashboardgrdientBack = ({ children }) => {
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

    
    //justifyContent: 'center',
  },
  background: {
    height: '80%',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    right: 0,
  },
});
export default DashboardgrdientBack;
