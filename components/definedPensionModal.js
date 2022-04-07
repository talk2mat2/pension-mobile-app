import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import api from "../api";
import lodash from "lodash";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Modal, Portal, Button, Provider, Title } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import JarvisButton from "./JarvisButton";
import { RadioButton, ProgressBar } from "react-native-paper";
import { myColorsLight } from "../constant/colors";
import UserContext from "../contexts/UserContext";
const DefinedBenefitModal = ({
  visible,
  setVisible,
  showModal,
  changeStatePension,
  personData,
  setPersonData,
  AddJar,
}) => {
  // const [visible, setVisible] = React.useState(false);
  const [buttonBackground, setButtonBackground] = React.useState("#77f");
  const [providerName, setproviderName] = React.useState("");
  const [search, setSearch] = React.useState([]);
  const [search2, setSearch2] = React.useState([]);
  const [spouseGender, setSpouseGender] = React.useState("Male");
  const [stateAmountValidation, setStateAmountValidation] =
    React.useState(false);
  const [providerNameValidation, setproviderNameValidation] =
    React.useState(false);
  const ctx = useContext(UserContext);
  const [stateAmount, setStateAmount] = React.useState("");
  const _next = () => {
    if (!personData.pensionName) {
      return Alert.alert("Pension name is required");
    } else if (!personData.incomeAmount) {
      return Alert.alert("Annual income is required");
    } else {
      changeStatePension();
      AddJar();
    }
  };
  const hideModal = () => setVisible(false);
  const handleSearchResult = async (search) => {
    setproviderNameValidation(false);
    if (!search) {
      return;
    }
    if (search?.length < 3) {
      return;
    }
    await api
      .search_all_Pension_Providers(ctx?.atk, search)
      .then((res) => {
        // console.log(res.data);
        // console.log(search);
        res.data && setSearch(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    await api
      .search_all_Pension_Employers(ctx?.atk, search)
      .then((res) => {
        // console.log(res.data);
        // console.log(search);
        res.data && setSearch2(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const debouncedSearch = lodash.debounce((text) => {
    handleSearchResult(text);
  }, 500);
  const mapResults = () => {
    return (
      search?.length > 0 &&
      search?.map((item, index) => (
        <View key={item?.id} style={{ marginVertical: 3 }}>
          <TouchableOpacity
            onPress={() => {
              setSearch([]);
              setSearch2([]);
              // console.log(item?.attributes?.externalIds[0]?.value)
              // setChoosmnenProvider(item);
              setPersonData({
                ...personData,
                providerName: item?.attributes?.name,
                name: item?.attributes?.name,
                pensionName:item?.attributes?.name
                // secclExternalProviderId:
                //   item?.attributes?.secclExternalProviderId,
              });
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <MaterialCommunityIcons
                style={{ marginTop: 6 }}
                name="safe"
                size={20}
                color={myColorsLight.black}
              />
              <Text
                style={{ fontWeight: "700", paddingVertical: 3, marginLeft: 4 }}
                key={index}
              >
                {item?.attributes?.name}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ))
    );
  };
  const mapResults2 = () => {
    return (
      search2?.length > 0 &&
      search2?.map((item, index) => (
        <View key={item?.id} style={{ marginVertical: 3 }}>
          <TouchableOpacity
            onPress={() => {
              setSearch2([]);
              setSearch([]);
              // console.log(item?.attributes?.externalIds[0]?.value)
              // setChoosmnenProvider(item);
              setPersonData({
                ...personData,
                providerName: item?.attributes?.name,
                name: item?.attributes?.name,
                pensionName:item?.attributes?.name
                // secclExternalProviderId:
                //   item?.attributes?.secclExternalProviderId,
              });
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <MaterialCommunityIcons
                style={{ marginTop: 6 }}
                name="office-building"
                size={20}
                color={myColorsLight.black}
              />
              <Text
                style={{ fontWeight: "700", paddingVertical: 3, marginLeft: 4 }}
                key={index}
              >
                {item?.attributes?.name}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ))
    );
  };
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}
      >
        <View
          style={{
            flexDirection: "row",

            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <View style={styles.close}>
            <TouchableOpacity onPress={hideModal}>
              <MaterialIcons name="cancel" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontSize: 20,
              marginLeft: 15,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Defined Benefit {"\n"}Pensions
          </Text>
        </View>
        <View style={{ ...styles.hrView, marginTop: 20 }} />
        <View
          style={{
            flexDirection: "row",

            marginVertical: 10,
            marginTop: 20,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {personData.pensionName ? (
              <TouchableOpacity
                onPress={() =>
                  setPersonData({ ...personData, pensionName: "", name: "" })
                }
              >
                <Text style={{ fontWeight: "700" }}>
                  {personData.pensionName}
                </Text>
              </TouchableOpacity>
            ) : (
              <>
                <TextInput
                  placeholder="Pension Name"
                  style={{ ...styles.input, width: "100%" }}
                  value={providerName}
                  // onChangeText={(text) => {
                  //   setPersonData({ ...personData, pensionName: text, name: text });
                  // }}
                  onChangeText={(text) => {
                    setproviderName(text);
                    debouncedSearch(text);
                  }}
                />
                {(search?.length > 0 || providerName.length > 0) && (
                  <View style={styles.searchDrop}>
                    <ScrollView>
                      <TouchableOpacity
                        onPress={() => {
                          setSearch([]);
                          setPersonData({
                            ...personData,
                            secclExternalProviderId: "",
                            provider: providerName,
                            name: providerName,
                            pensionName:providerName
                          });
                          // setChoosenProvider({
                          //   attributes: { name: providerName },
                          // });
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "700",
                            paddingVertical: 4,
                            backgroundColor: myColorsLight.grey9,
                            paddingHorizontal: 20,
                          }}
                        >
                          {providerName}
                        </Text>
                      </TouchableOpacity>
                      {mapResults()}
                      {mapResults2()}
                    </ScrollView>
                  </View>
                )}
              </>
            )}
          </View>
        </View>
        {/* {stateAmountValidation && (
          <View style={styles.formGroupError}>
            <Text style={{ ...styles.inputError, marginTop: 4, fontSize: 12 }}>
              Please enter your state pension amount
            </Text>
          </View>
        )} */}

        <View style={{ ...styles.hrView, marginTop: 20 }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 16 }}>Annual Income Amount</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>£</Text>
            <TextInput
              keyboardType="numeric"
              value={personData.annualIncome}
              onChangeText={(text) => {
                setPersonData({
                  ...personData,
                  annualIncome: text,
                  incomeAmount: text,
                });
              }}
              style={styles.input}
            />
          </View>
        </View>

        <View style={{ ...styles.hrView, marginTop: 20 }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16 }}>Spouses {"\n"}Pension</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.radioText]}>Yes</Text>
            <RadioButton
              value="Male"
              status={
                personData.spousePension === "yes" ? "checked" : "unchecked"
              }
              onPress={() => {
                setPersonData({
                  ...personData,
                  spousePension: "yes",
                  isSpouse: true,
                });
              }}
            />
            <Text style={[styles.radioText, { marginLeft: 20 }]}>No</Text>
            <RadioButton
              value="no"
              status={
                personData.spousePension === "no" ? "checked" : "unchecked"
              }
              onPress={() => {
                setPersonData({
                  ...personData,
                  spousePension: "no",
                  isSpouse: true,
                });
              }}
            />
          </View>
        </View>
        <View style={{ ...styles.hrView, marginTop: 20 }} />

        <View style={{ ...styles.hrView, marginTop: "60%" }} />
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <JarvisButton
            bgcolor={myColorsLight.black}
            play={_next}
            btn="Continue"
            w={200}
          />
        </View>
        <ScrollView></ScrollView>
      </Modal>
    </Portal>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    height: "90%",
    padding: 20,
    paddingTop: 20,
    backgroundColor: "white",
    marginHorizontal: 25,
    borderRadius: 10,
    justifyContent: "flex-start",
  },
  subText: {
    fontSize: 14,
    textAlign: "center",
  },
  close: {
    position: "absolute",
    right: 5,
    top: 5,
  },
  radioText: {
    paddingVertical: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
  inputError: {
    color: "red",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 0.3,
    padding: 8,
    width: 80,
  },
  hrView: {
    width: "100%",

    height: 2,
    backgroundColor: "#bbb",
  },
  searchDrop: {
    maxHeight: 300,
    position: "absolute",
    right: 0,
    width: '100%',
    backgroundColor: myColorsLight.white,
    zIndex: 5,
    elevation: 5,
    top: 50,
    overflow: "scroll",
    padding: 10,
  },
});
export default DefinedBenefitModal;
