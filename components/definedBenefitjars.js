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
import DefinedPenContext from "../contexts/definedPenContext";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import StatePensionModal from "./statePensionModal";
import DefinedBenefitModal from "./definedPensionModal";
import SpouseStatePensionModal from "./spouseStatePensionModal";
import PersoanalStatePensionModal from "./PersonalPensionModal";
import { myColorsLight, primary } from "../constant/colors";
import { MaterialIcons } from "@expo/vector-icons";
import PersonalPenContext from "../contexts/personalContext";
import { ParaOne } from "../constant/fonts";
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("screen");

const BenefitJars = ({ item, index, AddJar }) => {
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
    benefitJars,
    setBenefitJars,
    updateJars,
    cleanJars,
  } = useContext(DefinedPenContext);
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
      <DefinedBenefitModal
        {...{
          visible,
          setVisible,
          changeStatePension: changePerson1Pension,
          personData: item,
          setPersonData: handleJarUpdate,
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

                  lineHeight: 20,
                  letterSpacing: 0.1,
                  paddingBottom: 10,
                }}
              >
                Pension name{"\n"}
                {item?.pensionName &&
                  item?.pensionName?.substring(0, 10) + ".."}
              </ParaOne>

              {!item?.annualIncome ? (
                <TouchableOpacity onPress={showModal}>
                  <AntDesign
                    style={{ textAlign: "center", fontWeight: "600" }}
                    name="pluscircle"
                    size={37}
                    color={primary.subText}
                  />
                </TouchableOpacity>
              ) : (
                <ParaOne
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  £{item?.annualIncome}
                </ParaOne>
              )}
            </View>
          </ImageBackground>
          {item?.annualIncome.length > 0 && (
            <View style={{ flexDirection: "row", marginTop: 20 }}>
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
export default BenefitJars;
