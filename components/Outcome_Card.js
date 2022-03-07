import React from "react";
import {
  PanResponder,
  View,
  Animated,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { myColorsLight } from "../constant/colors";
import OutcomeDatatable from "./outcomeDataTable";
import { MaterialIcons } from "@expo/vector-icons";

const OutcomeCard = ({ hideCards }) => {
  const outcomePopper = new Animated.ValueXY({
    x: 0,
    y: -Dimensions.get("window").height,
  });
  const outcomeAnimated = () => {
    Animated.spring(outcomePopper, {
      toValue: 0,
      duration: 2000,
      friction: 3,
      tension: 20,
      useNativeDriver: true,
    }).start();
  };
  React.useEffect(() => {
    setTimeout(() => {
      outcomeAnimated();
    }, 2000);
  }, []);

  const pan = PanResponder.create({
    //this set the position to the supplied x/y position
    onPanResponderRelease: () => {
      // outcomePopper.setValue({ x: 0, y: 0 });
      Animated.spring(outcomePopper, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
        bounciness: 10,
      }).start();
    },
    onMoveShouldSetPanResponder: () => true,
    //this moves your animated view with response to pan dy dx value
    // onPanResponderMove: Animated.event(
    //   [null, { dx: position.x, dy: position.y }],
    //   { useNativeDriver: false }
    // ),
    onPanResponderMove: (e, gesture) =>
      outcomePopper.setValue({ x: gesture.dx, y: gesture.dy }),
    // (e, c) => {
    //   // console.log("move", e);
    //   Animated.event([null, { dx: position.x, dy: position.y }]);
    // },
  });

  return (
    <Animated.View
      {...pan.panHandlers}
      style={{
        ...styles.container,
        transform: [
          { translateY: outcomePopper.y },
          //   { translateX: outcomePopper.x },
        ],
      }}
    >
      
      <Text style={styles.textHead}>Your Retirement Profile</Text>
      <View style={{ ...styles.hrView, marginVertical: 10 }} />
      <View>
        <OutcomeDatatable />
      </View>
      {/* <View style={styles.close}>
        <TouchableOpacity style={{flex:1}} onPress={hideCards}>
          <MaterialIcons name="cancel" size={30} color="black" />
        </TouchableOpacity>
      </View> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  textHead: {
    textAlign: "center",
    fontSize: 16,
  },
  container: {
    position: "absolute",
    bottom: 120,
    padding: 10,
    right: 0,
    backgroundColor: myColorsLight.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 1,
    zIndex: 3,
    elevation: 3,
    height: Dimensions.get("screen").width / 1.1,
    width: "100%",
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
  close: {
    position: "absolute",
    right: 5,
    top: 5,
  },
});

export default OutcomeCard;
