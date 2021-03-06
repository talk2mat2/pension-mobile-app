import React, { useState, useEffect} from 'react';
import {StyleSheet, View, Text, Platform } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const mobile = Platform.OS == "ios" || Platform.OS == "android";

const JarvisLoading = props => {
  let propsText = props.text || "Processing", propsColor = props.color || "#00f";
   if(mobile){
       return (
          <View style={styles.container}>
              <Text style={[styles.loadingText,{color:propsColor}]}>{propsText}</Text>
              <ActivityIndicator
                size="large"
                color={propsColor}
              />
          </View>
       );
   }
   else{
    <View style={styles.container}>
 
      <ActivityIndicator
        size="large"
        color={propsColor}
      />
    </View>
   }
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 20
    },
    button: {
        padding: 10,
        borderRadius: 2
           
     },
     loadingText: {
       fontSize: 20,
       textAlign: "center",
       paddingVertical: 10,
       marginRight: 10   
     }
  });

export default JarvisLoading;