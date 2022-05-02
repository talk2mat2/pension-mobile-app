import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HeaderThree } from "../constant/fonts";

import { DataTable, TextInput, Title } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import JarvisButton from "./JarvisButton";
import { myColorsLight, primary } from "../constant/colors";

const BudgetModalCustom = ({
  type,
  _next,
  budgetData,
  updateLifeStyleData,
  focused,
  setFocused,
  amount,
  minimal,
  moderate,
  comfortable,
}) => {
  const [itsOpen, setItsOpen] = React.useState(false);

  const [value, setValue] = React.useState("");
  const [buttonBackground, setButtonBackground] = React.useState("#77f");
  const toggle = () => {
    setFocused(type);
    setItsOpen(!itsOpen);
  };
  // React.useEffect(() => {
  //   // if (budgetData) {
  //   //   console.log(budgetData);
  //   // }
  //   console.log(budgetData);
  // }, []);
  // minimal={listSelectedName(title)?.attributes.minimum}
  // moderate={listSelectedName(title)?.attributes?.moderate}
  // comfortable
  React.useEffect(() => {
    if (amount) {
      setValue(String(Math.ceil(parseInt(amount) / 12)));
    }
  }, [amount]);
  const checkType = () => {
    if (
      amount != minimal?.value &&
      amount != moderate?.value &&
      amount != comfortable?.value
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.hrView} />
      <TouchableOpacity
        style={checkType() && styles.selected}
        amoun
        onPress={toggle}
      >
        <View style={styles.optionsItem}>
          <View>
            <HeaderThree style={{ fontWeight: "200", color: primary.subBase }}>
              Budget Level
            </HeaderThree>
            <HeaderThree style={{ fontWeight: "bold", fontSize: 19 }}>
              {type}
            </HeaderThree>
          </View>

          {itsOpen ? (
            <Ionicons
              onPress={toggle}
              name="ios-caret-up-circle"
              size={24}
              color={primary.subText}
            />
          ) : (
            <Ionicons
              onPress={toggle}
              name="ios-caret-down-circle"
              size={24}
              color={primary.subText}
            />
          )}
        </View>
      </TouchableOpacity>
      {itsOpen && focused === type && (
        <View style={styles.content}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.accordionBody}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>OverView</Text>
              <Text style={styles.textWriteUp}>Edit Rate</Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Description
              </Text>
              <Text style={styles.textWriteUp}>Set custom value</Text>
              <View style={{ marginTop: 20 }}>
                <View style={styles.hrView} />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                  marginBottom: 30,
                }}
              >
                <View>
                  <Text style={{ fontWeight: "bold" }}>Monthly Budget</Text>
                  <Text style={{ fontWeight: "bold" }}>
                    £
                    <TextInput
                      style={{ height: 40, width: 100 }}
                      value={value}
                      onChangeText={(text) => setValue(text)}
                      keyboardType="numeric"
                    />
                  </Text>
                </View>
                <JarvisButton
                  bgcolor={primary.btn}
                  btnStyle={{ fontSize: 13 }}
                  //multipky by 12 to fix databse data which is divided by 12
                  play={() =>
                    value ? updateLifeStyleData(parseInt(value) * 12) : null
                  }
                  btn="Set Budget"
                  w={100}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default BudgetModalCustom;

const styles = StyleSheet.create({
  container: {},

  accordionBody: { paddingHorizontal: 30, backgroundColor: "#f1f3f2" },
  content: { minHeight: 300, paddingBottom: 40 },

  optionsItem: {
    flexDirection: "row",
    padding: 20,
    paddingHorizontal: 25,
    justifyContent: "space-between",
    alignItems: "center",
  },
  options: {
    flexDirection: "row",
  },
  subHeader: {
    fontSize: 22,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 22,
  },
  textWhite: {
    color: "#fff",
  },
  textMid: {
    color: "#f2f2f2",
  },
  textWriteUp: {
    fontSize: 15,
  },
  hrView: {
    width: "100%",
    marginTop: 1,
    paddingBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",
  },
  selected: {
    backgroundColor: myColorsLight.grey8,
    borderRadius: 4,
  },
});
