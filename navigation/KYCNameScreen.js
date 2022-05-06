import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  Pressable,
  Platform,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useFonts } from "expo-font";
let ModalDropdown;
if (Platform.OS !== "web") {
  ModalDropdown = require("react-native-modal-dropdown");
}
import CustomeInput from "../components/customeInput";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as helpers from "../Helpers";
import UserContext from "../contexts/UserContext";
import { HeaderFour, HeaderTwo, ParaOne } from "../constant/fonts";
import { Picker } from "@react-native-picker/picker";
import { ProgressBar } from "react-native-paper";
import MyGradientBackground from "../components/grdientBackGround";
import { myColorsLight, primary } from "../constant/colors";

import JarvisButton from "../components/JarvisButton";

function KYCNameScreen({ navigation }) {
  const lastNameRef = React.useRef();
  const firstNameRef = React.useRef();
  const ctx = useContext(UserContext);
  let navv = navigation;
  let u = ctx?.u;
  //console.log("u: ",u);
  let fullName = u?.attributes.name.split(" ");
  let fn = u?.attributes.fname,
    ln = u?.attributes.lname;
  let tt = u?.attributes.title,
    g = u?.attributes.gender;
  let ttt = "";

  if (!fn) {
    fn = fullName?.[0] ? fullName[0] : "";
  }
  if (!ln) {
    ln = fullName?.[1] ? fullName[1] : "";
  }

  if (!tt) {
    if (g) {
      if (g == "male") ttt = "mr";
      else if (g == "female") ttt = "mrs";
    } else {
      ttt = "mr";
    }
  }

  const [buttonBackground, setButtonBackground] = useState("#77f");
  const [title, setTitle] = useState(ttt || tt);
  const [fname, setFname] = useState(fn);
  const [lname, setLname] = useState(ln);
  const [fnameValidation, setFnameValidation] = useState(false);
  const [lnameValidation, setLnameValidation] = useState(false);
  const [titleValidation, setTitleValidation] = useState(false);

  //Set default values here

  const _updateUser = async (dt) => {
    //Update the frontend: context and async storage
    u.attributes.fname = dt.fname;
    u.attributes.lname = dt.lname;
    u.attributes.title = dt.title;
    let gg = null;

    if (dt.title == "mrs" || dt.title == "miss") {
      gg = "Female";
    } else {
      gg = "Male";
    }
    u.attributes.gender = gg;

    ctx.setU(u);
    helpers.save("pa_u", JSON.stringify(u));

    /*
        //Update the backend
        let url = `${API2}/users/me`;
		let userInfo = await axios({
			method: "get",
			url: url3,
			headers: {
						Authorization: `Bearer ${ctx.access_token}`,
			}
		});
        */
  };

  const _next = () => {
    // return navigation.navigate('KYCBirthday');
    if (title == "" || fname == "" || lname == "") {
      Alert.alert("All fields are required");
      if (title == "none") setTitleValidation(true);
      if (fname == "") setFnameValidation(true);
      if (lname == "") setLnameValidation(true);
    } else {
      _updateUser({
        fname: fname,
        lname: lname,
        title: title,
      });
      navigation.navigate("KYCBirthday");
    }
  };
  const _goBack = () => {
    navigation.goBack();
  };
  const options = ["none", "mrs", "miss", "mr"];
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
              style={{ fontSize: 15, textAlign: "center", fontWeight: "bold" }}
            >
              Personal Information
            </HeaderFour>
          </View>
        </View>
      </View>
      <View
        style={{
          marginTop: 50,
          backgroundColor: primary.subText,
          height: 1,
          width: "80%",
          alignSelf: "center",
        }}
      />
      <View
        style={{
          marginBottom: 90,
          paddingBottom: 80,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginTop: 40,
              paddingHorizontal: 20,
              marginBottom: 90,
            }}
          >
            <View style={{ alignItems: "center", marginBottom: 40 }}>
              <HeaderTwo style={{ textAlign: "center" }}>
                Let’s get to know you {"\n"}a little bit better,{"\n"} what's
                your name ?
              </HeaderTwo>
            </View>

            <View style={[styles.formGroup]}>
              {Platform.OS !== "web" && (
                <ModalDropdown
                  defaultValue={title || "Select"}
                  textStyle={{ fontSize: 18 }}
                  dropdownStyle={{ width: "70%" }}
                  dropdownTextStyle={{
                    fontSize: 16,
                    paddingLeft: 10,
                    color:primary.inputText,
                    fontFamily: "LabGrotesqueLight"
                  }}
                  onSelect={(itemIndex, itemValue) => {
                    setTitle(itemValue);

                    setTitleValidation(false);
                  }}
                  style={{
                    height: 45,
                    paddingTop: 10,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    backgroundColor: primary.subBase,
                  }}
                  defaultIndex={title ? options.indexOf(title) : 0}
                  options={options}
                />
              )}
              {Platform.OS === "web" && (
                <Picker
                  selectedValue={title || ""}
                  style={{ height: 40, paddingHorizontal: 10, border: "none" }}
                  onValueChange={(itemValue, itemIndex) => {
                    setTitle(itemValue);

                    setTitleValidation(false);
                  }}
                >
                  {options.map((item) => (
                    <Picker.Item label={item} value={item} />
                  ))}
                </Picker>
              )}

              {/* <Picker
            itemStyle={{ minHeight: 50, padding: 0 }}
            selectedValue={title}
            onValueChange={(itemValue, itemIndex) => {
              setTitle(itemValue);
              setTitleValidation(false);
            }}
            style={{ height: 50, padding: 0 ,margin:0}}
          >
            <Picker.Item  label="Select title" value="none" />
            <Picker.Item label="Mr" value="mr" />
              <Picker.Item label="Mrs" value="mrs" />
              <Picker.Item label="Miss" value="miss" />
              <Picker.Item label="Dr" value="dr" />
          </Picker> */}
            </View>
            {titleValidation && (
              <View style={styles.formGroupError}>
                <Text style={styles.inputError}>Please select a title</Text>
              </View>
            )}
            <View style={[styles.formGroup]}>
              <View style={{ paddingVertical: 5 }}>
                {/* <CustomeInput
                
                  value={fname}
                  onChangeText={(text) => {
                    setFname(text);
                    if (text.length > 1) setFnameValidation(false);
                  }}
                  style={{}}
                  label="First name"
                /> */}
                <CustomeInput
                  style={[styles.formInput]}
                  ref={firstNameRef}
                  onChangeText={(text) => {
                    setFname(text);
                    if (text.length > 1) setFnameValidation(false);
                  }}
                  placeholder="First name"
                  // label="First name"
                  value={fname}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    lastNameRef.current.focus();
                    //console.log(lastNameRef)
                  }}
                  blurOnSubmit={false}
                />
              </View>
            </View>
            {fnameValidation && (
              <View style={styles.formGroupError}>
                <Text style={styles.inputError}>
                  Please input your first name
                </Text>
              </View>
            )}
            <View style={[styles.formGroup]}>
              <View style={(styles.centerView, { paddingVertical: 5 })}>
                <CustomeInput
                  style={[styles.formInput]}
                  refs={lastNameRef}
                  onChangeText={(text) => {
                    setLname(text);
                    if (text.length > 1) setLnameValidation(false);
                  }}
                  // label="Last name"
                  placeholder="Last name"
                  value={lname}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    _next();
                  }}
                  blurOnSubmit={false}
                />
              </View>
            </View>
            {lnameValidation && (
              <View style={styles.formGroupError}>
                <Text style={styles.inputError}>
                  Please input your last name
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0,backgroundColor:primary.base }}>
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
            progress={0.2}
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
            1/5
          </Text>
        </View>
      </View>
    </MyGradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {},
  imageBackground: {
    flex: 1,
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
  subHeader: {
    fontSize: 20,
    alignContent: "center",
    fontWeight: "bold",
    letterSpacing: 0.8,
    lineHeight: 27,
  },
  formGroup: {
    width: "90%",
    alignSelf: "center",
    textAlign: "center",
    alignContent: "center",
    marginTop: 20,

    borderColor: "#bbb",
    borderRadius: 10,
  },
  formInput: {
    padding: 1,
    height: 38,
    paddingHorizontal: 8,
  },
  formGroupError: {
    marginTop: 5,
    paddingHorizontal: 20,
  },
  inputError: {
    color: "red",
    fontWeight: "bold",
  },
  textWhite: {
    color: "#fff",
  },
});

export default KYCNameScreen;
