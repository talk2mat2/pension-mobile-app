import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ImageBackground,
  ScrollView,
  Platform,
  Picker,
  Alert,
} from "react-native";
import WhyAsk from "../components/whyask";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as helpers from "../Helpers";
import { HeaderFour, HeaderTwo, ParaOne } from "../constant/fonts";
let ModalDropdown;
let Webdate;
if (Platform.OS == "web") {
  Webdate = require("react-native-paper-dates");
}
if (Platform.OS !== "web") {
  ModalDropdown = require("react-native-modal-dropdown");
}
import UserContext from "../contexts/UserContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import JarvisButton from "../components/JarvisButton";
import { RadioButton, ProgressBar, Chip } from "react-native-paper";
import MyGradientBackground from "../components/grdientBackGround";
import { myColorsLight, primary } from "../constant/colors";

function KYCRetireWithSpouseScreen({ navigation }) {
  const ctx = useContext(UserContext);
  let u = ctx?.u;
  // let tempDate=new Date()
  // if (!u.included[0]?.dateOfBirth) {
  //   tempDate = u.included[0].dateOfBirth;
  // }
  const [buttonBackground, setButtonBackground] = useState("#77f");
  const [retireWithSpouse, setRetireWithSpouse] = useState("yes");
  const [spouseRetirementAgeValidation, setSpouseRetirementAgeValidation] =
    useState(false);
  const [spouseGenderValidation, setSpouseGenderValidation] = useState(false);
  const [spouseName, setSpouseName] = useState("");
  const [spouseRetirementAge, setSpouseRetirementAge] = useState("");
  const [spouseGender, setSpouseGender] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [birthdayDisplay, setBirthdayDisplay] = useState(
    new Date().toDateString()
  );
  const [spouseNameValidation, setSpouseNameValidation] = useState(false);
  const [showSpouseNameField, setShowSpouseNameField] = useState(false);
  const [showOtherSpouseFields, setShowOtherSpouseFields] = useState(false);
  const [screenTitle, setScreenTitle] = useState(
    "Do you plan retiring with your spouse?"
  );
  const [showExtra, setShowExtra] = useState(true);
  const [showWhy, setShowWhy] = useState(false);
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
    setShowDatePicker(false);
  }, [setOpen]);

  const updateBirthday = (d) => {
    let tempd = new Date(d);
    // console.log(tempd);
    setBirthday(tempd);
    setBirthdayDisplay(tempd.toDateString());
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
  const _updateUser = async () => {
    if (retireWithSpouse == "yes") {
      //Spouse details
      u.included[0].isSingle = false;
      u.included[0].maritalStatus = "married";
      u.included[0].spouseName = spouseName;
      let bd = birthday.toISOString().split("T");
      u.included[0].spouseGender = spouseGender;
      u.included[0].spouseDateOfBirth = bd[0];
      u.included[0].retireWithSpouse = true;
      // u.included[0].spouseGender =
      //  u.attributes.gender == "Male" ? "Female" : "Male";
      // u.included[0].spouseRetirementAge = spouseRetirementAge;
      // let retirementDay = new Date(),
      //   retirementDayArray = u.included[0].spouseDateOfBirth.split("-");
      // retirementDay.setFullYear(
      //   parseInt(retirementDayArray[0]) + parseInt(spouseRetirementAge)
      // );
      // retirementDay.setMonth(parseInt(retirementDayArray[1]) - 1);
      // retirementDay.setDate(retirementDayArray[2]);
      // let tempd = retirementDay.toISOString().split("T");
      // u.included[0].spouseRetirementDate = tempd[0];
    } else {
      u.included[0].retireWithSpouse = false;
      u.included[0].maritalStatus = "single";
      u.included[0].isSingle = true;
    }
    ctx.setU(u);
    helpers.save("pa_u", JSON.stringify(u));
    // console.log(u);
  };
  React.useEffect(() => {
    setBirthday(new Date("2004-01-12T23:00:00.000Z"));
    const date = new Date(u?.included[0]?.dateOfBirth);

    if (u?.included[0]?.dateOfBirth) {
      setBirthday(new Date(u?.included[0]?.dateOfBirth));
      setBirthdayDisplay(
        new Date(
          `${new Date(u?.included[0]?.dateOfBirth).getFullYear()}-01-01`
        ).toDateString()
      );
    }
  }, []);
  const _next = () => {
    let go = false;

    if (retireWithSpouse == "yes") {
      if (!showSpouseNameField && !showOtherSpouseFields) {
        setShowSpouseNameField(true);
        setScreenTitle("Spouse Name");
        //setScreenTitle(``);
      } else {
        if (
          !showOtherSpouseFields &&
          showSpouseNameField &&
          spouseName.length > 0
        ) {
          //SpouseName has been set, show other fields
          let spouseNameArr = spouseName.split(" "),
            spouseNameDisplay = spouseNameArr[0];
          setShowSpouseNameField(false);
          setScreenTitle(`Tell us about ${spouseNameDisplay}`);
          setShowOtherSpouseFields(true);
        } else {
          if (
            spouseName == ""
            // ||
            // spouseRetirementAge.length < 1 ||
            // parseInt(spouseRetirementAge) < 1
          ) {
            if (spouseName == "") {
              setSpouseNameValidation(true);
            }

            // if (
            //   spouseGender.length < 1
            //   // ||
            //   // parseInt(spouseRetirementAge) < 1
            // ) {
            //   setSpouseGenderValidation(true);
            // }
          }
          if (
            spouseGender.length < 1
            // ||
            // parseInt(spouseRetirementAge) < 1
          ) {
            setSpouseGenderValidation(true);
          } else {
            go = true;
          }
        }
      }
    } else if (retireWithSpouse == "no") {
      go = true;
    }
    if (go) {
      _updateUser();
      navigation.navigate("KYCRetireLondon");
    }
  };

  const _goBack = () => {
    navigation.goBack();
  };
  const defaultDate = () => {
    if (u?.included[0]?.dateOfBirth) {
      const tempDate = u.included[0].dateOfBirth;
      return new Date(
        `${new Date(u?.included[0]?.dateOfBirth).getFullYear()}-01-01`
      );
      // return new Date(tempDate);

      //tempDate?.toTimeString() && setBirthdayDisplay(tempDate?.toTimeString());
    } else {
      let tempDates = new Date();
      const newDate = tempDates.setFullYear(tempDates.getFullYear() - 40);
      return new Date(newDate);
      //setBirthdayDisplay(new Date(newDate).getFullYear.toTimeString());
    }
  };
  const _showWhyPopup = () => {
    // console.log("Showing you why in a bit..");
    setShowWhy(true);
    setTimeout(() => {
      setShowWhy(false);
    }, 5000);
  };

  return (
    <MyGradientBackground>
      <ScrollView>
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
                style={{
                  fontSize: 15,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Personal Information
              </HeaderFour>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          {/* <HeaderTwo style={{ textAlign: "center", }}>
        <Text style={[styles.subHeader]}>{screenTitle}</Text>
        </HeaderTwo> */}
          <View style={[styles.centerView, { marginTop: 100 }]}>
            <HeaderTwo>{screenTitle}</HeaderTwo>
          </View>
          <View style={{ marginTop: 30 }}>
            <WhyAsk />
          </View>
          {showExtra && (
            <>
              {/* {showWhy && (
                <View
                  style={[
                    styles.centerView,
                    {
                      marginTop: 20,
                      marginBottom: 30,
                      backgroundColor: "#bebebe",
                      padding: 20,
                      borderRadius: 50,
                    },
                  ]}
                >
                  <Text style={{}}>
                    This information will enable us to plan your retirement
                    planning and goals more accurately.
                  </Text>
                </View>
              )} */}

              {!showSpouseNameField && !showOtherSpouseFields && (
                <View style={styles.borderBox}>
                  <View style={styles.centerView}>
                    <ParaOne style={{ ...styles.radioText }}>Yes</ParaOne>
                    {Platform.OS === "ios" ? (
                      <RadioButton.IOS
                        value="yes"
                        status={
                          retireWithSpouse === "yes" ? "checked" : "unchecked"
                        }
                        onPress={() => setRetireWithSpouse("yes")}
                      />
                    ) : (
                      <RadioButton
                        value="yes"
                        status={
                          retireWithSpouse === "yes" ? "checked" : "unchecked"
                        }
                        onPress={() => setRetireWithSpouse("yes")}
                      />
                    )}
                    <ParaOne style={{ ...styles.radioText, marginLeft: 20 }}>
                      No
                    </ParaOne>
                    {Platform.OS === "ios" ? (
                      <RadioButton.IOS
                        value="no"
                        status={
                          retireWithSpouse === "no" ? "checked" : "unchecked"
                        }
                        onPress={() => {
                          setRetireWithSpouse("no");
                          setScreenTitle(
                            "Do you plan retiring with your spouse?"
                          );
                          setShowSpouseNameField(false);
                          setShowOtherSpouseFields(false);
                          setSpouseNameValidation(false);
                        }}
                      />
                    ) : (
                      <RadioButton
                        value="no"
                        status={
                          retireWithSpouse === "no" ? "checked" : "unchecked"
                        }
                        onPress={() => {
                          setRetireWithSpouse("no");
                          setScreenTitle(
                            "Do you plan retiring with your spouse?"
                          );
                          setShowSpouseNameField(false);
                          setShowOtherSpouseFields(false);
                          setSpouseNameValidation(false);
                        }}
                      />
                    )}
                  </View>
                </View>
              )}
            </>
          )}

          {showSpouseNameField && (
            <View style={[styles.inlineForm, styles.hrView]}>
              <Text
                style={[
                  styles.inlineFormText,
                  { marginLeft: 5, color: primary.text, marginRight: 30 },
                ]}
              >
                Enter spouse's name
              </Text>
              <View style={styles.inlineFormGroup}>
                <View style={{ paddingVertical: 2 }}>
                  <TextInput
                    style={{
                      ...styles.formInput,
                      textAlign: "center",
                      backgroundColor: primary.subBase,
                      color: primary.inputText,
                    }}
                    onChangeText={(text) => {
                      setSpouseName(text);
                      setSpouseNameValidation(false);
                    }}
                    placeholder="Spouse's name"
                    placeholderTextColor="#fff"
                    value={spouseName}
                  />
                </View>
              </View>
            </View>
          )}
          {spouseNameValidation && (
            <View style={styles.formGroupError}>
              <Text style={styles.inputError}>
                Please input your spouse's name
              </Text>
            </View>
          )}

          {showOtherSpouseFields && (
            <>
              <View style={{ ...styles.hrView, alignContent: "space-between" }}>
                <View
                  style={[styles.inlineForm, styles.hrView, { marginLeft: 5 }]}
                >
                  <ParaOne style={styles.inlineFormText}>Spouse gender</ParaOne>
                  <View style={styles.inlineFormGroup}>
                    <View style={(styles.centerView, { paddingVertical: 1 })}>
                      {/* <TextInput
                      keyboardType="number-pad"
                      style={[styles.formInput, { textAlign: "center" }]}
                      onChangeText={(text) => {
                        setSpouseRetirementAge(text);
                        if (parseInt(text) > 1)
                          setSpouseRetirementAgeValidation(false);
                      }}
                      placeholder="Enter retirement age"
                      placeholderTextColor="#fff"
                      value={spouseRetirementAge}
                    /> */}
                      {Platform.OS !== "web" && (
                        <ModalDropdown
                          defaultValue={"select.."}
                          textStyle={{ fontSize: 15 }}
                          dropdownStyle={{ width: "40%", paddingLeft: 6 }}
                          dropdownTextStyle={{
                            fontSize: 16,
                            paddingLeft: 10,
                            fontWeight: "900",
                          }}
                          onSelect={(itemIndex, itemValue) => {
                            setSpouseGender(itemValue);
                            setSpouseGenderValidation(false);
                          }}
                          style={{
                            ...styles.formInput,
                            textAlign: "center",
                            paddingHorizontal: 10,
                            backgroundColor: primary.subBase,
                          }}
                          options={["Male", "Female"]}
                        />
                      )}
                      {Platform.OS === "web" && (
                        <Picker
                          selectedValue={"Select.."}
                          style={{
                            height: 40,
                            paddingHorizontal: 10,
                            border: "none",
                          }}
                          onValueChange={(itemValue, itemIndex) => {
                            setSpouseGender(itemValue);
                            setSpouseGenderValidation(false);
                          }}
                        >
                          {["Male", "Female"].map((item) => (
                            <Picker.Item label={item} value={item} />
                          ))}
                        </Picker>
                      )}
                    </View>
                  </View>
                </View>
                {spouseGenderValidation && (
                  <View style={styles.formGroupError}>
                    <Text style={{ ...styles.inputError, marginTop: 4 }}>
                      Please select your spouse's gender
                    </Text>
                  </View>
                )}

                <ParaOne
                  style={{
                    ...styles.formText,
                    marginLeft: 5,
                    color: primary.subText,
                  }}
                >
                  Enter spouse's date of birth
                </ParaOne>
                <View style={{ ...styles.formGroup, marginLeft: 5 }}>
                  <View style={{ flexDirection: "row", paddingVertical: 5 }}>
                    <ParaOne style={styles.formText}>{birthdayDisplay}</ParaOne>
                    <JarvisButton
                      style={styles.loginButton}
                      bgcolor={myColorsLight.black}
                      play={() => {
                        setShowDatePicker(true);
                      }}
                      btn="Select date"
                      w="40%"
                    />
                  </View>
                </View>

                {showDatePicker && (
                  <DateTimePicker
                    testID="birthdayDateTimePicker"
                    maximumDate={new Date(new Date().getFullYear() - 18, 0, 1)}
                    value={defaultDate()}
                    mode="date"
                    is24Hour={true}
                    display="default"
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
            </>
          )}
        </View>
      </ScrollView>
      <View style={{ width: "100%", marginTop: "auto", marginBottom: 20 }}>
        {/* <View style={[styles.centerView]}>
          <JarvisButton
            style={[styles.loginButton, { marginTop: 5 }]}
            bgcolor={myColorsLight.black}
            play={_next}
            w="50%"
            btn="Next"
          />
        </View> */}
        {/* <View style={{ marginTop: 50, width: "50%", alignSelf: "center" }}>
          <ProgressBar
            progress={0.8}
            color={myColorsLight.lightGreyDark}
            style={{ height: 7 }}
          />
          <Text style={{ textAlign: "center", fontSize: 20 }}>4/5</Text>
        </View> */}
      </View>
      <View
        style={{
          width: "100%",
          marginTop: 10,
          position: "absolute",
          left: 0,
          riht: 0,
          bottom: 0,
        }}
      ></View>
      <View
        style={{
          width: "100%",
          marginTop: 10,
          position: "absolute",
          left: 0,
          riht: 0,
          bottom: 0,
        }}
      >
        <View style={{ marginTop: 60, alignItems: "center" }}>
          <JarvisButton
            // style={{ ...styles.loginButton, marginTop: 10 }}
            bgcolor={primary.btn}
            play={_next}
            w={150}
            btn="Next"
          />
        </View>
        <View
          style={{
            marginTop: 40,
            width: "50%",
            alignSelf: "center",
            paddingBottom: 20,
          }}
        >
          <ProgressBar
            progress={0.8}
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
            4/5
          </Text>
        </View>
      </View>
    </MyGradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 30,
  },
  centerView: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
  },
  loginButton: {
    // alignItems: 'center',
    marginTop: 50,
    marginLeft: 20,
  },
  imageBackground: {
    flex: 1,
  },
  subHeader: {
    fontSize: 20,
    alignSelf: "center",
  },
  radioText: {
    paddingVertical: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
  borderBox: {
    marginTop: 30,
    width: "100%",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingVertical: 5,
    borderTopColor: primary.subBase,
    borderBottomColor: primary.subBase,
  },
  formGroup: {
    width: "90%",
    textAlign: "center",
    marginTop: 20,
    borderRadius: 5,
  },
  inlineFormGroup: {
    width: "50%",
    textAlign: "center",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
  },
  formInput: {
    padding: 2,
  },
  formText: {
    marginTop: 10,
    marginRight: 5,
  },
  textWhite: {
    color: "#fff",
  },
  inlineForm: {
    flexDirection: "row",
  },
  inlineFormText: {
    marginTop: 20,
    marginRight: 5,
    alignSelf: "center",
  },
  inputError: {
    color: "red",
    fontWeight: "bold",
  },
  hrView: {
    borderBottomWidth: 1,
    borderBottomWidth: 1,
    paddingBottom: 15,
    width: "100%",
    borderColor: primary.subText1,
  },
});

export default KYCRetireWithSpouseScreen;
