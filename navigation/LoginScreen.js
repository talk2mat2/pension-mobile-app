import React, { useState, useEffect, useContext } from 'react';
import { Platform, StyleSheet, View, Text, TextInput, Dimensions } from 'react-native';
import AwesomeButton from "react-native-really-awesome-button";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as helpers from '../Helpers';
import UserContext from '../contexts/UserContext';


function LoginScreen(){
	const ctx = useContext(UserContext);
	
	const login = async (cb) => {
	
		let etk = await helpers.getValueFor("ace_etk");
		 //console.log("etk in LoginScreen: ",etk);
		 
	try {
	  let ret = await helpers.tryLogin();
	  console.log("ret: ",ret);
      
	  if(ret.type)
	  {
		switch(ret.type)
	    {
           case "dismiss":
			helpers.jarvisAlert({
				message: "Login attempt dismissed",
				type: "info",
			  });
			break;
	    }
	  }
	  
	  //cb();
    } catch (error) {
      console.error(error);
	  //cb();
    }
}

	return (
	   <View style={styles.container}>
		   <View style={styles.loginLogo}>
		     <MaterialCommunityIcons name="login" color="#00f" size={200} />
		   </View>

		   <View>
		      <Text style={styles.loginText}>You need to login to continue to Jarvis. Click the button below when you're ready!</Text>
		   </View>
	     
		 
		   <AwesomeButton
		      type="round"
			  activeOpacity={0.5}
			  width={Dimensions.get('window').width-20}
        textColor="#fff"
		backgroundColor="rgb(0,0,255)"
        style={styles.loginButton}
             progress
             onPress={next => {
              /** Do Something **/
			  console.log("moving..");
			  login(next);
             }}
    >
      Login
    </AwesomeButton>
	   </View>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
	paddingLeft: 5,
    //justifyContent: 'center',
  },
  validation: {
    fontSize: 16,
	fontWeight: "bold",
	color: "red"
  },
  loginLogo: {
	marginTop: 30,
	marginLeft: Dimensions.get('window').width / 6
  },
  loginText: {
	  marginTop: 30,
      fontSize: 16,
	  fontWeight: "bold",
	 // padding: 10
  },
  loginButton: {
	 alignItems: 'center',
	 
	 marginTop: 50,
  },
});

export default LoginScreen;
