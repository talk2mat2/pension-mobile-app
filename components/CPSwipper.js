import React, { useContext, useRef } from "react";
import Swiper from "react-native-swiper/src";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import StatePensionModal from "./statePensionModal";
import SpouseStatePensionModal from "./spouseStatePensionModal";
import { myColorsLight } from "../constant/colors";
import { MaterialIcons } from "@expo/vector-icons";
import StatePenContext from "../contexts/satePenContext";
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("screen");
const CPSwipper = () => {
  const [visible, setVisible] = React.useState(false);
  const [activeItem, setActiveitem] = React.useState(0);
  const [spouseVisible, setSpouseVisible] = React.useState(false);
  const scrollRef = useRef();
  //const [statePension, setStatePension] = React.useState("");
  let animVal;
  // const [spouseStatePension, setSpouseStatePension] = React.useState("");
  const {
    statePension,
    retireProfile,
    setStatePension,
    spouseStatePension,
    setSpouseStatePension,
    spouseGender,
    setSpouseGender,
    setGender,
    startScroll,
    setStartScroll,
  } = useContext(StatePenContext);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const showSpouseModal = () => setSpouseVisible(true);
  const hideSpouseModal = () => setSpouseVisible(false);

  const ScrolltoSpouse = () => {
    scrollRef.current?.scrollTo({
      x: Platform.OS === "web" ? deviceWidth / 5 : deviceWidth / 2,
      animated: true,
    });
  };
  const ScrolltoUser = () => {
    scrollRef.current?.scrollTo({
      x: 0,
      animated: true,
    });
  };
  React.useEffect(() => {
    if (startScroll) {
      ScrolltoSpouse();
      setStartScroll(false);
    }
  }, [startScroll]);

  const changeStatePension = (newValue, gender) => {
    setStatePension(newValue);
    hideModal();
    setGender(gender);
    ScrolltoSpouse();
  };
  const changeSpouseStatePension = (newValue, gender) => {
    setSpouseStatePension(newValue);
    hideSpouseModal();
    setSpouseGender(gender);
    ScrolltoUser();
  };

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     Scrollto();
  //   }, 2000);
  // }, []);
  return (
    <>
      <StatePensionModal {...{ visible, setVisible, changeStatePension }} />
      <SpouseStatePensionModal
        {...{
          visible: spouseVisible,
          setVisible: setSpouseVisible,
          changeSpouseStatePension,
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
          <View style={styles.slide1}>
            <View style={styles.jarContainer}>
              <ImageBackground
                source={require("../assets/jarIcon.png")}
                resizeMode="contain"
                style={styles.Jaricon}
              >
                <View style={{ marginTop: "auto", marginBottom: 20 }}>
                  <Text style={{ textAlign: "center", fontWeight: "600" }}>
                    My{"\n"} State{"\n"} Pension
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
          {retireProfile?.attributes?.spouseName && (
            <View style={styles.slide1}>
              <View style={styles.jarContainer}>
                <ImageBackground
                  source={require("../assets/jarIcon.png")}
                  resizeMode="contain"
                  style={styles.Jaricon}
                >
                  <View style={{ marginTop: "auto", marginBottom: 20 }}>
                    <Text style={{ textAlign: "center", fontWeight: "800" }}>
                      {retireProfile?.attributes?.spouseName}'s{"\n"}
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
                {spouseStatePension.length > 0 && (
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={showSpouseModal}>
                      <View style={styles.edit}>
                        <AntDesign name="edit" size={20} color="black" />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSpouseStatePension("")}>
                      <View style={styles.edit}>
                        <MaterialIcons name="cancel" size={20} color="black" />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          )}
          {/* {!retireProfile?.attributes?.spouseName && (
            <View style={styles.slide1}>
              <View style={styles.jarContainer}>
                <ImageBackground
                  source={require("../assets/jarIcon.png")}
                  resizeMode="contain"
                  style={styles.Jaricon}
                >
                  <View style={{ marginTop: "auto", marginBottom: 20 }}>
                    <Text style={{ textAlign: "center", fontWeight: "800" }}>
                      My Spouse{"\n"}
                      state{"\n"}
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
                {spouseStatePension.length > 0 && (
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={showSpouseModal}>
                      <View style={styles.edit}>
                        <AntDesign name="edit" size={20} color="black" />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSpouseStatePension("")}>
                      <View style={styles.edit}>
                        <MaterialIcons name="cancel" size={20} color="black" />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          )} */}
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
    marginHorizontal: 10,
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
export default CPSwipper;
