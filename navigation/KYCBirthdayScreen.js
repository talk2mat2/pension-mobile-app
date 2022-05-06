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
import { useFonts } from "expo-font";
import { HeaderFour, HeaderTwo, ParaOne } from "../constant/fonts";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as helpers from "../Helpers";
import UserContext from "../contexts/UserContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { ProgressBar } from "react-native-paper";
// import ModalDropdown from "react-native-modal-dropdown";
import MyGradientBackground from "../components/grdientBackGround";
import WhyAsk from "../components/whyask";
import { myColorsLight, primary } from "../constant/colors";

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
      // setBirthday(new Date(newDate));
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
    // console.log(birthday);
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
  const [loaded] = useFonts({
    LabGrotesqueLight: require("../assets/fonts/LabGrotesque-Light.ttf"),
  });

  if (!loaded) {
    return null;
  }
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
              color={primary.subText}
              size={40}
            />
          </Pressable>
        </View>

        <View>
          <View>
            <HeaderFour
              style={
                (styles.loginText,
                { fontSize: 15, textAlign: "center", fontWeight: "bold" })
              }
            >
              Personal Information
            </HeaderFour>
          </View>
        </View>
      </View>
      <View
        style={{
          marginTop: 70,
          paddingHorizontal: 20,
          marginBottom: 90,
          paddingBottom: 80,
        }}
      >
        <ScrollView>
          <View style={{ alignItems: "center", marginBottom: 2 }}>
            <HeaderTwo
              style={
                // styles.subHeader,
                { textAlign: "center" }
              }
            >
              Thanks {u?.attributes?.fname} {"\n"}
              please tell us your {"\n"}gender and date of {"\n"}birth?
            </HeaderTwo>
          </View>

          <WhyAsk reasons="" />
          <View style={{ marginHorizontal: 20, marginBottom: 4 }}>
            <ParaOne style={{ fontWeight: "bold" }}>Gender</ParaOne>
          </View>
          <View style={{ alignItems: "center", paddingBottom: 10 }}>
            <View style={[styles.formGroup]}>
              <View style={(styles.centerView, { paddingVertical: 5 })}>
                {Platform.OS !== "web" && (
                  <ModalDropdown
                    defaultValue={gender || "select.."}
                    textStyle={{ fontSize: 17, color: primary.inputText }}
                    dropdownStyle={{ width: "70%", height: 90 }}
                    dropdownTextStyle={{
                      fontSize: 18,
                      paddingLeft: 10,
                      color: primary.baseText,
                      fontFamily: "LabGrotesqueLight",
                    }}
                    onSelect={(itemIndex, itemValue) => {
                      setGender(itemValue);
                      setGenderValidation(false);
                    }}
                    style={{
                      height: 45,
                      justifyContent: "center",
                      // paddingTop: 10,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      backgroundColor: primary.subBase,
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
              </View>
            </View>
            {genderValidation && (
              <View style={styles.formGroupError}>
                <Text style={styles.inputError}>Please select a title</Text>
              </View>
            )}

            <View style={styles.formGroup}>
              <View style={{ marginHorizontal: 5, marginBottom: 4 }}>
                <ParaOne style={{ fontWeight: "bold" }}>Date Of Birth</ParaOne>
              </View>
              <View style={{ paddingVertical: 2, marginTop: 2 }}>
                <View style={{}}>
                  <ParaOne style={{ ...styles.bdayText, textAlign: "left" }}>
                    {birthdayDisplay}
                  </ParaOne>
                  <View style={{ alignItems: "center" }}>
                    <JarvisButton
                      btnStyle={{ fontSize: 15, alignSelf: "center" }}
                      style={{ ...styles.loginButton, marginVertical: 4 }}
                      bgcolor="#ff6c00"
                      play={() => {
                        setShowDatePicker(true);
                      }}
                      btn="Select date"
                      w={100}
                    />
                  </View>
                </View>
              </View>
              <View style={{ width: 300, marginLeft: 30 }}>
                {/* {  console.log(new Date(birthday))} */}

                {showDatePicker && Platform.OS !== "web" && (
                  <DateTimePicker
                    testID="birthdayDateTimePicker"
                    value={defaultDate()}
                    // minimum 18 yearsß

                    maximumDate={new Date(new Date().getFullYear() - 18, 0, 1)}
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
                <Text style={styles.inputError}>Date field is required</Text>
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
            bgcolor={primary.btn}
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
            color={primary.subText}
            style={{ height: 7 }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: primary.subText,
            }}
          >
            2/5
          </Text>
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
    marginTop: 10,
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
  },
  formGroup: {
    width: "90%",
    textAlign: "center",
    marginTop: 2,
    borderColor: "#bbb",
    borderRadius: 5,
    // borderWidth: 1,
    borderRadius: 15,
    marginBottom: 20,
  },

  formGroupError: {
    marginTop: 1,
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
