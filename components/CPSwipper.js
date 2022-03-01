import React from "react";
import Swiper from "react-native-swiper";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import StatePensionModal from "./statePensionModal";
import { myColorsLight } from "../constant/colors";
const CPSwipper = () => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  return (
    <>
      <StatePensionModal {...{ visible, setVisible }} />
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
                  <TouchableOpacity>
                    <Text style={{ textAlign: "center", fontWeight: "600" }}>
                      My{"\n"} State{"\n"} Pension
                    </Text>
                    <AntDesign
                      style={{ textAlign: "center", fontWeight: "600" }}
                      name="pluscircle"
                      size={37}
                      color={myColorsLight.lightGreyDim}
                    />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
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
                  <TouchableOpacity onPress={showModal}>
                    <Text style={{ textAlign: "center", fontWeight: "800" }}>
                      My Spouse’s{"\n"}
                      State{"\n"}
                      Pension
                    </Text>
                    <AntDesign
                      style={{ textAlign: "center", fontWeight: "800" }}
                      name="pluscircle"
                      size={37}
                      color="black"
                    />
                  </TouchableOpacity>
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
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
});
export default CPSwipper;
