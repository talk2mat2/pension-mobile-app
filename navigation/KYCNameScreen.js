import React, { useState, useEffect, useContext } from 'react';
import {StyleSheet, View, Text, TextInput, ImageBackground} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as helpers from '../Helpers';
import UserContext from '../contexts/UserContext';
import {Picker} from '@react-native-picker/picker';

import JarvisButton from '../components/JarvisButton';
import ProgressBar from '../components/ProgressBar';

function KYCNameScreen({navigation}){

    const ctx = useContext(UserContext);
    let navv = navigation;
    let u = ctx.u;
    //console.log("u: ",u);
    let fullName = u.attributes.name.split(" ");
    let fn = u.attributes.fname, ln = u.attributes.lname;
    let tt = u.attributes.title, g = u.attributes.gender;
    let ttt = "";

    if(!fn){
        fn = fullName[0] ? fullName[0] : "";
    }
    if(!ln){
        ln = fullName[1] ? fullName[1] : "";
    }

    if(!tt){
        if(g){
           if(g == "male") ttt = "mr";
           else if(g == "female") ttt = "mrs";
        }
        else{
           ttt = "mr";
        }
    }

    const [buttonBackground,setButtonBackground] = useState("#77f");
    const [title,setTitle] = useState(ttt);
    const [fname,setFname] = useState(fn);
    const [lname,setLname] = useState(ln);
    const [fnameValidation,setFnameValidation] = useState(false);
    const [lnameValidation,setLnameValidation] = useState(false);
    const [titleValidation,setTitleValidation] = useState(false);


      //Set default values here

      const _updateUser = async (dt) => {
        //Update the frontend: context and async storage
        u.attributes.fname = dt.fname;
        u.attributes.lname = dt.lname;
        u.attributes.title = dt.title;
        let gg = null;

        if(dt.title == "mrs" || dt.title == "miss"){
           gg = "Female";
        }
        else{
            gg = "Male";
        }
        u.attributes.gender = gg;
       
        ctx.setU(u);
        helpers.save('pa_u',JSON.stringify(u));

         /*
        //Update the backend
        let url = `${API2}/users/me`;
		let userInfo = await axios({
			method: "get",
			url: url3,
			headers: {
						Authorization: `Bearer ${ctx.access_token}`,
			}
		});
        */
     }

    const _next = () => {
        if(title == "" || fname == "" || lname == ""){
            if(title == "none") setTitleValidation(true);
            if(fname == "") setFnameValidation(true);
            if(lname == "") setLnameValidation(true);
        }
        else{
            _updateUser({
                fname: fname,
                lname: lname,
                title: title
            })
            navigation.navigate('KYCBirthday');
        }
        
    }


    return (
        <View style={styles.container}>
         <ImageBackground source={require('../assets/intro.jpg')} resizeMode="cover" style={styles.imageBackground}>
             <View style={styles.centerView}>
                 <Text style={[styles.loginText,styles.textWhite,{ fontSize: 20}]}>Step 1 of 3</Text>
             </View>
             <View style={styles.centerView}>
                 <Text style={[styles.loginText,styles.textWhite,{ fontSize: 15}]}>Personal Information</Text>
             </View>
            <View style={[styles.centerView,{marginTop: 100}]}>
              <Text style={[styles.subHeader,styles.textWhite]}>Let's get to know you a little bit better</Text>
              
            </View>
 
            <View style={[styles.centerView,{marginVertical: 10}]}>
              <Text style={styles.textWhite}>What's your name?</Text>
            </View>
 
            <View style={styles.formGroup}>
                <View style={styles.centerView, {paddingVertical: 5}}>
                   <Picker
                     selectedValue={title}
                     onValueChange={(itemValue, itemIndex) =>{
                         setTitle(itemValue);
                         setTitleValidation(false);
                     }
                     
                     }
                     style={styles.textWhite}
                   >
                     <Picker.Item label="Select title" value="none" />
                     <Picker.Item label="Mr" value="mr" />
                     <Picker.Item label="Mrs" value="mrs" />
                     <Picker.Item label="Miss" value="miss" />
                     <Picker.Item label="Dr" value="dr" />
                  </Picker>
                </View> 
            </View>
            {
             titleValidation && (
            <View style={styles.formGroupError}>
                    <Text style={styles.inputError}>Please select a title</Text>
            </View>
             )}
            <View style={styles.formGroup}>
                <View style={styles.centerView,{paddingVertical: 5}}>
                    <TextInput 
                       style={[styles.formInput,styles.textWhite]}
                       onChangeText={text => {
                           setFname(text);
                           if(text.length > 1) setFnameValidation(false);
                       }}
                       placeholder="First name"
                       value={fname}
                    />
                </View>
            </View>
            {
             fnameValidation && (
            <View style={styles.formGroupError}>
                    <Text style={styles.inputError}>Please input your first name</Text>
            </View>
            )}
            <View style={styles.formGroup}>
            <View style={styles.centerView,{paddingVertical: 5}}>
                    <TextInput 
                       style={[styles.formInput,styles.textWhite]}
                       onChangeText={text => {
                           setLname(text);
                           if(text.length > 1) setLnameValidation(false);
                       }}
                       placeholder="Last name"
                       value={lname}
                    />
                </View> 
            </View>
            {
             lnameValidation && (
            <View style={styles.formGroupError}>
                    <Text style={styles.inputError}>Please input your last name</Text>
            </View>
             )}
            
            <View style={{width: "100%",marginTop: 10}}>
           <View style={[styles.centerView,{marginTop: 60}]}>
		   <JarvisButton
		        style={[styles.loginButton,{marginTop: 10}]}
                bgcolor={buttonBackground}
                 play={_next}
                 btn="Next"
            />
			</View>
            </View>
         </ImageBackground>
        </View>
     );
  
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      marginTop: 30,
      //justifyContent: 'center',
    },
    imageBackground:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    centerView: {
        flexDirection: "row", 
        alignSelf: "center"
      },
    loginButton: {
       alignItems: 'center',
       marginTop: 50,
       marginLeft: 20
               
    },
    subHeader: {	
       fontSize: 20,
       alignContent: "center"
    },
    formGroup: {
      width: "90%",
      textAlign: "center",
      alignContent: "center",
      marginTop: 20,
      borderWidth: 1,
      borderColor: "#bbb",
      borderRadius: 5
    },
    formInput: {
       padding: 5
    },
    formGroupError: {
        marginTop: 5
    },
    inputError: {
        color: "red",
        fontWeight: "bold"
    },
    textWhite: {
        color: "#fff"
    }
  });

export default KYCNameScreen;

