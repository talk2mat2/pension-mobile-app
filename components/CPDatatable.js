import React from "react";
import Swiper from "react-native-swiper/src";
import { View, StyleSheet } from "react-native";
import { myColorsLight, primary } from "../constant/colors";
import { HeaderFour, HeaderTwo, ParaOne, HeaderThree } from "../constant/fonts";
const CPDatatable = ({ profile, style }) => {
  // console.log(profile)
  const tableData = [1];
  return (
    <View style={{ height: "100%", ...style }}>
      <Swiper
        paginationStyle={{
          bottom: 0,
        }}
        activeDot={
          <View
            style={{
              backgroundColor: "#000",
              width: 13,
              height: 13,
              borderRadius: 7,
              marginLeft: 7,
              marginRight: 7,
            }}
          />
        }
        style={styles.wrapper}
        showsButtons={false}
      >
        {tableData.map((data, index) => (
          <View key={index} style={styles.slide1}>
            <View style={styles.tableRow}>
              <ParaOne style={styles.rowData}>Your Retirement Age</ParaOne>
              <ParaOne style={styles.PriceDetail}>
                {profile?.included[0]?.retirementAge || 0}
              </ParaOne>
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
        ))}
      </Swiper>
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
    color:primary.inputText
  },
  rowData: {
    color:primary.inputText,
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

export default CPDatatable;
