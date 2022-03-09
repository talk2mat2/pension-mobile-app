import React from "react";
import { View, StyleSheet, Text } from "react-native";
import DashboardgrdientBack from "../../components/dashboardgrdientBack";
import JarDoughnut from "../../components/doughnut";
import Jarsummery from "../../components/jarsummery";
import RetirementProfile from "../../components/RetirementProfile";

const JarvisPension= () => {
  return (
    <DashboardgrdientBack>
      <View style={{ alignItems: "center", marginTop: 80 }}>
        <Text style={[styles.loginText, { fontSize: 20 }]}>Jarvis Pension Screen</Text>
      </View>

      
    </DashboardgrdientBack>
  );
};
const styles = StyleSheet.create({});
export default JarvisPension;
