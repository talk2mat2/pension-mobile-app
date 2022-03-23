import React from "react";
import {
  View,
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { myColorsLight } from "../../constant/colors";
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("screen");
const RetirementCards = ({ handleshowCards }) => {
  const position = new Animated.ValueXY({ x: 0, y: deviceHeight / 2 - 130 });

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
    }).start(() => handleshowCards());
  };
  return (
    <Animated.View
      style={{
        ...styles.container,
        ...styles.card,
        transform: [{ translateY: position.y }],
      }}
    >
      <TouchableOpacity onPress={closeCard}>
        <Text style={styles.cardName}>Retirement Lifestyle</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 400,
    backgroundColor: myColorsLight.grey8,
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
export default RetirementCards;