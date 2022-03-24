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
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import JsRetireCard from "../../components/jsRetireCards";
import { myColorsLight } from "../../constant/colors";
import { MaterialIcons } from "@expo/vector-icons";
import FullScreenContext from "../../contexts/fullScreenContext";
import { LinearGradient } from "expo-linear-gradient";
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("screen");
const RetirementCards = ({ handleshowCards }) => {
  const { togglrFullScreen, isfullScreen } = useContext(FullScreenContext);
  const position = React.useRef(
    new Animated.ValueXY({ x: 0, y: deviceHeight / 2 - 130 })
  ).current;

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
      if (isfullScreen) {
        togglrFullScreen();
      }
    });
  };

  const handleToggleFullScreen = () => {
    // togglrFullScreen();
    Animated.timing(position, {
      toValue: { x: 0, y: 0 },
      duration: 500,
      delay: 300,
      useNativeDriver: true,
    }).start(() => togglrFullScreen());
  };
  const handleBackButton = () => {
    if (isfullScreen) {
      togglrFullScreen();
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
        height: isfullScreen ? deviceHeight - 20 : 400,
        ...styles.container,
        ...styles.card,
        transform: [{ translateY: position.y }],
        paddingTop: isfullScreen ? 40 : 20,
      }}
    >
      <LinearGradient
        // Background Linear Gradient
        colors={[myColorsLight.grey8, "transparent"]}
        style={styles.background}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity onPress={closeCard}>
          <Text style={styles.cardName}>Retirement Lifestyle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToggleFullScreen}>
          <MaterialIcons
            name="fullscreen"
            size={40}
            color={myColorsLight.black}
          />
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 30 }}>
        <Text
          style={[
            styles.loginText,
            ,
            { fontSize: 20, textAlign: "center", fontWeight: "bold" },
          ]}
        >
          Retirement Lifestyle
        </Text>
      </View>
      <View style={{ marginTop: 16, alignItems: "center", marginBottom: 15 }}>
        <Text style={{ textAlign: "center", color: myColorsLight.black }}>
          Click on the categories to your adjust your monthly budget
        </Text>
      </View>
      <ScrollView style={{ marginBottom: 10 }}>
        <View style={styles.cardsContainer}>
          <JsRetireCard title="House" amount="300" Icon="home">
            <AntDesign
              name="home"
              size={60}
              color={myColorsLight.lightGreyDim}
            />
          </JsRetireCard>
          <JsRetireCard title="Food & drink" Icon="home" amount="$403">
            <MaterialCommunityIcons
              name="food-fork-drink"
              size={60}
              color={myColorsLight.lightGreyDim}
            />
          </JsRetireCard>
          <JsRetireCard title="Transport" amount={`£${394}`}>
            <AntDesign
              name="car"
              size={60}
              color={myColorsLight.lightGreyDim}
            />
          </JsRetireCard>
          <JsRetireCard title="Holidays & Leisure" amount={`£${3423}`}>
            <Fontisto
              name="holiday-village"
              size={60}
              color={myColorsLight.lightGreyDim}
            />
          </JsRetireCard>
          <JsRetireCard title="Clothing & Personal" amount={`£${776}`}>
            <Ionicons
              name="md-shirt"
              size={40}
              color={myColorsLight.lightGreyDim}
            />
          </JsRetireCard>
          <JsRetireCard title="Helping Others" amount={`£${3345}`}>
            <FontAwesome5
              name="hands-helping"
              step
              size={48}
              color={myColorsLight.lightGreyDim}
            />
          </JsRetireCard>
        </View>
        <View style={{ marginBottom: 5, paddingHorizontal: 20 }}>
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
  card: {
    borderRadius: 10,
    // padding: 10,
    // paddingLeft: 20,
  },
  background: {
    height: 200,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    right: 0,
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
});
export default RetirementCards;
