import React from "react";
import Swiper from "react-native-swiper/src";
import { View, Text, StyleSheet } from "react-native";
import { myColorsLight } from "../constant/colors";
const RtOutcomeDatatable = ({ profile }) => {
  React.useEffect(() => {
    console.log(profile?.attributes);
  }, []);
  return (
    <View style={{ height: 150 }}>
      <View style={styles.slide1}>
        <View style={styles.tableRow}>
          <Text style={styles.rowData}>Your Retirement Age</Text>
          <Text style={styles.PriceDetail}>{profile?.attributes?.retirementAge}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.rowData}>Spouses Retirement Age</Text>
          <Text style={styles.PriceDetail}>--</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.rowData}>Desired Monthly Retirement Income </Text>
          <Text style={styles.PriceDetail}>£--,--</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.rowData}>Required Pension Fund </Text>
          <Text style={styles.PriceDetail}>£--,--</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.rowData}>Current Balance </Text>
          <Text style={styles.PriceDetail}>£--,--</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,

    width: "100%",
  },
  PriceDetail: {
    fontWeight: "bold",
  },
  rowData: {
    color: myColorsLight.lightGreyDark,
    fontWeight: "900",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: myColorsLight.lightGrey,
    borderBottomWidth: 2,
    paddingVertical: 4,
  },
  textWhite: {
    color: "#fff",
  },
});

export default RtOutcomeDatatable;
