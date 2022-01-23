import React, {useRef, useState, useEffect} from 'react';
import {StatusBar, StyleSheet, Animated, Pressable, View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as RootNavigation from '../RootNavigation.js';

const JarvisButton = props => {
    const pressedAnim =  useRef(new Animated.Value(1)).current;
    const [isPressed, setIsPressed] = useState(false);

    useEffect(() => {
        if(isPressed){
          Animated.sequence([
            Animated.timing(pressedAnim,{
               toValue: 0,
               duration: 100,
               useNativeDriver: true
            }),
            Animated.timing(pressedAnim,{
              toValue: 1,
              duration: 100,
              useNativeDriver: true
            })
          ]).start();
          setIsPressed(false)
        }
      },[isPressed]);

   return (
    <Animated.View
    style={{...props.style,opacity: pressedAnim}}
    >
     <Pressable
              onPress={() => {
          /** Do Something **/
          setIsPressed(true);
               props.play();
        }}
     >
           <View style={[styles.button,{backgroundColor: props.bgcolor}]}>
                 <Text style={styles.buttonText}>{props.btn}</Text>
             </View>
     </Pressable>
    </Animated.View>
   );
}

const styles = StyleSheet.create({
    
    button: {
        padding: 8       
     },
     buttonText: {
       color: "#fff"
     }
  });

export default JarvisButton;