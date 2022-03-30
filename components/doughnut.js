import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { myColorsLight } from "../constant/colors";

const JarDoughnut = () => {
  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;

  const targetAmount = 2779;

  const archievement = 1286;

  const shortcut = targetAmount - archievement;
  const percentage = (archievement / targetAmount) * 100;
  const strokeDashoffset =
    circleCircumference - (circleCircumference * percentage) / 100;

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ position: "absolute", left: "47%" }}>
          Target{"\n"}
          Monthly Income {"\n"}
          <Text style={{ fontWeight: "900" }}>£2,779</Text>
        </Text>
      </View>
      <View style={styles.graphWrapper}>
        <Svg height="270" width="270" viewBox="0 0 180 180">
          <G rotation={-90} originX="90" originY="90">
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#F1F6F9"
              fill="transparent"
              strokeWidth="15"
            />
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke={myColorsLight.lightGreyDark}
              fill="transparent"
              strokeWidth="15"
              strokeDasharray={circleCircumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </G>
        </Svg>
        <Text style={styles.text}>
          <Text> Current Monthly {"\n"}Retirement Income</Text> {"\n"}
          <Text style={{ fontSize: 20, fontWeight: "bold", lineHeight: 30 }}>
            €{archievement}
          </Text>
          {"\n"}
          <Text>
            {" "}
            Current Monthly Income{"\n"} Shortfall :
            <Text style={{ fontWeight: "900" }}> £{shortcut}</Text>
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    height: 400,
  },
  targetTxt: {
    position: "absolute",
    top: 0,
  },
  graphWrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  text: {
    paddingTop: 80,
    position: "absolute",
    textAlign: "center",
    fontWeight: "700",
    color: "#394867",
  },
  hrView: {
    height: 2,
    width: "100%",
    backgroundColor: myColorsLight.lightGreyDim,
    marginVertical: 7,
  },
});
export default JarDoughnut;
