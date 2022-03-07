import React from "react";
import Swiper from "react-native-swiper";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import StatePensionModal from "./statePensionModal";
import SpouseStatePensionModal from "./spouseStatePensionModal";
import PersoanalStatePensionModal from "./PersonalPensionModal";
import { myColorsLight } from "../constant/colors";
import { MaterialIcons } from "@expo/vector-icons";

const CPPersonSwipper = () => {
  const [visible, setVisible] = React.useState(false);
  const [person2Visible, setPerson2Visible] = React.useState(false);
  const [personPension1, setPersonPension1] = React.useState("");
  const [personPension2, setPersonPension2] = React.useState("");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const showPerson2Modal = () => setPerson2Visible(true);
  const hidePerson2Modal = () => setPerson2Visible(false);

  const changePerson1Pension = (newValue) => {
    setPersonPension1(newValue);
    hideModal();
  };
  const hangePerson2Pension = (newValue) => {
    setPersonPension2(newValue);
    hidePerson2Modal();
  };
  return (
    <>
      <PersoanalStatePensionModal
        {...{ visible, setVisible, changePerson1Pension }}
      />
      <PersoanalStatePensionModal
        {...{
          visible: person2Visible,
          setVisible: setPerson2Visible,
          changePerson1Pension: changePerson1Pension,
        }}
      />
  
      <View style={{ height: 200 }}>
        <Swiper
          paginationStyle={{
            bottom: 0,
          }}
          activeDot={
            <View
              style={{
                backgroundColor: myColorsLight.black,
                width: 13,
                height: 13,
                borderRadius: 7,
                marginLeft: 7,
                marginRight: 7,
              }}
            />
          }
          style={styles.wrapper}
          showsButtons={false}
        >
          <View style={styles.slide1}>
            <View style={styles.jarContainer}>
              <ImageBackground
                source={require("../assets/jarIcon.png")}
                resizeMode="contain"
                style={styles.Jaricon}
              >
                <View style={{ marginTop: "auto", marginBottom: 20 }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "600",
                      paddingBottom: 10,
                    }}
                  >
                    My name
                  </Text>

                  {!personPension1 ? (
                    <TouchableOpacity onPress={showModal}>
                      <AntDesign
                        style={{ textAlign: "center", fontWeight: "600" }}
                        name="pluscircle"
                        size={37}
                        color={myColorsLight.lightGreyDim}
                      />
                    </TouchableOpacity>
                  ) : (
                    <Text style={{ textAlign: "center", fontWeight: "900" }}>
                      £{personPension1}
                    </Text>
                  )}
                </View>
              </ImageBackground>
              {personPension1.length > 0 && (
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={showModal}>
                    <View style={styles.edit}>
                      <AntDesign name="edit" size={20} color="black" />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setPersonPension1("")}>
                    <View style={styles.edit}>
                      <MaterialIcons name="cancel" size={20} color="black" />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          <View style={styles.slide1}>
            <View style={styles.jarContainer}>
              <ImageBackground
                source={require("../assets/jarIcon.png")}
                resizeMode="contain"
                style={styles.Jaricon}
              >
                <View style={{ marginTop: "auto", marginBottom: 20 }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "600",
                      paddingBottom: 10,
                    }}
                  >
                    My name
                  </Text>

                  {!personPension2.length ? (
                    <TouchableOpacity onPress={showModal}>
                      <AntDesign
                        style={{ textAlign: "center", fontWeight: "600" }}
                        name="pluscircle"
                        size={37}
                        color={myColorsLight.lightGreyDim}
                      />
                    </TouchableOpacity>
                  ) : (
                    <Text style={{ textAlign: "center", fontWeight: "900" }}>
                      £{personPension2}
                    </Text>
                  )}
                </View>
              </ImageBackground>
              {personPension1.length > 0 && (
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={showModal}>
                    <View style={styles.edit}>
                      <AntDesign name="edit" size={20} color="black" />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setPersonPension2("")}>
                    <View style={styles.edit}>
                      <MaterialIcons name="cancel" size={20} color="black" />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        
        </Swiper>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Jaricon: {
    width: 140,
    height: 140,
    backgroundColor: "#fff",
  },
  jarContainer: {
    padding: 10,
    margin: 4,
    borderColor: "#a9a9a9",
    borderWidth: 3,
    borderRadius: 20,
  },
  edit: {
    width: 70,
    alignItems: "center",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
});
export default CPPersonSwipper;
