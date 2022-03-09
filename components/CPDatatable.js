import React from "react";
import Swiper from "react-native-swiper/src";
import { View, Text, StyleSheet } from "react-native";
import { myColorsLight } from "../constant/colors";
const CPDatatable = () => {
  const tableData = [1, 2, 3, 4, 5];
  return (
    <View style={{ height: "100%" }}>
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
              <Text style={styles.rowData}>Your Retirement Age</Text>
              <Text style={styles.PriceDetail}>80</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.rowData}>Spouses Retirement Age</Text>
              <Text style={styles.PriceDetail}>85</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.rowData}>
                Desired Monthly Retirement Income{" "}
              </Text>
              <Text style={styles.PriceDetail}>£833,700</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.rowData}>Required Pension Fund </Text>
              <Text style={styles.PriceDetail}>£833,700</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.rowData}>Current Balance </Text>
              <Text style={styles.PriceDetail}>£000,000</Text>
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

export default CPDatatable;
