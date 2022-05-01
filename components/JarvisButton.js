import React, { useRef, useState, useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  Animated,
  Pressable,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { primary } from "../constant/colors";
import { HeaderFour } from "../constant/fonts";

const JarvisButton = (props) => {
  const pressedAnim = useRef(new Animated.Value(1)).current;
  const [isPressed, setIsPressed] = useState(false);
  const w = props.w ? props.w : "80%";
  const disabled = props.disabled || false;

  useEffect(() => {
    if (isPressed) {
      Animated.sequence([
        Animated.timing(pressedAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(pressedAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
      setIsPressed(false);
    }
  }, [isPressed]);

  return (
    <Animated.View
      style={{
        ...props?.style,
        width: Platform.OS === "web" ? null : w,
        opacity: pressedAnim,
      }}
    >
      <Pressable
        disabled={disabled}
        onPress={() => {
          /** Do Something **/
          setIsPressed(true);
          props.play();
        }}
      >
        <View
          style={[
            styles.button,
            {
              backgroundColor: disabled ? primary.disabledBtn : props.bgcolor,

              width: Platform.OS === "web" ? 200 : null,
              ...props.buttonSyle,
            },
          ]}
        >
          <HeaderFour
            style={{
              ...styles.buttonText,
              ...props.btnStyle,
              color: disabled ? '#bebebe' : props.btnStyle?.color || "#ffffff",
            }}
          >
            {props.btn}
          </HeaderFour>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  },
});

export default JarvisButton;
