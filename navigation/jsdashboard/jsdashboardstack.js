import React from "react";
import { View, Text, StyleSheet } from "react-native";
import JSDashPension from "./JSDashPension";
import JSDashboardMain from "./JSDashboardmain";
import FullScreenContext from "../../contexts/fullScreenContext";
import JSDashboardnav from "../../components/JSDashboardnav";
import BudgetBenchmark2 from "./BudgetBenchmark2";

const JSDasboard = () => {
  const [mounted, setMounted] = React.useState(1);
  const [isfullScreen, setIsfullScreen] = React.useState(false);
  const togglrFullScreen = () => setIsfullScreen(!isfullScreen);
  return (
    <FullScreenContext.Provider value={{ togglrFullScreen, isfullScreen }}>
      <View style={styles.container}>
        {mounted === 1 && <JSDashboardMain />}
        {mounted === 2 && <JSDashPension />}
        {!isfullScreen && <JSDashboardnav {...{ mounted, setMounted }} />}
      </View>
    </FullScreenContext.Provider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default JSDasboard;
