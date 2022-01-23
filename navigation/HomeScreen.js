import React, { useState, useEffect, useContext } from 'react';
import {Platform, Dimensions, StyleSheet, View, Text, Image, Animated, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as helpers from '../Helpers';
import UserContext from '../contexts/UserContext';

import JarvisButton from '../components/JarvisButton';

function HomeScreen({navigation}){

    const ctx = useContext(UserContext);
	  let navv = navigation;
    let u = helpers.parseUserData(ctx.u);
		 //console.log("uu: ",u);

     const _changePassword = () => {
      console.log("changing password..");
    }

    const _signout = () => {
     console.log("signing out..");

     //clear stored user data
     helpers.remove("pa_atk");
     helpers.remove("pa_rtk");
     helpers.remove("pa_u");

     //clear contexts
     ctx.setAtk(null);
     ctx.setRtk(null);
         ctx.setU(null);
         ctx.setLoggedIn(false);
   }

     const items = [
      {key: 'more-1', caption: "Change password", btn: "Change", icon: "form-textbox-password", play: _changePassword},
      {key: 'more-2', caption: "Sign out of your account", btn: "Sign out", icon: "logout", play: _signout},
     ];
    
		 
    return (
		<View style={styles.container}>
      <View style={styles.avatarView}>
         <Image style={styles.avatar} source={{uri: u.img}}/>
         <Text style={styles.avatarName}>{u.fname + " " + u.lname}</Text>
         <Text style={styles.avatarEmail}>{u.email}</Text>
      </View>
      <Text style={styles.sectionTitle}>Settings</Text>
      <View style={styles.settingsView}>
        {
          items.map( i => (
            <View key={i.key} style={[styles.settingsRow]}>
               <MaterialCommunityIcons style={{marginRight: 10}} name={i.icon} color="#694fad" size={26} />
               <Text style={{marginRight: 10}}>{i.caption}</Text>
               <JarvisButton
                style={{marginLeft: 50}}
                bgcolor="#694fad"
                 play={i.play}
                 btn={i.btn}
               />
         </View>
        ))
        }
      </View>
	  </View>
    );
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //justifyContent: 'center',
  },
  avatarView: {
    justifyContent: "center",
    alignItems: "center", 
    marginTop: 20
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40
  },
  avatarName: {
    fontSize: 24,
    marginTop: 10
  },
  avatarEmail: {
    fontSize: 18,
    color: "#dedede",
    marginTop: 5
  },
  sectionTitle: {
    fontSize: 18,
    color: "#dedede",
    marginTop: 95,
    marginLeft: 5
  },
  settingsView: {
     alignItems: 'flex-start',
     borderTopColor: "#dedede",
     borderTopWidth: 1,
     marginTop: 5,
     paddingTop: 10
  },
  settingsRow: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between"
  }
});

export default HomeScreen;

