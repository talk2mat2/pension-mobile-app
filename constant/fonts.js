import React from "react";
import { Text, StyleSheet, PixelRatio } from "react-native";
import { myColorsLight, primary } from "./colors";
import { useFonts } from "expo-font";



export const HeaderOne = ({ children,style }) => {
  const [loaded] = useFonts({
    LabGrotesqueMedium: require("../assets/fonts/LabGrotesque-Medium.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return <Text style={{...h1Style.text,...style}}>{children}</Text>;
};

const h1Style = StyleSheet.create({
  text: {
    color: primary.text,
    fontFamily: "LabGrotesqueMedium",
    fontSize: 45,
    fontWeight: "normal",
  },
});



export const HeaderTwo = ({ children,style }) => {
  const [loaded] = useFonts({
    LabGrotesqueMedium: require("../assets/fonts/LabGrotesque-Medium.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return <Text style={{...h2Style.text,...style}}>{children}</Text>;
};

const h2Style = StyleSheet.create({
  text: {
    color: primary.text,
    fontFamily: "LabGrotesqueMedium",
    fontSize: 32,
    fontWeight: "normal",
  },
});
export const HeaderFour = ({ children, style }) => {
  const [loaded] = useFonts({
    LabGrotesqueMedium: require("../assets/fonts/LabGrotesque-Medium.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return <Text style={{ ...h4Style.text, ...style }}>{children}</Text>;
};

const h4Style = StyleSheet.create({
  text: {
    color: primary.text,
    fontWeight: "normal",
    fontFamily: "LabGrotesqueMedium",
    fontSize:14
  },
});
export const ParaOne = ({ children, style }) => {
  const [loaded] = useFonts({
    LabGrotesqueLight: require("../assets/fonts/LabGrotesque-Light.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return <Text style={{ ...P1Style.text, ...style }}>{children}</Text>;
};

const P1Style = StyleSheet.create({
  text: {
    color: primary.subText,
    fontWeight: "normal",
    lineHeight:25,
    fontFamily: "LabGrotesqueLight",
    lineHeight:23,
    fontSize:16
  },
});


export const HeaderThree = ({ children,style }) => {
  const [loaded] = useFonts({
    LabGrotesqueMedium: require("../assets/fonts/LabGrotesque-Medium.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return <Text style={{...h3Style.text,...style}}>{children}</Text>;
};

const h3Style = StyleSheet.create({
  text: {
    color: primary.text,
    fontFamily: "LabGrotesqueMedium",
    fontSize: 16,
    fontWeight: "normal",
  },
});