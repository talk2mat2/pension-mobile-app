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
import { myColorsLight } from "../../../constant/colors";
import { MaterialIcons } from "@expo/vector-icons";
import FullScreenContext from "../../../contexts/fullScreenContext";
import { PanGestureHandler } from "react-native-gesture-handler";
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("screen");
const RtJarvisPension = ({ handleshowCards }) => {
 
   const { rtisfullScreen, togglrRtFullScreen } = useContext(FullScreenContext);
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
      if (rtisfullScreen) {
        togglrRtFullScreen();
      }
    });
  };

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
  const handleGesture = (evt) => {
    const { nativeEvent } = evt;

    if (nativeEvent.velocityY > 0) {
      //on swipe down
      closeCard();
    } else {
      //on swipe up

      if (!rtisfullScreen) {
        handleToggleFullScreen();
      }
    }
  };

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <Animated.View
        style={{
          height: rtisfullScreen ? deviceHeight - 20 : 400,
          ...styles.container,
          ...styles.card,
          transform: [{ translateY: position.y }],
          paddingTop: rtisfullScreen ? 40 : 20,
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
            <Text style={styles.cardName}>Jarvis Pension</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleToggleFullScreen}>
            <MaterialIcons
              name="fullscreen"
              size={40}
              color={myColorsLight.black}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: myColorsLight.grey3,
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

export default RtJarvisPension;