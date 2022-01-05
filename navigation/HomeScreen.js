import React from 'react';
import {Platform, StyleSheet, View, Text, TextInput, Dimensions, ScrollView, Button} from 'react-native';
import * as helpers from '../Helpers';

function HomeScreen({navigation}){
 
	  let items = [];
	  let navv = navigation;
		 //console.log(items);
		 
    return (
		<View style={styles.container}>
		   <Text>Open up App.js to start working on your app!</Text>
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

