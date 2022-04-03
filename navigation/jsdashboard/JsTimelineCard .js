import React, { useContext } from "react";
import {
  View,
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import { myColorsLight } from "../../constant/colors";
import { MaterialIcons } from "@expo/vector-icons";
import FullScreenContext from "../../contexts/fullScreenContext";
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("screen");
const JsTimelineCard = ({ handleshowCards }) => {
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={closeCard}>
          <Text style={styles.cardName}>Timeline</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToggleFullScreen}>
          <MaterialIcons
            name="fullscreen"
            size={40}
            color={myColorsLight.black}
          />
        </TouchableOpacity>
      </View>
      <Text>  hey</Text>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: myColorsLight.grey6,
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
    padding: 10,
    paddingLeft: 20,
  },
});
export default JsTimelineCard;
