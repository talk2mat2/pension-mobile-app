import React, { useState, useEffect, useRef, useContext } from 'react';
import { Platform, Animated, StyleSheet, View, Text, TextInput, Dimensions, ImageBackground } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as AuthSession from 'expo-auth-session';
const axios = require('axios');
import * as helpers from '../Helpers';
import UserContext from '../contexts/UserContext';
import JarvisButton from '../components/JarvisButton';

function KYCCoverScreen({navigation}){
	const ctx = useContext(UserContext);
    const [buttonBackground,setButtonBackground] = useState("#77f");

    const _next = () => {
        navigation.navigate('KYCName');
    }

	return (
	   <View style={styles.container}>
       <ImageBackground source={require('../assets/cover.jpg')} resizeMode="cover" style={styles.imageBackground}>
		    <View style={styles.centerView}>
				<Text style={[styles.loginText,styles.textWhite,{ fontSize: 40}]}>Jarvis</Text>
			</View>
		   <View style={[styles.centerView,{marginTop: 80}]}>
		     <Text style={[styles.subHeader,styles.textWhite]}>Welcome to Jarvis</Text>
             
		   </View>

		   <View style={[styles.centerView,{marginTop: 10, width: "70%"}]}>
		     <Text style={[{textAlign: "center"},styles.textWhite]}>To build your retirement profile, we would need to capture some information from you.</Text>
		   </View>

           <View style={styles.hrView}>
               <View style={styles.centerView, {paddingVertical: 5}}>
                   <Text style={[{fontWeight: "bold", alignSelf: "center"}, styles.textWhite]}>It would take just three steps:</Text>
               </View> 
		   </View>

           <View style={styles.hrView}>
               <View style={styles.centerView,{flexDirection: "row",marginLeft: 10,paddingVertical: 10}}>
               <MaterialCommunityIcons name="information-outline" color="#fff" size={26} />
                   <Text style={[{fontWeight: "bold", marginLeft: 5,marginTop: 3},styles.textWhite]}>Personal Information</Text>
               </View> 
		   </View>

           <View style={styles.hrView}>
               <View style={styles.centerView,{flexDirection: "row",marginLeft: 10,paddingVertical: 10}}>
               <MaterialCommunityIcons name="information-outline" color="#fff" size={26} />
                   <Text style={[{fontWeight: "bold", marginLeft: 5,marginTop: 3},styles.textWhite]}>Retirement Profile</Text>
               </View> 
		   </View>

           <View style={styles.hrView}>
               <View style={{flexDirection: "row",marginLeft: 10,paddingVertical: 10}}>
               <MaterialCommunityIcons name="information-outline" color="#fff" size={26} />
                   <Text style={[{fontWeight: "bold", marginLeft: 5,marginTop: 3},styles.textWhite]}>Pensions & Savings</Text>
               </View> 
		   </View>
		   
           <>
           <View style={{width: "100%",marginTop: 10}}>
           <View style={[styles.centerView,{marginTop: 60}]}>
		   <JarvisButton
		        style={[styles.loginButton,{marginTop: 10}]}
                bgcolor={buttonBackground}
                 play={_next}
                 btn="Let's begin"
            />
			</View>
            </View>
           </>
	    </ImageBackground>
	   </View>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 30,
    //justifyContent: 'center',
  },
  centerView: {
	  flexDirection: "row", 
	  alignSelf: "center"
	},
  loginButton: {
	 marginTop: 50,
	 marginLeft: 20
             
  },
  imageBackground:{
    flex: 1,
    justifyContent: "center",
    //alignItems: "center",
    width: "100%"
},
textWhite: {
  color: "#fff"
},
  subHeader: {	
     fontSize: 30
  },
  hrView: {
    width: "100%",
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#bbb"
  }
});

export default KYCCoverScreen;
