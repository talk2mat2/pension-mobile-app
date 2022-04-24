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
              backgroundColor: disabled ? "#f2f2f2" : props.bgcolor,
              width: Platform.OS === "web" ? 200 : null,
            },
          ]}
        >
          <Text style={styles.buttonText}>{props.btn}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 13,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default JarvisButton;