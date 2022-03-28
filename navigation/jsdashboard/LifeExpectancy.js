import React from "react";
import { View, Text, StyleSheet, Dimensions, } from "react-native";
import MyGradientBackground from "../../components/grdientBackGround";
import { myColorsLight } from "../../constant/colors";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit'
 

const LifeExpectancy = () => {
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
                { fontSize: 25, textAlign: "center", fontWeight: "bold" },
              ]}
            >
              Life Expectancy
            </Text>
          </View>
        </View>
      </View>

      <View >
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
      <View style={{ marginTop: 5 , marginLeft:-50}}>
      <View style={{marginTop:35, marginLeft: 350}}>
      <TouchableOpacity>
      <Entypo name="info-with-circle" size={14} color="black" />
      </TouchableOpacity>
      </View>
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
      <>
      <LineChart
        data={{
          labels: ['95%', '50%', '5%'],
          datasets: [
            {
              data: [10, 20, 30, 40, 50, 60],
              strokeWidth: 2,
              color: (opacity = 1) => `rgba(36, 36, 35, ${opacity})`,
            },
            {
              data: [20,40, 39, 50, 70, 99],
              color: (opacity = 1) => `rgba(66, 66, 64, ${opacity})`,
            },
            {
              data: [ 40, 50, 70, 99],
              color: (opacity = 1) => `rgba(133, 132, 130, ${opacity})`,
            }
          ],
         
        }}
        width={Dimensions.get('window').width + 7}
        height={400}
        fromZero= {true}
        withDots={false}
        withShadow={false}
        withInnerLines={false}
        chartConfig={{
          backgroundGradientFrom: myColorsLight.white,
          backgroundGradientTo: myColorsLight.white,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
           
          },
        }}
        style={{
          marginVertical: 40,
          borderRadius: 16,
        }}
      />
      
      </>
      <View>
        <View style={{display:'flex', marginTop:-15}}>
        <Text style={{marginTop:-55, marginLeft:110}}>You</Text>
          <View style={{backgroundColor:'#242423', opacity:1,marginLeft: 90, height:5,width:15, marginTop:-10}}></View>
        </View>
        <View style={{display:'flex', marginTop:-15}}>
        <Text style={{marginTop:-55, marginLeft:170}}>Spouse</Text>
          <View style={{backgroundColor:'#5e5c5c', opacity:1, marginLeft: 150, height:5,width:15, marginTop:-10}}></View>
        </View>
        <View style={{display:'flex', marginTop:-15}}>
        <Text style={{marginTop:-55, marginLeft:250}}>Combined</Text>
          <View style={{backgroundColor:'#858482',opacity:1, marginLeft: 230, height:5,width:15, marginTop:-10}}></View>
        </View>
      </View>
     
      
    
     
    </MyGradientBackground>
  );
};

const styles = StyleSheet.create({
  hrView: {
    width: "100%",
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
});
export default LifeExpectancy;