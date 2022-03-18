import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Modal, Portal, Button, Provider, Title } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import JarvisButton from "./JarvisButton";
import { RadioButton, ProgressBar } from "react-native-paper";
import { myColorsLight } from "../constant/colors";
const StatePensionModal = ({
  visible,
  setVisible,
  showModal,
  changeStatePension,
}) => {
  // const [visible, setVisible] = React.useState(false);
  const [buttonBackground, setButtonBackground] = React.useState("#77f");
  const [spouseGender, setSpouseGender] = React.useState("Male");
  const [stateAmountValidation, setStateAmountValidation] =
    React.useState(false);
  const [stateAmount, setStateAmount] = React.useState('8325');
  const _next = () => {
    if (!stateAmount) {
      setStateAmountValidation(true);
    } else {
      changeStatePension(stateAmount);
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
            marginBottom: 10,
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
            Add Your State {"\n"}Pension
          </Text>
        </View>
        <View style={{ ...styles.hrView, marginTop: 20 }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 16 }}>
            Enter your State{"\n"} Pension amount
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>£</Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={(text) => {
                setStateAmount(text), setStateAmountValidation(false);
              }}
              style={styles.input}
              value={stateAmount}
            />
          </View>
        </View>
        {stateAmountValidation && (
          <View style={styles.formGroupError}>
            <Text style={{ ...styles.inputError, marginTop: 4, fontSize: 12 }}>
              Please enter your state pension amount
            </Text>
          </View>
        )}

        {/* <View style={{ ...styles.hrView, marginTop: 20 }} /> */}
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
              status={spouseGender === "Male" ? "checked" : "unchecked"}
              onPress={() => setSpouseGender("Male")}
            />
            <Text style={[styles.radioText, { marginLeft: 20 }]}>Female</Text>
            <RadioButton
              value="Female"
              status={spouseGender === "Female" ? "checked" : "unchecked"}
              onPress={() => setSpouseGender("Female")}
            />
          </View>
        </View> */}
        <View style={{ ...styles.hrView, marginTop: 60 }} />
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: "bold" }}>
            <AntDesign name="exclamationcircle" size={17} color="black" /> Why
            are we asking you this{" "}
          </Text>
          <Text style={{ fontWeight: "200", marginTop: 10 }}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim
          </Text>
        </View>
        <View style={{ ...styles.hrView, marginTop: "40%" }} />
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
export default StatePensionModal;
