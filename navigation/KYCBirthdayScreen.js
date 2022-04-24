import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ImageBackground,
  Platform,
  ScrollView,
} from "react-native";
let ModalDropdown;
let Webdate;
if (Platform.OS == "web") {
  Webdate = require("react-native-paper-dates");
}
if (Platform.OS !== "web") {
  ModalDropdown = require("react-native-modal-dropdown");
}
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as helpers from "../Helpers";
import UserContext from "../contexts/UserContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { ProgressBar } from "react-native-paper";
// import ModalDropdown from "react-native-modal-dropdown";
import MyGradientBackground from "../components/grdientBackGround";
import WhyAsk from "../components/whyask";
import { myColorsLight } from "../constant/colors";

import JarvisButton from "../components/JarvisButton";

function KYCBirthdayScreen({ navigation }) {
  const ctx = useContext(UserContext);
  const [buttonBackground, setButtonBackground] = useState("#77f");
  const [birthday, setBirthday] = useState("");
  const [birthdayObject, setBirthdayObject] = useState("{}");
  const [birthdayValidation, setBirthdayValidation] = useState(false);
  const [gender, setGender] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [genderValidation, setGenderValidation] = useState(false);
  const [birthdayDisplay, setBirthdayDisplay] = useState("");
  let u = ctx?.u;
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
    setShowDatePicker(false);
  }, [setOpen]);

  const updateBirthday = (d) => {
    let tempd = new Date(d);
    setBirthday(tempd);
    setBirthdayDisplay(tempd.toDateString());
    setBirthdayValidation(false);
    setBirthdayObject(JSON.stringify(tempd));
    setShowDatePicker(false);
  };
  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setShowDatePicker(false);
      setDate(params.date);
      updateBirthday(params.date);
    },
    [setOpen, setDate, setBirthday]
  );

  const defaultDate = () => {
    if (birthday) {
      return new Date(birthday);
    } else if (u?.included[0]?.dateOfBirth) {
      const tempDate = u.included[0].dateOfBirth;

      return new Date(tempDate);

      //tempDate?.toTimeString() && setBirthdayDisplay(tempDate?.toTimeString());
    } else {
      let tempDates = new Date();
      const newDate = tempDates.setFullYear(tempDates.getFullYear() - 40);
      return new Date(newDate);
      //setBirthdayDisplay(new Date(newDate).getFullYear.toTimeString());
    }
  };
  React.useEffect(() => {
    if (u?.included[0]?.dateOfBirth) {
      const tempDate = u.included[0].dateOfBirth;
      setBirthday(tempDate);
      setBirthdayDisplay(new Date(tempDate).toDateString());

      //tempDate?.toTimeString() && setBirthdayDisplay(tempDate?.toTimeString());
    } else {
      let tempDates = new Date();
      const newDate = tempDates.setFullYear(tempDates.getFullYear() - 40);
      setBirthdayDisplay(new Date(newDate).toDateString());
      //setBirthdayDisplay(new Date(newDate).getFullYear.toTimeString());
    }
  }, []);
  const _updateUser = () => {
    //Update the frontend: context and async storage
    const userBirthDay = new Date(birthday);
    let tempd = userBirthDay?.toISOString().split("T");
    u.included[0].dateOfBirth = tempd[0];
    u.included[0].gender = u.attributes.gender;
    ctx.setU(u);
    helpers.save("pa_u", JSON.stringify(u));
  };

  const _next = () => {
    if (typeof birthday == "undefined" || !birthday) {
      setBirthdayValidation(true);
    } else {
      _updateUser();
      navigation.navigate("KYCRetirementAge");
    }
  };

  const _goBack = () => {
    navigation.goBack();
  };
  const options = ["Male", "Female"];
  React.useEffect(() => {
    if (!u?.attributes?.gender) {
      setGender("Male");
    } else {
      setGender(u?.attributes?.gender);
    }
  }, [u]);
  return (
    <MyGradientBackground>
      <View
        style={{
          marginTop: 30,
          alignContent: "flex-start",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View style={{ position: "absolute", left: 10 }}>
          <Pressable onPress={_goBack}>
            <MaterialCommunityIcons
              name="chevron-left-circle-outline"
              color={myColorsLight.lightGreyDark}
              size={40}
            />
          </Pressable>
        </View>

        <View>
          <View>
            <Text
              style={[
                styles.loginText,
                ,
                { fontSize: 15, textAlign: "center", fontWeight: "bold" },
              ]}
            >
              Personal Information
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          marginTop: 100,
          paddingHorizontal: 20,
          marginBottom: 150,
          paddingBottom: 90,
        }}
      >
        <ScrollView>
          <View style={{ alignItems: "center", marginBottom: 40 }}>
            <Text
              style={[
                styles.subHeader,
                { textAlign: "center", fontWeight: "bold" },
              ]}
            >
              Thanks {u?.attributes?.fname} {"\n"}
              please tell us your {"\n"}gender and date of birth? {"\n"}
            </Text>
          </View>
          {/* <View
            style={{ marginTop: 10, marginBottom: 30, alignItems: "center" }}
          >
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="information"
                color={myColorsLight.black}
                size={18}
              />
              <Text
                style={{
                  ...styles.subHeader,
                  fontSize: 16,
                  color: myColorsLight.lightGreyDim,
                  paddingLeft: 3,
                  textAlign: "center",
                }}
              >
                Why are we asking you this?
              </Text>
            </View>
          </View> */}
          <WhyAsk reasons="" />
          <View style={{ marginHorizontal: 20, marginBottom: 8 }}>
            <Text style={{ fontSize: 15 }}>Gender</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <View style={[styles.formGroup]}>
              <View style={(styles.centerView, { paddingVertical: 5 })}>
                {Platform.OS !== "web" && (
                  <ModalDropdown
                    defaultValue={gender || "select.."}
                    textStyle={{ fontSize: 15 }}
                    dropdownStyle={{ width: "100%" }}
                    dropdownTextStyle={{
                      fontSize: 16,
                      paddingLeft: 10,
                      fontWeight: "900",
                    }}
                    onSelect={(itemIndex, itemValue) => {
                      setGender(itemValue);
                      setGenderValidation(false);
                    }}
                    style={{
                      height: 40,
                      paddingTop: 10,
                      paddingHorizontal: 10,
                    }}
                    options={options}
                  />
                )}
                {Platform.OS === "web" && (
                  <Picker
                    selectedValue={gender || ""}
                    style={{
                      height: 40,
                      paddingHorizontal: 10,
                      border: "none",
                    }}
                    onValueChange={(itemValue, itemIndex) => {
                      setGender(itemValue);
                      setGenderValidation(false);
                    }}
                  >
                    {options.map((item, index) => (
                      <Picker.Item key={index} label={item} value={item} />
                    ))}
                  </Picker>
                )}

                {/* <Picker
                selectedValue={u.attributes.gender}
                onValueChange={(itemValue, itemIndex) => {
                  setGender(itemValue);
                  setGenderValidation(false);
                }}
                itemStyle={{ minHeight: 50, padding: 0 }}
                style={{ height: 50, padding: 0, margin: 0 }}
              >
                <Picker.Item label="Select gender" value="none" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Unknown" value="Unknown" />
              </Picker> */}
              </View>
            </View>
            {genderValidation && (
              <View style={styles.formGroupError}>
                <Text style={styles.inputError}>Please select a title</Text>
              </View>
            )}

            <View style={styles.formGroup}>
              <View
                style={[
                  styles.centerView,
                  { paddingVertical: 5, marginTop: 10 },
                ]}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={[styles.bdayText]}>{birthdayDisplay}</Text>
                  <JarvisButton
                    style={{ ...styles.loginButton, marginVertical: 10 }}
                    bgcolor="#ff6c00"
                    play={() => {
                      setShowDatePicker(true);
                    }}
                    btn="Select date"
                    w="50%"
                  />
                </View>
              </View>
              <View style={{ width: 300, marginLeft: 30 }}>
                {/* {  console.log(new Date(birthday))} */}

                {showDatePicker &&
                  Platform.OS !==
                    "web"(
                      <DateTimePicker
                        testID="birthdayDateTimePicker"
                        value={defaultDate()}
                        // minimum 18 yearsß

                        maximumDate={
                          new Date(new Date().getFullYear() - 18, 0, 1)
                        }
                        // minimumDate={new Date(new Date().getFullYear() - 18, 0, 1)}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onc
                        onChange={(e, d) => {
                          setShowDatePicker(false);
                          if (typeof d != "undefined") {
                            updateBirthday(d);
                          }
                        }}
                      />
                    )}
                {Platform.OS == "web" && showDatePicker && (
                  <Webdate.DatePickerModal
                    locale="en"
                    mode="single"
                    visible={showDatePicker}
                    onDismiss={onDismissSingle}
                    date={defaultDate()}
                    onConfirm={onConfirmSingle}
                    validRange={{
                      // startDate: new Date(new Date().getFullYear() - 18, 0, 1),  // optional
                      endDate: new Date(new Date().getFullYear() - 18, 0, 1), // optional
                      // disabledDates: [new Date()] // optional
                    }}
                    // onChange={} // same props as onConfirm but triggered without confirmed by user
                    // saveLabel="Save" // optional
                    // uppercase={false} // optional, default is true
                    // label="Select date" // optional
                    // animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
                  />
                )}
              </View>
            </View>

            {birthdayValidation && (
              <View style={styles.formGroupError}>
                <Text style={styles.inputError}>This field is required</Text>
              </View>
            )}
          </View>
        </ScrollView>

        {/* <View style={{ width: "100%", marginTop: 30 }}>
          <View style={[styles.centerView]}>
            <JarvisButton
              style={[styles.loginButton, { marginTop: 10 }]}
              bgcolor={myColorsLight.black}
              play={_next}
              w="50%"
              btn="Next"
            />
          </View>
          <View style={{ marginTop: 50, width: "50%", alignSelf: "center" }}>
            <ProgressBar
              progress={0.3}
              color={myColorsLight.lightGreyDark}
              style={{ height: 7 }}
            />
            <Text style={{ textAlign: "center", fontSize: 20 }}>2/5</Text>
          </View>
        </View> */}
      </View>

      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <JarvisButton
            bgcolor={myColorsLight.black}
            play={_next}
            btn="Continue"
            w={200}
          />
        </View>
        <View
          style={{
            marginTop: 40,
            width: "50%",
            alignSelf: "center",
            paddingBottom: 10,
          }}
        >
          <ProgressBar
            progress={0.4}
            color={myColorsLight.lightGreyDark}
            style={{ height: 7 }}
          />
          <Text style={{ textAlign: "center", fontSize: 20 }}>2/5</Text>
        </View>
      </View>
    </MyGradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: '#fff',
    // alignItems: 'center',
    // marginTop: 5,
    //justifyContent: 'center',
  },
  centerView: {
    flexDirection: "row",
    alignSelf: "center",
  },
  loginButton: {
    alignItems: "center",
    marginTop: 50,
    marginLeft: 20,
  },
  textWhite: {
    color: "#fff",
  },

  imageBackground: {
    flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
    //width: "100%",
    //height: "100%"
  },
  subHeader: {
    fontSize: 20,
    alignSelf: "center",
  },
  bdayText: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  formGroup: {
    width: "90%",
    textAlign: "center",
    marginTop: 5,
    borderColor: "#bbb",
    borderRadius: 5,
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 20,
  },

  formGroupError: {
    marginTop: 5,
  },
  formInput: {
    padding: 5,
  },

  inputError: {
    color: "red",
    fontWeight: "bold",
  },
});

export default KYCBirthdayScreen;
