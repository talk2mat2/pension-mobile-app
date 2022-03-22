import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Circle, Svg } from "react-native-svg";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { myColorsLight } from "../constant/colors";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const DashCenterBtn = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <View style={{ borderWidth: 1, borderRadius: 50 }}>
          <TouchableOpacity>
            <AntDesign
              name="pluscircle"
              size={50}
              color={myColorsLight.white}
              style={{}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.left}></View>
      <View style={styles.right}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: myColorsLight.white,
    flexDirection: "row",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
    position: "relative",
  },
  right: {
    width: "50%",
    backgroundColor: myColorsLight.white,
    height: "100%",
    borderLeftWidth: 1,
    borderTopWidth: 1,
  },
  left: {
    width: "50%",
    backgroundColor: myColorsLight.white,
    borderTopWidth: 1,
    height: "100%",
    borderRightWidth: 1,
  },
  center: {
    height: "80%",
    width: "80%",
    borderRadius: 100,
    backgroundColor: myColorsLight.lightGrey,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    position: "absolute",

    elevation: 5,
    zIndex: 5,
  },
  button: {
    padding: 10,
    borderRadius: 2,
  },
  loadingText: {
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 10,
    marginRight: 10,
  },
});

export default DashCenterBtn;
