import React from "react";
import { View, Text, StyleSheet, ImageBackground ,TouchableOpacity} from "react-native";
import Swiper from "react-native-swiper/src";
import { myColorsLight } from "../constant/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const JarsummerySwipper = () => {
  return (
    <View style={{ height: 300 }}>
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
                  My{"\n"} State{"\n"} Pension
                </Text>

                <TouchableOpacity>
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
                <Text style={{ textAlign: "center", fontWeight: "600" }}>
                  My{"\n"} State{"\n"} Pension
                </Text>

                <TouchableOpacity>
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
      </Swiper>
    </View>
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
    width: 170,
    height: 170,
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

export default JarsummerySwipper;
