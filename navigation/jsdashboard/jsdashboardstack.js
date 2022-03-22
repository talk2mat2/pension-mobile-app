import React from "react";
import { View, Text, StyleSheet } from "react-native";
import JSDashboardnav from "../../components/JSDashboardnav";
import JSDashboardMain from "./JSDashboardmain";
import JSDashPension from "./JSDashPension";

const JSDasboard = () => {
  const [mounted, setMounted] = React.useState(1);
  return (
    <View style={styles.container}>
      {mounted === 1 && <JSDashboardMain />}
      {mounted === 2 && <JSDashPension />}
      <JSDashboardnav {...{ mounted, setMounted }} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default JSDasboard;
