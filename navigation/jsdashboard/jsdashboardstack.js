import React from "react";
import { View, Text, StyleSheet } from "react-native";
import JSDashboardnav from "../../components/JSDashboardnav";
import JSDashboardMain from "./JSDashboardmain";
import JSDashPension from "./JSDashPension";
import FullScreenContext from "../../contexts/fullScreenContext";

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
