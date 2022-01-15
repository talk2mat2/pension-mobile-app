import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MoreScreen from './MoreScreen.js';
 
import HeaderBar from '../components/HeaderBar.js';
 
 
 const Stack = createStackNavigator();


function MoreStack(){
  
	return (
	   <Stack.Navigator
	    initialRouteName="More"	
		screenOptions={{
        headerTitle: (props) => <HeaderBar {...props} />
      }}
	  >
	   <Stack.Screen name="More" component={MoreScreen} />
	   </Stack.Navigator>
	);
}


export default MoreStack;
