import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { myColorsLight } from "../constant/colors";
import { SimpleLineIcons } from "@expo/vector-icons";
import RetirementSummery from "./retirementSummery";

const RetirementProfile = () => {
  const [isOpen, setIsopen] = React.useState(false);
  const toggle = () => setIsopen(!isOpen);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggle}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: myColorsLight.lighterGrey,
            paddingVertical: 20,
            paddingHorizontal: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
          <Text style={{ fontSize: 18 }}>Your Retirement Profile</Text>
          <SimpleLineIcons
            name={!isOpen ? "arrow-up" : "arrow-down"}
            size={24}
            color="black"
          />
        </View>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.content}>
          <RetirementSummery />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    minHeight: 40,
  },
  content: {
    height: 400,
    backgroundColor: myColorsLight.white,
  },
});

export default RetirementProfile;
