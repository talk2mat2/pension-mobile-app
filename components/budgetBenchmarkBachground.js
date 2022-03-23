import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MyGradientBackground from "./grdientBackGround";
import { myColorsLight } from "../constant/colors";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";


const config = {
  hasXAxisBackgroundLines: false,
  xAxisLabelStyle: {
    position: 'right',
    prefix: '$'
  }
};

// const data = {
//   labels: ["Home", "Food", "Car", "vacation", "Cloth", "Donations"],
//   datasets: [
//     {
//       data: [20, 45, 28, 80, 99, 43]
//     }
//   ]
// };
const BudjetBenchmarkBackGround = () => {
  return (
    <MyGradientBackground>
      <View
        style={{ marginTop: 15, alignItems: "flex-end", paddingHorizontal: 20 }}
      >
        <TouchableOpacity>
        <AntDesign name="closecircle" size={24} color="grey" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 5,
          alignContent: "flex-start",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View>
          <View>
            <Text
              style={[
                styles.loginText,
                ,
                { fontSize: 30, textAlign: "center", fontWeight: "bold" },
              ]}
            >
            Budget Benchmark
            </Text>
          </View>
        </View>
      </View>

      <View style={{ marginTop: 40 }}>
        <Text
          style={{
            ...styles.subHeader,
            textAlign: "center",
            fontSize: 16,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur{"\n"}
        </Text>
      </View>
      <View
        style={{
          ...styles.hrView,
          width: "90%",
          alignSelf: "center",
          marginTop: 100,
        }}
      />
     {/* <View>
    <VerticalBarGraph
      data={[20, 45, 28, 80, 99, 43, 50]}
      labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']}
      width={375}
      height={300}
      barRadius={5}
      barWidthPercentage={0.65}
      baseConfig={config}
      style={styles.chart}
    />
  </View> */}
      <View
        style={{
          justifyContent: "space-between",
          marginVertical: 20,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ fontWeight: "200", color: myColorsLight.lightGreyDim }}>
          Budget level {"\n"}
        </Text>
        <Text style={{ fontWeight: "200", color: myColorsLight.black }}>
          Minimum
        </Text>
       
      </View>
      <View
        style={{
          ...styles.hrView,
          width: "90%",
          alignSelf: "center",
          marginTop: 25,
        }}
      />
      <View
        style={{
          justifyContent: "space-between",
          marginVertical: 20,
          paddingHorizontal: 20,
        }}
      >
       <Text style={{ fontWeight: "200", color: myColorsLight.lightGreyDim }}>
          Budget level {"\n"}
        </Text>
        <Text style={{ fontWeight: "200", color: myColorsLight.black }}>
          Minimum
        </Text>
      </View>
      <View
        style={{
          ...styles.hrView,
          width: "90%",
          alignSelf: "center",
          marginTop: 25,
        }}
      />
       <View
        style={{
          justifyContent: "space-between",
          marginVertical: 20,
          paddingHorizontal: 20,
        }}
      >
       <Text style={{ fontWeight: "200", color: myColorsLight.lightGreyDim }}>
          Budget level {"\n"}
        </Text>
        <Text style={{ fontWeight: "200", color: myColorsLight.black }}>
          Minimum
        </Text>
      </View>
      <View
        style={{
          ...styles.hrView,
          width: "60%",
          alignSelf: "center",
          marginTop: 25,
        }}

      />

      
    
    </MyGradientBackground>
  );
};

const styles = StyleSheet.create({
  hrView: {
    width: "100%",
    // marginTop: 10,
    // paddingBottom: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#bbb",
    height: 2,
    backgroundColor: "#bbb",
  },
  subHeader: {
    fontSize: 22,
    textAlign: "center",
  },
  boldtxt: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardsContainer: {
    marginTop: 17,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  chart: {
    marginBottom: 30,
    padding: 10,
    paddingTop: 20,
    borderRadius: 20,
    width: 375
  }
});
export default BudjetBenchmarkBackGround;
