import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import KYCCoverScreen from './KYCCoverScreen.js';
import KYCNameScreen from './KYCNameScreen.js';
import KYCBirthdayScreen from './KYCBirthdayScreen.js';
import KYCRetirementAgeScreen from './KYCRetirementAgeScreen.js';
import KYCRetireWithSpouseScreen from './KYCRetireWithSpouseScreen.js';
import KYCRetireLondonScreen from './KYCRetireLondonScreen.js';
 
import HeaderBar from '../components/HeaderBar.js';
import KYCCompleteScreen from './KYCCompleteScreen.js';
 
 
 const Stack = createStackNavigator();


function KYCStack(){
  
	return (
	   <Stack.Navigator
	    initialRouteName="KYCCover"	
		screenOptions={{
            headerShown: false
      }}
	  >
        <>
	   <Stack.Screen name="KYCCover" component={KYCCoverScreen} />
       <Stack.Screen 
         name="KYCName" 
         options={{
            headerTitle: (props) => <HeaderBar {...props} />
         }} 
         component={KYCNameScreen} 
         />
      <Stack.Screen 
       name="KYCBirthday" 
       options={{
          headerTitle: (props) => <HeaderBar {...props} />
       }} 
       component={KYCBirthdayScreen}
      />
      <Stack.Screen 
       name="KYCRetirementAge" 
       options={{
          headerTitle: (props) => <HeaderBar {...props} />
       }} 
       component={KYCRetirementAgeScreen}
      />
      <Stack.Screen 
       name="KYCRetireWithSpouse" 
       options={{
          headerTitle: (props) => <HeaderBar {...props} />
       }} 
       component={KYCRetireWithSpouseScreen}
      />
      <Stack.Screen 
       name="KYCRetireLondon" 
       options={{
          headerTitle: (props) => <HeaderBar {...props} />
       }} 
       component={KYCRetireLondonScreen}
      />
       <Stack.Screen 
       name="KYCComplete" 
       options={{
          headerTitle: (props) => <HeaderBar {...props} />
       }} 
       component={KYCCompleteScreen}
      />
      </>
     </Stack.Navigator>
	);
}


export default KYCStack;
