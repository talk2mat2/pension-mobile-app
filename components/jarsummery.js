import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { myColorsLight } from "../constant/colors";
import { SimpleLineIcons } from "@expo/vector-icons";
import JarsummerySwipper from "../components/jarsummeryswiper";

const Jarsummery = () => {
  const [isOpen, setIsopen] = React.useState(false);
  const toggle = () => setIsopen(!isOpen);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggle}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: myColorsLight.lightGreyDim,
            paddingVertical: 20,
            paddingHorizontal: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
          <Text style={{ fontSize: 18 }}>Jar summery</Text>
          <SimpleLineIcons
            name={!isOpen ? "arrow-up" : "arrow-down"}
            size={24}
            color="black"
          />
        </View>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.content}>
          <JarsummerySwipper />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    minHeight: 50,
  },
  content: {
    height: 300,
    backgroundColor: myColorsLight.white,
  },
});

export default Jarsummery;
