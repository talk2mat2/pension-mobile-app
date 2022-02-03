import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import LoginScreen from './LoginScreen.js';
 
//import HeaderBar from '../components/HeaderBar';
 
 
 const Stack = createStackNavigator();


function AuthStack(){
  
	return (
	   <Stack.Navigator
	    initialRouteName="Login"	
		screenOptions={{
        headerShown: false
      }}
	  >
	   <Stack.Screen name="Login" component={LoginScreen}/>
	   </Stack.Navigator>
	);
}


export default AuthStack;