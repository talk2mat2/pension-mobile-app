import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import KYCStack from './KYCStack.js';
 
import HeaderBar from '../components/HeaderBar.js';
 
 
 const Stack = createStackNavigator();


function SetupStack(){
  
	return (
	   <Stack.Navigator
	    initialRouteName="KYCStack"	
	  >
	   <Stack.Screen name="KYC" options={{headerShown: false}} component={KYCStack} />
	   </Stack.Navigator>
	);
}


export default SetupStack;
