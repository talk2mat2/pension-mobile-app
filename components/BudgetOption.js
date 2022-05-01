import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { DataTable } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import JarvisButton from "./JarvisButton";
import { myColorsLight, primary } from "../constant/colors";
import { HeaderFour, HeaderThree } from "../constant/fonts";

const BudgetOption = ({
  type,
  _next,
  budetData,
  desccription,
  focused,
  setFocused,
}) => {
  const [itsOpen, setItsOpen] = React.useState(false);
  const [buttonBackground, setButtonBackground] = React.useState("#77f");
  const toggle = () => {
    setFocused(type);
    setItsOpen(!itsOpen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.hrView} />
      <Pressable onPress={toggle}>
        <View style={styles.optionsItem}>
          <View>
            <HeaderThree style={{ fontWeight: "200" ,color:primary.subBase}}>
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
              style={styles.textMid}
            />
          ) : (
            <Ionicons
              onPress={toggle}
              name="ios-caret-down-circle"
              size={24}
              style={styles.textMid}
            />
          )}
        </View>
      </Pressable>
      {itsOpen && focused === type && (
        <View style={styles.content}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.accordionBody}>
              <View
                style={{
                  marginBottom: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ ...styles.textWriteUp, fontWeight: "bold" }}>
                  OverView
                </Text>
                <JarvisButton
                  bgcolor={myColorsLight.black}
                  play={_next.bind(this, budetData)}
                  btn="Set Budget"
                  w={100}
                  btnStyle={{fontSize:14}}
                />
              </View>
              <Text style={styles.textWriteUp}>
                {desccription && desccription["Total (Gross)"]}
              </Text>

              <View style={{ height: 300 }}>
                <View style={{ paddingBottom: 60 }}>
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>
                        <Text style={{ ...styles.textMid }}>Category</Text>
                      </DataTable.Title>
                      <DataTable.Title numeric>
                        <Text style={{ ...styles.textMid }}>Monthly Cost</Text>
                      </DataTable.Title>
                    </DataTable.Header>
                    {/* {budetData?.length > 0 &&
                      budetData.map((item,index) => (
                        <DataTable.Row key={index}>
                          <DataTable.Cell style={styles.cell}>
                            <AntDesign
                              name="car"
                              size={24}
                              style={{ ...styles.textMid }}
                            />
                            <Text
                              style={{ ...styles.textMid, fontWeight: "bold" }}
                            >
                              {"  "} {item.name}
                            </Text>
                          </DataTable.Cell>

                          <DataTable.Cell numeric>
                            <Text style={{ ...styles.textMid }}>
                              £{item.value}
                            </Text>
                          </DataTable.Cell>
                        </DataTable.Row>
                      ))} */}

                    <DataTable.Row>
                      <DataTable.Cell style={styles.cell}>
                        <AntDesign
                          name="car"
                          size={24}
                          style={{ ...styles.textMid }}
                        />
                        <Text style={{ ...styles.textMid, fontWeight: "bold" }}>
                          {"  "} Food & Drink
                        </Text>
                      </DataTable.Cell>

                      <DataTable.Cell numeric>
                        <Text style={{ ...styles.textMid }}>
                          £
                          {budetData["Food & drink"]
                            ? Math.ceil(budetData["Food & drink"] / 12)
                            : 0}
                        </Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                      <DataTable.Cell style={styles.cell}>
                        <AntDesign
                          name="car"
                          size={24}
                          style={{ ...styles.textMid }}
                        />
                        <Text style={{ ...styles.textMid, fontWeight: "bold" }}>
                          {"  "} House
                        </Text>
                      </DataTable.Cell>

                      <DataTable.Cell numeric>
                        <Text style={{ ...styles.textMid }}>
                          £
                          {budetData["House"]
                            ? Math.ceil(budetData["House"] / 12)
                            : 0}
                        </Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                      <DataTable.Cell style={styles.cell}>
                        <AntDesign
                          name="car"
                          size={24}
                          style={{ ...styles.textMid }}
                        />
                        <Text style={{ ...styles.textMid, fontWeight: "bold" }}>
                          {"  "} Transport
                        </Text>
                      </DataTable.Cell>

                      <DataTable.Cell numeric>
                        <Text style={{ ...styles.textMid }}>
                          £
                          {budetData["House"]
                            ? Math.ceil(budetData["Transport"] / 12)
                            : 0}
                        </Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                      <DataTable.Cell style={styles.cell}>
                        <AntDesign
                          name="car"
                          size={24}
                          style={{ ...styles.textMid }}
                        />
                        <Text style={{ ...styles.textMid, fontWeight: "bold" }}>
                          {"  "} Holiday & Leisure
                        </Text>
                      </DataTable.Cell>

                      <DataTable.Cell numeric>
                        <Text style={{ ...styles.textMid }}>
                          £
                          {budetData["Holidays & Leisure"]
                            ? Math.ceil(budetData["Holidays & Leisure"] / 12)
                            : 0}
                        </Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                      <DataTable.Cell style={styles.cell}>
                        <AntDesign
                          name="car"
                          size={24}
                          style={{ ...styles.textMid }}
                        />
                        <Text style={{ ...styles.textMid, fontWeight: "bold" }}>
                          {"  "} Clothing & Personal
                        </Text>
                      </DataTable.Cell>

                      <DataTable.Cell numeric>
                        <Text style={{ ...styles.textMid }}>
                          £
                          {budetData["Clothing & Personal"]
                            ? Math.ceil(budetData["Clothing & Personal"] / 12)
                            : 0}
                        </Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                      <DataTable.Cell style={styles.cell}>
                        <AntDesign
                          name="car"
                          size={24}
                          style={{ ...styles.textMid }}
                        />
                        <Text style={{ ...styles.textMid, fontWeight: "bold" }}>
                          {"  "} Helping Others
                        </Text>
                      </DataTable.Cell>

                      <DataTable.Cell numeric>
                        <Text style={{ ...styles.textMid }}>
                          £
                          {budetData["Helping Others"]
                            ? Math.ceil(budetData["Helping Others"] / 12)
                            : 0}
                        </Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                    {/* <DataTable.Row>
                      <DataTable.Cell style={styles.cell}>
                        <Text style={{ ...styles.textMid, fontWeight: "bold" }}>
                          Monthly Budget
                        </Text>
                      </DataTable.Cell>

                      <DataTable.Cell numeric>
                        <JarvisButton
                          bgcolor={buttonBackground}
                          play={_next}
                          btn="Continue"
                          w={80}
                        />
                      </DataTable.Cell>
                    </DataTable.Row> */}
                  </DataTable>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                      marginBottom: 30,
                      paddingHorizontal: 15,
                    }}
                  >
                    <View>
                      <Text style={{ fontWeight: "bold" }}>Monthly Budget</Text>
                      <Text style={{ fontWeight: "bold" }}>
                        £
                        {budetData["Total"]
                          ? Math.ceil(budetData["Total"] / 12)
                          : 0}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default BudgetOption;

const styles = StyleSheet.create({
  container: {},

  accordionBody: {
    paddingHorizontal: 30,
    marginBottom: 80,
  },
  content: {
    height: 200,
    paddingBottom: 20,
    paddingTop: 5,
    marginBottom:200,
    backgroundColor: primary.subBase,
  
  },

  optionsItem: {
    flexDirection: "row",
    padding: 15,
    paddingHorizontal: 25,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor:primary.base
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
    color: myColorsLight.black,
  },
  textWriteUp: {
    color: myColorsLight.lightGreyDark,
    fontSize: 16,
    fontWeight: "900",
  },
  hrView: {
    width: "100%",
    marginTop: 1,
    paddingBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",
  },
});
