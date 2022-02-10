import React, { useState, useEffect, useRef, useContext } from 'react';
import { Platform, Animated, StyleSheet, View, Text, TextInput, Dimensions } from 'react-native';
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
		    <View style={styles.centerView}>
				<Text style={[styles.loginText,{ fontSize: 40}]}>Jarvis</Text>
			</View>
		   <View style={[styles.centerView,{marginTop: 80}]}>
		     <Text style={styles.subHeader}>Welcome to Jarvis</Text>
             
		   </View>

		   <View style={[styles.centerView,{marginTop: 10, width: "70%"}]}>
		     <Text style={{textAlign: "center"}}>To build your retirement profile, we would need to capture some information from you.</Text>
		   </View>

           <View style={styles.hrView}>
               <View style={styles.centerView, {paddingVertical: 5}}>
                   <Text style={{fontWeight: "bold", alignSelf: "center"}}>It would take just three steps:</Text>
               </View> 
		   </View>

           <View style={styles.hrView}>
               <View style={styles.centerView,{paddingVertical: 10}}>
                   <Text style={{fontWeight: "bold", marginLeft: 5}}>1. Personal Information</Text>
               </View> 
		   </View>

           <View style={styles.hrView}>
               <View style={styles.centerView,{paddingVertical: 10}}>
                   <Text style={{fontWeight: "bold", marginLeft: 5}}>2. Retirement Profile</Text>
               </View> 
		   </View>

           <View style={styles.hrView}>
               <View style={{paddingVertical: 10}}>
                   <Text style={{fontWeight: "bold", marginLeft: 5}}>3. Pensions & Savings</Text>
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
  subHeader: {	
     fontSize: 30
  },
  hrView: {
    width: "80%",
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#bbb"
  }
});

export default KYCCoverScreen;
