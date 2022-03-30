import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MyGradientBackground from "../../components/grdientBackGround";
import { myColorsLight } from "../../constant/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import DashHomeCards from "../../components/dashHomeCards";
import { AntDesign } from "@expo/vector-icons";

import JSCardsAnimated from "./JScardsAnimated";


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
          <View style={{ marginTop: 10, alignItems: "center", marginBottom: 15 }}>
        <Text
          style={{ textAlign: "center", color: myColorsLight.lightGreyDim }}
        >
          To build your retirement profile{"\n"}, we would need to capture some
          {"\n"}
          information from you.
        </Text>
      </View>
        </View>
      </View>

<<<<<<< HEAD:navigation/jsdashboard/JSDashboardmain.js
      <View style={{ height: "90%", paddingBottom: 100 }}>
        <ScrollView>
          <View style={{ marginTop: 40 }}>
            <Text
              style={{
                ...styles.subHeader,
                textAlign: "center",
                fontSize: 16,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur{"\n"}
              adipiscing elit. Curabitur arcu erat,{"\n"}
              imperdiet et, porttitor at sem. Curabitur arcu
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
              flexDirection: "row",
              marginVertical: 20,
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{ fontWeight: "400", color: myColorsLight.lightGreyDim }}
            >
              Your Desired Retirement{"\n"}
              lifestyle monthly cost is :
            </Text>
            <Text style={styles.boldtxt}>£2,779</Text>
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
              flexDirection: "row",
              marginVertical: 20,
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{ fontWeight: "400", color: myColorsLight.lightGreyDim }}
            >
              Your Desired Retirement{"\n"}
              lifestyle monthly cost is :
            </Text>
            <Text style={styles.boldtxt}>£718,925</Text>
          </View>
          <View
            style={{
              ...styles.hrView,
              width: "90%",
              alignSelf: "center",
              marginTop: 25,
            }}
          />
          <View style={styles.cardsContainer}>
            <DashHomeCards>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "400",
                  color: myColorsLight.lightGreyDark,
                }}
              >
                Your{"\n"}
                Retirement Age
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 25,
                  fontWeight: "bold",
                  marginTop: 6,
                }}
              >
                65
              </Text>
            </DashHomeCards>
            <DashHomeCards>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "400",
                  color: myColorsLight.lightGreyDark,
                }}
              >
                Retiring{"\n"}
                With Spouse
              </Text>
              <AntDesign
                style={{ marginTop: 6 }}
                name="check"
                size={30}
                color={myColorsLight.black}
              />
            </DashHomeCards>
            <DashHomeCards>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "400",
                  color: myColorsLight.lightGreyDark,
                }}
              >
                Retiring{"\n"}
                In London
              </Text>
              <AntDesign
                style={{ marginTop: 6 }}
                name="check"
                size={30}
                color={myColorsLight.black}
              />
            </DashHomeCards>
          </View>
        </ScrollView>
      </View>
      <JSCardsAnimated />
=======
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

      
    
>>>>>>> 11e5fbd4a5c0ded9160a5ffc69aa18bd071bf02c:components/budgetBenchmarkBachground.js
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
    marginBottom: 90,
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
