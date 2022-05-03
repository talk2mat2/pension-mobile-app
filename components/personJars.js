import React, { useContext } from "react";
import Swiper from "react-native-swiper/src";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import StatePensionModal from "./statePensionModal";

import SpouseStatePensionModal from "./spouseStatePensionModal";
import PersoanalStatePensionModal from "./PersonalPensionModal";
import { myColorsLight, primary } from "../constant/colors";
import { MaterialIcons } from "@expo/vector-icons";
import PersonalPenContext from "../contexts/personalContext";
import { ParaOne } from "../constant/fonts";
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("screen");

const PersonJars = ({ item, index, AddJar }) => {
  const [visible, setVisible] = React.useState(false);
  const [person2Visible, setPerson2Visible] = React.useState(false);

  const [personPension2, setPersonPension2] = React.useState("");
  const scrollRef = React.useRef();
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const showPerson2Modal = () => setPerson2Visible(true);
  const hidePerson2Modal = () => setPerson2Visible(false);
  const {
    person1,
    setPerson1,
    person2,
    setPerson2,

    providerJars,
    updateJars,
    cleanJars,
  } = useContext(PersonalPenContext);
  const changePerson1Pension = (newValue) => {
    // setPersonPension1(newValue);
    hideModal();
  };
  const changePerson2Pension = (newValue) => {
    setPersonPension2(newValue);
    hidePerson2Modal();
  };
  const handleJarUpdate = (newJarData) => {
    updateJars(index, newJarData);
  };
  return (
    <>
      <PersoanalStatePensionModal
        {...{
          visible,
          setVisible,
          changeStatePension: changePerson1Pension,
          personData: item,
          setPersoData: handleJarUpdate,
          AddJar,
        }}
      />
      <View key={item.id} style={styles.slide1}>
        <View style={styles.jarContainer}>
          <ImageBackground
            source={require("../assets/jar.png")}
            resizeMode="contain"
            style={styles.Jaricon}
          >
            <View style={{ marginTop: "auto", marginBottom: 20 }}>
              <ParaOne
                style={{
                  textAlign: "center",
                  fontWeight: "600",
                  paddingBottom: 10,
               
                }}
              >
                Provider{"\n"}
                {item?.provider && item?.provider?.substring(0, 10) + ".."}
              </ParaOne>

              {!item?.currentValue ? (
                <TouchableOpacity onPress={showModal}>
                  <AntDesign
                    style={{ textAlign: "center", fontWeight: "600" }}
                    name="pluscircle"
                    size={37}
                    color={primary.subText1}
                  />
                </TouchableOpacity>
              ) : (
                <ParaOne
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                   
                  }}
                >
                  £{item?.currentValue}
                </ParaOne>
              )}
            </View>
          </ImageBackground>
          {item?.currentValue?.length > 0 && (
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <TouchableOpacity onPress={showModal}>
                <View style={styles.edit}>
                  <AntDesign name="edit" size={20} color={primary.text} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => cleanJars(index)}>
                <View style={styles.edit}>
                  <MaterialIcons name="cancel" size={20} color={primary.text} />
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
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
    width: 130,
    height: 130,
    // backgroundColor: "#fff",
    borderRadius: 15,
  },

  jarContainer: {
    padding: 6,
    height: 180,
    width: 180,
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
    borderColor: primary.subText1,
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
  scrollViewContainerStyle: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "30%",
    justifyContent: "center",
    paddingRight: deviceWidth * 0.5,
  },
});
export default PersonJars;
