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
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import JarvisButton from "./JarvisButton";
import { RadioButton, ProgressBar } from "react-native-paper";
import { myColorsLight, primary } from "../constant/colors";

const OtherensionModalSaving = ({
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
  const [startdatDisplay, setStartdatDisplay] = React.useState(
    new Date().toDateString()
  );
  const [stateAmountValidation, setStateAmountValidation] =
    React.useState(false);
  const [stateAmount, setStateAmount] = React.useState("8325");
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
            Other Retirement {"\n"}Savings
          </HeaderTwo>
        </View>
        <ScrollView>
          <View style={{ ...styles.hrView, marginTop: 40 }} />
          <View style={{ paddingVertical: 20 }}>
            <ParaOne style={{ textAlign: "center", color: primary.baseText }}>
              Enter the total value of savings, investments {"\n"}or properties
              you may have available to add{"\n"} to your pension when you
              retire
            </ParaOne>
          </View>
          <View style={{ ...styles.hrView, marginTop: 10 }} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 10,
              marginTop: 20,
            }}
          >
            <HeaderTwo style={{ fontSize: 16, color: primary.baseText }}>
              Total Expected{"\n"}
              value at retirement
            </HeaderTwo>
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
            <HeaderTwo style={{ fontSize: 16, color: primary.baseText }}>
              Spouses {"\n"}Pension
            </HeaderTwo>
            <View style={{ flexDirection: "row" }}>
              <ParaOne style={{ ...styles.radioText, color: primary.baseText }}>
                Yes
              </ParaOne>
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
              <ParaOne
                style={{
                  ...styles.radioText,
                  marginLeft: 20,
                  color: primary.baseText,
                }}
              >
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

          <View style={{ ...styles.hrView, marginTop: "30%" }} />
          <View style={{ alignItems: "center", marginTop: 80 }}>
            <JarvisButton
              bgcolor={primary.btn}
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
    height: "80%",
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
    borderRadius: 7,
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
export default OtherensionModalSaving;
