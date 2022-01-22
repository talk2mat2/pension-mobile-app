import React, { useState, useEffect, useContext } from 'react';
import {Platform, StyleSheet, View, Text, TextInput, Dimensions, ScrollView, Button} from 'react-native';
import * as helpers from '../Helpers';
import UserContext from '../contexts/UserContext';

function HomeScreen({navigation}){
    const ctx = useContext(UserContext);
	  let items = [];
	  let navv = navigation;
    let u = ctx.u;
		 console.log("uu: ",u);
		 
    return (
		<View style={styles.container}>
		   <Text>Welcome to your profile!</Text>
       <Text>Here is a bit of your information:</Text>
       <Text>Test</Text>
	  </View>
    );
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
	marginTop: 30,
	marginLeft: 10,
    //justifyContent: 'center',
  },
  titleBar: {
    width: 100,
	marginTop: 40,
    paddingLeft: 80,
	flexDirection: 'row',
  },
  itemsLayout: {
    flexDirection: 'row',
	flex: 1
  },
  column: {
	  width: 50,
	  alignItems: 'center'
  },
  formGroup: {
	  marginTop: 30,
	 // padding: 10
  },
  loginButton: {
	 alignItems: 'center',
	 
	 marginTop: 30,
  }
});

export default HomeScreen;

