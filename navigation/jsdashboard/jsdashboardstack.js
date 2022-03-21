import React from "react";
import { View, Text, StyleSheet } from "react-native";
import JSDashboardnav from "../../components/JSDashboardnav";
import JSDashboardMain from "./JSDashboardmain";

const JSDasboard = () => {
  const [mounted, setMounted] = React.useState(1);
  return (
    <View style={styles.container}>
      {mounted === 1 && <JSDashboardMain />}
      <JSDashboardnav {...{setMounted}} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default JSDasboard;
