import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { HeaderFour, HeaderTwo, ParaOne, HeaderThree } from "../constant/fonts";
import { Modal, Portal, Button, Provider, Title } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import UserContext from "../contexts/UserContext";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import JarvisButton from "./JarvisButton";
import { RadioButton, ProgressBar } from "react-native-paper";
import { myColorsLight, primary } from "../constant/colors";

const OtherensionModal = ({
  visible,
  setVisible,
  showModal,
  changeStatePension,
  personData,
  setPersonData,
}) => {
  // const [visible, setVisible] = React.useState(false);
  const [buttonBackground, setButtonBackground] = React.useState("#77f");
  const [spouseGender, setSpouseGender] = React.useState("Male");
  const [date, setDate] = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [stateAmountValidation, setStateAmountValidation] =
    React.useState(false);
  const [stateAmount, setStateAmount] = React.useState("8325");
  const ctx = React.useContext(UserContext);
  const _next = () => {
    // if (!stateAmount) {
    //   setStateAmountValidation(true);
    // } else {
    //   changeStatePension(stateAmount);
    // }
    changeStatePension();
  };
  const hideModal = () => setVisible(false);
  const updateDate = (d) => {
    let tempd = new Date(d);
    setDate(tempd);
    setShowDatePicker(false);
    setPersonData({ ...personData, expectedIncomeDate: tempd });
  };

  React.useEffect(() => {
    if (ctx?.u?.included[0]?.retirementDate) {
      const tempd = new Date(ctx?.u?.included[0]?.retirementDate);
      setDate(tempd);
      setPersonData({ ...personData, expectedIncomeDate: tempd });
    }
  }, []);
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
            marginBottom: 10,
          }}
        >
          <View style={styles.close}>
            <TouchableOpacity onPress={hideModal}>
              <MaterialIcons name="cancel" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <HeaderTwo
            style={{
              fontSize: 20,
              marginLeft: 15,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: 16,
              color: primary.baseText,
            }}
          >
            Other Retirement {"\n"}Income
          </HeaderTwo>
        </View>
        <ScrollView>
          <View style={{ ...styles.hrView, marginTop: 20 }} />
          <View style={{ paddingVertical: 20 }}>
            <ParaOne style={{ textAlign: "center", color: primary.baseText }}>
              Enter the total value of any other income you {"\n"} may have
              available to add to your pension {"\n"} when you retire
            </ParaOne>
          </View>
          <View style={{ ...styles.hrView, marginTop: 10 }} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 10,
              marginTop: 20,
              alignItems: "center",
            }}
          >
            <ParaOne style={{ fontSize: 16, color: primary.baseText }}>
              Expected Annual Income
            </ParaOne>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>£</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                value={personData.expectedAnualIncome}
                onChangeText={(text) => {
                  setPersonData({
                    ...personData,
                    expectedAnualIncome: text,
                    currentValue: text,
                  });
                }}
              />
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
          {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 16 }}>Gender</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.radioText]}>Male</Text>
            <RadioButton
              value="Male"
              status={personData.gender === "Male" ? "checked" : "unchecked"}
              onPress={() => setPersonData({ ...personData, gender: "Male" })}
            />
            <Text style={[styles.radioText, { marginLeft: 20 }]}>Female</Text>
            <RadioButton
              value="Female"
              status={personData.gender === "Female" ? "checked" : "unchecked"}
              onPress={() => setPersonData({ ...personData, gender: "Female" })}
            />
          </View>
        </View> */}
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
            <ParaOne style={{ fontSize: 16, color: primary.baseText }}>
              Spouses {"\n"}Pension
            </ParaOne>
            <View style={{ flexDirection: "row" }}>
              <ParaOne style={styles.radioText}>Yes</ParaOne>
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
              <ParaOne style={{ ...styles.radioText, marginLeft: 20 }}>
                No
              </ParaOne>
              <RadioButton
                value="no"
                status={
                  personData.spousePension === "no" ? "checked" : "unchecked"
                }
                onPress={() => {
                  setPersonData({
                    ...personData,
                    spousePension: "no",
                    isSpouse: false,
                  });
                }}
              />
            </View>
          </View>
          <View style={{ ...styles.hrView, marginTop: 20 }} />
          <View>
            <ParaOne
              style={{
                fontSize: 16,
                marginTop: 10,
                marginBottom: 20,
                color: primary.baseText,
              }}
            >
              Expected Income Start Date
            </ParaOne>
            <View style={{ height: 80 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <ParaOne
                  style={{
                    marginRight: 20,
                    color: primary.baseText,
                    fontWeight: "bold",
                  }}
                >
                  {date.toDateString()}
                </ParaOne>
                <JarvisButton
                  style={[styles.loginButton]}
                  btnStyle={{ fontSize: 14 }}
                  bgcolor={primary.btn}
                  play={() => {
                    setShowDatePicker(true);
                  }}
                  btn="Select date"
                  w="40%"
                />
              </View>

              <View style={[{ alignContent: "space-between" }]}>
                {showDatePicker && (
                  <DateTimePicker
                    testID="birthdayDateTimePicker"
                    minimumDate={new Date(new Date().getFullYear() - 18, 0, 1)}
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={(e, d) => {
                      setShowDatePicker(false);
                      if (typeof d != "undefined") {
                        updateDate(d);
                      }
                    }}
                  />
                )}
              </View>
            </View>
          </View>

          <View style={{ ...styles.hrView, marginTop: "16%" }} />
          <View style={{ alignItems: "center", marginTop: 19 }}>
            <JarvisButton
              bgcolor={primary.baseText}
              play={_next}
              btn="Continue"
              w={200}
            />
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    height: "90%",
    padding: 20,
    paddingTop: 20,
    backgroundColor: primary.subBase,
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
    color: primary.baseText,
  },
  formGroup: {
    width: "90%",
    textAlign: "center",
    marginTop: 20,
    borderRadius: 5,
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
  formText: {
    marginTop: 10,
    marginRight: 5,

    fontWeight: "bold",
  },
});
export default OtherensionModal;
