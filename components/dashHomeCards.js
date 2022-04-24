import React from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { myColorsLight } from "../constant/colors";

const DashHomeCards = ({ children }) => {
  return (
    <View style={styles.container}>
      <FontAwesome
        name={"circle-o"}
        size={40}
        color={myColorsLight.lightGreyDark}
      />
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: Platform.OS === "web" ? 150 : Dimensions.get("window").width / 3.5,
    aspectRatio: 0.8,
    margin: 5,

    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    borderWidth: 0.4,
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
    paddingTop: 16,
    position: "relative",
  },
});
export default DashHomeCards;
