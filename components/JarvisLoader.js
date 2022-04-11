import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const mobile = Platform.OS == "ios" || Platform.OS == "android";

const JarvisLoader = (props) => {
  const propsColor = props.color || "#00f";
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={propsColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "40%",
    elevation: 3,
    zIndex: 2,
    left: 0,
    right: 0,
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

export default JarvisLoader;
