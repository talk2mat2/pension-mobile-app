import React from "react";
import { View, Text, StyleSheet, Dimensions, } from "react-native";
import MyGradientBackground from "../../components/grdientBackGround";
import { myColorsLight } from "../../constant/colors";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit'
 

const BudgetBenchmark = () => {
  return (
    <MyGradientBackground>
      <View
        style={{ marginTop: 15, alignItems: "flex-end", paddingHorizontal: 20 }}
      >
        <TouchableOpacity>
        <AntDesign name="closecircle" size={24} color="black" />
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
                { fontSize: 20, textAlign: "center", fontWeight: "bold" },
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
          adipiscing elit. Curabitur arcu erat{"\n"}
         
        </Text>
      </View>
     
      <View style={{position:'relative'}}>

        <View style={{position:'absolute', marginTop:-70}}>
      <BarChart
        data={{
          labels: ["\uf0f5","\uf0f5", "\uf242", "\uf0fc", "\uf236", "\uf0fc"],
          datasets: [
            {
              data: [50, 86, 60, 80, 99, 99],
            },
          ],
          icons: ['\uf0c3', '\uf0e7', '\uf2dc']
        }}
        width={345}
        height={550}
        fromZero= {true}
        withHorizontalLabels={false}
        showBarTops={false}
        withInnerLines={false}
       
        
       
        chartConfig={{
          backgroundGradientFrom: myColorsLight.white,
          backgroundGradientTo: myColorsLight.white,
          decimalPlaces: 0,
          barRadius: 15,
          paddingRight: 2,
          width: 200,
          color: (opacity = 0.5) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderWidth:50
          },
        }}
        style={{
          marginVertical: 80,
          borderRadius: 5,
          
        }}
      />
       </View>
       <View
        style={{
          ...styles.hrView,
          width: "90%",
          alignSelf: "center",
          marginTop: 190,
          position:'absolute',
        }}
      />
       <View
        style={{
          ...styles.hrView,
          width: "90%",
          alignSelf: "center",
          marginTop: 280,
          position:'absolute',
        }}
      />
       <View
        style={{
          ...styles.hrView,
          width: "80%",
          alignSelf: "flex-end",
          marginTop:439,
          position:'absolute',
        }}
      />
     
      <View style={{marginTop:90, marginLeft:20}}>
        <Text style={{fontSize:10}}>Budget Level {"\n"}Minimum</Text>
      </View>
      <View style={{marginTop:80, marginLeft:20}}>
        <Text style={{fontSize:10}}>Budget Level {"\n"}Minimum</Text>
      </View>
      <View style={{marginTop:80, marginLeft:20}}>
        <Text style={{fontSize:10}}>Budget Level {"\n"}Minimum</Text>
      </View>
    </View>
    
     
    </MyGradientBackground>
  );
};

const styles = StyleSheet.create({
  hrView: {
    width: "100%",
    height: 2,
    backgroundColor: "#cfcfcf",
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
});
export default BudgetBenchmark;