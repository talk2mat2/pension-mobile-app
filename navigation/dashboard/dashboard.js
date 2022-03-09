import React from "react";
import { View, StyleSheet, Text } from "react-native";
import DashboardgrdientBack from "../../components/dashboardgrdientBack";
import JarDoughnut from "../../components/doughnut";
import Jarsummery from "../../components/jarsummery";
import RetirementProfile from "../../components/RetirementProfile";

const Dasboard = () => {
  return (
    <DashboardgrdientBack>
      <View style={{ alignItems: "center", marginTop: 80 }}>
        <Text style={[styles.loginText, { fontSize: 40 }]}>Jarvis</Text>
      </View>

      <View
        style={{ position: "relative",minHeight: 220 ,marginTop:'10%'}}
      >
      
        <JarDoughnut />
      </View>
      <View style={{marginTop:"auto"}}>
        <Jarsummery/> 
        <RetirementProfile/>
      </View>
    </DashboardgrdientBack>
  );
};
const styles = StyleSheet.create({});
export default Dasboard;
