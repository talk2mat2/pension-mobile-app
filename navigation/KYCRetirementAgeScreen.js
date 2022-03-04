import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as helpers from "../Helpers";
import { Modal, Portal, Button, Provider, Title } from "react-native-paper";
const axios = require("axios");
import { AntDesign } from "@expo/vector-icons";
import UserContext from "../contexts/UserContext";
import JarvisButton from "../components/JarvisButton";
import JarvisLoading from "../components/JarvisLoading";
import ModalDropdown from "react-native-modal-dropdown";
import { Picker } from "@react-native-picker/picker";
import { ProgressBar, Chip } from "react-native-paper";
import MyGradientBackground from "../components/grdientBackGround";
import { myColorsLight } from "../constant/colors";

function KYCRetirementAgeScreen({ navigation }) {
  const ctx = useContext(UserContext);
  let u = ctx.u;

  const [buttonBackground, setButtonBackground] = useState("#77f");
  const [retirementAge, setRetirementAge] = useState("65");
  const [retirementAgeValidation, setRetirementAgeValidation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
  const [showWhy, setShowWhy] = useState(false);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  let navv = navigation;

  let ages = [];
  for (let i = 18; i <= 100; i++) ages.push(i);

  const _updateUser = () => {
    //Set the retirement date based on the retirement age and birthday
    u.included[0].retirementAge = retirementAge;
    let retirementDay = new Date(),
      retirementDayArray = u.included[0].dateOfBirth.split("-");
    retirementDay.setFullYear(
      parseInt(retirementDayArray[0]) + parseInt(retirementAge)
    );
    retirementDay.setMonth(parseInt(retirementDayArray[1]) - 1);
    retirementDay.setDate(retirementDayArray[2]);
    let tempd = retirementDay.toISOString().split("T");
    u.included[0].retirementDate = tempd[0];
    ctx.setU(u);
    helpers.save("pa_u", JSON.stringify(u));
  };

  const _next = async () => {
    if (retirementAge == "none" || parseInt(retirementAge) < 1) {
      setRetirementAgeValidation(true);
    } else {
      _updateUser();

      setIsLoading(true);
      setNextButtonDisabled(true);

      //Save data to backend

      //First save personal information
      let url3 = `${helpers.API2}/users/me`;
      let saveData = {
        type: "user",
        attributes: {
          firstName: u.attributes.fname,
          lastName: u.attributes.lname,
          name: u.attributes.fname + " " + u.attributes.lname,
          title: u.attributes.title,
          gender: u.attributes.gender,
        },
      };

      /*
							 let userInfo = await axios({
								method: "patch",
								url: url3,
								headers: {
									Authorization: `Bearer ${ctx.atk}`,
								  },
                data: saveData
							  });
                             
                if(userInfo.status == "200"){
								 let uidt = userInfo.data;
								
                 //Done, navigate to the next screen
                 setIsLoading(false);
                 setNextButtonDisabled(false);
                 navigation.navigate('KYCRetireWithSpouse');
               }
               */
      setTimeout(() => {
        setIsLoading(false);
        setNextButtonDisabled(false);
        navigation.navigate("KYCRetireWithSpouse");
      }, 1000);
    }
  };

  const _goBack = () => {
    navigation.goBack();
  };

  const _showWhyPopup = () => {
    console.log("Showing you why in a bit..");
    setShowWhy(true);
    setTimeout(() => {
      setShowWhy(false);
    }, 5000);
  };
  const options = [...Array(100).keys()].slice(18).map((xx) => String(xx));
  return (
    <MyGradientBackground>
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
            <View style={{width:'100%',alignItems:'flex-end'}}>
              <View style={styles.close}>
                <TouchableOpacity onPress={hideModal}>
                  <MaterialIcons
                    name="cancel"
                    size={24}
                    color={myColorsLight.black}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <ScrollView>
            <View
              style={[
                styles.centerView,
                {
                  marginTop: 2,

                  backgroundColor: "#bebebe",
                  padding: 2,
                  paddingBottom:20
                },
              ]}
            >
              <Text style={{}}>
                This information will enable us to plan your retirement planning
                and goals more accurately.
              </Text>
            </View>
          </ScrollView>
        </Modal>
      </Portal>
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
          <Text
            style={[
              styles.subHeader,
              { textAlign: "center", fontWeight: "bold" },
            ]}
          >
            At what age would{"\n"}
            you like to retire?
          </Text>
        </View>
        {/* {showWhy && (
          <View
            style={[
              styles.centerView,
              {
                marginTop: 20,
                marginBottom: 30,
                backgroundColor: "#bebebe",
                padding: 20,
              },
            ]}
          >
            <Text style={{}}>
              This information will enable us to plan your retirement planning
              and goals more accurately.
            </Text>
          </View>
        )} */}
        <View style={[styles.centerView, { marginTop: 10, marginBottom: 30 }]}>
          <Chip icon="information" onPress={showModal}>
            Why are we asking you this?
          </Chip>
        </View>

        <View style={{ alignItems: "center" }}>
          <View style={styles.formGroup}>
            <View style={(styles.centerView, { paddingVertical: 2 })}>
              <ModalDropdown
                defaultValue={retirementAge.toString() || "select."}
                textStyle={{ fontSize: 15 }}
                dropdownStyle={{ width: "100%" }}
                dropdownTextStyle={{
                  fontSize: 16,
                  paddingLeft: 10,
                  fontWeight: "900",
                }}
                onSelect={(itemIndex, itemValue) => {
                  setRetirementAge(itemIndex, itemValue);
                  console.log(itemValue);
                  if (parseInt(itemValue) > 1)
                    setRetirementAgeValidation(false);
                }}
                style={{ height: 40, paddingTop: 10, paddingHorizontal: 10 }}
                options={options}
              />
            </View>
          </View>
        </View>
        {retirementAgeValidation && (
          <View style={styles.formGroupError}>
            <Text style={styles.inputError}>
              Please input your desired retirement age
            </Text>
          </View>
        )}

        {/* <View style={{ width: "100%", marginTop: 80 }}>
     
          <View style={[styles.centerView, { marginTop: 60 }]}>
            <JarvisButton
              style={[styles.loginButton, { marginTop: 10 }]}
              bgcolor={myColorsLight.black}
              play={_next}
              btn="Next"
              w="50%"
              disabled={nextButtonDisabled}
            />
          </View>
          <View style={{ marginTop: 50, width: "50%", alignSelf: "center" }}>
            <ProgressBar
              progress={0.5}
              color={myColorsLight.lightGreyDark}
              style={{ height: 7 }}
            />
            <Text style={{ textAlign: "center", fontSize: 20 }}>3/5</Text>
          </View>
          {isLoading && <JarvisLoading color="#fff" text="Please wait" />}
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
        <View
          style={{
            marginTop: 40,
            width: "50%",
            alignSelf: "center",
            paddingBottom: 20,
          }}
        >
          <ProgressBar
            progress={0.6}
            color={myColorsLight.lightGreyDark}
            style={{ height: 7 }}
          />
          <Text style={{ textAlign: "center", fontSize: 20 }}>3/5</Text>
        </View>
      </View>
    </MyGradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //backgroundColor: '#fff',
    alignItems: "center",
    // marginTop: 30,
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
  imageBackground: {
    flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
    //width: "100%"
  },
  subHeader: {
    fontSize: 20,
    alignSelf: "center",
  },
  textWhite: {
    color: "#fff",
  },
  formGroup: {
    width: "90%",
    textAlign: "center",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
  },

  formGroupError: {
    marginTop: 5,
  },
  formInput: {
    padding: 5,
  },
  close: {
  
    
    zIndex: 9,
    elevation: 3,
  },
  containerStyle: {
    backgroundColor: "#bebebe",
    padding: 2,
    marginHorizontal: 20,
  },
  inputError: {
    color: "red",
    fontWeight: "bold",
  },
});

export default KYCRetirementAgeScreen;
