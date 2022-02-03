import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, Animated, Pressable, View, Text } from 'react-native';
import Slider from 'react-native-slider';

const ProgressBar = props => {


   return (
    <View style={styles.container}>
     <Slider
          value={props.step}
          disabled={true}
     />
    </View>
   );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignContent: "flex-end",
        marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
      },
  });

export default ProgressBar;