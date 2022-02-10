import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from './HomeScreen.js';
 
import HeaderBar from '../components/HeaderBar.js';
 
 
 const Tab = createMaterialBottomTabNavigator();


function AppTab(){
  
	return (
	   <Stack.Navigator
	    initialRouteName="Home"	
		screenOptions={{
        headerTitle: (props) => <HeaderBar {...props} />
      }}
	  >
	   <Stack.Screen name="Dashboard" title="Profile" component={HomeScreen} />
	   </Stack.Navigator>
	);
}


export default AppTab;
