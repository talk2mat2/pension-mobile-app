import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Pressable,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as helpers from "../Helpers";
import UserContext from "../contexts/UserContext";
import JarvisButton from "../components/JarvisButton";
import JarvisLoader from "../components/JarvisLoader";
import { RadioButton, ProgressBar } from "react-native-paper";
import MyGradientBackground from "../components/grdientBackGround";
import { myColorsLight } from "../constant/colors";

function KYCRetireLondonScreen({ navigation }) {
  const [buttonBackground, setButtonBackground] = useState("#77f");
  const [retireLondon, setRetireLondon] = useState("yes");
  const [isLoading, setIsLoading] = useState(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
  const ctx = useContext(UserContext);
  let u = ctx?.u;
  const _next = () => {
    if (retireLondon === "yes") {
      //Spouse details
      u.included[0].insideLondon = true;
    } else {
      u.included[0].insideLondon = false;
    }
    ctx.setU(u);
    helpers.save("pa_u", JSON.stringify(u));
    setIsLoading(true);
    setNextButtonDisabled(true);

    /*
            //Save data to backend
            let url3 = `${helpers.API2}/users/me`;
							 
							console.log(ctx.atk);

							 let userInfo = await axios({
								method: "patch",
								url: url3,
								headers: {
									Authorization: `Bearer ${ctx.atk}`,
								  },
                data: {
                  type: "user",
                  firstName: u.attributes.fname,
                  lastName: u.attributes.lname,
                  name: `${u.attributes.fname} ${u.attributes.lname}`,
                  title: u.attributes.title,
                  gender: u.attributes.gender
                }
							  });
                             
							
							 if(userInfo.status == "200"){
								 let uidt = userInfo.data;
								console.log("userInfo update: ",uidt);
               }
               */
    //Done, navigate to the next screen
    setTimeout(() => {
      setIsLoading(false);
      setNextButtonDisabled(false);
      navigation.navigate("KYCComplete");
    }, 300);
  };

  const _goBack = () => {
    navigation.goBack();
  };
  React.useEffect(() => {
    if (u?.included[0]?.insideLondon === true) {
      setRetireLondon("yes");
    } else if (u?.included[0]?.insideLondon === false) {
      setRetireLondon("no");
    }
  }, []);
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
              style={{
                ...styles.loginText,
                fontSize: 15,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Personal Information
            </Text>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 100, paddingHorizontal: 20 }}>
        <View style={{ alignItems: "center", marginBottom: 40 }}>
          <Text
            style={{
              ...styles.subHeader,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Do you plan to{"\n"}
            retire in London?
          </Text>
        </View>
        <View style={{ marginTop: 10, marginBottom: 30, alignItems: "center" }}>
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
        </View>

        <View style={styles.borderBox}>
          <View style={styles.centerView}>
            <Text style={styles.radioText}>Yes</Text>
            <RadioButton
              value="yes"
              status={retireLondon === "yes" ? "checked" : "unchecked"}
              onPress={() => setRetireLondon("yes")}
            />
            <Text style={styles.radioText}>No</Text>
            <RadioButton
              value="no"
              status={retireLondon === "no" ? "checked" : "unchecked"}
              onPress={() => setRetireLondon("no")}
            />
          </View>
        </View>

        {isLoading && (
          <JarvisLoader
            color={myColorsLight.lightGreyDark}
            text="Please wait"
          />
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
        <View style={{ marginTop: 60, alignItems: "center" }}>
          <JarvisButton
            style={{ ...styles.loginButton, marginTop: 10 }}
            bgcolor={myColorsLight.black}
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
            progress={1}
            color={myColorsLight.lightGreyDark}
            style={{ height: 7 }}
          />
          <Text style={{ textAlign: "center", fontSize: 20 }}>5/5</Text>
        </View>
      </View>
    </MyGradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  centerView: {
    flexDirection: "row",
    alignSelf: "center",
  },
  loginButton: {
    // alignItems: 'center',
    marginTop: 50,
    marginLeft: 20,
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
    marginTop: 20,
    width: "100%",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingVertical: 15,
    borderColor: myColorsLight.lightGreyDim,
  },
  imageBackground: {
    flex: 1,
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
    borderColor: "#fff",
    borderRadius: 5,
  },
  formInput: {
    padding: 5,
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
    marginTop: 10,
    marginRight: 5,
    alignSelf: "center",
  },
  inputError: {
    color: "red",
    fontWeight: "bold",
  },
  hrView: {
    borderBottomWidth: 1,
    paddingBottom: 15,
    width: "100%",
  },
});

export default KYCRetireLondonScreen;
