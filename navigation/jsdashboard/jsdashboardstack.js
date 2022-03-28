import React from "react";
import { View, Text, StyleSheet } from "react-native";
import JSDashPension from "./JSDashPension";
import BudgetBenchmark2 from "./BudgetBenchmark2";

const JSDasboard = () => {
  const [mounted, setMounted] = React.useState(1);
  return (
    <View style={styles.container}>
      {mounted === 1 && <BudgetBenchmark2 />}
      {mounted === 2 && <JSDashPension />}

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default JSDasboard;
