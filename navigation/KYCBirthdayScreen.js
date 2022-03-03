import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ImageBackground,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as helpers from "../Helpers";
import UserContext from "../contexts/UserContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { ProgressBar } from "react-native-paper";
import MyGradientBackground from "../components/grdientBackGround";
import { myColorsLight } from "../constant/colors";

import JarvisButton from "../components/JarvisButton";

function KYCBirthdayScreen({ navigation }) {
  const ctx = useContext(UserContext);
  let u = ctx.u;
  console.log("u bday: ", u);
  let tempDate = new Date();
  tempDate.setFullYear(tempDate.getFullYear() - 40);

  if (!u.included[0]?.dateOfBirth) {
    tempDate = u.included[0].dateOfBirth;
  }

  const [buttonBackground, setButtonBackground] = useState("#77f");
  const [birthday, setBirthday] = useState(tempDate);
  const [birthdayObject, setBirthdayObject] = useState("{}");
  const [birthdayValidation, setBirthdayValidation] = useState(false);
  const [gender, setGender] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [genderValidation, setGenderValidation] = useState(false);
  const [birthdayDisplay, setBirthdayDisplay] = useState(
    tempDate.toDateString()
  );

  const updateBirthday = (d) => {
    let tempd = new Date(d);
    setBirthday(tempd);
    setBirthdayDisplay(tempd.toDateString());
    setBirthdayValidation(false);
    setBirthdayObject(JSON.stringify(tempd));
    setShowDatePicker(false);
  };

  const _updateUser = () => {
    //Update the frontend: context and async storage
    let tempd = birthday.toISOString().split("T");
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
                {
                  fontSize: 20,
                  textAlign: "center",
                  color: myColorsLight.lightGreyDark,
                },
              ]}
            >
              Step 3 of 5
            </Text>
          </View>
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
      <View style={{ marginTop: 100, paddingHorizontal: 20 }}>
        <View style={{ alignItems: "center", marginBottom: 40 }}>
          <Text style={[styles.subHeader, { textAlign: "center",fontWeight:'bold' }]}>
            Thanks {u.attributes.fname} {"\n"}
            please tell us your {"\n"}
            date of birth? {"\n"}
          </Text>
        </View>
        {/* <View
          style={[
            styles.centerView,
            {
              marginTop: 10,
              marginBottom: 30,
              padding: 10,
              borderRadius: 20,
              backgroundColor: "#555",
            },
          ]}
        >
          <MaterialCommunityIcons name="information" color="#fff" size={18} />
          <Text style={[styles.subHeader, { fontSize: 16, color: "#fff" }]}>
            Why are we asking you this?
          </Text>
        </View> */}

        <View style={{ alignItems: "center" }}>
          <View style={[{ alignSelf: "flex-start", marginLeft: 25 }]}>
            <Text>Gender</Text>
          </View>
          <View style={[styles.formGroup]}>
            <View style={(styles.centerView, { paddingVertical: 5 })}>
              <Picker
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
              </Picker>
            </View>
          </View>
          {genderValidation && (
            <View style={styles.formGroupError}>
              <Text style={styles.inputError}>Please select a title</Text>
            </View>
          )}

          <View style={styles.formGroup}>
            <View
              style={[styles.centerView, { paddingVertical: 5, marginTop: 10 }]}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.bdayText]}>{birthdayDisplay}</Text>
                <JarvisButton
                  style={[styles.loginButton, { marginVertical: 10 }]}
                  bgcolor="#ff6c00"
                  play={() => {
                    setShowDatePicker(true);
                  }}
                  btn="Select date"
                  w="50%"
                />
              </View>

              {showDatePicker && (
                <DateTimePicker
                  testID="birthdayDateTimePicker"
                  value={birthday}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={(e, d) => {
                    if (typeof d != "undefined") {
                      updateBirthday(d);
                    }
                  }}
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

        <View style={{ width: "100%", marginTop: 30 }}>
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
