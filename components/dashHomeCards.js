import React from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";

const DashHomeCards = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width / 3.5,
    aspectRatio: 0.8,
    margin: 4,
    elevation: 8,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    borderWidth: Platform.OS === "ios" ? 0.3 : 0,
    borderRadius: 7,
    alignItems: "center",
    padding: 10,
    paddingTop: "30%",
    position: "relative",
  },
});
export default DashHomeCards;
