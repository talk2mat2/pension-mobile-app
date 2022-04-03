import React, { useContext } from "react";
import {
  View,
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  ScrollView,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import JarvisButton from "../../../components/JarvisButton";
import { AntDesign } from "@expo/vector-icons";
import RtBenefitPensionUsers from "./rtBenefitPensionsUsers";
import { Modal, Portal, Button, Provider, Title } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { myColorsLight } from "../../../constant/colors";
import { MaterialIcons } from "@expo/vector-icons";
import FullScreenContext from "../../../contexts/fullScreenContext";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("screen");
const RtBenefitPensionCard = ({ handleshowCards }) => {
  const { rtisfullScreen, togglrRtFullScreen } = useContext(FullScreenContext);
  const position = React.useRef(
    new Animated.ValueXY({ x: 0, y: deviceHeight / 2 - 130 })
  ).current;
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    Animated.timing(position, {
      toValue: { x: 0, y: 0 },
      duration: 500,
      delay: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const closeCard = () => {
    Animated.timing(position, {
      toValue: { x: 0, y: deviceHeight / 2 - 120 },
      duration: 500,
      delay: 300,
      useNativeDriver: true,
    }).start(() => {
      handleshowCards();
      if (rtisfullScreen) {
        togglrRtFullScreen();
      }
    });
  };
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const handleToggleFullScreen = () => {
    // togglrRtFullScreen();
    Animated.timing(position, {
      toValue: { x: 0, y: 0 },
      duration: 500,
      delay: 300,
      useNativeDriver: true,
    }).start(() => togglrRtFullScreen());
  };
  const handleBackButton = () => {
    if (rtisfullScreen) {
      togglrRtFullScreen();
    } else {
      closeCard();
    }
  };
  React.useEffect(() => {
    const banckhandle = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButton
    );
    return () => {
      banckhandle.remove();
    };
  }, []);
  return (
    <Animated.View
      style={{
        height: rtisfullScreen ? deviceHeight - 20 : 400,
        ...styles.container,
        ...styles.card,
        transform: [{ translateY: position.y }],
      }}
    >
      <View
        // Background Linear Gradient
        // colors={[myColorsLight.grey8, "transparent"]}
        style={{ ...styles.background, paddingTop: rtisfullScreen ? 40 : 20 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity onPress={closeCard}>
          </TouchableOpacity>
          {!rtisfullScreen ? (
            <TouchableOpacity onPress={handleToggleFullScreen}>
              <MaterialIcons
                name="fullscreen"
                size={40}
                color={myColorsLight.black}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleToggleFullScreen}>
              <AntDesign
                name="closecircle"
                size={24}
                color={myColorsLight.grey4}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ marginTop: 30 }}>
          <Text
            style={[
              styles.loginText,
              ,
              { fontSize: 23, textAlign: "center", fontWeight: "bold" },
            ]}
          >
           Defined Benefit Pensions
          </Text>
        </View>
        <View style={{ marginTop: 40, alignItems: "center" }}>
          <Text style={{ textAlign: "center", color: myColorsLight.grey3 }}>
            Total Defined Benefit Pensions
          </Text>
        </View>
        <View style={{ marginTop: 9, alignItems: "center", marginBottom: 15 }}>
          <Text
            style={{
              textAlign: "center",
              color: myColorsLight.black,
              fontSize: 55,
            }}
          >
            £8,300
          </Text>
        </View>
        <View style={{ marginTop: "auto" }}>
          <RtBenefitPensionUsers
            name="Micheal Spender"
            budget="£17,345"
          />
          <RtBenefitPensionUsers name="Sarah Spender" budget="£25,300 " />
        </View>
      </View>
      <View style={{ alignItems: "center", marginTop: 90 }}>
              <JarvisButton
                bgcolor={myColorsLight.black}
                play={() => {}}
                btn="Add Pension"
                w={200}
                disabled={false}
              />
            </View>

      <ScrollView style={{ marginBottom: 10 }}>
        {/* <View style={{ marginBottom: 5, paddingHorizontal: 20 }}>
          <View
            style={{
              ...styles.hrView,
              width: "90%",
              alignSelf: "center",
              marginTop: 30,
            }}
          />
          <View style={styles.sum}>
            <Text style={{ fontSize: 18, fontWeight: "900" }}>Total</Text>
            <Text style={{ fontSize: 18, fontWeight: "900" }}>{`£${44}`}</Text>
          </View>

          <View
            style={{
              ...styles.hrView,
              width: "90%",
              alignSelf: "center",
              marginTop: 10,
            }}
          />
          <View style={styles.sum}>
            <Text style={{ fontSize: 15 }}>Apply Budget to all</Text>
            <Text style={{ fontSize: 15 }}>lorem</Text>
          </View>
        </View>
       */}
      </ScrollView>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: myColorsLight.white,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  cardName: {
    fontSize: 18,
  },
  cardUsers: {
    backgroundColor: myColorsLight.white,
    height: 90,
    flexDirection: "row",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  background: {
    height: deviceHeight / 1.8,
    // position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    right: 0,
    backgroundColor: myColorsLight.grey6,
  },
  cardsContainer: {
    marginTop: 17,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  sum: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginTop: 10,
    paddingHorizontal: 30,
  },
  hrView: {
    width: "100%",
    // marginTop: 10,
    // paddingBottom: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#bbb",
    height: 2,
    backgroundColor: "#bbb",
  },
  cardConteent: {
    flexDirection: "row",
    minWidth: 90,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default RtBenefitPensionCard;
