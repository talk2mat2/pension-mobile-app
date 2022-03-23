import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MyGradientBackground from "../../components/grdientBackGround";
import { myColorsLight } from "../../constant/colors";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import BudjetBenchmarkBackGround from "../../components/budgetBenchmarkBachground";
import { VictoryBar, VictoryChart, VictoryGroup, VictoryAxis, VictoryTheme} from "victory-native";

const data = {
  budgetItem : [{x: 'home', y: 70},{x: 'food', y: 30}, {x: 'car', y: 60},{x: 'vacation', y: 40}, {x: 'clothes', y: 50}, {x: 'donation', y: 50}],
}
const JSDashboardMain = () => {
  return (
    <>
    <>
    <BudjetBenchmarkBackGround/>
    
    </>
    <View  style={styles.chart}>
      <VictoryChart domainPadding={10}>
      <VictoryGroup>
        <VictoryBar 
        data={data.budgetItem} 
        
        style={{
          data: {
            width: 30
          }
        }}
        />
        
      </VictoryGroup>
     
      </VictoryChart>
      </View>
    </>
  )

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
    marginBottom: 140,
    padding: 10,
    paddingTop: 20,
    borderRadius: 20,
    width: 200,
    
  }
});
export default JSDashboardMain;
