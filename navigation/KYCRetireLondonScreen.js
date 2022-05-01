import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Pressable,
} from "react-native";
import { HeaderFour, HeaderTwo, ParaOne } from "../constant/fonts";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as helpers from "../Helpers";
import UserContext from "../contexts/UserContext";
import JarvisButton from "../components/JarvisButton";
import WhyAsk from "../components/whyask";
import JarvisLoader from "../components/JarvisLoader";
import { RadioButton, ProgressBar } from "react-native-paper";
import MyGradientBackground from "../components/grdientBackGround";
import { myColorsLight, primary } from "../constant/colors";

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
    } else if (
      u?.included[0]?.insideLondon === false ||
      u?.included[0]?.insideLondon === null
    ) {
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
              size={40}
              color={primary.subText}
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
      <View style={{ marginTop: 100, paddingHorizontal: 20 }}>
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <HeaderTwo style={{ textAlign: "center" }}>
            Do you plan to{"\n"}
            retire in London?
          </HeaderTwo>
        </View>
        <View style={{ marginTop: 10, marginBottom: 30, alignItems: "center" }}>
          <WhyAsk />
        </View>

        <View style={styles.borderBox}>
          <View style={styles.centerView}>
            <ParaOne style={styles.radioText}>Yes</ParaOne>
            <RadioButton
              value="yes"
              status={retireLondon === "yes" ? "checked" : "unchecked"}
              onPress={() => setRetireLondon("yes")}
            />
            <ParaOne style={styles.radioText}>No</ParaOne>
            <RadioButton
              value="no"
              status={retireLondon === "no" ? "checked" : "unchecked"}
              onPress={() => setRetireLondon("no")}
            />
          </View>
        </View>

        {isLoading && (
          <JarvisLoader
            color={primary.subText}
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
            progress={1}
            color={primary.subText}
            style={{ height: 7 }}
          />
          <Text
            style={{ textAlign: "center", fontSize: 20, color: primary.subText }}
          >
            5/5
          </Text>
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
    alignItems:"center"
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
    marginTop: 6,
    width: "100%",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingVertical: 15,
    borderTopColor: primary.subBase,
    borderBottomColor: primary.subBase,
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
