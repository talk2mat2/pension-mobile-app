import React from "react";
import Swiper from "react-native-swiper";
import { View, Text, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
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
            <Text style={styles.textWhite}>Current Balance</Text>
            <Text style={styles.textWhite}>£833,700</Text>
            </View>
            <View style={styles.tableRow}>
            <Text style={styles.textWhite}>Current Balance</Text>
            <Text style={styles.textWhite}>£833,700</Text>
            </View>
            <View style={styles.tableRow}>
            <Text style={styles.textWhite}>Current Balance</Text>
            <Text style={styles.textWhite}>£833,700</Text>
            </View>
            <View style={styles.tableRow}>
            <Text style={styles.textWhite}>Current Balance</Text>
            <Text style={styles.textWhite}>£833,700</Text>
            </View>
            <View style={styles.tableRow}>
            <Text style={styles.textWhite}>Current Balance</Text>
            <Text style={styles.textWhite}>£833,700</Text>
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
 
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
 
    borderBottomColor: "#808080",
    borderBottomWidth: 2,
    paddingVertical:6,
   
  },
  textWhite:{
      color:'#fff'
  }
});

export default CPDatatable;
