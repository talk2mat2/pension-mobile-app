import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DataTable } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import JarvisButton from "./JarvisButton";
import { myColorsLight } from "../constant/colors";

const BudgetOption = ({ type, _next, budetData }) => {
  const [itsOpen, setItsOpen] = React.useState(false);
  const [buttonBackground, setButtonBackground] = React.useState("#77f");
  const toggle = () => setItsOpen(!itsOpen);

  return (
    <View style={styles.container}>
      <View style={styles.hrView} />
      <TouchableOpacity onPress={toggle}>
        <View style={styles.optionsItem}>
          <View>
            <Text style={[styles.subHeader]}>Budget Level</Text>
            <Text
              style={[styles.subHeader, { fontWeight: "bold", fontSize: 19 }]}
            >
              {type}
            </Text>
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
      </TouchableOpacity>
      {itsOpen && (
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
                />
              </View>
              <Text style={styles.textWriteUp}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                lobortis, diam vel finibus commodo, nibh nulla ullamcorper nisl,
                dictum semper quam nisi id felis. In eget tincidunt enim, eget
                vulputate nisi. Pellentesque pretium tellus et neque venenatis,
                arcu ac
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
                          £{budetData["Food & drink"]}
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
                          £{budetData["House"]}
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
                          £{budetData["Holidays & Leisure"]}
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
                          £{budetData["Clothing & Personal"]}
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
                          £{budetData["Helping Others"]}
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
                        £{budetData["Total (Gross)"]}
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
    minHeight: 300,
    paddingBottom: 40,
    paddingTop: 10,
    backgroundColor: myColorsLight.lighterGrey,
  },

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
