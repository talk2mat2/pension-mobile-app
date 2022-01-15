import React, { useState, useEffect, useContext } from 'react';
import {Platform, StyleSheet, View, Pressable, Modal, Text, TextInput, Dimensions, ScrollView, Button} from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as helpers from '../Helpers';
import UserContext from '../contexts/UserContext';

function MoreScreen(){
	
	const ctx = useContext(UserContext);
	const pp = () => {
		console.log("moving..");
	}
	const [isSMVisible, setIsSMVisible] = useState(false);
    const [button1TextColor, setButton1TextColor] = useState("#fff");
    const [button1Background, setButton1Background] = useState("orange");
    const [button2TextColor, setButton2TextColor] = useState("#fff");
    const [button2Background, setButton2Background] = useState("green");
	
	const confirmSignout = () => {
		setIsSMVisible(true);
	}
	
	const test = async () => {
          await helpers.schedulePushNotification();
        }
		
		const signout = async () => {
	
	try {
	  AuthSession.dismiss();
    } catch (error) {
      console.error(error);
    }
}
	
	const items = [
	 {key: 'more-3', caption: "View information about the app.", btn: "About", play: pp},
	 {key: 'more-4', caption: "Sign out of your account", btn: "Sign out", play: confirmSignout},
	];
    
	return (
	   <View style={styles.container}>
	    <Text style={styles.caption}>More options</Text>
		  {
			items.map(i => ( 
	        <View style={styles.item}>
			   <Text style={{marginRight: 1}}>{i.caption}</Text>
               <Pressable
			  onPress={() => {
              /** Do Something **/
			  console.log("moving..");
			  i.play();
             }}
             style={{width:80,height:40}}
           >
		     <View style={[styles.loginButton,{backgroundColor: "#694fad"}]}>
				 <Text style={[styles.loginButtonText,{color: "#fff"}]}>{i.btn}</Text>
			 </View>
           </Pressable>
			   
			</View>
			))
		  }
		  
		   <Modal
        animationType="slide"
        transparent={true}
        visible={isSMVisible}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure?</Text>
             <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
             <Pressable
			  onPress={() => {
              /** Do Something **/
			  console.log("moving..");
			  setButton1Background("#fff");
			  setButton1TextColor("orange");
			  setTimeout(() => {
				setButton1Background("orange");
				setButton1TextColor("#fff");
			  },700);
			  signout();
             }}
             style={{width:80,height:40}}
           >
		     <View style={[styles.button,{backgroundColor: button1Background}]}>
				 <Text style={{color: button1TextColor}}>Yes</Text>
			 </View>
           </Pressable>
           <Pressable
			  onPress={() => {
              /** Do Something **/
			  console.log("moving..");
			  setButton1Background("#fff");
			  setButton1TextColor("green");
			  setTimeout(() => {
				setButton1Background("green");
				setButton1TextColor("#fff");
			  },700);
              setIsSMVisible(false);
             }}
             style={{width:80,height:40}}
           >
		     <View style={[styles.button,{backgroundColor: button1Background}]}>
				 <Text style={{color: button1TextColor}}>No</Text>
			 </View>
           </Pressable>
		   </View>
          </View>
        </View>
      </Modal>
	   </View>
	);
}

const styles = StyleSheet.create({
  container: {
	backgroundColor: '#fff',
	//marginTop: StatusBar.currentHeight || 0,
	width: '100%',
	height: '100%',
	flex: 1
  },
  item: {
	  flex: 1,
    padding: 3,
	flexDirection: 'row',
	backgroundColor: '#fff',
	justifyContent: 'space-between',
  },
    caption: {
    fontSize: 18,
	fontWeight: "bold",
	//marginTop: StatusBar.currentHeight || 0,
	//marginBottom: StatusBar.currentHeight || 0,
  },
    centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
    modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
    color: "#fff",
    width: Dimensions.get('window').width-20
            
 },
});

export default MoreScreen;
