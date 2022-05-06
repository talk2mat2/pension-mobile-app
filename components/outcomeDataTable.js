import React from "react";
import { HeaderFour, HeaderTwo, ParaOne, HeaderThree } from "../constant/fonts";
// import Swiper from "react-native-swiper";
import { View, StyleSheet } from "react-native";
import { myColorsLight, primary } from "../constant/colors";
const OutcomeDatatable = () => {
  return (
    <View style={{ height: 150 }}>
      <View style={styles.slide1}>
        <View style={styles.tableRow}>
          <ParaOne style={styles.rowData}>Your Retirement Age</ParaOne>
          <ParaOne style={styles.PriceDetail}>80</ParaOne>
        </View>
        <View style={styles.tableRow}>
          <ParaOne style={styles.rowData}>
            Desired Monthly Retirement Income{" "}
          </ParaOne>
          <ParaOne style={styles.PriceDetail}>£833,700</ParaOne>
        </View>
        <View style={styles.tableRow}>
          <ParaOne style={styles.rowData}>Required Pension Fund </ParaOne>
          <ParaOne style={styles.PriceDetail}>£833,700</ParaOne>
        </View>
        <View style={styles.tableRow}>
          <ParaOne style={styles.rowData}>Current Balance </ParaOne>
          <ParaOne style={styles.PriceDetail}>£000,000</ParaOne>
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
    color: primary.baseText,
  },
  rowData: {
    color: primary.baseParaOne,
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
  ParaOneWhite: {
    color: "#fff",
  },
});

export default OutcomeDatatable;
