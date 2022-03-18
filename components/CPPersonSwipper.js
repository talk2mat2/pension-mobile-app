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
import { myColorsLight } from "../constant/colors";
import { MaterialIcons } from "@expo/vector-icons";
import PersonalPenContext from "../contexts/personalContext";
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("screen");

const CPPersonSwipper = () => {
  const [visible, setVisible] = React.useState(false);
  const [person2Visible, setPerson2Visible] = React.useState(false);
  const [personPension1, setPersonPension1] = React.useState("");
  const [personPension2, setPersonPension2] = React.useState("");
  const scrollRef = React.useRef();
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const showPerson2Modal = () => setPerson2Visible(true);
  const hidePerson2Modal = () => setPerson2Visible(false);
  const { person1, setPerson1, person2, setPerson2, AddJars, providerJars } =
    useContext(PersonalPenContext);
  const changePerson1Pension = (newValue) => {
    setPersonPension1(newValue);
    hideModal();
  };
  const changePerson2Pension = (newValue) => {
    setPersonPension2(newValue);
    hidePerson2Modal();
  };
  return (
    <>
      <PersoanalStatePensionModal
        {...{
          visible,
          setVisible,
          changePerson1Pension,
          personData: person1,
          setPersoData: setPerson1,
        }}
      />
      <PersoanalStatePensionModal
        {...{
          personData: person2,
          setPersoData: setPerson2,
          visible: person2Visible,
          setVisible: setPerson2Visible,
          changePerson1Pension: changePerson2Pension,
        }}
      />

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
          {providerJars?.map((item) => (
            <View ley={item.id} style={styles.slide1}>
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
                      Provider 2
                    </Text>

                    {!person1?.currentValue ? (
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
                        £{person1?.currentValue}
                      </Text>
                    )}
                  </View>
                </ImageBackground>
                {person1?.currentValue?.length > 0 && (
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={showModal}>
                      <View style={styles.edit}>
                        <AntDesign name="edit" size={20} color="black" />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        setPerson1({ ...person1, currentValue: "" })
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
          ))}
          <TouchableOpacity onPress={()=>AddJars()}>
            <AntDesign
              style={{ margin:40, textAlign: "center", fontWeight: "600" }}
              name="pluscircle"
              size={37}
              color={myColorsLight.lightGrey}
            />
          </TouchableOpacity>
        </ScrollView>
        {/* <Swiper
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
                    Provider 2
                  </Text>

                  {!person1?.currentValue ? (
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
                      £{person1?.currentValue}
                    </Text>
                  )}
                </View>
              </ImageBackground>
              {person1?.currentValue?.length > 0 && (
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={showModal}>
                    <View style={styles.edit}>
                      <AntDesign name="edit" size={20} color="black" />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setPerson1({ ...person1, currentValue: "" })}
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
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "600",
                      paddingBottom: 10,
                    }}
                  >
                    Provider
                  </Text>

                  {!person2?.currentValue?.length ? (
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
                      £{person2?.currentValue}
                    </Text>
                  )}
                </View>
              </ImageBackground>
              {person2?.currentValue?.length > 0 && (
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={showModal}>
                    <View style={styles.edit}>
                      <AntDesign name="edit" size={20} color="black" />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setPerson2({ ...person2, currentValue: "" })}
                  >
                    <View style={styles.edit}>
                      <MaterialIcons name="cancel" size={20} color="black" />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </Swiper> */}
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
export default CPPersonSwipper;
