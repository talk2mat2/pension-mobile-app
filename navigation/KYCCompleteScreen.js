import React, { useState, useEffect, useRef, useContext } from 'react';
import { Platform, Animated, StyleSheet, View, Text, TextInput, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const axios = require('axios');
import * as helpers from '../Helpers';
import UserContext from '../contexts/UserContext';
import JarvisButton from '../components/JarvisButton';

function KYCCompleteScreen({navigation}){
	const ctx = useContext(UserContext);
    const [buttonBackground,setButtonBackground] = useState("#77f");

    const _next = () => {
       // navigation.navigate('KYCName');
    }

	return (
	   <View style={styles.container}>
		    <View style={styles.centerView}>
				<Text style={[styles.loginText,{ fontSize: 40}]}>Well done!</Text>
			</View>

		   <View style={[styles.centerView,{marginTop: 70, width: "70%"}]}>
		     <Text style={{textAlign: "center"}}>You have completed step 1 and have earned your first Jarvis Insights Card which gives you regular updates and useful facts and information on pension planning. You can access it from your dashboard at any time.</Text>
		   </View>

           <View style={styles.hrView}>
               <View style={styles.centerView, {paddingVertical: 5}}>
                   <Text style={{fontWeight: "bold", alignSelf: "center"}}>Facts and stats on pension planning:</Text>
               </View> 
		   </View>

           <View style={styles.hrView}>
               <View style={styles.centerView,{paddingVertical: 10}}>
                   <Text style={{fontWeight: "bold", marginLeft: 5}}>1. Useful information</Text>
               </View> 
		   </View>

           <View style={styles.hrView}>
               <View style={styles.centerView,{paddingVertical: 10}}>
                   <Text style={{fontWeight: "bold", marginLeft: 5}}>2. Useful fact</Text>
               </View> 
		   </View>

           <View style={styles.hrView}>
               <View style={{paddingVertical: 10}}>
                   <Text style={{fontWeight: "bold", marginLeft: 5}}>3. More useful information</Text>
               </View> 
		   </View>
		   
           <>
           <View style={{width: "100%",marginTop: 10}}>
            <Text>You're just  two stesp from completion. Click the button below to go to the next</Text>
           <View style={[styles.centerView,{marginTop: 60}]}>
		   <JarvisButton
		        style={[styles.loginButton,{marginTop: 10}]}
                bgcolor={buttonBackground}
                 play={_next}
                 btn="Your retirement profile"
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

export default KYCCompleteScreen;
