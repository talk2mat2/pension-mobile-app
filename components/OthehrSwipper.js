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
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("screen");
import { TouchableOpacity } from "react-native-gesture-handler";
import OtherensionModalSaving from "./OtherPensionModalSaving";
import OtherensionModal from "./OthehrPensionModal";
import SpouseStatePensionModal from "./spouseStatePensionModal";
import { myColorsLight } from "../constant/colors";
import { MaterialIcons } from "@expo/vector-icons";
import OtherPenContext from "../contexts/otherPenContext";

const OtherSwipper = () => {
  const [visible, setVisible] = React.useState(false);
  const [spouseVisible, setSpouseVisible] = React.useState(false);
  const [statePension, setStatePension] = React.useState("");
  const [spouseStatePension, setSpouseStatePension] = React.useState("");
  const scrollRef = React.useRef();
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const showSpouseModal = () => setSpouseVisible(true);
  const hideSpouseModal = () => setSpouseVisible(false);
  const { person1, setPerson1, setPerson2, person2 } =
    useContext(OtherPenContext);

  const ScrolltoIncome = () => {
    scrollRef.current?.scrollTo({
      x: deviceWidth / 2,
      animated: true,
    });
  };
  const Scrolltosavings = () => {
    scrollRef.current?.scrollTo({
      x: 0,
      animated: true,
    });
  };
  const changeStatePension = () => {
    // setStatePension(newValue);
    ScrolltoIncome();
    hideModal();
  };
  const changeSpouseStatePension = () => {
    // setSpouseStatePension(newValue);
    hideSpouseModal();
    Scrolltosavings()
  };

  return (
    <>
      <View style={{ height: 200 }}>
        <ScrollView
          ref={scrollRef}
          horizontal
          snapToAlignment={"center"}
          showsHorizontalScrollIndicator={false}
          // pagingEnabled
          // onScroll={(xx)=>console.log(xx)}
          // scrollto
          contentContainerStyle={styles.scrollViewContainerStyle}
          // paginationStyle={{
          //   bottom: 0,
          // }}
          // activeDot={
          //   <View
          //     style={{
          //       backgroundColor: myColorsLight.black,
          //       width: 13,
          //       height: 13,
          //       borderRadius: 7,
          //       marginLeft: 7,
          //       marginRight: 7,
          //     }}
          //   />
          // }
          style={styles.wrapper}
          // showsButtons={false}
        >
          <OtherensionModalSaving
            {...{
              personData: person1,
              setPersonData: setPerson1,
              visible,
              setVisible,
              changeStatePension,
            }}
          />
          <OtherensionModal
            {...{
              visible: spouseVisible,
              setVisible: setSpouseVisible,
              changeStatePension: changeSpouseStatePension,
              personData: person2,
              setPersonData: setPerson2,
            }}
          />
          {/* <OtherensionModal
        {...{
          personData: person1,
          setPersonData: setPerson1,
          visible,
          setVisible,
          changeStatePension,
        }}
      />
      <OtherensionModal
        {...{
          visible: spouseVisible,
          setVisible: setSpouseVisible,
          changeStatePension: changeSpouseStatePension,
          personData: person2,
          setPersonData: setPerson2,
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
        > */}
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

                  {!person1.expectedAnualIncome ? (
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
                      £{person1.expectedAnualIncome}
                    </Text>
                  )}
                </View>
              </ImageBackground>
              {person1?.expectedAnualIncome?.length > 0 && (
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={showModal}>
                    <View style={styles.edit}>
                      <AntDesign name="edit" size={20} color="black" />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      setPerson1({
                        ...person1,
                        expectedAnualIncome: "",
                        currentValue: "",
                      })
                    }
                  >
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
                    Other {"\n"}Retirement {"\n"}Income
                  </Text>
                  {!person2?.expectedAnualIncome ? (
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
                      £{person2?.expectedAnualIncome}
                    </Text>
                  )}
                </View>
              </ImageBackground>
              {person2?.expectedAnualIncome?.length > 0 && (
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={showSpouseModal}>
                    <View style={styles.edit}>
                      <AntDesign name="edit" size={20} color="black" />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      setPerson2({
                        ...person2,
                        expectedAnualIncome: "",
                        currentValue: "",
                      })
                    }
                  >
                    <View style={styles.edit}>
                      <MaterialIcons name="cancel" size={20} color="black" />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          {/* </Swiper> */}
        </ScrollView>
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
  scrollViewContainerStyle: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "30%",
    justifyContent: "center",
    paddingRight: deviceWidth * 0.5,
  },
});
export default OtherSwipper;
