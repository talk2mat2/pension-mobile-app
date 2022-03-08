import React from "react";
import Swiper from "react-native-swiper";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import OtherensionModal  from "./OthehrPensionModal";
import SpouseStatePensionModal from "./spouseStatePensionModal";
import { myColorsLight } from "../constant/colors";
import { MaterialIcons } from "@expo/vector-icons";

const OtherSwipper = () => {
  const [visible, setVisible] = React.useState(false);
  const [spouseVisible, setSpouseVisible] = React.useState(false);
  const [statePension, setStatePension] = React.useState("");
  const [spouseStatePension, setSpouseStatePension] = React.useState("");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const showSpouseModal = () => setSpouseVisible(true);
  const hideSpouseModal = () => setSpouseVisible(false);

  const changeStatePension = (newValue) => {
    setStatePension(newValue);
    hideModal();
  };
  const changeSpouseStatePension = (newValue) => {
    setSpouseStatePension(newValue);
    hideSpouseModal();
  };
  return (
    <>
      <OtherensionModal  {...{ visible, setVisible, changeStatePension }} />
      <OtherensionModal 
        {...{
          visible: spouseVisible,
          setVisible: setSpouseVisible,
          changeSpouseStatePension,
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
                  <Text style={{ textAlign: "center", fontWeight: "600" }}>
                    Other {"\n"}Retirement {"\n"}Savings
                  </Text>

                  {!statePension ? (
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
                      £{statePension}
                    </Text>
                  )}
                </View>
              </ImageBackground>
              {statePension.length > 0 && (
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={showModal}>
                    <View style={styles.edit}>
                      <AntDesign name="edit" size={20} color="black" />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setStatePension("")}>
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
                  <Text style={{ textAlign: "center", fontWeight: "800" }}>
                    My Spouse’s{"\n"}
                    State{"\n"}
                    Pension
                  </Text>
                  {!spouseStatePension ? (
                    <TouchableOpacity onPress={showSpouseModal}>
                      <AntDesign
                        style={{ textAlign: "center", fontWeight: "800" }}
                        name="pluscircle"
                        size={37}
                        color="black"
                      />
                    </TouchableOpacity>
                  ) : (
                    <Text style={{ textAlign: "center", fontWeight: "900" }}>
                      £{spouseStatePension}
                    </Text>
                  )}
                </View>
              </ImageBackground>
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
export default OtherSwipper;
