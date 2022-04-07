import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { Modal, Portal, Button, Provider, Title } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import JarvisButton from "./JarvisButton";
import { RadioButton, ProgressBar } from "react-native-paper";
import { myColorsLight } from "../constant/colors";
const RTDefinedBenefitModal = ({
  visible,
  submitFilledJars,
  setVisible,
  showModal,
  changeStatePension,
  personData,
  setPersonData,
  AddJar,
}) => {
  // const [visible, setVisible] = React.useState(false);
  const [buttonBackground, setButtonBackground] = React.useState("#77f");
  const [spouseGender, setSpouseGender] = React.useState("Male");
  const [stateAmountValidation, setStateAmountValidation] =
    React.useState(false);
  const [stateAmount, setStateAmount] = React.useState("");
  const _next = () => {
    if (!personData.pensionName) {
      return Alert.alert("Pension name is required");
    } else if (!personData.incomeAmount) {
      return Alert.alert("Annual income is required");
    } else {
      submitFilledJars();
      // AddJar();
      setVisible(false);
    }
  };
  const hideModal = () => setVisible(false);
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
            <TextInput
              placeholder="Pension Name"
              style={{ ...styles.input, width: "100%" }}
              value={personData.pensionName}
              onChangeText={(text) => {
                setPersonData({ ...personData, pensionName: text, name: text });
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

        <View style={{ ...styles.hrView, marginTop: "30%" }} />
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
});
export default RTDefinedBenefitModal;