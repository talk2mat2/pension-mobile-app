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
 

const BudgetBenchmark2 = () => {
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
         
        </Text>
      </View>
      <View style={{marginTop:20, display:'flex', borderColor: 'grey', borderWidth: 1, height: 40, flexDirection: "row"}}>
        <View style={{width:280 , alignContent:'center', marginTop:10, marginLeft:70}}><Text>Micheal</Text></View>
        <View style={{width:1, height:8, backgroundColor: '#000000', height:40, marginLeft: -160}}></View>
        <View style={{borderEndColor:'#00000', width:280, marginTop:10, marginLeft:70}}><Text>Sarah</Text></View>
      </View>
      <View style={{flexDirection:'column', alignItems:'center'}}>
        <View style={{backgroundColor:'black', height: 150, marginRight:10, alignItems:'center', width: 14, borderBottomRightRadius:20, borderBottomLeftRadius:20}}>
          <View style={{backgroundColor:'white', borderColor:'white', borderRadius:100/2, height:50, marginLeft: 0,marginTop:70, height:10}}><Text>hhh</Text></View>
        </View>
        <View style={{backgroundColor:'#898c8b', height: 150, marginRight:10, width: 14, borderBottomRightRadius:20, borderBottomLeftRadius:20}}></View>
        <View style={{backgroundColor:'#a6a6a6', height: 150, marginRight:10, width: 14, borderBottomRightRadius:20, borderBottomLeftRadius:20}}></View>
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
export default BudgetBenchmark2;
