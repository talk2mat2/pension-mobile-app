import React, { useState, useEffect, useContext } from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
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

    const [buttonBackground,setButtonBackground] = useState("#77f");
    const [title,setTitle] = useState(u.attributes.gender ? u.attributes.gender : "mr");
    const [fname,setFname] = useState(u.fname);
    const [lname,setLname] = useState(u.lname);
    const [fnameValidation,setFnameValidation] = useState(false);
    const [lnameValidation,setLnameValidation] = useState(false);
    const [titleValidation,setTitleValidation] = useState(false);


      //Set default values here

      const _updateUser = (dt) => {
        ctx.setU(dt.u);
        helpers.save('pa_u',JSON.stringify(dt));
     }

    const _next = () => {
        if(title == "" || fname == "" || lname == ""){
            if(title == "none") setTitleValidation(true);
            if(fname == "") setFnameValidation(true);
            if(lname == "") setLnameValidation(true);
        }
        else{
            helpers.save("j_kyc_fname",fname);
            helpers.save("j_kyc_lname",lname);
            navigation.navigate('KYCBirthday',{fname: fname,lname: lname});
        }
        
    }


    return (
        <View style={styles.container}>
             <View style={styles.centerView}>
                 <Text style={[styles.loginText,{ fontSize: 20}]}>Step 1 of 3</Text>
             </View>
             <View style={styles.centerView}>
                 <Text style={[styles.loginText,{ fontSize: 15}]}>Personal Information</Text>
             </View>
            <View style={[styles.centerView,{marginTop: 100}]}>
              <Text style={styles.subHeader}>Let's get to know you a little bit better</Text>
              
            </View>
 
            <View style={[styles.centerView,{marginVertical: 10}]}>
              <Text>What's your name?</Text>
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
                   >
                     <Picker.Item label="Select title" value="none" />
                     <Picker.Item label="Mr" value="mr" />
                     <Picker.Item label="Mrs" value="mrs" />
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
                       style={styles.formInput}
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
                       style={styles.formInput}
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
    }
  });

export default KYCNameScreen;

