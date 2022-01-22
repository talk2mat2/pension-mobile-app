import React from 'react';
import {StatusBar, StyleSheet, Dimensions, Pressable, View, Text, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as RootNavigation from '../RootNavigation.js';

const newButtonClick = (l) => {
	console.log('new button clicked');  
   // RootNavigation.navigate("Compose");	
}

const profileButtonClick = (l) => {
	console.log('profile button clicked');
}

const IconButton = (props) => {
	
	return (
	<Pressable
	   onPress={props.action}
	   style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? 'rgb(210, 230, 255)'
              : props.bgcolor,
			  color: pressed
              ? '#000'
              : '#fff'
          },
          styles.iconButton
        ]}
	 >
	  <MaterialCommunityIcons name={props.name}  size={26} style={[{padding: 15},props.style]}/>
      </Pressable>
	);
};

const HeaderBar = (props) => {
	return (
	 <View style={styles.container}>
	  <IconButton name='plus' bgcolor='#694fad' action={() => newButtonClick(props.l)} style={styles.newButton}/>
	  <View style={{flexDirection: "column"}}>
	     <View style={styles.mainLogoView}>
	         <Text style={styles.mainLogo}>PensionJar</Text>
	     </View>
	     <View style={styles.screenTitleView}>
		     <Text style={styles.screenTitle}>{props.children}</Text>
	     </View>
	  </View>
	  <IconButton name='account'  bgcolor='#694fad' action={() => profileButtonClick(props.l)} style={styles.profileButton}/>
     </View>	
	);
}

const styles = StyleSheet.create({

  container: {
	   width: Dimensions.get('window').width,
	flexDirection: 'row',
	justifyContent: 'space-between',
	borderBottomWidth:0.8,
	marginLeft: -15
  },
  hc: {
	  height: 20,
	  overflow: 'hidden',
	  padding: 20
  },
  newButton: {
	color: "#fff"
  },
  profileButton: {
	 color: "#fff"
  }, 
  logoView: {
	 
  },
  logoText: {
	  alignItems: 'flex-end',
  },
  mainLogoView: {
	  justifyContent: "center",
	  alignItems: "center",
	  backgroundColor: '#694fad',
	  paddingHorizontal: 10
  },
  mainLogo: {
	  fontSize: 20,
	  color: "#fff"

  },
  screenTitleView: {
	justifyContent: "center",
	alignItems: "center",
	marginTop: 5
},
  screenTitle: {
	fontSize: 16
  }
});

export default HeaderBar;
