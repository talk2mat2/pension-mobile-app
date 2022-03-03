import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  Pressable,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as helpers from "../Helpers";
import UserContext from "../contexts/UserContext";
import { Picker } from "@react-native-picker/picker";
import { ProgressBar } from "react-native-paper";
import MyGradientBackground from "../components/grdientBackGround";
import { myColorsLight } from "../constant/colors";

import JarvisButton from "../components/JarvisButton";

function KYCNameScreen({ navigation }) {
  const ctx = useContext(UserContext);
  let navv = navigation;
  let u = ctx.u;
  //console.log("u: ",u);
  let fullName = u?.attributes.name.split(" ");
  let fn = u.attributes.fname,
    ln = u.attributes.lname;
  let tt = u.attributes.title,
    g = u.attributes.gender;
  let ttt = "";

  if (!fn) {
    fn = fullName[0] ? fullName[0] : "";
  }
  if (!ln) {
    ln = fullName[1] ? fullName[1] : "";
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
  const [title, setTitle] = useState(ttt);
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
              Step 1 of 5
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
      <View style={{ marginTop: 100, paddingHorizontal: 20,marginbottom:80 }}>
        <View style={{ alignItems: "center", marginBottom: 40 }}>
          <Text style={[styles.subHeader, { textAlign: "center" }]}>
            Let’s get to know you {"\n"}a little bit better,{"\n"} what's your
            name ?
          </Text>
        </View>

        <View style={[styles.formGroup]}>
          <Picker
            itemStyle={{ minHeight: 50, padding: 0 }}
            selectedValue={title}
            onValueChange={(itemValue, itemIndex) => {
              setTitle(itemValue);
              setTitleValidation(false);
            }}
            style={{ height: 50, padding: 0, margin: 0 }}
          >
            <Picker.Item label="Select title" value="none" />
            <Picker.Item label="Mr" value="mr" />
            <Picker.Item label="Mrs" value="mrs" />
            <Picker.Item label="Miss" value="miss" />
            <Picker.Item label="Dr" value="dr" />
          </Picker>
        </View>
        {titleValidation && (
          <View style={styles.formGroupError}>
            <Text style={styles.inputError}>Please select a title</Text>
          </View>
        )}
        <View style={[styles.formGroup]}>
          <View style={{ paddingVertical: 5 }}>
            <TextInput
              style={[styles.formInput]}
              onChangeText={(text) => {
                setFname(text);
                if (text.length > 1) setFnameValidation(false);
              }}
              placeholder="First name"
              value={fname}
            />
          </View>
        </View>
        {fnameValidation && (
          <View style={styles.formGroupError}>
            <Text style={styles.inputError}>Please input your first name</Text>
          </View>
        )}
        <View style={[styles.formGroup]}>
          <View style={(styles.centerView, { paddingVertical: 5 })}>
            <TextInput
              style={[styles.formInput]}
              onChangeText={(text) => {
                setLname(text);
                if (text.length > 1) setLnameValidation(false);
              }}
              placeholder="Last name"
              value={lname}
            />
          </View>
        </View>
        {lnameValidation && (
          <View style={styles.formGroupError}>
            <Text style={styles.inputError}>Please input your last name</Text>
          </View>
        )}
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
      >
        <View style={[{ marginTop: 60, alignItems: "center" }]}>
          <JarvisButton
            style={[styles.loginButton, { marginTop: 10 }]}
            bgcolor={myColorsLight.black}
            play={_next}
            w="50%"
            btn="Next"
          />
        </View>
        <View style={{ marginTop: 40, width: "50%", alignSelf: "center" ,paddingBottom:20}}>
          <ProgressBar
            progress={0.2}
            color={myColorsLight.lightGreyDark}
            style={{ height: 7 }}
          />
          <Text style={{ textAlign: "center", fontSize: 20 }}>1/5</Text>
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
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 15,
  },
  formInput: {
    padding: 1,
    height: 38,
    paddingHorizontal: 8,
  },
  formGroupError: {
    marginTop: 5,
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
