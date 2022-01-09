import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from './SettingsScreen.js';
 
import HeaderBar from '../components/HeaderBar.js';
 
 
 const Stack = createStackNavigator();


function AppStack(){
  
	return (
	   <Stack.Navigator
	    initialRouteName="Settings"	
		screenOptions={{
        headerTitle: (props) => <HeaderBar {...props} />
      }}
	  >
	   <Stack.Screen name="Settings" component={SettingsScreen} />
	   </Stack.Navigator>
	);
}


export default AppStack;
